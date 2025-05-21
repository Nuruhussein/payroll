<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayrollsTable extends Migration
{
    public function up()
    {
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('month', 7); // Format: YYYY-MM
            $table->integer('working_days')->unsigned();
            $table->decimal('earned_salary', 10, 2);
            $table->decimal('position_allowance', 10, 2);
            $table->decimal('transport_allowance', 10, 2);
            $table->decimal('other_commission', 10, 2)->default(0);
            $table->decimal('taxable_income', 10, 2);
            $table->decimal('income_tax', 10, 2);
            $table->decimal('employee_pension', 10, 2)->default(0);
            $table->decimal('employer_pension', 10, 2)->default(0);
            $table->decimal('gross_pay', 10, 2);
            $table->decimal('total_deduction', 10, 2);
            $table->decimal('net_payment', 10, 2);
            $table->string('prepared_by')->nullable();
            $table->string('approved_by')->nullable();
            $table->timestamps();

            $table->index(['employee_id', 'month']); // For faster queries
            // $table->checkConstraint('working_days <= 30', 'chk_working_days'); // Enforce max 30 days
        });
    }

    public function down()
    {
        Schema::dropIfExists('payrolls');
    }
}