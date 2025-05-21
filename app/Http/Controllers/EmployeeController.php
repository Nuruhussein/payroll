<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return inertia('employee/Index', ['employees' => $employees]);
    }

    public function create()
    {
        return inertia('employee/Create');
    }

    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|max:255',
            'gender' => 'required|in:Male,Female,Other',
            'employment_type' => 'required|in:Full-time,Part-time',
            'position' => 'required|in:CEO,COO,CIO,CISO,Director,Dept Lead,Normal Employee',
            'employment_date' => 'required|date',
            'basic_salary' => 'required|numeric|min:0',
            'bank_account_number' => 'required|string|unique:employees,bank_account_number',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $employee = Employee::create([
            'name' => request('name'),
            'gender' => request('gender'),
            'employment_type' => request('employment_type'),
            'position' => request('position'),
            'employment_date' => request('employment_date'),
            'basic_salary' => request('basic_salary'),
            'bank_account_number' => request('bank_account_number'),
        ]);

        return redirect()->route('employees.index')->with('success', 'Employee created successfully');
    }

    public function show(Employee $employee)
    {
        return inertia('employee/Show', ['employee' => $employee]);
    }

    public function edit(Employee $employee)
    {
        return inertia('employee/Edit', ['employee' => $employee]);
    }

    public function update(Employee $employee)
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'sometimes|string|max:255',
            'gender' => 'sometimes|in:Male,Female,Other',
            'employment_type' => 'sometimes|in:Full-time,Part-time',
            'position' => 'sometimes|in:CEO,COO,CIO,CISO,Director,Dept Lead,Normal Employee',
            'employment_date' => 'sometimes|date',
            'basic_salary' => 'sometimes|numeric|min:0',
            'bank_account_number' => 'sometimes|string|unique:employees,bank_account_number,' . $employee->id,
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $employee->update(request()->only([
            'name', 'gender', 'employment_type', 'position', 'employment_date', 'basic_salary', 'bank_account_number'
        ]));

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect()->route('employees.index')->with('success', 'Employee deleted successfully');
    }
}
