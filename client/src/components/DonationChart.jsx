import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonationChart = ({ donations }) => {
  const data = {
    labels: ['Donations', 'Remaining to Gold'],
    datasets: [
      {
        data: [donations, Math.max(0, 1000 - donations)],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="chart-container">
      <h3>Progress to Gold Reward ($1000)</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonationChart;