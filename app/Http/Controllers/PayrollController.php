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
    
    public function create()
    {
        $employees = Employee::all();
        return inertia('Payroll/Create', ['employees' => $employees]);
    }
public function store()
{
    $validator = Validator::make(request()->all(), [
        'employee_id' => 'required|exists:employees,id',
        'working_days' => 'required|integer|min:0|max:30',
        'transport_allowance' => 'required|numeric|min:0',
        'other_commission' => 'nullable|numeric|min:0',
        'position_allowance' => 'nullable|numeric|min:0',
    ]);

    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();
    }

    try {
        DB::beginTransaction();

        $employee = Employee::findOrFail(request('employee_id'));
        $workingDays = (int) request('working_days');
        $transportAllowance = (float) request('transport_allowance');
        $otherCommission = (float) (request('other_commission') ?? 0);
        $inputPositionAllowance = (float) (request('position_allowance') ?? 0);
        $earnedSalary = round($workingDays * ($employee->basic_salary / 30), 2);

        // Determine if entire transport allowance is taxable
        $taxableTransportAllowance = 0;
        if (strtolower($employee->position) === 'ceo') {
            if ($transportAllowance > 2220) {
                $taxableTransportAllowance = $transportAllowance;
            }
        } else {
            if ($transportAllowance > 600) {
                $taxableTransportAllowance = $transportAllowance;
            }
        }

        // Determine if entire position allowance is taxable
        $taxablePositionAllowance = 0;
        if (strtolower($employee->position) === 'ceo') {
            $threshold = $employee->basic_salary * 0.10;
            if ($inputPositionAllowance > $threshold) {
                $taxablePositionAllowance = $inputPositionAllowance;
            }
        } else {
            if ($inputPositionAllowance > 600) {
                $taxablePositionAllowance = $inputPositionAllowance;
            }
        }

        // Final taxable income
        $taxableIncome = $earnedSalary + $taxableTransportAllowance + $taxablePositionAllowance + $otherCommission;

        // Apply tax
        $incomeTax = round($this->calculateTaxedAllowance($taxableIncome), 2);

        // Pension
        $employeePension = $employee->employment_type === 'Full-time' ? round($employee->basic_salary * 0.07, 2) : 0;
        $employerPension = $employee->employment_type === 'Full-time' ? round($employee->basic_salary * 0.11, 2) : 0;

        // Gross & Net
        // $grossPay = $earnedSalary + $inputPositionAllowance + $transportAllowance + $otherCommission;
        $grossPay = $earnedSalary + $transportAllowance + $inputPositionAllowance + $otherCommission;
        $totalDeduction = $incomeTax + $employeePension;
        $netPayment = $grossPay - $totalDeduction;

        Payroll::create([
            'employee_id' => $employee->id,
            'month' => date('Y-m'),
            'working_days' => $workingDays,
            'earned_salary' => $earnedSalary,
            'position_allowance' => $inputPositionAllowance,
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
        ]);

        DB::commit();
        return redirect()->route('Payroll.index')->with('success', 'Payroll processed successfully');
    } catch (\Exception $e) {
        DB::rollBack();
        return redirect()->back()->with('error', $e->getMessage())->withInput();
    }
}

private function calculateTaxedAllowance($amount)
{
    if ($amount <= 600) {
        return $amount;
    } elseif ($amount <= 1650) {
        return ($amount * 0.10) - 60;
    } elseif ($amount <= 3200) {
        return ($amount * 0.15) - 142.5;
    } elseif ($amount <= 5250) {
        return ($amount * 0.20) - 302.5;
    } elseif ($amount <= 7800) {
        return ($amount * 0.25) - 565;
    } elseif ($amount <= 10900) {
        return ($amount * 0.30) - 955;
    } else {
        return ($amount * 0.35) - 1500;
    }
}



  
// public function store()
// {
//     $validator = Validator::make(request()->all(), [
//         'employee_id' => 'required|exists:employees,id',
//         'working_days' => 'required|integer|min:0|max:30',
//         'transport_allowance' => 'required|numeric|in:600,2220',
//         'other_commission' => 'nullable|numeric|min:0',
//         'position_allowance' => 'nullable|numeric|min:0',
//     ]);

