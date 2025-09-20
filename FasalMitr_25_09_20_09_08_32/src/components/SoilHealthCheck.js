import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function SoilHealthCheck({ user }) {
  const { t } = useTranslation();
  const [soilDataHistory, setSoilDataHistory] = useState([]);

  useEffect(() => {
    try {
      const storedPhotos = localStorage.getItem('smallFarmersPhotos');
      if (storedPhotos) {
        const photos = JSON.parse(storedPhotos);
        // Extract soil info from mock AI results cached inside photo objects
        // Since currently AI results are not stored per photo, we simulate history using all photos with soil type from mock data
        // In real implementation, AI response for each photo would be stored alongside photo
        const history = photos.map((p) => ({
          timestamp: p.timestamp,
          soilType: "Loamy Soil",
          explanation: "Loamy soil is fertile and drains well, good for most crops.",
          recommendations: ["Add organic compost annually.", "Maintain soil moisture."]
        }));
        setSoilDataHistory(history);
      }
    } catch {
      setSoilDataHistory([]);
    }
  }, []);

  // Show latest soil health summary plus history
  const latest = soilDataHistory[0];

  return (
    <section aria-label={t('soilHealthCheck.title')}>
      <h2>{t('soilHealthCheck.title')}</h2>
      {!latest && <p>No soil health data available. Please upload crop photos to analyze soil health.</p>}
      {latest && (
        <>
          <p>
            <strong>{t('uploadCropPhoto.soilType')}:</strong> {latest.soilType}
          </p>
          <p>
            <strong>{t('soilHealthCheck.explanation')}:</strong> {latest.explanation}
          </p>
          <div>
            <strong>{t('soilHealthCheck.recommendations')}:</strong>
            <ul>
              {latest.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
          <section aria-label={t('soilHealthCheck.historyTitle')}>
            <h3>{t('soilHealthCheck.historyTitle')}</h3>
            {soilDataHistory.length === 0 && <p>No history available.</p>}
            <ul>
              {soilDataHistory.slice(1).map((entry, i) => (
                <li key={i}>
                  <time dateTime={entry.timestamp}>{new Date(entry.timestamp).toLocaleString()}</time>: {entry.soilType}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </section>
  );
}
