<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->enum('employment_type', ['Full-time', 'Part-time']);
            $table->enum('position', ['CEO', 'COO', 'CIO', 'CISO', 'Director', 'Dept Lead', 'Normal Employee']);
            $table->date('employment_date');
            $table->decimal('basic_salary', 10, 2);
            $table->string('bank_account_number')->unique();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('employees');
    }
}