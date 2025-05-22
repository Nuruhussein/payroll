import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PayrollChart({ payrolls, availableMonths }) {
    const format = (num) =>
        Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Calculate total net payment per month
    const monthlyTotals = availableMonths.map((month) => {
        const monthPayrolls = payrolls.filter((p) => p.month === month);
        const total = monthPayrolls.reduce((sum, p) => sum + Number(p.net_payment), 0);
        return total;
    });

    // Chart data
    const data = {
        labels: availableMonths.map((month) =>
            new Date(month + '-01').toLocaleString('default', { month: 'short', year: 'numeric' })
        ),
        datasets: [
            {
                label: 'Total Net Payment ($)',
                data: monthlyTotals,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 12,
                    },
                    color: '#374151',
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: $${format(context.raw)}`,
                },
            },
            title: {
                display: true,
                text: 'Total Net Payment by Month',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#111827',
                padding: {
                    bottom: 20,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#374151',
                },
            },
            y: {
                grid: {
                    color: '#e5e7eb',
                },
                ticks: {
                    color: '#374151',
                    callback: (value) => `$${format(value)}`,
                },
                title: {
                    display: true,
                    text: 'Amount ($)',
                    color: '#374151',
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    console.log('PayrollChart.jsx data:', { payrolls, availableMonths, monthlyTotals });

    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-6">
            <div className="relative w-full" style={{ height: '400px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}