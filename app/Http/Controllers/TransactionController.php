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
    /**
     * Display all transactions across all payrolls.
     */
    public function index()
    {
        // Load all payrolls with their employees and transactions
        $payrolls = Payroll::with([
            'employee' => function ($query) {
                $query->select('id', 'name');
            },
            'transactions' => function ($query) {
                $query->select('id', 'payroll_id', 'employee_account', 'tax_authority_account', 'amount', 'tax_amount', 'type', 'status', 'created_at');
            }
        ])->get();

        // Static initial funding
        $initialFunding = 10000000000; // Matches JSON data

        // Calculate reduction for completed transactions
        $completedFunding = Transaction::where('status', 'completed')
            ->selectRaw('SUM(amount + COALESCE(tax_amount, 0)) as total')
            ->value('total') ?? 0;

        // Total funding after reduction
        $totalFunding = $initialFunding - $completedFunding;

        // Prepare transactions data for the UI
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

   
        // Prepare summary details
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

    /**
     * Update the status of a transaction.
     */
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
            $transaction->update(['status' => $request->status]);
    

            return redirect()->route('Transaction.index')->with('success', 'Transaction status updated successfully');
        } catch (\Exception $e) {
            Log::error('Transaction status update failed', [
                'transaction_id' => $transaction->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()->with('error', 'Failed to update transaction status');
        }
    }

    /**
     * Display transactions for a specific payroll.
     */
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

        // Log::info('Payroll show data', [
        //     'payroll_id' => $payroll->id,
        //     'transactions_count' => $payroll->transactions->count(),
        //     'transactions' => $payroll->transactions->toArray(),
        // ]);

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