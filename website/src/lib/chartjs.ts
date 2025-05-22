// Chart.js entegrasyonu
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  ChartOptions
} from 'chart.js';

// Chart.js bileşenlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Ortak grafik stilleri
export const chartColors = {
  purple: 'rgba(163, 112, 247, 1)',
  purpleLight: 'rgba(200, 162, 249, 1)',
  purpleDark: 'rgba(142, 99, 201, 1)',
  purpleTransparent: 'rgba(163, 112, 247, 0.2)',
  red: 'rgba(231, 76, 60, 1)',
  redTransparent: 'rgba(231, 76, 60, 0.2)',
  green: 'rgba(39, 174, 96, 1)',
  greenTransparent: 'rgba(39, 174, 96, 0.2)',
  orange: 'rgba(243, 156, 18, 1)',
  orangeTransparent: 'rgba(243, 156, 18, 0.2)',
  blue: 'rgba(52, 152, 219, 1)',
  blueTransparent: 'rgba(52, 152, 219, 0.2)',
  gray: 'rgba(108, 117, 125, 1)',
  grayTransparent: 'rgba(108, 117, 125, 0.2)',
  gridColor: 'rgba(255, 255, 255, 0.05)'
};

// Ortak grafik seçenekleri
export const commonOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: 'easeOutQuart'
  },
  plugins: {
    legend: {
      labels: {
        color: 'rgba(233, 236, 239, 0.8)',
        font: {
          family: "'Inter', sans-serif",
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(44, 48, 57, 0.9)',
      titleColor: 'rgba(233, 236, 239, 1)',
      bodyColor: 'rgba(233, 236, 239, 0.8)',
      borderColor: 'rgba(73, 80, 87, 0.5)',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 6,
      titleFont: {
        family: "'Inter', sans-serif",
        size: 14,
        weight: 'bold'
      },
      bodyFont: {
        family: "'Inter', sans-serif",
        size: 13
      },
      displayColors: true,
      boxPadding: 3
    }
  },
  scales: {
    x: {
      grid: {
        color: chartColors.gridColor,
        // borderColor özelliği kaldırıldı
        // tickColor özelliği kaldırıldı
      },
      ticks: {
        color: 'rgba(173, 181, 189, 0.8)',
        font: {
          family: "'Inter', sans-serif",
          size: 11
        }
      }
    },
    y: {
      grid: {
        color: chartColors.gridColor,
        // borderColor özelliği kaldırıldı
        // tickColor özelliği kaldırıldı
      },
      ticks: {
        color: 'rgba(173, 181, 189, 0.8)',
        font: {
          family: "'Inter', sans-serif",
          size: 11
        }
      }
    }
  }
};

// Çizgi grafik için varsayılan seçenekler
export const lineChartOptions: ChartOptions<'line'> = {
  ...commonOptions,
  elements: {
    line: {
      tension: 0.3,
      borderWidth: 2,
      fill: 'start'
    },
    point: {
      radius: 3,
      hoverRadius: 5,
      borderWidth: 2
    }
  }
};

// Çubuk grafik için varsayılan seçenekler
export const barChartOptions: ChartOptions<'bar'> = {
  ...commonOptions as any,
  elements: {
    bar: {
      borderWidth: 1,
      borderRadius: 4
    }
  }
};

// Pasta grafik için varsayılan seçenekler
export const pieChartOptions: ChartOptions<'pie'> = {
  ...commonOptions as any,
  cutout: '0%',
  elements: {
    arc: {
      borderWidth: 1
    }
  }
};

// Hedef çizgisi ekleme fonksiyonu - Annotation plugin olmadan basit bir çizgi
export const addTargetLine = (value: number, label: string, color: string) => {
  // Annotation plugin kullanmadan basit bir çizgi oluşturma
  // Chart.js v4'te annotation plugin ayrı bir paket olduğundan
  // ve type sorunları yaşandığından, bu özellik şimdilik devre dışı bırakıldı
  return {
    id: 'targetLine',
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;
      const yAxis = chart.scales.y;
      const xAxis = chart.scales.x;
      
      // Hedef çizgisi çizme
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(xAxis.left, yAxis.getPixelForValue(value));
      ctx.lineTo(xAxis.right, yAxis.getPixelForValue(value));
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      
      // Etiket ekleme
      ctx.fillStyle = 'rgba(44, 48, 57, 0.8)';
      ctx.fillRect(xAxis.right - 60, yAxis.getPixelForValue(value) - 15, 60, 20);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = "11px 'Inter', sans-serif";
      ctx.fillText(label, xAxis.right - 30, yAxis.getPixelForValue(value));
      ctx.restore();
    }
  };
};

export default ChartJS;
