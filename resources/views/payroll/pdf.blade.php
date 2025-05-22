<!DOCTYPE html>
<html>
<head>
    <title>Payroll Report</title>
    <style>
        @page { size: landscape; margin: 15mm; }
        body { font-family: Arial, sans-serif; font-size: 10px; margin: 0; }
        h1 { font-size: 14px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        th, td { border: 1px solid #ddd; padding: 4px; text-align: right; word-wrap: break-word; }
        th { background-color: #f2f2f2; font-size: 9px; }
        td { font-size: 9px; }
        .text-left { text-align: left; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        .text-green-700 { color: #15803d; }
        .lop {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            font-size: 10px;
        }
        .lop div { width: 45%; }
        .lop p { margin: 4px 0; }
        .lop .font-semibold { font-weight: bold; }
        tfoot tr { background-color: #f2f2f2; }
        /* Column widths */
        th:nth-child(1), td:nth-child(1) { width: 5%; } /* No. */
        th:nth-child(2), td:nth-child(2) { width: 15%; } /* Employee Name */
        th:nth-child(3), td:nth-child(3) { width: 7%; } /* Basic Salary */
        th:nth-child(4), td:nth-child(4) { width: 5%; } /* W/Days */
        th:nth-child(5), td:nth-child(5) { width: 7%; } /* Earned Salary */
        th:nth-child(6), td:nth-child(6) { width: 7%; } /* Position Allowance */
        th:nth-child(7), td:nth-child(7) { width: 7%; } /* Transport Allowance */
        th:nth-child(8), td:nth-child(8) { width: 5%; } /* Other */
        th:nth-child(9), td:nth-child(9) { width: 7%; } /* Gross Pay */
        th:nth-child(10), td:nth-child(10) { width: 7%; } /* Taxable Income */
        th:nth-child(11), td:nth-child(11) { width: 6%; } /* Income Tax */
        th:nth-child(12), td:nth-child(12) { width: 6%; } /* Pension (E) */
        th:nth-child(13), td:nth-child(13) { width: 6%; } /* Pension (ER) */
        th:nth-child(14), td:nth-child(14) { width: 6%; } /* Total Deduction */
        th:nth-child(15), td:nth-child(15) { width: 7%; } /* Net Payment */
    </style>
</head>
<body>
    <h1>Payroll Report for {{ $payrolls->first()->month ?? 'Selected Month' }}</h1>
    <table>
        <thead>
            <tr>
                <th class="text-left">No.</th>
                <th class="text-left">Employee Name</th>
                <th>Basic Salary</th>
                <th class="text-center">W/Days</th>
                <th>Earned Salary</th>
                <th>Position Allowance</th>
                <th>Transport Allowance</th>
                <th>Other</th>
                <th>Gross Pay</th>
                <th>Taxable Income</th>
                <th>Income Tax</th>
                <th>Pension (E)</th>
                <th>Pension (ER)</th>
                <th>Total Deduction</th>
                <th>Net Payment</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($payrolls as $p)
                <tr>
                    <td class="text-left">{{ $loop->iteration }}</td>
                    <td class="text-left">{{ $p->employee->name ?? '' }}</td>
                    <td>{{ number_format($p->employee->basic_salary ?? 0, 2) }}</td>
                    <td class="text-center">{{ $p->working_days }}</td>
                    <td>{{ number_format($p->earned_salary, 2) }}</td>
                    <td>{{ number_format($p->position_allowance, 2) }}</td>
                    <td>{{ number_format($p->transport_allowance, 2) }}</td>
                    <td>{{ number_format($p->other_commission, 2) }}</td>
                    <td>{{ number_format($p->gross_pay, 2) }}</td>
                    <td>{{ number_format($p->taxable_income, 2) }}</td>
                    <td>{{ number_format($p->income_tax, 2) }}</td>
                    <td>{{ number_format($p->employee_pension, 2) }}</td>
                    <td>{{ number_format($p->employer_pension, 2) }}</td>
                    <td>{{ number_format($p->total_deduction, 2) }}</td>
                    <td class="font-bold text-green-700">{{ number_format($p->net_payment, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" class="text-right font-bold">Total</td>
                <td class="font-bold">{{ number_format($payrolls->sum('earned_salary'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('position_allowance'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('transport_allowance'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('other_commission'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('gross_pay'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('taxable_income'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('income_tax'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('employee_pension'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('employer_pension'), 2) }}</td>
                <td class="font-bold">{{ number_format($payrolls->sum('total_deduction'), 2) }}</td>
                <td class="font-bold text-green-700">{{ number_format($payrolls->sum('net_payment'), 2) }}</td>
            </tr>
        </tfoot>
    </table>
    <div class="lop">
        <div>
            <p class="font-semibold">Prepared by</p>
            <p class="mt-4">Name: {{ $payrolls->first()->prepared_by ?? 'Payroll Admin' }}</p>
            <p>Signature: ________________</p>
            <p>Date: _____________________</p>
        </div>
        <div>
            <p class="font-semibold">Approved by</p>
            <p class="mt-4">Name: {{ $payrolls->first()->approved_by ?? 'N/A' }}</p>
            <p>Signature: ________________</p>
            <p>Date: _____________________</p>
        </div>
    </div>
</body>
</html>