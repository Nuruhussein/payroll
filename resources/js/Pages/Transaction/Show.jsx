import React from 'react';
import Dashboard from '../Dashboard';
import { Link, usePage } from '@inertiajs/react';

export default function Show({ transactionDetails, transactions }) {
    const { flash } = usePage().props;

    console.log('Show.jsx props:', { transactionDetails, transactions });

    // Capitalize status for display
    const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <Dashboard>
            <div className="max-w-6xl mx-auto ml-60 px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Transaction Details for {transactionDetails.withdrawal_date}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        For <span className="font-medium text-blue-600">{transactionDetails.month} payroll</span>, payday {transactionDetails.payday}
                    </p>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        {flash.error}
                    </div>
                )}

                {/* Summary Card */}
                <div className="mb-8 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-2xl font-semibold text-gray-900">${transactionDetails.total_amount.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Withdrawal Date</p>
                            <p className="text-gray-900">{transactionDetails.withdrawal_date}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                {capitalize(transactionDetails.status)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Transactions</h2>
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                        {transactions.length === 0 ? (
                            <div className="p-6 text-center text-gray-600">
                                No transactions found for this payroll.
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deposit Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Authority</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 text-blue-600 font-medium">{transaction.recipient}</td>
                                            <td className="px-6 py-4 text-gray-600">{transaction.deposit_date}</td>
                                            <td className="px-6 py-4 text-gray-600">${transaction.amount}</td>
                                            <td className="px-6 py-4 text-gray-600">${transaction.tax_amount}</td>
                                            <td className="px-6 py-4 text-gray-600">{transaction.tax_authority}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                                    {capitalize(transaction.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={route('Transaction.index')}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Back to Transactions
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}