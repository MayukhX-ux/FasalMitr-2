import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      landing: {
        title: "Small Farmers Registration",
        name: "Name",
        existingFarmer: "Already existing farmer",
        newFarmer: "New farmer",
        yearsFarming: "Since how many years have you been farming?",
        appPurpose: "Purpose of using the app",
        personalUse: "Personal",
        commercialUse: "Commercial",
        submit: "Submit"
      },
      dashboard: {
        welcome: "Welcome, {{name}}!",
        uploadPhoto: "Upload Crop Photo",
        soilHealth: "Soil Health",
        plantHealth: "Plant Health",
        weatherInfo: "Weather Information",
        cropTrends: "Crop Trends",
        governmentSchemes: "Government Schemes",
        language: "Language",
        logout: "Logout"
      },
      uploadCropPhoto: {
        title: "Upload or Capture Crop Photo",
        uploadBtn: "Upload Photo",
        captureBtn: "Capture Photo",
        galleryTitle: "Uploaded Photos",
        aiResults: "AI Analysis Results",
        soilType: "Soil Type",
        plantHealthStatus: "Plant Health Status",
        recommendations: "Recommendations"
      },
      soilHealthCheck: {
        title: "Soil Health Analysis",
        explanation: "Explanation of soil characteristics",
        recommendations: "Soil treatment recommendations",
        historyTitle: "Past Soil Health Data"
      },
      plantHealthCheck: {
        title: "Plant Health Analysis",
        diseaseAlert: "Disease or Nutrient Deficiency Alerts",
        treatment: "Recommended Treatments",
        preventiveTips: "Preventive Tips",
        alertHealthy: "Healthy",
        alertWarning: "Warning",
        alertDanger: "Danger"
      },
      weatherInfo: {
        title: "Current Weather",
        temperature: "Temperature",
        humidity: "Humidity",
        rainfall: "Rainfall Forecast",
        location: "Location",
        manualLocation: "Enter Location Manually",
        error: "Could not fetch weather, please try manual location."
      },
      cropTrends: {
        title: "Current Crop Trends",
        trendingCrops: "Trending Crops",
        prices: "Prices",
        advisoryNews: "Advisory News"
      },
      governmentSchemes: {
        title: "Government Agricultural Schemes",
        noSchemes: "No schemes available for your region."
      },
      languageSwitcher: {
        selectLanguage: "Select Language"
      },
      validation: {
        required: "This field is required",
        positiveNumber: "Please enter a positive number"
      }
    }
  },
  hi: {
    translation: {
      landing: {
        title: "लघु किसान पंजीकरण",
        name: "नाम",
        existingFarmer: "पहले से मौजूद किसान",
        newFarmer: "नया किसान",
        yearsFarming: "आप कितने साल से खेती कर रहे हैं?",
        appPurpose: "एप का उपयोग करने का उद्देश्य",
        personalUse: "व्यक्तिगत",
        commercialUse: "वाणिज्यिक",
        submit: "जमा करें"
      },
      dashboard: {
        welcome: "स्वागत है, {{name}}!",
        uploadPhoto: "फसल फोटो अपलोड करें",
        soilHealth: "मिट्टी का स्वास्थ्य",
        plantHealth: "पौधे का स्वास्थ्य",
        weatherInfo: "मौसम की जानकारी",
        cropTrends: "फसल के रुझान",
        governmentSchemes: "सरकारी योजनाएं",
        language: "भाषा",
        logout: "लॉग आउट"
      },
      uploadCropPhoto: {
        title: "फसल की फोटो अपलोड या लें",
        uploadBtn: "फोटो अपलोड करें",
        captureBtn: "फोटो लें",
        galleryTitle: "अपलोड की गई फोटोज़",
        aiResults: "एआई विश्लेषण परिणाम",
        soilType: "मिट्टी का प्रकार",
        plantHealthStatus: "पौधे का स्वास्थ्य स्थिति",
        recommendations: "सुझाव"
      },
      soilHealthCheck: {
        title: "मिट्टी के स्वास्थ्य का विश्लेषण",
        explanation: "मिट्टी के गुणों की व्याख्या",
        recommendations: "मिट्टी उपचार के सुझाव",
        historyTitle: "पिछले मिट्टी स्वास्थ्य डेटा"
      },
      plantHealthCheck: {
        title: "पौधे के स्वास्थ्य का विश्लेषण",
        diseaseAlert: "रोग या पोषण की कमी की चेतावनी",
        treatment: "सिफारिश की गई उपचार",
        preventiveTips: "रोकथाम के सुझाव",
        alertHealthy: "स्वस्थ",
        alertWarning: "सतर्कता",
        alertDanger: "खतरा"
      },
      weatherInfo: {
        title: "वर्तमान मौसम",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        rainfall: "बारिश का पूर्वानुमान",
        location: "स्थान",
        manualLocation: "स्थान मैन्युअल दर्ज करें",
        error: "मौसम प्राप्त करने में समस्या, कृपया मैन्युअल स्थान दर्ज करें।"
      },
      cropTrends: {
        title: "वर्तमान फसल रुझान",
        trendingCrops: "लोकप्रिय फसलें",
        prices: "कीमतें",
        advisoryNews: "सलाह समाचार"
      },
      governmentSchemes: {
        title: "सरकार की कृषि योजनाएं",
        noSchemes: "आपके क्षेत्र के लिए कोई योजना उपलब्ध नहीं है।"
      },
      languageSwitcher: {
        selectLanguage: "भाषा चुनें"
      },
      validation: {
        required: "यह फ़ील्ड आवश्यक है",
        positiveNumber: "कृपया गणितीय सकारात्मक संख्या दर्ज करें"
      }
    }
  },
  ta: {
    translation: {
      landing: {
        title: "சின்ன விவசாயிகள் பதிவு",
        name: "பெயர்",
        existingFarmer: "ஏற்கனவே உள்ள விவசாயி",
        newFarmer: "புதிய விவசாயி",
        yearsFarming: "நீங்கள் எவ்வளவு ஆண்டுகளாக விவசாயம் செய்கிறீர்கள்?",
        appPurpose: "ஆப்பைப் பயன்படுத்தும் நோக்கம்",
        personalUse: "தனிப்பட்டது",
        commercialUse: "வணிக",
        submit: "சமர்ப்பி"
      },
      dashboard: {
        welcome: "வரவேற்பு, {{name}}!",
        uploadPhoto: "வருவாய் படம் பதிவேற்று",
        soilHealth: "மண்ணின் ஆரோக்கியம்",
        plantHealth: "திராட்சையின் ஆரோக்கியம்",
        weatherInfo: "வானிலை தகவல்",
        cropTrends: "பயிர் பிரவேசங்கள்",
        governmentSchemes: "அரசாங்கத் திட்டங்கள்",
        language: "மொழி",
        logout: "வெளியேறு"
      },
      uploadCropPhoto: {
        title: "பயிர் படத்தை பதிவேற்று அல்லது படியுங்கள்",
        uploadBtn: "படத்தை பதிவேற்று",
        captureBtn: "படம் எடுக்க",
        galleryTitle: "பதிவேற்றப்பட்ட படங்கள்",
        aiResults: "ஏ.ஐ. பகுப்பாய்வு முடிவுகள்",
        soilType: "மண்ணின் வகை",
        plantHealthStatus: "திராட்சை স্বাস্থ্য நிலை",
        recommendations: "பரிந்துரைகள்"
      },
      soilHealthCheck: {
        title: "மண்ணின் ஆரோக்கிய பகுப்பாய்வு",
        explanation: "மண்ணின் பண்புகளின் விளக்கம்",
        recommendations: "மண் சிகிச்சை பரிந்துரைகள்",
        historyTitle: "முந்தைய மண் ஆரோக்கிய தரவுகள்"
      },
      plantHealthCheck: {
        title: "திராட்சை ஆரோக்கிய பகுப்பாய்வு",
        diseaseAlert: "நோய் அல்லது சத்தான குறைவு எச்சரிக்கை",
        treatment: "பரிந்துரைக்கப்பட்ட சிகிச்சைகள்",
        preventiveTips: "தடுக்குதல் குறிப்புகள்",
        alertHealthy: "ஆரோக்கியமானது",
        alertWarning: "எச்சரிக்கை",
        alertDanger: "அபாயம்"
      },
      weatherInfo: {
        title: "தற்போதைய வானிலை",
        temperature: "வெப்பநிலை",
        humidity: "សំបូរប្រហែល",
        rainfall: "மழை முன்னறிவிப்பு",
        location: "இடம்",
        manualLocation: "கையேடு இடத்தை உள்ளிடவும்",
        error: "வானிலை பெற முடியவில்லை, தயவு செய்து கையேடு இடத்தை உள்ளிடவும்."
      },
      cropTrends: {
        title: "தற்போதைய பயிர் பிரவேசங்கள்",
        trendingCrops: "பிரபலப் பயிர்கள்",
        prices: "விலை",
        advisoryNews: "அறிவுரை செய்திகள்"
      },
      governmentSchemes: {
        title: "அரசாங்க வேளாண் திட்டங்கள்",
        noSchemes: "உங்கள் பகுதியற்கான எந்தத் திட்டமும் இல்லை."
      },
      languageSwitcher: {
        selectLanguage: "மொழியை தேர்ந்தெடுக்கவும்"
      },
      validation: {
        required: "இந்த புலம் வேண்டும்",
        positiveNumber: "தயவுசெய்து நேர்மறையான எண்ணை உள்ளிடவும்"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['navigator', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['localStorage']
    }
  });

export default i18n;
