<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ReportController;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
    





Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('employees', \App\Http\Controllers\EmployeeController::class)->except(['create']);
    Route::get('/Payroll/create', [\App\Http\Controllers\PayrollController::class, 'create'])->name('Payroll.create');
    Route::get('/employee/create', [\App\Http\Controllers\EmployeeController::class, 'create'])->name('employees.create');
   Route::get('/Report/export/{month}/{format}', [ReportController::class, 'export'])->name('Report.export');
    Route::resource('Report', \App\Http\Controllers\ReportController::class)->except(['create','export']);
   


Route::get('/adminDashboard', [ReportController::class, 'dashboard'])->name('report.dashboard');
    Route::resource('Payroll', \App\Http\Controllers\PayrollController::class)->except(['create']);

 Route::get('/Transaction', [TransactionController::class, 'index'])->name('Transaction.index');
Route::put('/transactions/{transaction}/status', [\App\Http\Controllers\TransactionController::class, 'updateStatus'])->name('Transaction.updateStatus');

    Route::get('/Transaction/{payroll}', [TransactionController::class, 'show'])->name('Transaction.show');

    //  Route::post('/Transaction/{transaction}/status', [TransactionController::class, 'updateStatus'])->name('updateStatus');
});

require __DIR__.'/auth.php';
