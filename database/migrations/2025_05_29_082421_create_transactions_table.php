<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payroll_id')->constrained()->onDelete('cascade');
            $table->string('company_account');
            $table->string('employee_account');
            $table->string('tax_authority_account')->nullable();
            $table->decimal('amount', 10, 2);
            $table->enum('type', ['salary', 'tax']); // Salary payment or tax transfer
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->integer('retry_count')->default(0);
            $table->timestamps();

            $table->index('payroll_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}