import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Static mock data mimicking crop trends per region/state
const MOCK_CROP_TRENDS = {
  default: {
    trendingCrops: ['Wheat', 'Rice', 'Maize'],
    prices: {
      Wheat: '₹2000/quintal',
      Rice: '₹2200/quintal',
      Maize: '₹1800/quintal'
    },
    advisoryNews: [
      'Use organic fertilizers for better yield.',
      'Monitor pest infestation closely this season.'
    ]
  },
  Maharashtra: {
    trendingCrops: ['Sugarcane', 'Cotton', 'Soybean'],
    prices: {
      Sugarcane: '₹3000/quintal',
      Cotton: '₹3500/quintal',
      Soybean: '₹3200/quintal'
    },
    advisoryNews: [
      'Irrigate sugarcane fields weekly.',
      'Cotton harvesting expected to rise this year.'
    ]
  },
  TamilNadu: {
    trendingCrops: ['Banana', 'Coconut', 'Rice'],
    prices: {
      Banana: '₹1500/quintal',
      Coconut: '₹2500/quintal',
      Rice: '₹2100/quintal'
    },
    advisoryNews: [
      'Apply mulch to conserve soil moisture.',
      'Use resistant rice varieties against pests.'
    ]
  }
};

export default function CropTrends({ region }) {
  const { t } = useTranslation();
  const [cropTrends, setCropTrends] = useState(MOCK_CROP_TRENDS.default);

  useEffect(() => {
    if (!region) {
      setCropTrends(MOCK_CROP_TRENDS.default);
      return;
    }
    const normalizedRegion = region.toLowerCase().replace(/\s/g, '');

    if (normalizedRegion.includes('maharashtra')) {
      setCropTrends(MOCK_CROP_TRENDS.Maharashtra);
    } else if (normalizedRegion.includes('tamilnadu')) {
      setCropTrends(MOCK_CROP_TRENDS.TamilNadu);
    } else {
      setCropTrends(MOCK_CROP_TRENDS.default);
    }
  }, [region]);

  return (
    <section aria-label={t('cropTrends.title')}>
      <h2>{t('cropTrends.title')}</h2>
      <div>
        <h3>{t('cropTrends.trendingCrops')}</h3>
        <ul>
          {cropTrends.trendingCrops.map((crop, idx) => (
            <li key={idx}>
              {crop} - <strong>{cropTrends.prices[crop] || 'N/A'}</strong>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>{t('cropTrends.advisoryNews')}</h3>
        <ul>
          {cropTrends.advisoryNews.map((news, idx) => (
            <li key={idx}>{news}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
