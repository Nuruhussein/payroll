import React from 'react';
import Dashboard from '../Dashboard';

export default function Index({ payrolls, selectedMonth, totalFunding, previousMonthPayrolls = [] }) {
  
    const format = (num) =>
        Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 });


    const totals = payrolls.reduce(
        (acc, p) => {
            acc.net_payment += Number(p.net_payment);
            acc.gross_pay += Number(p.gross_pay);
            acc.total_deduction += Number(p.total_deduction);
            return acc;
        },
        { net_payment: 0, gross_pay: 0, total_deduction: 0 }
    );

  
    const previousTotals = previousMonthPayrolls.reduce(
        (acc, p) => {
            acc.net_payment += Number(p.net_payment);
            acc.gross_pay += Number(p.gross_pay);
            acc.total_deduction += Number(p.total_deduction);
            return acc;
        },
        { net_payment: 0, gross_pay: 0, total_deduction: 0 }
    );

   
    const calculateChange = (current, previous) => {
        if (previous === 0) return 0; 
        return ((current - previous) / previous * 100).toFixed(1);
    };

 
    const cards = [
        {
            title: 'Total Net Payment',
            value: totals.net_payment,
            change: calculateChange(totals.net_payment, previousTotals.net_payment),
            unit: '$',
        },
        {
            title: 'Total Gross Pay',
            value: totals.gross_pay,
            change: calculateChange(totals.gross_pay, previousTotals.gross_pay),
            unit: '$',
        },
        {
            title: 'Total Deduction',
            value: totals.total_deduction,
            change: calculateChange(totals.total_deduction, previousTotals.total_deduction),
            unit: '$',
        },
    ];

    console.log('Index.jsx props:', { payrolls, selectedMonth, totalFunding, previousMonthPayrolls, totals, previousTotals });

    return (
        <Dashboard>
            <div className="max-w-7xl mx-auto ml-52 px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
                    {cards.map((card, index) => {
                        const isPositive = card.change >= 0;
                        const changeText = isPositive
                            ? `${Math.abs(card.change)}% increase`
                            : `${Math.abs(card.change)}% decrease`;
                        const changeColor = isPositive ? 'text-green-600' : 'text-red-600';

                        return (
                            <div
                                key={index}
                                className="p-6 rounded-xl bg-white shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>{card.title}</span>
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {card.unit}{format(card.value)}
                                    </div>
                                    <div className={`flex items-center space-x-1 text-sm font-medium ${changeColor}`}>
                                        <span>{changeText}</span>
                                        <svg
                                            className="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d={
                                                    isPositive
                                                        ? 'M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z'
                                                        : 'M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z'
                                                }
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Dashboard>
    );
}