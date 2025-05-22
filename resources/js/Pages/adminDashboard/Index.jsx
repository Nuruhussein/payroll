import React from 'react';
import Dashboard from '../Dashboard';
import PayrollChart from '@/Components/PayrollChart';
import { Head } from '@inertiajs/react';

// Icon components
const NetPaymentIcon = () => (
    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3m-3-7v2m0 12v2m9-9h-2m-12 0H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
    </svg>
);
const GrossPayIcon = () => (
    <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v.01" />
    </svg>
);
const DeductionIcon = () => (
    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2z" />
    </svg>
);

export default function Index({ payrolls, selectedMonth, totalFunding, previousMonthPayrolls = [], availableMonths }) {
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
            icon: <NetPaymentIcon />,
        },
        {
            title: 'Total Gross Pay',
            value: totals.gross_pay,
            change: calculateChange(totals.gross_pay, previousTotals.gross_pay),
            unit: '$',
            icon: <GrossPayIcon />,
        },
        {
            title: 'Total Deduction',
            value: totals.total_deduction,
            change: calculateChange(totals.total_deduction, previousTotals.total_deduction),
            unit: '$',
            icon: <DeductionIcon />,
        },
    ];

    console.log('Index.jsx props:', { payrolls, selectedMonth, totalFunding, previousMonthPayrolls, totals, previousTotals });

    return (
        <Dashboard>
            <div className="max-w-7xl mx-auto ml-44 px-4 sm:px-6 lg:px-8 py-8">
                {/* Cards */}
                <div className="grid gap-4 md:grid-cols-3 lg:gap-6 mb-8">
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
                                        {card.icon}
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
                {/* Chart */}
                <PayrollChart payrolls={payrolls} availableMonths={availableMonths} />
            </div>
        </Dashboard>
    );
}


{/* 
             
<div class="p-5 pt-8 border ignore border-gray-200 not-prose dark:border-gray-800 relative bg-gray-50 dark:bg-gray-800">
    <div
        class="absolute w-auto rounded-b-lg border-b uppercase -translate-y-px tracking-wide leading-none border-l border-r border-gray-200 dark:border-gray-800 shadow-sm top-0 left-1/2 -translate-x-1/2 px-3 pt-1 pb-2 bg-white dark:bg-black text-gray-400 text-[0.65rem]">
        🤩 Our Amazing Sponsors 👇</div>
    <div class="max-w-5xl mx-auto">
        <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 sm:gap-5 not-prose">
            <a href="#" target="_blank"
                class="relative flex flex-col items-start justify-between p-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-black bg-white group">
                <span class="absolute w-full h-full bg-white dark:bg-black inset-0 dark:group-hover:bg-gray-900 group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>
                <div class="flex items-center justify-between w-full mb-4 ">
                    <img src="https://cdn.devdojo.com/sponsors/digital-ocean.svg" alt="DigitalOcean" class="relative h-5 md:h-6"/>
                    <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-2.5 text-[0.6rem] group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">
                        <span>View Website</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-3 translate-x-0.5 h-3">
                        <path fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd"></path>
                    </svg>
                    </span>
                </div>
                <span class="relative text-xs md:text-sm text-gray-600 dark:text-gray-400">DigitalOcean offers a simple and reliable cloud hosting solution that enables developers to get their website or application up and running quickly.</span>
            </a>
            <a href="#" target="_blank"
                class="relative flex flex-col items-start justify-between p-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 dark:bg-black bg-white group">
                <span class="absolute w-full h-full bg-white dark:bg-black inset-0 dark:group-hover:bg-gray-900 group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>
                <div class="flex items-center justify-between w-full mb-4 ">
                    <img src="https://cdn.devdojo.com/sponsors/larajobs.svg" alt="Larajobs" class="relative h-5 md:h-6"/>
                    <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-2.5 text-[0.6rem] group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">
                        <span>View Website</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-3 translate-x-0.5 h-3">
                        <path fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd"></path>
                    </svg>
                    </span>
                </div>
                <span class="relative text-xs md:text-sm text-gray-600 dark:text-gray-400">The official Laravel job board. Find the best and most talented Laravel developers by posting your job on the official Laravel job board.</span>
            </a>
           
        </div>
    </div>
</div> */}
