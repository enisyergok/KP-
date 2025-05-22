import React from 'react';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from '../components/tables/DataTable';
import Button from '../components/forms/Button';
import SelectField from '../components/forms/SelectField';
import FormGroup from '../components/forms/FormGroup';

const Reports: React.FC = () => {
  const [reportType, setReportType] = React.useState('daily');
  const [dateRange, setDateRange] = React.useState('last7days');

  const handleReportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value);
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
  };

  const handleExportExcel = () => {
    alert('Excel raporu indiriliyor...');
    // Excel export işlemi burada yapılabilir
  };

  const handleExportPdf = () => {
    alert('PDF raporu indiriliyor...');
    // PDF export işlemi burada yapılabilir
  };

  // Örnek tablo verileri
  const headers = ['Tarih', 'Vardiya', 'Makine', 'Operatör', 'Üretim', 'Hatalı', 'Verimlilik', 'Duruş (dk)'];
  const data = [
    ['20/05/2025', 'Sabah', 'Makine 1', 'Ahmet Yılmaz', 450, 12, '%97.3', 45],
    ['20/05/2025', 'Akşam', 'Makine 2', 'Mehmet Demir', 380, 8, '%97.9', 60],
    ['20/05/2025', 'Gece', 'Makine 3', 'Ali Kaya', 420, 15, '%96.4', 30],
    ['19/05/2025', 'Sabah', 'Makine 1', 'Ahmet Yılmaz', 460, 10, '%97.8', 35],
    ['19/05/2025', 'Akşam', 'Makine 2', 'Ayşe Öztürk', 390, 7, '%98.2', 25],
    ['19/05/2025', 'Gece', 'Makine 3', 'Ali Kaya', 410, 12, '%97.1', 40],
    ['18/05/2025', 'Sabah', 'Makine 1', 'Ahmet Yılmaz', 445, 9, '%98.0', 30],
    ['18/05/2025', 'Akşam', 'Makine 2', 'Mehmet Demir', 375, 11, '%97.1', 50],
    ['18/05/2025', 'Gece', 'Makine 3', 'Ayşe Öztürk', 430, 14, '%96.7', 35],
  ];

  const reportTypeOptions = [
    { value: 'daily', label: 'Günlük Rapor' },
    { value: 'weekly', label: 'Haftalık Rapor' },
    { value: 'monthly', label: 'Aylık Rapor' },
    { value: 'operator', label: 'Operatör Raporu' },
    { value: 'machine', label: 'Makine Raporu' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Bugün' },
    { value: 'yesterday', label: 'Dün' },
    { value: 'last7days', label: 'Son 7 Gün' },
    { value: 'last30days', label: 'Son 30 Gün' },
    { value: 'thisMonth', label: 'Bu Ay' },
    { value: 'lastMonth', label: 'Geçen Ay' },
    { value: 'custom', label: 'Özel Aralık' }
  ];

  return (
    <div className="content-card">
      <div className="content-card-header">
        <FontAwesomeIcon icon={faFileLines} />
        Raporlar
      </div>
      
      <div className="report-filters">
        <div className="filter-row">
          <FormGroup label="Rapor Türü" htmlFor="reportType">
            <SelectField
              id="reportType"
              value={reportType}
              onChange={handleReportTypeChange}
              options={reportTypeOptions}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Tarih Aralığı" htmlFor="dateRange">
            <SelectField
              id="dateRange"
              value={dateRange}
              onChange={handleDateRangeChange}
              options={dateRangeOptions}
              className="form-control"
            />
          </FormGroup>
          
          <div className="report-actions">
            <Button variant="info" onClick={handleExportExcel}>
              <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'file-excel' }} className="me-2" />
              Excel
            </Button>
            <Button variant="info" onClick={handleExportPdf}>
              <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'file-pdf' }} className="me-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>
      
      <div className="report-table-container">
        <DataTable
          headers={headers}
          data={data}
          sortable={true}
          onRowClick={(rowIndex) => console.log('Clicked row:', rowIndex)}
          className="report-data-table"
        />
      </div>
      
      <div className="report-summary">
        <div className="summary-item">
          <span className="summary-label">Toplam Üretim:</span>
          <span className="summary-value">3,760</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Toplam Hatalı:</span>
          <span className="summary-value">98</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Ortalama Verimlilik:</span>
          <span className="summary-value">%97.4</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Toplam Duruş:</span>
          <span className="summary-value">350 dk</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;
