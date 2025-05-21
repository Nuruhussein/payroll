<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Payroll;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PayrollController extends Controller
{
    public function index()
    {
        $payrolls = Payroll::with('employee')->get();
        return inertia('Payroll/Index', ['payrolls' => $payrolls]);
    }

    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'employee_id' => 'required|exists:employees,id',
            'working_days' => 'required|integer|min:0|max:30',
            'transport_allowance' => 'required|numeric|in:600,2220',
            'other_commission' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try {
            DB::beginTransaction();

            $employee = Employee::findOrFail(request('employee_id'));
            $workingDays = request('working_days');
            $transportAllowance = request('transport_allowance');
            $otherCommission = request('other_commission') ?? 0;

            $earnedSalary = round($workingDays * ($employee->basic_salary / 30), 2);
            $positionAllowance = $employee->basic_salary * 0.10;
            $taxablePositionAllowance = $employee->position === 'CEO' ? 0 : $positionAllowance;
            $grossPay = $earnedSalary + $positionAllowance + $transportAllowance + $otherCommission;
            $taxableIncome = $earnedSalary + $taxablePositionAllowance + $otherCommission;
            $incomeTax = round($taxableIncome * 0.01, 2);
            $employeePension = $employee->employment_type === 'Full-time' ? $employee->basic_salary * 0.07 : 0;
            $employerPension = $employee->employment_type === 'Full-time' ? $employee->basic_salary * 0.11 : 0;
            $totalDeduction = $incomeTax + $employeePension;
            $netPayment = $grossPay - $totalDeduction;

            $payroll = Payroll::create([
                'employee_id' => $employee->id,
                'month' => date('Y-m', strtotime('03:10 PM EAT')) . '-05',
                'working_days' => $workingDays,
                'earned_salary' => $earnedSalary,
                'position_allowance' => $positionAllowance,
                'transport_allowance' => $transportAllowance,
                'other_commission' => $otherCommission,
                'taxable_income' => $taxableIncome,
                'income_tax' => $incomeTax,
                'employee_pension' => $employeePension,
                'employer_pension' => $employerPension,
                'gross_pay' => $grossPay,
                'total_deduction' => $totalDeduction,
                'net_payment' => $netPayment,
                'prepared_by' => auth()->user()->name ?? 'Payroll Admin',
                'created_at' => date('Y-m-d H:i:s', strtotime('03:10 PM EAT')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('03:10 PM EAT')),
            ]);

            Transaction::create([
                'payroll_id' => $payroll->id,
                'company_account' => 'COMPANY_ACC_001',
                'employee_account' => $employee->bank_account_number,
                'amount' => $payroll->net_payment,
                'type' => 'salary',
                'status' => 'pending',
                'retry_count' => 0,
                'created_at' => date('Y-m-d H:i:s', strtotime('03:10 PM EAT')),
                'updated_at' => date('Y-m-d H:i:s', strtotime('03:10 PM EAT')),
            ]);

            if ($payroll->income_tax > 0) {
                Transaction::create([
                    'payroll_id' => $payroll->id,
                    'company_account' => 'COMPANY_ACC_001',
                    'tax_authority_account' => 'TAX_AUTH_001',
                    'amount' => $payroll->income_tax,
                    'type' => 'tax',
                    'status' => 'pending',
                    'retry_count' => 0,
                    'created_at' => date('Y-m-d H:i:s', strtotime('03:10 PM EAT')),
                    'updated_at' => date('Y-m-d H:i:s', strtotime('03:10 PM EAT')),
                ]);
            }

            DB::commit();
            return redirect()->route('payroll.index')->with('success', 'Payroll processed successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage())->withInput();
        }
    }

    public function show(Payroll $payroll)
    {
        $payroll->load('employee', 'transactions');
        return inertia('Payroll/Show', ['payroll' => $payroll]);
    }
}
