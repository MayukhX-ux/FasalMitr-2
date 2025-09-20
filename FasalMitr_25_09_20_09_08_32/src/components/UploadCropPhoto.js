import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AI_MOCK_RESPONSE = {
  soilType: "Loamy Soil",
  plantHealthStatus: "Healthy",
  recommendations: [
    "Apply nitrogen fertilizer once every two weeks.",
    "Ensure proper irrigation to avoid water stress.",
    "Use organic compost to improve soil quality."
  ]
};

export default function UploadCropPhoto({ user }) {
  const [photos, setPhotos] = useState(() => {
    try {
      const stored = localStorage.getItem('smallFarmersPhotos');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [aiResults, setAiResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    localStorage.setItem('smallFarmersPhotos', JSON.stringify(photos));
  }, [photos]);

  const compressFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        600,
        'JPEG',
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const uploadAndAnalyze = async (imgBase64) => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Here we mock the AI call, but could call real AI endpoint:
      // const resp = await axios.post(process.env.REACT_APP_AI_SERVICE_ENDPOINT, { image: imgBase64 });
      // setAiResults(resp.data);

      // Simulate delay and set mock response
      await new Promise((r) => setTimeout(r, 1200));
      setAiResults(AI_MOCK_RESPONSE);
    } catch {
      setErrorMsg('Failed to analyze image. Please try again.');
      setAiResults(null);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file.');
      return;
    }
    setErrorMsg('');
    const compressed = await compressFile(file);
    const timestamp = new Date().toISOString();
    const newPhoto = { base64: compressed, timestamp };
    const newPhotos = [newPhoto, ...photos];
    setPhotos(newPhotos);
    uploadAndAnalyze(compressed);
    e.target.value = null;
  };

  const capture = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    const timestamp = new Date().toISOString();
    const newPhoto = { base64: imageSrc, timestamp };
    const newPhotos = [newPhoto, ...photos];
    setPhotos(newPhotos);
    uploadAndAnalyze(imageSrc);
    setShowWebcam(false);
  };

  return (
    <section aria-label={t('uploadCropPhoto.title')}>
      <h2>{t('uploadCropPhoto.title')}</h2>
      <div>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFileChange}
          aria-label={t('uploadCropPhoto.uploadBtn')}
        />
        <button type="button" onClick={() => setShowWebcam((v) => !v)} aria-pressed={showWebcam}>
          {showWebcam ? 'Stop Camera' : t('uploadCropPhoto.captureBtn')}
        </button>
      </div>
      {showWebcam && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
            width={320}
            height={240}
          />
          <button type="button" onClick={capture}>
            Capture
          </button>
        </div>
      )}
      {loading && <p>Analyzing image with AI, please wait...</p>}
      {errorMsg && <p role="alert" style={{ color: 'red' }}>{errorMsg}</p>}

      {aiResults && (
        <section aria-label={t('uploadCropPhoto.aiResults')}>
          <h3>{t('uploadCropPhoto.aiResults')}</h3>
          <p>
            <strong>{t('uploadCropPhoto.soilType')}:</strong> {aiResults.soilType}
          </p>
          <p>
            <strong>{t('uploadCropPhoto.plantHealthStatus')}:</strong> {aiResults.plantHealthStatus}
          </p>
          {aiResults.recommendations && (
            <div>
              <strong>{t('uploadCropPhoto.recommendations')}:</strong>
              <ul>
                {aiResults.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section aria-label={t('uploadCropPhoto.galleryTitle')}>
        <h3>{t('uploadCropPhoto.galleryTitle')}</h3>
        {photos.length === 0 && <p>No photos uploaded yet.</p>}
        <div className="gallery" role="list">
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo.base64}
              alt={`Uploaded crop photo at ${new Date(photo.timestamp).toLocaleString()}`}
              loading="lazy"
              role="listitem"
            />
          ))}
        </div>
      </section>
    </section>
  );
}
