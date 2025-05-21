<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payroll extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'month',
        'working_days',
        'earned_salary',
        'position_allowance',
        'transport_allowance',
        'other_commission',
        'taxable_income',
        'income_tax',
        'employee_pension',
        'employer_pension',
        'gross_pay',
        'total_deduction',
        'net_payment',
        'prepared_by',
        'approved_by',
    ];

    protected $casts = [
        'month' => 'string',
        'working_days' => 'integer',
        'earned_salary' => 'decimal:2',
        'position_allowance' => 'decimal:2',
        'transport_allowance' => 'decimal:2',
        'other_commission' => 'decimal:2',
        'taxable_income' => 'decimal:2',
        'income_tax' => 'decimal:2',
        'employee_pension' => 'decimal:2',
        'employer_pension' => 'decimal:2',
        'gross_pay' => 'decimal:2',
        'total_deduction' => 'decimal:2',
        'net_payment' => 'decimal:2',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }


    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}