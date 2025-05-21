<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'payroll_id',
        'company_account',
        'employee_account',
        'tax_authority_account',
        'amount',
        'type',
        'status',
        'retry_count',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'type' => 'string',
        'status' => 'string',
        'retry_count' => 'integer',
    ];

 
    public function payroll()
    {
        return $this->belongsTo(Payroll::class);
    }
}
