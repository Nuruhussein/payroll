<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'gender',
        'employment_type',
        'position',
        'employment_date',
        'basic_salary',
        'bank_account_number',
    ];

    protected $casts = [
        'gender' => 'string',
        'employment_type' => 'string',
        'position' => 'string',
        'employment_date' => 'date',
        'basic_salary' => 'decimal:2',
    ];


    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }
}