import React from 'react';
import { Line } from 'react-chartjs-2';
import { lineChartOptions, chartColors, addTargetLine } from '../../lib/chartjs';

interface LineChartProps {
  title?: string;
  data: number[];
  labels: string[];
  targetValue?: number;
  targetLabel?: string;
  color?: string;
  fillArea?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  labels,
  targetValue,
  targetLabel = 'Hedef',
  color = chartColors.purple,
  fillArea = true
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title || 'Veri',
        data,
        borderColor: color,
        backgroundColor: fillArea ? `${color.replace('1)', '0.1)')}` : 'transparent',
        fill: fillArea,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color
      }
    ]
  };

  const options = {
    ...lineChartOptions,
    plugins: {
      ...lineChartOptions.plugins,
      annotation: targetValue ? {
        annotations: {
          targetLine: addTargetLine(targetValue, targetLabel, chartColors.red)
        }
      } : {}
    }
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
