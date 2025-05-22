<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Models\Transaction;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    public function dashboard(Request $request)
    {
        $month = $request->input('month', now()->format('Y-m'));
        $previousMonth = now()->subMonth()->format('Y-m');

        $payrolls = Payroll::with('employee')
            ->where('month', $month)
            ->get();

        $previousMonthPayrolls = Payroll::with('employee')
            ->where('month', $previousMonth)
            ->get();

        $availableMonths = Payroll::select('month')
            ->distinct()
            ->pluck('month')
            ->sort()
            ->values();

        $totalFunding = 10000000000 - Payroll::where('month', $month)
            ->join('transactions', 'payrolls.id', '=', 'transactions.payroll_id')
            ->where('transactions.status', 'completed')
            ->sum('transactions.amount');

        return inertia('adminDashboard/Index', [
            'payrolls' => $payrolls,
            'selectedMonth' => $month,
            'totalFunding' => $totalFunding,
            'previousMonthPayrolls' => $previousMonthPayrolls,
            'availableMonths' => $availableMonths,
        ]);
    }


    public function index(Request $request)
    {
        $month = $request->query('month', now()->format('Y-m'));

        // Validate month format (YYYY-MM)
        if (!preg_match('/^\d{4}-\d{2}$/', $month)) {
            $month = now()->format('Y-m');
        }

        // Fetch payrolls for the selected month
        $payrolls = Payroll::with([
            'employee' => function ($query) {
            $query->select('id', 'name', 'employment_date', 'basic_salary');
            }
        ])
            ->where('month', $month)
            ->get();

        // Fetch available months from employment_date
        $availableMonths = Payroll::select('month')
            ->distinct()
            ->orderBy('month', 'desc')
            ->pluck('month')
            ->toArray();

        // Include current month if no payrolls exist
        if (empty($availableMonths) && !in_array($month, $availableMonths)) {
            $availableMonths[] = $month;
        }

        $initialFunding = 10000000;
        $completedFunding = Transaction::where('status', 'completed')
            ->whereIn('payroll_id', $payrolls->pluck('id'))
            ->selectRaw('SUM(amount + COALESCE(tax_amount, 0)) as total')
            ->value('total') ?? 0;
        $totalFunding = $initialFunding - $completedFunding;

        Log::info('Payroll report data', [
            'month' => $month,
            'payrolls_count' => $payrolls->count(),
            'available_months' => $availableMonths,
            'total_funding' => $totalFunding,
            'completed_funding' => $completedFunding,
            'user_id' => auth()->id(), // Log user ID to check for restrictions
        ]);

        return Inertia::render('Report/Index', [
            'payrolls' => $payrolls,
            'selectedMonth' => $month,
            'availableMonths' => array_values(array_unique($availableMonths)), // Ensure unique months
            'totalFunding' => $totalFunding,
        ]);
    }





    public function export(string $month, string $format = 'excel')
    {
        $payrolls = Payroll::where('month', $month)->with('employee')->get();

        if ($payrolls->isEmpty()) {
            return response()->json(['error' => 'No payroll data found for the specified month'], 404);
        }

        if ($format === 'pdf') {
            $pdf = Pdf::loadView('payroll.pdf', ['payrolls' => $payrolls]);
            return $pdf->download("payroll-$month.pdf");
        }

        return Excel::download(new class($payrolls) implements \Maatwebsite\Excel\Concerns\FromCollection, \Maatwebsite\Excel\Concerns\WithHeadings {
            private $payrolls;

            public function __construct($payrolls)
            {
                $this->payrolls = $payrolls;
            }

            public function collection()
            {
                return $this->payrolls->map(function ($payroll) {
                    return [
                        'Employee' => $payroll->employee->name,
                        'Month' => $payroll->month,
                        'Working Days' => $payroll->working_days,
                        'Earned Salary' => $payroll->earned_salary,
                        'Position Allowance' => $payroll->position_allowance,
                        'Transport Allowance' => $payroll->transport_allowance,
                        'Taxable Income' => $payroll->taxable_income,
                        'Income Tax' => $payroll->income_tax,
                        'Employee Pension' => $payroll->employee_pension,
                        'Gross Pay' => $payroll->gross_pay,
                        'Total Deduction' => $payroll->total_deduction,
                        'Net Payment' => $payroll->net_payment,
                        
                    ];
                });
            }

            public function headings(): array
            {
                return [
                    'Employee',
                    'Month',
                    'Working Days',
                    'Earned Salary',
                    'Position Allowance',
                    'Transport Allowance',
                    'Taxable Income',
                    'Income Tax',
                    'Employee Pension',
                    'Gross Pay',
                    'Total Deduction',
                    'Net Payment',
                ];
            }
        }, "payroll-$month.xlsx");
    }
}
