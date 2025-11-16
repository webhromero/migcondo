import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const IncomeExpenseChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                 if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                        datasets: [
                            {
                                label: 'Ingresos',
                                data: [42000, 45000, 48000, 46000, 50000, 52000],
                                borderColor: '#16a34a', // green-600
                                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                tension: 0.4,
                                fill: true,
                            },
                            {
                                label: 'Gastos',
                                data: [35000, 33000, 36000, 34000, 32000, 33000],
                                borderColor: '#dc2626', // red-600
                                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                tension: 0.4,
                                fill: true,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                align: 'end',
                                labels: {
                                    usePointStyle: true,
                                    boxWidth: 8,
                                }
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return (Number(value) / 1000) + 'k';
                                    }
                                }
                            },
                             x: {
                                grid: {
                                    display: false,
                                }
                            }
                        }
                    },
                });
            }
        }
        return () => {
             if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef}></canvas>;
};

export default IncomeExpenseChart;
