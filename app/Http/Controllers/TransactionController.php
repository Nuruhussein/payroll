<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Models\Transaction;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function index()
    {
        $payrolls = Payroll::with([
            'employee' => function ($query) {
                $query->select('id', 'name');
            },
            'transactions' => function ($query) {
                $query->select('id', 'payroll_id', 'employee_account', 'tax_authority_account', 'amount', 'tax_amount', 'type', 'status', 'created_at');
            }
        ])->get();

        $initialFunding = 10000000000;

        $completedFunding = Transaction::where('status', 'completed')
            ->selectRaw('SUM(amount + COALESCE(tax_amount, 0)) as total')
            ->value('total') ?? 0;

        $totalFunding = $initialFunding - $completedFunding;

        $transactions = $payrolls->flatMap(function ($payroll) {
            return $payroll->transactions->map(function ($transaction) use ($payroll) {
                return [
                    'id' => $transaction->id,
                    'payroll_id' => $payroll->id,
                    'recipient' => $payroll->employee ? $payroll->employee->name : 'Unknown',
                    'deposit_date' => $payroll->created_at->endOfMonth()->format('M d, Y'),
                    'amount' => number_format($transaction->amount, 2),
                    'tax_amount' => number_format($transaction->tax_amount ?? 0, 2),
                    'tax_authority' => $transaction->tax_authority_account ?? 'Unknown Tax Authority',
                    'status' => ucfirst($transaction->status),
                ];
            });
        })->values()->toArray();

        $transactionDetails = [
            'total_amount' => $totalFunding,
            'withdrawal_date' => Transaction::latest()->first()?->created_at->format('F d, Y') ?? now()->format('F d, Y'),
            'status' => $transactions ? ucfirst($transactions[0]['status'] ?? 'Pending') : 'Pending',
        ];

        return Inertia::render('Transaction/Index', [
            'transactions' => $transactions,
            'transactionDetails' => $transactionDetails,
        ]);
    }

    public function updateStatus(Request $request, Transaction $transaction)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,completed,failed',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors([
                "transactions.{$transaction->id}.status" => $validator->errors()->first('status'),
            ])->withInput();
        }

        try {
            $transaction->update([
                'status' => $request->status,
                'approved_by' => $request->status === 'completed' ? auth()->user()->name : $transaction->approved_by,
            ]);

          
            if ($request->status === 'completed' && $transaction->payroll) {
                $transaction->payroll->update([
                    'approved_by' => $request->status === 'completed' ? auth()->user()->name : $transaction->payroll->approved_by,
                ]);
            }
            return redirect()->route('Transaction.index')->with('success', 'Transaction status updated successfully');
        } catch (\Exception $e) {
            Log::error('Transaction status update failed', [
                'transaction_id' => $transaction->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()->with('error', 'Failed to update transaction status');
        }
    }

    public function show(Payroll $payroll)
    {
        $payroll->load([
            'employee' => function ($query) {
                $query->select('id', 'name');
            },
            'transactions' => function ($query) {
                $query->select('id', 'payroll_id', 'employee_account', 'tax_authority_account', 'amount', 'tax_amount', 'type', 'status', 'created_at');
            }
        ]);

        $transactionDetails = [
            'payroll_id' => $payroll->id,
            'month' => $payroll->month,
            'total_amount' => $payroll->net_payment + $payroll->income_tax,
            'withdrawal_date' => $payroll->created_at->format('F d, Y'),
            'payday' => $payroll->created_at->endOfMonth()->format('F d, Y'),
            'status' => $payroll->transactions->isNotEmpty() ? ucfirst($payroll->transactions->first()->status) : 'Pending',
        ];

        $transactions = $payroll->transactions->map(function ($transaction) use ($payroll) {
            return [
                'id' => $transaction->id,
                'payroll_id' => $payroll->id,
                'recipient' => $payroll->employee ? $payroll->employee->name : 'Unknown',
                'deposit_date' => $payroll->created_at->endOfMonth()->format('M d, Y'),
                'amount' => number_format($transaction->amount, 2),
                'tax_amount' => number_format($transaction->tax_amount ?? 0, 2),
                'tax_authority' => $transaction->tax_authority_account ?? 'Unknown Tax Authority',
                'status' => ucfirst($transaction->status),
            ];
        })->values()->toArray();

        return Inertia::render('Transaction/Show', [
            'transactionDetails' => $transactionDetails,
            'transactions' => $transactions,
        ]);
    }
}
