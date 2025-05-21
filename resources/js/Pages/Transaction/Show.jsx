import React from 'react';
import Dashboard from '../Dashboard';
// import { InertiaLink } from '@inertiajs/react';

export default function Show({ transactionDetails, transactions }) {
    console.log('Show.jsx props:', { transactionDetails, transactions });

    return (
        <Dashboard>
            <div className="max-w-6xl ml-80 px-4 md:px-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Transaction Details for {transactionDetails.withdrawal_date}</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        For <span className="text-blue-600 font-medium">{transactionDetails.month} payroll</span> with payday {transactionDetails.payday}
                    </p>
                </div>

                <div className="bg-white shadow-sm rounded-md p-6 mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">${transactionDetails.total_amount.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Withdrawal Date</p>
                        <p className="text-gray-900 mt-1">{transactionDetails.withdrawal_date}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Funding Account</p>
                        <p className="text-gray-900 mt-1">Company Account</p>
                    </div>
                    <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">{transactionDetails.status}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">Transactions</h2>
                    <div className="overflow-auto bg-white shadow-sm rounded-md">
                        {transactions.length === 0 ? (
                            <div className="p-6 text-center text-gray-600">
                                No transactions found for this payroll.
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100 text-sm text-gray-600 text-left">
                                    <tr>
                                        <th className="px-6 py-3">Recipient</th>
                                        <th className="px-6 py-3">Deposit Date</th>
                                        <th className="px-6 py-3">Amount</th>
                                        <th className="px-6 py-3">Tax Amount</th>
                                        <th className="px-6 py-3">Tax Authority</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-sm">
                                    {transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 text-blue-600 font-medium">{transaction.recipient}</td>
                                            <td className="px-6 py-4">{transaction.deposit_date}</td>
                                            <td className="px-6 py-4">${transaction.amount}</td>
                                            <td className="px-6 py-4">${transaction.tax_amount}</td>
                                            <td className="px-6 py-4">{transaction.tax_authority}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">{transaction.status}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="" className="text-blue-600 font-medium">Details</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {transactions.length > 0 && (
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                            <div>
                                Show:
                                <select className="ml-2 border border-gray-300 rounded px-2 py-1">
                                    <option>5</option>
                                </select>
                                per page
                            </div>
                            <div>
                                1–{transactions.length} of {transactions.length}
                                <button className="ml-2 text-gray-400" disabled>›</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Dashboard>
    );
}