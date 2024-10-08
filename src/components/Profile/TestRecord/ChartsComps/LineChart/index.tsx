// components/LineChart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const data = {
        labels: ['5m', '10m', '15m', '20m', '25m'], // Time intervals
        datasets: [
            {
                label: 'Logical Reasoning',
                data: [10, 15, 12, 18, 20], // Example data
                borderColor: '#007bff',
                fill: false,
            },
            {
                label: 'Numerical Aptitude',
                data: [15, 10, 20, 18, 12],
                borderColor: '#28a745',
                fill: false,
            },
            {
                label: 'Verbal Ability',
                data: [8, 12, 10, 14, 18],
                borderColor: '#ffc107',
                fill: false,
            },
            {
                label: 'Abstract Reasoning',
                data: [12, 10, 18, 16, 14],
                borderColor: '#ff6347',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
