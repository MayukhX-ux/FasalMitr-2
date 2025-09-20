import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../App';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useUser();

  const [name, setName] = useState('');
  const [farmerType, setFarmerType] = useState('');
  const [yearsFarming, setYearsFarming] = useState('');
  const [appPurpose, setAppPurpose] = useState('');
  const [language, setLanguage] = useState(i18n.language || 'en');

  const [errors, setErrors] = useState({});

  // Update language in i18next and locally when user changes select
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = t('validation.required');
    if (!farmerType) newErrors.farmerType = t('validation.required');
    if (farmerType === 'existing') {
      if (!yearsFarming.trim()) newErrors.yearsFarming = t('validation.required');
      else if (!/^\d+$/.test(yearsFarming) || parseInt(yearsFarming, 10) <= 0) newErrors.yearsFarming = t('validation.positiveNumber');
    }
    if (farmerType === 'new') {
      if (!appPurpose) newErrors.appPurpose = t('validation.required');
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }
    // Save user data including language preference
    const userData = {
      name: name.trim(),
      farmerType,
      yearsFarming: farmerType === 'existing' ? parseInt(yearsFarming, 10) : null,
      appPurpose: farmerType === 'new' ? appPurpose : null,
      language: language || 'en'
    };
    login(userData);
    navigate('/dashboard');
  };

  return (
    <main className="container" aria-label="Landing Page Registration Form">
      <h1>{t('landing.title')}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">{t('landing.name')}</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'error-name' : undefined}
            required
          />
          {errors.name && (
            <div role="alert" id="error-name" className="error">
              {errors.name}
            </div>
          )}
        </div>

        <fieldset>
          <legend>{t('landing.existingFarmer')} / {t('landing.newFarmer')}</legend>
          <div className="radio-group" role="radiogroup" aria-required="true">
            <label htmlFor="existingFarmer">
              <input
                type="radio"
                id="existingFarmer"
                name="farmerType"
                value="existing"
                checked={farmerType === 'existing'}
                onChange={(e) => {
                  setFarmerType(e.target.value);
                  setYearsFarming('');
                  setAppPurpose('');
                  setErrors((prev) => ({ ...prev, farmerType: undefined }));
                }}
                aria-invalid={!!errors.farmerType}
              />
              {t('landing.existingFarmer')}
            </label>
            <label htmlFor="newFarmer">
              <input
                type="radio"
                id="newFarmer"
                name="farmerType"
                value="new"
                checked={farmerType === 'new'}
                onChange={(e) => {
                  setFarmerType(e.target.value);
                  setYearsFarming('');
                  setAppPurpose('');
                  setErrors((prev) => ({ ...prev, farmerType: undefined }));
                }}
                aria-invalid={!!errors.farmerType}
              />
              {t('landing.newFarmer')}
            </label>
          </div>
          {errors.farmerType && (
            <div role="alert" className="error">{errors.farmerType}</div>
          )}
        </fieldset>

        {farmerType === 'existing' && (
          <div>
            <label htmlFor="yearsFarming">{t('landing.yearsFarming')}</label>
            <input
              id="yearsFarming"
              name="yearsFarming"
              type="number"
              min="1"
              value={yearsFarming}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || /^[0-9]*$/.test(val)) setYearsFarming(val);
                setErrors((prev) => ({ ...prev, yearsFarming: undefined }));
              }}
              aria-invalid={!!errors.yearsFarming}
              aria-describedby={errors.yearsFarming ? 'error-yearsFarming' : undefined}
              required
            />
            {errors.yearsFarming && (
              <div role="alert" id="error-yearsFarming" className="error">
                {errors.yearsFarming}
              </div>
            )}
          </div>
        )}

        {farmerType === 'new' && (
          <div>
            <label htmlFor="appPurpose">{t('landing.appPurpose')}</label>
            <select
              id="appPurpose"
              name="appPurpose"
              value={appPurpose}
              onChange={(e) => {
                setAppPurpose(e.target.value);
                setErrors((prev) => ({ ...prev, appPurpose: undefined }));
              }}
              aria-invalid={!!errors.appPurpose}
              aria-describedby={errors.appPurpose ? 'error-appPurpose' : undefined}
              required
            >
              <option value="">{t('landing.appPurpose')}</option>
              <option value="personal">{t('landing.personalUse')}</option>
              <option value="commercial">{t('landing.commercialUse')}</option>
            </select>
            {errors.appPurpose && (
              <div role="alert" id="error-appPurpose" className="error">
                {errors.appPurpose}
              </div>
            )}
          </div>
        )}

        <div>
          <label htmlFor="languageSelect">{t('languageSwitcher.selectLanguage')}</label>
          <select
            id="languageSelect"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label={t('languageSwitcher.selectLanguage')}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>

        <button type="submit">{t('landing.submit')}</button>
      </form>
    </main>
  );
}
