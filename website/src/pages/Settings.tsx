import React from 'react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormGroup from '../components/forms/FormGroup';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';
import Button from '../components/forms/Button';

const Settings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = React.useState({
    companyName: 'Örnek Şirket A.Ş.',
    language: 'tr',
    theme: 'dark',
    dateFormat: 'DD/MM/YYYY'
  });

  const [notificationSettings, setNotificationSettings] = React.useState({
    emailNotifications: true,
    productionAlerts: true,
    downtimeAlerts: true,
    dailyReports: true,
    weeklyReports: true
  });

  const [backupSettings, setBackupSettings] = React.useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00'
  });

  const handleGeneralInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleGeneralSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleBackupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBackupSettings({
      ...backupSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBackupSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBackupSettings({
      ...backupSettings,
      [name]: value
    });
  };

  const handleSaveSettings = () => {
    console.log('Genel Ayarlar:', generalSettings);
    console.log('Bildirim Ayarları:', notificationSettings);
    console.log('Yedekleme Ayarları:', backupSettings);
    alert('Ayarlar başarıyla kaydedildi!');
  };

  const handleBackupNow = () => {
    alert('Manuel yedekleme başlatıldı. Bu işlem birkaç dakika sürebilir.');
    // Burada Firebase'e yedekleme işlemi yapılabilir
  };

  const handleRestoreBackup = () => {
    alert('Yedekten geri yükleme işlemi başlatıldı. Bu işlem birkaç dakika sürebilir.');
    // Burada Firebase'den geri yükleme işlemi yapılabilir
  };

  const languageOptions = [
    { value: 'tr', label: 'Türkçe' },
    { value: 'en', label: 'English' }
  ];

  const themeOptions = [
    { value: 'dark', label: 'Koyu Tema' },
    { value: 'light', label: 'Açık Tema' }
  ];

  const dateFormatOptions = [
    { value: 'DD/MM/YYYY', label: 'GG/AA/YYYY' },
    { value: 'MM/DD/YYYY', label: 'AA/GG/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-AA-GG' }
  ];

  const backupFrequencyOptions = [
    { value: 'daily', label: 'Günlük' },
    { value: 'weekly', label: 'Haftalık' },
    { value: 'monthly', label: 'Aylık' }
  ];

  return (
    <div className="content-card">
      <div className="content-card-header">
        <FontAwesomeIcon icon={faGear} />
        Ayarlar
      </div>
      
      <div className="settings-container">
        <div className="settings-section">
          <h3 className="settings-section-title">Genel Ayarlar</h3>
          
          <FormGroup label="Şirket Adı" htmlFor="companyName">
            <InputField
              id="companyName"
              type="text"
              value={generalSettings.companyName}
              onChange={handleGeneralInputChange}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Dil" htmlFor="language">
            <SelectField
              id="language"
              value={generalSettings.language}
              onChange={handleGeneralSelectChange}
              options={languageOptions}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Tema" htmlFor="theme">
            <SelectField
              id="theme"
              value={generalSettings.theme}
              onChange={handleGeneralSelectChange}
              options={themeOptions}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Tarih Formatı" htmlFor="dateFormat">
            <SelectField
              id="dateFormat"
              value={generalSettings.dateFormat}
              onChange={handleGeneralSelectChange}
              options={dateFormatOptions}
              className="form-control"
            />
          </FormGroup>
        </div>
        
        <div className="settings-section">
          <h3 className="settings-section-title">Bildirim Ayarları</h3>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
              />
              E-posta Bildirimleri
            </label>
          </div>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="productionAlerts"
                checked={notificationSettings.productionAlerts}
                onChange={handleNotificationChange}
              />
              Üretim Uyarıları
            </label>
          </div>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="downtimeAlerts"
                checked={notificationSettings.downtimeAlerts}
                onChange={handleNotificationChange}
              />
              Duruş Uyarıları
            </label>
          </div>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="dailyReports"
                checked={notificationSettings.dailyReports}
                onChange={handleNotificationChange}
              />
              Günlük Rapor Gönderimi
            </label>
          </div>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="weeklyReports"
                checked={notificationSettings.weeklyReports}
                onChange={handleNotificationChange}
              />
              Haftalık Rapor Gönderimi
            </label>
          </div>
        </div>
        
        <div className="settings-section">
          <h3 className="settings-section-title">Yedekleme ve Geri Yükleme</h3>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoBackup"
                checked={backupSettings.autoBackup}
                onChange={handleBackupInputChange}
              />
              Otomatik Yedekleme
            </label>
          </div>
          
          <FormGroup label="Yedekleme Sıklığı" htmlFor="backupFrequency">
            <SelectField
              id="backupFrequency"
              value={backupSettings.backupFrequency}
              onChange={handleBackupSelectChange}
              options={backupFrequencyOptions}
              disabled={!backupSettings.autoBackup}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Yedekleme Saati" htmlFor="backupTime">
            <InputField
              id="backupTime"
              type="text"
              value={backupSettings.backupTime}
              onChange={handleBackupInputChange}
              placeholder="HH:MM"
              disabled={!backupSettings.autoBackup}
              className="form-control"
            />
          </FormGroup>
          
          <div className="backup-actions">
            <Button variant="info" onClick={handleBackupNow}>
              <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'download' }} className="me-2" />
              Şimdi Yedekle
            </Button>
            <Button variant="info" onClick={handleRestoreBackup}>
              <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'upload' }} className="me-2" />
              Yedekten Geri Yükle
            </Button>
          </div>
        </div>
      </div>
      
      <div className="settings-actions">
        <Button variant="accent" onClick={handleSaveSettings}>
          <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'save' }} className="me-2" />
          Ayarları Kaydet
        </Button>
      </div>
    </div>
  );
};

export default Settings;
