import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface PaymentStatusChartProps {
    data: number[];
}

const PaymentStatusChart: React.FC<PaymentStatusChartProps> = ({ data }) => {
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
                    type: 'doughnut',
                    data: {
                        labels: ['Al día', 'Parcial', 'Vencido'],
                        datasets: [
                            {
                                label: 'Estado de Pagos',
                                data: data,
                                backgroundColor: [
                                    '#22c55e', // green-500
                                    '#f59e0b', // amber-500
                                    '#ef4444', // red-500
                                ],
                                borderColor: '#ffffff',
                                borderWidth: 4,
                                hoverOffset: 8,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '70%',
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    usePointStyle: true,
                                    boxWidth: 8,
                                    padding: 20,
                                }
                            },
                        },
                    },
                });
            }
        }
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef}></canvas>;
};

export default PaymentStatusChart;