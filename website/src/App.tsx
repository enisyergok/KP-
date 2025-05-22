import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faKeyboard, faFileLines, faUsers, faGear, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { listenToAuthChanges } from './firebase';

// Sayfa bileşenleri
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import Reports from './pages/Reports';
import Operators from './pages/Operators';
import Settings from './pages/Settings';

function App() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('dashboard');

  React.useEffect(() => {
    // Firebase Authentication durumunu izleme
    const unsubscribe = listenToAuthChanges((user) => {
      if (user) {
        console.log("Kullanıcı oturum açtı: ", user.uid);
        // Kullanıcı oturum açtığında yapılacak işlemler
      } else {
        console.log("Kullanıcı oturumu kapalı");
        // Kullanıcı oturumu kapattığında yapılacak işlemler
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode');
  };

  return (
    <div className={`app-container ${darkMode ? '' : 'light-mode'}`}>
      <nav className="app-navbar">
        <a href="#" className="app-navbar-brand">
          <FontAwesomeIcon icon={faChartLine} className="brand-icon" />
          <span className="brand-title">KPI Analiz Sistemi</span>
        </a>
        
        <ul className="app-navbar-tabs">
          <li className="nav-tab-item">
            <a 
              href="#" 
              className={`nav-tab-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <FontAwesomeIcon icon={faChartLine} />
              Dashboard
            </a>
          </li>
          <li className="nav-tab-item">
            <a 
              href="#" 
              className={`nav-tab-link ${activeTab === 'kpi-entry' ? 'active' : ''}`}
              onClick={() => setActiveTab('kpi-entry')}
            >
              <FontAwesomeIcon icon={faKeyboard} />
              Veri Girişi
            </a>
          </li>
          <li className="nav-tab-item">
            <a 
              href="#" 
              className={`nav-tab-link ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <FontAwesomeIcon icon={faFileLines} />
              Raporlar
            </a>
          </li>
          <li className="nav-tab-item">
            <a 
              href="#" 
              className={`nav-tab-link ${activeTab === 'operators' ? 'active' : ''}`}
              onClick={() => setActiveTab('operators')}
            >
              <FontAwesomeIcon icon={faUsers} />
              Operatörler
            </a>
          </li>
          <li className="nav-tab-item">
            <a 
              href="#" 
              className={`nav-tab-link ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FontAwesomeIcon icon={faGear} />
              Ayarlar
            </a>
          </li>
        </ul>
        
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
      </nav>

      <main className="main-app-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'kpi-entry' && <DataEntry />}
        {activeTab === 'reports' && <Reports />}
        {activeTab === 'operators' && <Operators />}
        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default App;
