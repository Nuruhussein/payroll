import React from 'react';
import Dashboard from '../Dashboard';
import { usePage, useForm } from '@inertiajs/react';

export default function Index({ transactionDetails, transactions }) {
    const { flash, errors: serverErrors } = usePage().props;

    console.log('Transaction/Index.jsx props:', { transactionDetails, transactions, serverErrors });

    const forms = transactions.map((transaction) =>
        useForm({
            status: '', 
        })
    );

    const [transactionErrors, setTransactionErrors] = React.useState({});

    const handleStatusChange = (transactionId, index, event) => {
        event.preventDefault();
        const { data, put, processing, setData } = forms[index];

        console.log('handleStatusChange called', { transactionId, status: data.status, index });

        if (!data.status || data.status === '') {
            console.log('No status selected');
            setTransactionErrors((prev) => ({
                ...prev,
                [transactionId]: 'Please select a status.',
            }));
            return;
        }

        setTransactionErrors((prev) => ({ ...prev, [transactionId]: null }));

        console.log('Sending PUT request', { transactionId, status: data.status });

        put(route('Transaction.updateStatus', transactionId), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log('Request succeeded');
                setTransactionErrors((prev) => ({ ...prev, [transactionId]: null }));
                setData('status', '');
            },
            onError: (errors) => {
                console.error('Request failed', errors);
                setTransactionErrors((prev) => ({
                    ...prev,
                    [transactionId]: errors.status || 'Failed to update status.',
                }));
            },
            onFinish: () => {
                console.log('Request finished');
            },
        });
    };

    const getError = (transactionId) =>
        transactionErrors[transactionId] || serverErrors[`transactions.${transactionId}.status`];

    const capitalize = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <Dashboard>
            <div className="max-w-6xl ml-64 mx-auto px-4 md:px-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">All Transactions</h1>
                    <p className="text-sm text-gray-600 mt-1">Overview of all payroll transactions</p>
                </div>

                {flash?.success && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                        {flash.error}
                    </div>
                )}

                <div className="bg-white shadow-sm rounded-md p-6 mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Total Company Funding</p>
                        <p className="text-2xl font-bold text-gray-900">${transactionDetails.total_amount.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Latest Withdrawal Date</p>
                        <p className="text-gray-900 mt-1">{transactionDetails.withdrawal_date}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Funding Account</p>
                        <p className="text-gray-900 mt-1">Company Account</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">Transactions</h2>
                    <div className="overflow-auto bg-white shadow-sm rounded-md">
                        {transactions.length === 0 ? (
                            <div className="p-6 text-center text-gray-600">
                                No transactions found.
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
                                        <th className="px-6 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-sm">
                                    {transactions.map((transaction, index) => (
                                        <tr key={transaction.id}>
                                            <td className="px-6 py-4 text-blue-600 font-medium">{transaction.recipient}</td>
                                            <td className="px-6 py-4">{transaction.deposit_date}</td>
                                            <td className="px-6 py-4">${transaction.amount}</td>
                                            <td className="px-6 py-4">${transaction.tax_amount}</td>
                                            <td className="px-6 py-4">{transaction.tax_authority}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">{transaction.status}</span>
                                            </td>
                                            <td className="px-6 py-4 flex space-x-2">
                                                <form
                                                    onSubmit={(e) => handleStatusChange(transaction.id, index, e)}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <select
                                                        value={forms[index].data.status}
                                                        onChange={(e) => forms[index].setData('status', e.target.value)}
                                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                        disabled={forms[index].processing}
                                                    >
                                                        <option value="">Change Status</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="failed">Failed</option>
                                                    </select>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center px-4 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                                                        disabled={forms[index].processing}
                                                    >
                                                        Update
                                                    </button>
                                                </form>
                                                {getError(transaction.id) && (
                                                    <p className="text-red-600 text-sm">{getError(transaction.id)}</p>
                                                )}
                                                <a
                                                    href={route('Transaction.show', transaction.payroll_id)}
                                                    className="text-blue-600 font-medium"
                                                >
                                                    Details
                                                </a>
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