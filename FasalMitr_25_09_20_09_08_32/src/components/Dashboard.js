import React, { useState, useEffect } from 'react';
import { useUser } from '../App';
import UploadCropPhoto from './UploadCropPhoto';
import SoilHealthCheck from './SoilHealthCheck';
import PlantHealthCheck from './PlantHealthCheck';
import WeatherInfo from './WeatherInfo';
import CropTrends from './CropTrends';
import GovernmentSchemes from './GovernmentSchemes';
import { useTranslation } from 'react-i18next';

const indianLanguagesByRegion = {
  // Basic mapping of Indian states to languages
  'IN-AN': 'en',
  'IN-AP': 'te',
  'IN-AR': 'en',
  'IN-AS': 'en',
  'IN-BR': 'hi',
  'IN-CH': 'en',
  'IN-CT': 'hi',
  'IN-DD': 'en',
  'IN-DL': 'hi',
  'IN-DN': 'en',
  'IN-GA': 'en',
  'IN-GJ': 'gu',
  'IN-HR': 'hi',
  'IN-HP': 'hi',
  'IN-JH': 'hi',
  'IN-KA': 'kn',
  'IN-KL': 'ml',
  'IN-LD': 'en',
  'IN-MP': 'hi',
  'IN-MH': 'mr',
  'IN-MN': 'en',
  'IN-ML': 'en',
  'IN-MZ': 'en',
  'IN-NL': 'en',
  'IN-OR': 'or',
  'IN-PB': 'pa',
  'IN-PY': 'en',
  'IN-RJ': 'hi',
  'IN-SK': 'en',
  'IN-TN': 'ta',
  'IN-TG': 'te',
  'IN-TR': 'en',
  'IN-UP': 'hi',
  'IN-UT': 'hi',
  'IN-WB': 'bn',
};

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const { user, logout, setUser } = useUser();
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [activeTab, setActiveTab] = useState('uploadPhoto');
  const [language, setLanguage] = useState(user?.language || i18n.language || 'en');

  useEffect(() => {
    // Try to get geolocation and region info for language detection
    if (!location) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setLocation({ latitude, longitude });
            fetchRegionFromCoords(latitude, longitude);
          },
          () => {
            // On active block or error, user might enter manually or stay default language
            // We set region to null then
            setRegion(null);
          }
        );
      }
    }
  }, [location]);

  const fetchRegionFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.address && data.address.state) {
        // Use state to detect language
        const state = data.address.state;
        setRegion(state);

        // Attempt to map state to a language
        // For demo, let's translate state string to code and fallback
        const normalizedState = state.toLowerCase();

        // mapping few common states
        const stateMap = {
          'maharashtra': 'mr',
          'tamil nadu': 'ta',
          'telangana': 'te',
          'andhra pradesh': 'te',
          'karnataka': 'kn',
          'gujarat': 'gu',
          'west bengal': 'bn',
          'bengal': 'bn',
          'uttar pradesh': 'hi',
          'haryana': 'hi',
          'delhi': 'hi',
          'rajasthan': 'hi',
          'punjab': 'pa',
          'kerala': 'en', // no malayalam translations provided for now, fallback English
          'bihar': 'hi',
          'odisha': 'or',
          'assam': 'en', // no assamese translations, fallback English
        };

        let langCode = 'en'; // fallback
        for (const stateName in stateMap) {
          if (normalizedState.includes(stateName)) {
            langCode = stateMap[stateName];
            break;
          }
        }
        if (langCode !== language) {
          setLanguage(langCode);
          i18n.changeLanguage(langCode);
          // Save preferred language to user context too
          setUser((prev) => (prev ? { ...prev, language: langCode } : prev));
        }
      }
    } catch {
      // ignore
    }
  };

  // Change language by user manually
  const onLanguageSwitch = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    setUser((prev) => (prev ? { ...prev, language: newLang } : prev));
  };

  return (
    <main className="container" aria-label="Dashboard main interface">
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <h1>{t('dashboard.welcome', { name: user.name })}</h1>
        <button onClick={logout}>{t('dashboard.logout')}</button>
      </header>

      <section>
        <label htmlFor="languageSwitcherSelect">{t('dashboard.language')}</label>{' '}
        <select
          id="languageSwitcherSelect"
          onChange={onLanguageSwitch}
          value={language}
          aria-label={t('languageSwitcher.selectLanguage')}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="ta">தமிழ்</option>
        </select>
      </section>

      <nav aria-label="Dashboard navigation">
        <div className="tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'uploadPhoto'}
            className={`tab ${activeTab === 'uploadPhoto' ? 'active' : ''}`}
            onClick={() => setActiveTab('uploadPhoto')}
            id="tab-uploadPhoto"
            aria-controls="tabpanel-uploadPhoto"
          >
            {t('dashboard.uploadPhoto')}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'soilHealth'}
            className={`tab ${activeTab === 'soilHealth' ? 'active' : ''}`}
            onClick={() => setActiveTab('soilHealth')}
            id="tab-soilHealth"
            aria-controls="tabpanel-soilHealth"
          >
            {t('dashboard.soilHealth')}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'plantHealth'}
            className={`tab ${activeTab === 'plantHealth' ? 'active' : ''}`}
            onClick={() => setActiveTab('plantHealth')}
            id="tab-plantHealth"
            aria-controls="tabpanel-plantHealth"
          >
            {t('dashboard.plantHealth')}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'weatherInfo'}
            className={`tab ${activeTab === 'weatherInfo' ? 'active' : ''}`}
            onClick={() => setActiveTab('weatherInfo')}
            id="tab-weatherInfo"
            aria-controls="tabpanel-weatherInfo"
          >
            {t('dashboard.weatherInfo')}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'cropTrends'}
            className={`tab ${activeTab === 'cropTrends' ? 'active' : ''}`}
            onClick={() => setActiveTab('cropTrends')}
            id="tab-cropTrends"
            aria-controls="tabpanel-cropTrends"
          >
            {t('dashboard.cropTrends')}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'governmentSchemes'}
            className={`tab ${activeTab === 'governmentSchemes' ? 'active' : ''}`}
            onClick={() => setActiveTab('governmentSchemes')}
            id="tab-governmentSchemes"
            aria-controls="tabpanel-governmentSchemes"
          >
            {t('dashboard.governmentSchemes')}
          </button>
        </div>
      </nav>

      <section
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === 'uploadPhoto' && <UploadCropPhoto user={user} />}
        {activeTab === 'soilHealth' && <SoilHealthCheck user={user} />}
        {activeTab === 'plantHealth' && <PlantHealthCheck user={user} />}
        {activeTab === 'weatherInfo' && <WeatherInfo location={location} setLocation={setLocation} />}
        {activeTab === 'cropTrends' && <CropTrends region={region} />}
        {activeTab === 'governmentSchemes' && <GovernmentSchemes region={region} />}
      </section>
    </main>
  );
}
