import React from 'react';
import { Pie } from 'react-chartjs-2';
import { pieChartOptions, chartColors } from '../../lib/chartjs';

interface PieChartProps {
  title?: string;
  data: number[];
  labels: string[];
  colors?: string[];
  doughnut?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  labels,
  colors = [
    chartColors.purple,
    chartColors.blue,
    chartColors.green,
    chartColors.orange,
    chartColors.red
  ],
  doughnut = false
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title || 'Veri',
        data,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('1)', '1)')),
        borderWidth: 1,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    ...pieChartOptions,
    cutout: doughnut ? '70%' : '0%'
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
