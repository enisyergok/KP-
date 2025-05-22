import React from 'react';
import { Bar } from 'react-chartjs-2';
import { barChartOptions, chartColors } from '../../lib/chartjs';

interface BarChartProps {
  title?: string;
  data: number[];
  labels: string[];
  color?: string;
  secondaryData?: number[];
  secondaryColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  labels,
  color = chartColors.purple,
  secondaryData,
  secondaryColor = chartColors.blue
}) => {
  const datasets = [
    {
      label: title || 'Veri',
      data,
      backgroundColor: color,
      borderColor: color.replace('1)', '1)'),
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: color.replace('1)', '0.8)')
    }
  ];

  if (secondaryData) {
    datasets.push({
      label: 'Karşılaştırma',
      data: secondaryData,
      backgroundColor: secondaryColor,
      borderColor: secondaryColor.replace('1)', '1)'),
      borderWidth: 1,
      borderRadius: 4,
      hoverBackgroundColor: secondaryColor.replace('1)', '0.8)')
    });
  }

  const chartData = {
    labels,
    datasets
  };

  return <Bar data={chartData} options={barChartOptions} />;
};

export default BarChart;
