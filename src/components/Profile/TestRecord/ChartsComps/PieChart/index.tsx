// components/PieChart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['Correct Answer', 'Incorrect Answer', 'Unanswered'],
        datasets: [
            {
                data: [40, 30, 30], // Example data
                backgroundColor: ['#28a745', '#ff6347', '#ffc107'],
            },
        ],
    };

    return <Pie data={data} />;
};

export default PieChart;
