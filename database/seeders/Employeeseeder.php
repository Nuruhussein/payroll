<?php

use Illuminate\Database\Seeder;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    public function run()
    {
        Employee::create([
            'name' => 'John Doe',
            'gender' => 'Male',
            'employment_type' => 'Full-time',
            'position' => 'CEO',
            'employment_date' => '2023-01-01',
            'basic_salary' => 10000.00,
            'bank_account_number' => 'ACC123456',
        ]);
        Employee::create([
            'name' => 'Jane Smith',
            'gender' => 'Female',
            'employment_type' => 'Full-time',
            'position' => 'Normal Employee',
            'employment_date' => '2024-03-15',
            'basic_salary' => 5000.00,
            'bank_account_number' => 'ACC789012',
        ]);
    }
}