<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $employees = Employee::all();

        return inertia('employee/Index', [
            'employees' => $employees,
        ]);

     

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('employee/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }

    // public function index()
    // {
    //     $staff = User::where('role', 'staff')->get();
    //     return view('staff.index', compact('staff'));
    // }

    // public function create()
    // {
    //     return view('staff.create');
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'password' => 'required|string|min:8|confirmed',
    //     ]);

    //     User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => bcrypt($request->password),
    //         'role' => 'staff', // Setting the role as 'staff'
    //     ]);

    //     return redirect()->route('staff.index')->with('success', 'Staff member added successfully.');
    // }

    // public function destroy(User $staff)
    // {
    //     $staff->delete();
    //     return redirect()->route('staff.index')->with('success', 'Staff member deleted successfully.');
    // }
}
