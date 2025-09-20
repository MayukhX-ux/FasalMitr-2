import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Static JSON mimicking government schemes relevant to some Indian states/regions
const GOV_SCHEMES_DATA = {
  Maharashtra: [
    {
      name: "Dr. Panjabrao Deshmukh Krishi Sanjivani Yojana",
      summary:
        "Provides assistance to farmers for sustainable agriculture practices.",
      url: "https://agri.maharashtra.gov.in/"
    },
    {
      name: "Maharashtra Chief Minister Kisan Support Scheme",
      summary:
        "Financial aid to farmers affected by natural calamities.",
      url: "https://mahaagri.gov.in/"
    }
  ],
  TamilNadu: [
    {
      name: "Tamil Nadu Agriculture Loan Waiver Scheme",
      summary: "Loan waiver for eligible farmers to reduce debt burden.",
      url: "https://www.tn.gov.in/"
    },
    {
      name: "Krishi Sinchithan India Scheme",
      summary: "Promotion of drip irrigation and water saving techniques.",
      url: "https://agritech.tnau.ac.in/"
    }
  ]
};

export default function GovernmentSchemes({ region }) {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    if (!region) {
      setSchemes([]);
      return;
    }
    const normalized = region.toLowerCase().replace(/\s/g, '');
    if (normalized.includes('maharashtra')) {
      setSchemes(GOV_SCHEMES_DATA.Maharashtra);
    } else if (normalized.includes('tamilnadu')) {
      setSchemes(GOV_SCHEMES_DATA.TamilNadu);
    } else {
      setSchemes([]);
    }
  }, [region]);

  return (
    <section aria-label={t('governmentSchemes.title')}>
      <h2>{t('governmentSchemes.title')}</h2>
      {schemes.length === 0 && <p>{t('governmentSchemes.noSchemes')}</p>}
      <ul>
        {schemes.map((scheme, i) => (
          <li key={i}>
            <h3>{scheme.name}</h3>
            <p>{scheme.summary}</p>
            <p>
              <a href={scheme.url} target="_blank" rel="noopener noreferrer">
                {scheme.url}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
