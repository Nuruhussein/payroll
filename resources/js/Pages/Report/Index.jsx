import React from 'react';
import Dashboard from '../Dashboard';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import PayrollChart from '@/Components/PayrollChart';

export default function ReportIndex({ payrolls, selectedMonth, availableMonths, totalFunding }) {
    const format = (num) =>
        Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 });

    // State for filters
    const [filters, setFilters] = React.useState({
        employeeName: '',
        minNetPayment: '',
        maxNetPayment: '',
        workingDays: '',
    });

    // State for filtered payrolls
    const [filteredPayrolls, setFilteredPayrolls] = React.useState(payrolls);

    // Update filtered payrolls when filters or payrolls change
    React.useEffect(() => {
        const filtered = payrolls.filter((p) => {
            const nameMatch = filters.employeeName
                ? (p.employee?.name || '').toLowerCase().includes(filters.employeeName.toLowerCase())
                : true;
            const minPaymentMatch = filters.minNetPayment
                ? Number(p.net_payment) >= Number(filters.minNetPayment)
                : true;
            const maxPaymentMatch = filters.maxNetPayment
                ? Number(p.net_payment) <= Number(filters.maxNetPayment)
                : true;
            const workingDaysMatch = filters.workingDays
                ? Number(p.working_days) === Number(filters.workingDays)
                : true;
            return nameMatch && minPaymentMatch && maxPaymentMatch && workingDaysMatch;
        });
        setFilteredPayrolls(filtered);
    }, [filters, payrolls]);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Clear filters
    const clearFilters = () => {
        setFilters({ employeeName: '', minNetPayment: '', maxNetPayment: '', workingDays: '' });
    };

    const handleMonthChange = (e) => {
        const month = e.target.value;
        router.get(route('Report.index'), { month }, { preserveState: true, replace: true });
    };

    const handleExport = (formatType) => {
        try {
            if (typeof window !== 'undefined' && window.Ziggy && window.Ziggy.routes) {
                console.log('Available Ziggy routes:', window.Ziggy.routes);
            }
            const url = route('Report.export', { month: selectedMonth, format: formatType });
            console.log('Generated export URL:', url);
            window.location.href = url;
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export report. Please ensure the export feature is available or contact support.');
        }
    };

    // Calculate totals for filtered payrolls
    const totals = filteredPayrolls.reduce(
        (acc, p) => {
            acc.earned_salary += Number(p.earned_salary);
            acc.position_allowance += Number(p.position_allowance);
            acc.transport_allowance += Number(p.transport_allowance);
            acc.other_commission += Number(p.other_commission);
            acc.gross_pay += Number(p.gross_pay);
            acc.taxable_income += Number(p.taxable_income);
            acc.income_tax += Number(p.income_tax);
            acc.employee_pension += Number(p.employee_pension);
            acc.employer_pension += Number(p.employer_pension);
            acc.total_deduction += Number(p.total_deduction);
            acc.net_payment += Number(p.net_payment);
            return acc;
        },
        {
            earned_salary: 0,
            position_allowance: 0,
            transport_allowance: 0,
            other_commission: 0,
            gross_pay: 0,
            taxable_income: 0,
            income_tax: 0,
            employee_pension: 0,
            employer_pension: 0,
            total_deduction: 0,
            net_payment: 0,
        }
    );

    console.log('Report/Index.jsx props:', { payrolls, selectedMonth, availableMonths, totalFunding, filters, filteredPayrolls, totals });

    return (
        <Dashboard>
            <div className="max-w-7xl ml-52 mt-4 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Monthly Payroll Report</h1>
                    <p className="text-sm text-gray-600 mt-1">Payroll details for the selected month</p>
                </div>

                {/* Month Selector and Export */}
                <div className="mb-6 flex items-center space-x-4">
                    <div>
                        <label htmlFor="month" className="block text-sm font-medium text-gray-700">
                            Select Month
                        </label>
                        <select
                            id="month"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                            {availableMonths.map((month) => (
                                <option key={month} value={month}>
                                    {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleExport('pdf')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                            disabled={!payrolls.length}
                        >
                            Export to PDF
                        </button>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mb-6 bg-white shadow-sm rounded-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Filter Payrolls</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                            <input
                                type="text"
                                name="employeeName"
                                value={filters.employeeName}
                                onChange={handleFilterChange}
                                placeholder="Enter employee name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Net Payment Range</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    name="minNetPayment"
                                    value={filters.minNetPayment}
                                    onChange={handleFilterChange}
                                    placeholder="Min"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                <input
                                    type="number"
                                    name="maxNetPayment"
                                    value={filters.maxNetPayment}
                                    onChange={handleFilterChange}
                                    placeholder="Max"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Working Days</label>
                            <input
                                type="number"
                                name="workingDays"
                                value={filters.workingDays}
                                onChange={handleFilterChange}
                                placeholder="Enter working days"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Total Funding */}
                <div className="mb-6">
                    <p className="text-sm text-gray-500">Total Company Funding</p>
                    <p className="text-2xl font-bold text-gray-900">${format(totalFunding)}</p>
                </div>

                {/* Payroll Table */}
                <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-md mb-6">
                    {filteredPayrolls.length === 0 ? (
                        <div className="p-6 text-center text-gray-600">
                            No payroll data found for{' '}
                            {new Date(selectedMonth + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}.
                        </div>
                    ) : (
                        <table className="min-w-[1200px] text-sm border border-gray-300">
                            <thead className="bg-gray-100 text-gray-700 text-xs">
                                <tr className="border-b border-gray-300">
                                    <th className="px-2 py-1 text-left">No.</th>
                                    <th className="px-2 py-1 text-left">Employee Name</th>
                                    <th className="px-2 py-1 text-center">Basic Salary</th>
                                    <th className="px-2 py-1 text-center">W/Days</th>
                                    <th className="px-2 py-1 text-center">Earned Salary</th>
                                    <th className="px-2 py-1 text-center">Position Allowance</th>
                                    <th className="px-2 py-1 text-center">Transport Allowance</th>
                                    <th className="px-2 py-1 text-center">Other</th>
                                    <th className="px-2 py-1 text-center">Gross Pay</th>
                                    <th className="px-2 py-1 text-center">Taxable Income</th>
                                    <th className="px-2 py-1 text-center">Income Tax</th>
                                    <th className="px-2 py-1 text-center">Pension (E)</th>
                                    <th className="px-2 py-1 text-center">Pension (ER)</th>
                                    <th className="px-2 py-1 text-center">Total Deduction</th>
                                    <th className="px-2 py-1 text-center">Net Payment</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {filteredPayrolls.map((p, i) => (
                                    <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-2 py-1">{i + 1}</td>
                                        <td className="px-2 py-1">{p.employee?.name || ''}</td>
                                        <td className="px-2 py-1 text-right">{format(p.employee?.basic_salary || 0)}</td>
                                        <td className="px-2 py-1 text-center">{p.working_days}</td>
                                        <td className="px-2 py-1 text-right">{format(p.earned_salary)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.position_allowance)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.transport_allowance)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.other_commission)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.gross_pay)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.taxable_income)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.income_tax)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.employee_pension)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.employer_pension)}</td>
                                        <td className="px-2 py-1 text-right">{format(p.total_deduction)}</td>
                                        <td className="px-2 py-1 text-right font-semibold text-green-700">
                                            {format(p.net_payment)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-100 font-semibold">
                                <tr className="border-t border-gray-300">
                                    <td colSpan={4} className="px-2 py-1 text-right">
                                        Total
                                    </td>
                                    <td className="px-2 py-1 text-right">{format(totals.earned_salary)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.position_allowance)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.transport_allowance)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.other_commission)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.gross_pay)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.taxable_income)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.income_tax)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.employee_pension)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.employer_pension)}</td>
                                    <td className="px-2 py-1 text-right">{format(totals.total_deduction)}</td>
                                    <td className="px-2 py-1 text-right text-green-700">{format(totals.net_payment)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    )}
                </div>

                {/* Payroll Chart */}
                <PayrollChart payrolls={payrolls} availableMonths={availableMonths} />
            </div>
        </Dashboard>
    );
}