//     if ($validator->fails()) {
//         return redirect()->back()->withErrors($validator)->withInput();
//     }

//     try {
//         DB::beginTransaction();

//         $employee = Employee::findOrFail(request('employee_id'));
//         $workingDays = (int) request('working_days');
//         $transportAllowance = (float) request('transport_allowance');
//         $otherCommission = (float) (request('other_commission') ?? 0);

//         $earnedSalary = round($workingDays * ($employee->basic_salary / 30), 2);

//         // Base position allowance is 10% of basic salary
//         $basePositionAllowance = round($employee->basic_salary * 0.10, 2);
//         $inputPositionAllowance = (float) (request('position_allowance') ?? 0);
//         $finalPositionAllowance = 0;
//         $taxablePositionAllowance = 0;

//         if (strtolower($employee->position) === 'ceo') {
//             if ($inputPositionAllowance <= $basePositionAllowance) {
//                 $finalPositionAllowance = $inputPositionAllowance;
//             } else {
//                 $taxableExcess = $inputPositionAllowance - $basePositionAllowance;
//                 $taxedAmount = $this->calculateTaxedAllowance($taxableExcess);
//                 $finalPositionAllowance = $inputPositionAllowance - $taxedAmount;
//                 $taxablePositionAllowance = $taxableExcess;
//             }
//         } else {
//             // Non-CEO: entire input position allowance is taxable
//             $finalPositionAllowance = $this->calculateTaxedAllowance($inputPositionAllowance);
//             $taxablePositionAllowance = $inputPositionAllowance;
//         }

//         $grossPay = $earnedSalary + $finalPositionAllowance + $transportAllowance + $otherCommission;
//         $taxableIncome = $earnedSalary + $taxablePositionAllowance + $otherCommission;
//         $incomeTax = round($taxableIncome * 0.01, 2);
//         $employeePension = $employee->employment_type === 'Full-time' ? round($employee->basic_salary * 0.07, 2) : 0;
//         $employerPension = $employee->employment_type === 'Full-time' ? round($employee->basic_salary * 0.11, 2) : 0;
//         $totalDeduction = $incomeTax + $employeePension;
//         $netPayment = $grossPay - $totalDeduction;

//         Payroll::create([
//             'employee_id' => $employee->id,
//             'month' => date('Y-m'),
//             'working_days' => $workingDays,
//             'earned_salary' => $earnedSalary,
//             'position_allowance' => $finalPositionAllowance,
//             'transport_allowance' => $transportAllowance,
//             'other_commission' => $otherCommission,
//             'taxable_income' => $taxableIncome,
//             'income_tax' => $incomeTax,
//             'employee_pension' => $employeePension,
//             'employer_pension' => $employerPension,
//             'gross_pay' => $grossPay,
//             'total_deduction' => $totalDeduction,
//             'net_payment' => $netPayment,
//             'prepared_by' => auth()->user()->name ?? 'Payroll Admin',
//         ]);

//         DB::commit();
//         return redirect()->route('Payroll.index')->with('success', 'Payroll processed successfully');
//     } catch (\Exception $e) {
//         DB::rollBack();
//         return redirect()->back()->with('error', $e->getMessage())->withInput();
//     }
// }


// private function calculateTaxedAllowance($amount)
// {
//     if ($amount <= 600) {
//         return $amount;
//     } elseif ($amount <= 1650) {
//         return ($amount * 0.10) - 60;
//     } elseif ($amount <= 3200) {
//         return ($amount * 0.15) - 142.5;
//     } elseif ($amount <= 5250) {
//         return ($amount * 0.20) - 302.5;
//     } elseif ($amount <= 7800) {
//         return ($amount * 0.25) - 565;
//     } elseif ($amount <= 10900) {
//         return ($amount * 0.30) - 955;
//     } else {
//         return ($amount * 0.35) - 1500;
//     }
// }


    public function show(Payroll $payroll)
    {
        $payroll->load('employee', 'transactions');
        return inertia('Payroll/Show', ['payroll' => $payroll]);
    }
}
