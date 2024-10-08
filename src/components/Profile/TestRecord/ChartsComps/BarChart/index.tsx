// components/BarChart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Logical Reasoning', 'Numerical Aptitude', 'Verbal Ability', 'Abstract Reasoning'],
        datasets: [
            {
                label: 'Scores',
                data: [80, 60, 70, 50], // Example data
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#ff6347'],
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
