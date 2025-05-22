<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {


                  $table->string('preparedd_by')->nullable();
           $table->string('approved_by')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
                  $table->dropColumn('preparedd_by');
           $table->dropColumn('approved_by');
        });
    }
};