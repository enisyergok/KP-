import React from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from '../components/tables/DataTable';
import Button from '../components/forms/Button';
import Modal from '../components/modals/Modal';
import FormGroup from '../components/forms/FormGroup';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/SelectField';

const Operators: React.FC = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  
  const [formData, setFormData] = React.useState({
    name: '',
    position: 'operator',
    shift: 'morning',
    machine: '',
    status: 'active'
  });

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

  const handleAddOperator = () => {
    setFormData({
      name: '',
      position: 'operator',
      shift: 'morning',
      machine: '',
      status: 'active'
    });
    setShowAddModal(true);
  };

  const handleEditOperator = (index: number) => {
    // Gerçek uygulamada, seçilen operatörün verilerini getirme işlemi yapılır
    // Örnek olarak varsayılan değerler atanıyor
    setFormData({
      name: operatorsData[index][0],
      position: 'operator',
      shift: operatorsData[index][2],
      machine: operatorsData[index][3],
      status: operatorsData[index][4]
    });
    setShowEditModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Burada Firebase'e veri gönderme işlemi yapılabilir
    
    if (showAddModal) {
      alert('Operatör başarıyla eklendi!');
      setShowAddModal(false);
    } else if (showEditModal) {
      alert('Operatör bilgileri güncellendi!');
      setShowEditModal(false);
    }
  };

  // Örnek tablo verileri
  const headers = ['Ad Soyad', 'Pozisyon', 'Vardiya', 'Makine', 'Durum', 'Son Giriş', 'İşlemler'];
  const operatorsData = [
    ['Ahmet Yılmaz', 'Operatör', 'Sabah', 'Makine 1', 'Aktif', '20/05/2025 08:15', ''],
    ['Mehmet Demir', 'Operatör', 'Akşam', 'Makine 2', 'Aktif', '20/05/2025 16:05', ''],
    ['Ali Kaya', 'Operatör', 'Gece', 'Makine 3', 'Aktif', '20/05/2025 00:10', ''],
    ['Ayşe Öztürk', 'Operatör', 'Akşam', 'Makine 2', 'Aktif', '19/05/2025 16:08', ''],
    ['Fatma Şahin', 'Operatör', 'Sabah', 'Makine 4', 'İzinli', '18/05/2025 08:20', ''],
    ['Mustafa Yıldız', 'Teknisyen', 'Sabah', 'Tüm Makineler', 'Aktif', '20/05/2025 09:00', ''],
  ];

  // Tablo verilerine işlem butonları ekleme
  const dataWithActions = operatorsData.map((row, index) => {
    const actions = (
      <div className="table-actions">
        <button 
          className="edit-btn" 
          onClick={() => handleEditOperator(index)}
          title="Düzenle"
        >
          <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'edit' }} />
        </button>
        <button 
          className="delete-btn" 
          onClick={() => alert(`${row[0]} operatörünü silmek istediğinize emin misiniz?`)}
          title="Sil"
        >
          <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'trash' }} />
        </button>
      </div>
    );
    return [...row, actions];
  });

  const positionOptions = [
    { value: 'operator', label: 'Operatör' },
    { value: 'technician', label: 'Teknisyen' },
    { value: 'supervisor', label: 'Vardiya Amiri' }
  ];

  const shiftOptions = [
    { value: 'morning', label: 'Sabah (08:00-16:00)' },
    { value: 'evening', label: 'Akşam (16:00-24:00)' },
    { value: 'night', label: 'Gece (24:00-08:00)' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Aktif' },
    { value: 'onleave', label: 'İzinli' },
    { value: 'inactive', label: 'Pasif' }
  ];

  return (
    <div className="content-card">
      <div className="content-card-header">
        <FontAwesomeIcon icon={faUsers} />
        Operatörler
      </div>
      
      <div className="operators-actions">
        <Button variant="accent" onClick={handleAddOperator}>
          <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'plus' }} className="me-2" />
          Yeni Operatör
        </Button>
      </div>
      
      <div className="operators-table-container">
        <DataTable
          headers={headers}
          data={dataWithActions}
          sortable={true}
          className="operators-data-table"
        />
      </div>
      
      {/* Operatör Ekleme Modalı */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Yeni Operatör Ekle"
        size="medium"
      >
        <form onSubmit={handleSubmit} className="operator-form">
          <FormGroup label="Ad Soyad" htmlFor="name" required>
            <InputField
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Operatör adı soyadı"
              required
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Pozisyon" htmlFor="position">
            <SelectField
              id="position"
              value={formData.position}
              onChange={handleSelectChange}
              options={positionOptions}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Vardiya" htmlFor="shift">
            <SelectField
              id="shift"
              value={formData.shift}
              onChange={handleSelectChange}
              options={shiftOptions}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Makine" htmlFor="machine">
            <InputField
              id="machine"
              type="text"
              value={formData.machine}
              onChange={handleInputChange}
              placeholder="Makine adı/kodu"
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Durum" htmlFor="status">
            <SelectField
              id="status"
              value={formData.status}
              onChange={handleSelectChange}
              options={statusOptions}
              className="form-control"
            />
          </FormGroup>
          
          <div className="form-actions">
            <Button type="submit" variant="accent">
              Kaydet
            </Button>
            <Button type="button" variant="info" onClick={() => setShowAddModal(false)}>
              İptal
            </Button>
          </div>
        </form>
      </Modal>
      
      {/* Operatör Düzenleme Modalı */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Operatör Düzenle"
        size="medium"
      >
        <form onSubmit={handleSubmit} className="operator-form">
          <FormGroup label="Ad Soyad" htmlFor="name" required>
            <InputField
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Operatör adı soyadı"
              required
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Pozisyon" htmlFor="position">
            <SelectField
              id="position"
              value={formData.position}
              onChange={handleSelectChange}
              options={positionOptions}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Vardiya" htmlFor="shift">
            <SelectField
              id="shift"
              value={formData.shift}
              onChange={handleSelectChange}
              options={shiftOptions}
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Makine" htmlFor="machine">
            <InputField
              id="machine"
              type="text"
              value={formData.machine}
              onChange={handleInputChange}
              placeholder="Makine adı/kodu"
              className="form-control"
            />
          </FormGroup>
          
          <FormGroup label="Durum" htmlFor="status">
            <SelectField
              id="status"
              value={formData.status}
              onChange={handleSelectChange}
              options={statusOptions}
              className="form-control"
            />
          </FormGroup>
          
          <div className="form-actions">
            <Button type="submit" variant="accent">
              Güncelle
            </Button>
            <Button type="button" variant="info" onClick={() => setShowEditModal(false)}>
              İptal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Operators;
