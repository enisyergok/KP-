import React from 'react';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartWidget from '../components/widgets/ChartWidget';
import MetricWidget from '../components/widgets/MetricWidget';
import StatusIndicator from '../components/widgets/StatusIndicator';
import PerformanceList from '../components/widgets/PerformanceList';
import TrendWidget from '../components/widgets/TrendWidget';
import ProgressWidget from '../components/widgets/ProgressWidget';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';

const Dashboard: React.FC = () => {
  // Örnek veri
  const productionData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    values: [65, 78, 80, 74, 85, 92],
    target: 80
  };

  const efficiencyData = {
    labels: ['Makine 1', 'Makine 2', 'Makine 3', 'Makine 4', 'Makine 5'],
    values: [85, 72, 90, 68, 78]
  };

  const downtimeData = {
    labels: ['Arıza', 'Bakım', 'Malzeme', 'Operatör', 'Diğer'],
    values: [35, 25, 15, 10, 15]
  };

  const topPerformers = [
    { name: 'Makine 3', value: '90%' },
    { name: 'Makine 1', value: '85%' },
    { name: 'Makine 5', value: '78%' },
    { name: 'Makine 2', value: '72%' },
    { name: 'Makine 4', value: '68%' }
  ];

  const downtimeReasons = [
    { name: 'Arıza', value: '35%' },
    { name: 'Bakım', value: '25%' },
    { name: 'Malzeme', value: '15%' },
    { name: 'Operatör', value: '10%' },
    { name: 'Diğer', value: '15%' }
  ];

  return (
    <div>
      <div className="content-card">
        <div className="content-card-header">
          <FontAwesomeIcon icon={faChartLine} />
          Dashboard
        </div>
        
        <div className="dashboard-layout-grid">
          <MetricWidget 
            title="Toplam Üretim" 
            value={12458} 
            trend={{ value: 8.5, isPositive: true }} 
          />
          
          <MetricWidget 
            title="OEE" 
            value="78%" 
            trend={{ value: 3.2, isPositive: true }} 
          />
          
          <MetricWidget 
            title="Duruş Süresi" 
            value="124" 
            suffix=" saat"
            trend={{ value: 12.5, isPositive: false }} 
          />
          
          <StatusIndicator 
            title="Üretim Durumu" 
            status="success" 
            statusText="Aktif" 
          />
          
          <TrendWidget 
            title="Verimlilik Trendi" 
            value="85%" 
            trend={{ value: 5.3, isPositive: true }} 
          />
          
          <ProgressWidget 
            title="Hedef Tamamlama" 
            value={8750} 
            maxValue={10000} 
            minLabel="0" 
            maxLabel="10,000" 
          />
        </div>
        
        <div className="dashboard-layout-grid" style={{ marginTop: '25px' }}>
          <ChartWidget title="Aylık Üretim Performansı" className="widget-large">
            <LineChart 
              data={productionData.values} 
              labels={productionData.labels} 
              targetValue={productionData.target}
              targetLabel="Hedef Üretim"
            />
          </ChartWidget>
          
          <ChartWidget title="Makine Verimliliği" className="widget-large">
            <BarChart 
              data={efficiencyData.values} 
              labels={efficiencyData.labels} 
            />
          </ChartWidget>
        </div>
        
        <div className="dashboard-layout-grid" style={{ marginTop: '25px' }}>
          <div className="dashboard-widget-card">
            <div className="content-card-header">
              <div className="header-title-group">
                <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'trophy' }} />
                <span>En İyi Performans</span>
              </div>
            </div>
            <PerformanceList 
              title="Makine Performansı" 
              items={topPerformers} 
            />
          </div>
          
          <div className="dashboard-widget-card">
            <div className="content-card-header">
              <div className="header-title-group">
                <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'clock' }} />
                <span>Duruş Nedenleri</span>
              </div>
            </div>
            <PerformanceList 
              title="Duruş Analizi" 
              items={downtimeReasons} 
            />
          </div>
          
          <ChartWidget title="Duruş Dağılımı">
            <PieChart 
              data={downtimeData.values} 
              labels={downtimeData.labels} 
              doughnut={true}
            />
          </ChartWidget>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
