import React from 'react';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormGroup from '../components/forms/FormGroup';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import Button from '../components/forms/Button';
import { saveKpiDataToFirebase } from '../firebase';

const DataEntry: React.FC = () => {
  const [formData, setFormData] = React.useState({
    date: '',
    timeStart: '08:00',
    timeEnd: '16:00',
    operator: '',
    machine: '',
    productionCount: '',
    defectCount: '',
    downtime: '',
    downtimeReason: 'maintenance'
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      console.log('Form data submitted:', formData);
      // Firebase'e veri gönderme işlemi
      const docId = await saveKpiDataToFirebase(formData);
      console.log('Saved document ID:', docId);
      
      setSubmitStatus({
        type: 'success',
        message: 'Veri başarıyla kaydedildi!'
      });
      
      // Formu sıfırla
      setFormData({
        date: '',
        timeStart: '08:00',
        timeEnd: '16:00',
        operator: '',
        machine: '',
        productionCount: '',
        defectCount: '',
        downtime: '',
        downtimeReason: 'maintenance'
      });
    } catch (error) {
      console.error('Error saving data:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Veri kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeOptions = [
    { value: '00:00', label: '00:00' },
    { value: '01:00', label: '01:00' },
    { value: '02:00', label: '02:00' },
    { value: '03:00', label: '03:00' },
    { value: '04:00', label: '04:00' },
    { value: '05:00', label: '05:00' },
    { value: '06:00', label: '06:00' },
    { value: '07:00', label: '07:00' },
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
    { value: '13:00', label: '13:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
    { value: '18:00', label: '18:00' },
    { value: '19:00', label: '19:00' },
    { value: '20:00', label: '20:00' },
    { value: '21:00', label: '21:00' },
    { value: '22:00', label: '22:00' },
    { value: '23:00', label: '23:00' }
  ];

  const downtimeReasonOptions = [
    { value: 'maintenance', label: 'Planlı Bakım' },
    { value: 'breakdown', label: 'Arıza' },
    { value: 'setup', label: 'Kurulum/Ayar' },
    { value: 'material', label: 'Malzeme Beklemesi' },
    { value: 'operator', label: 'Operatör Kaynaklı' },
    { value: 'other', label: 'Diğer' }
  ];

  return (
    <div className="content-card">
      <div className="content-card-header">
        <FontAwesomeIcon icon={faKeyboard} />
        Veri Girişi
      </div>
      
      {submitStatus.type && (
        <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="data-entry-form">
        <div className="form-row">
          <FormGroup label="Tarih" htmlFor="date" required>
            <InputField
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </FormGroup>
        </div>
        
        <div className="form-row">
          <FormGroup label="Başlangıç Saati" htmlFor="timeStart" required>
            <SelectField
              id="timeStart"
              name="timeStart"
              value={formData.timeStart}
              onChange={handleSelectChange}
              options={timeOptions}
              required
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Bitiş Saati" htmlFor="timeEnd" required>
            <SelectField
              id="timeEnd"
              name="timeEnd"
              value={formData.timeEnd}
              onChange={handleSelectChange}
              options={timeOptions}
              required
              className="form-control"
            />
          </FormGroup>
        </div>
        
        <div className="form-row">
          <FormGroup label="Operatör" htmlFor="operator" required>
            <InputField
              id="operator"
              name="operator"
              type="text"
              value={formData.operator}
              onChange={handleInputChange}
              placeholder="Operatör adı"
              required
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Makine" htmlFor="machine" required>
            <InputField
              id="machine"
              name="machine"
              type="text"
              value={formData.machine}
              onChange={handleInputChange}
              placeholder="Makine adı/kodu"
              required
              className="form-control"
            />
          </FormGroup>
        </div>
        
        <div className="form-row">
          <FormGroup label="Üretim Adedi" htmlFor="productionCount" required>
            <InputField
              id="productionCount"
              name="productionCount"
              type="number"
              value={formData.productionCount}
              onChange={handleInputChange}
              placeholder="Üretilen parça sayısı"
              required
              min={0}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Hatalı Ürün" htmlFor="defectCount">
            <InputField
              id="defectCount"
              name="defectCount"
              type="number"
              value={formData.defectCount}
              onChange={handleInputChange}
              placeholder="Hatalı parça sayısı"
              min={0}
              className="form-control"
            />
          </FormGroup>
        </div>
        
        <div className="form-row">
          <FormGroup label="Duruş Süresi (dk)" htmlFor="downtime">
            <InputField
              id="downtime"
              name="downtime"
              type="number"
              value={formData.downtime}
              onChange={handleInputChange}
              placeholder="Duruş süresi (dakika)"
              min={0}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Duruş Nedeni" htmlFor="downtimeReason">
            <SelectField
              id="downtimeReason"
              name="downtimeReason"
              value={formData.downtimeReason}
              onChange={handleSelectChange}
              options={downtimeReasonOptions}
              className="form-control"
            />
          </FormGroup>
        </div>
        
        <div className="form-actions">
          <Button type="submit" variant="accent" disabled={isSubmitting}>
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
          <Button 
            type="button" 
            variant="info" 
            onClick={() => {
              setFormData({
                date: '',
                timeStart: '08:00',
                timeEnd: '16:00',
                operator: '',
                machine: '',
                productionCount: '',
                defectCount: '',
                downtime: '',
                downtimeReason: 'maintenance'
              });
              setSubmitStatus({ type: null, message: '' });
            }}
          >
            Temizle
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DataEntry;
