<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Response;

class ReportController extends Controller
{
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
