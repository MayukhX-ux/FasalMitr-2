import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function PlantHealthCheck({ user }) {
  const { t } = useTranslation();
  const [plantDataHistory, setPlantDataHistory] = useState([]);

  useEffect(() => {
    try {
      const storedPhotos = localStorage.getItem('smallFarmersPhotos');
      if (storedPhotos) {
        const photos = JSON.parse(storedPhotos);
        // Using mock AI data for plant health history
        const history = photos.map((p) => ({
          timestamp: p.timestamp,
          healthStatus: "Healthy",
          diseaseAlerts: [],
          treatment: [],
          preventiveTips: [
            "Maintain good spacing between plants.",
            "Inspect plants weekly for pests.",
            "Use balanced fertilizers."
          ],
        }));
        setPlantDataHistory(history);
      }
    } catch {
      setPlantDataHistory([]);
    }
  }, []);

  const latest = plantDataHistory[0];

  const alertClassForStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
        return 'alert healthy';
      case 'warning':
        return 'alert warning';
      case 'danger':
        return 'alert danger';
      default:
        return 'alert';
    }
  };

  return (
    <section aria-label={t('plantHealthCheck.title')}>
      <h2>{t('plantHealthCheck.title')}</h2>
      {!latest && <p>No plant health data available. Please upload crop photos for analysis.</p>}
      {latest && (
        <>
          <div className={alertClassForStatus(latest.healthStatus)} aria-live="polite">
            <strong>{t('plantHealthCheck.diseaseAlert')}:</strong>{' '}
            {latest.diseaseAlerts.length > 0 ? latest.diseaseAlerts.join(', ') : t('plantHealthCheck.alertHealthy')}
          </div>

          {latest.treatment.length > 0 && (
            <div>
              <strong>{t('plantHealthCheck.treatment')}:</strong>
              <ul>
                {latest.treatment.map((treat, i) => (
                  <li key={i}>{treat}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <strong>{t('plantHealthCheck.preventiveTips')}:</strong>
            <ul>
              {latest.preventiveTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <section aria-label="Plant Health History">
            <h3>Past Plant Health Data</h3>
            <ul>
              {plantDataHistory.slice(1).map((entry, idx) => (
                <li key={idx}>
                  <time dateTime={entry.timestamp}>{new Date(entry.timestamp).toLocaleString()}</time>: {entry.healthStatus}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </section>
  );
}
