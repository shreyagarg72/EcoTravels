import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation and general UI
      loading: 'Loading...',
      saveItinerary: 'Save Itinerary',
      saving: 'Saving...',
      saved: 'Saved!',
      pleaseLoginToSave: 'Please log in to save this itinerary',
      failedToSaveTrip: 'Failed to save trip. Please try again.',
      errorSavingTrip: 'An error occurred while saving the trip.',
      
      // Hotel section
      hotelOptions: 'Hotel Options',
      price: 'Price',
      rating: 'Rating',
      
      // Activities & Map
      activitiesMap: 'Activities Map',
      activityTimeline: 'Activity Timeline',
      day: 'Day',
      
      // Time periods
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      
      // Meal types
      breakfast: 'Breakfast',
      lunch: 'Lunch',
      dinner: 'Dinner',
      
      // Details
      ticket: 'Ticket',
      travelTime: 'Travel Time',
      cuisine: 'Cuisine',
      location: 'Location',
      priceRange: 'Price Range',
      bestTime: 'Best time'
    }
  },
  es: {
    translation: {
      // Navigation and general UI
      loading: 'Cargando...',
      saveItinerary: 'Guardar itinerario',
      saving: 'Guardando...',
      saved: '¡Guardado!',
      pleaseLoginToSave: 'Inicie sesión para guardar este itinerario',
      failedToSaveTrip: 'Error al guardar el viaje. Inténtelo de nuevo.',
      errorSavingTrip: 'Se produjo un error al guardar el viaje.',
      
      // Hotel section
      hotelOptions: 'Opciones de hotel',
      price: 'Precio',
      rating: 'Valoración',
      
      // Activities & Map
      activitiesMap: 'Mapa de actividades',
      activityTimeline: 'Cronología de actividades',
      day: 'Día',
      
      // Time periods
      morning: 'Mañana',
      afternoon: 'Tarde',
      evening: 'Noche',
      
      // Meal types
      breakfast: 'Desayuno',
      lunch: 'Almuerzo',
      dinner: 'Cena',
      
      // Details
      ticket: 'Entrada',
      travelTime: 'Tiempo de viaje',
      cuisine: 'Cocina',
      location: 'Ubicación',
      priceRange: 'Rango de precios',
      bestTime: 'Mejor momento'
    }
  },
  fr: {
    translation: {
      // Navigation and general UI
      loading: 'Chargement...',
      saveItinerary: 'Enregistrer l\'itinéraire',
      saving: 'Enregistrement...',
      saved: 'Enregistré !',
      pleaseLoginToSave: 'Veuillez vous connecter pour enregistrer cet itinéraire',
      failedToSaveTrip: 'Échec de l\'enregistrement du voyage. Veuillez réessayer.',
      errorSavingTrip: 'Une erreur s\'est produite lors de l\'enregistrement du voyage.',
      
      // Hotel section
      hotelOptions: 'Options d\'hôtel',
      price: 'Prix',
      rating: 'Évaluation',
      
      // Activities & Map
      activitiesMap: 'Carte des activités',
      activityTimeline: 'Chronologie des activités',
      day: 'Jour',
      
      // Time periods
      morning: 'Matin',
      afternoon: 'Après-midi',
      evening: 'Soir',
      
      // Meal types
      breakfast: 'Petit-déjeuner',
      lunch: 'Déjeuner',
      dinner: 'Dîner',
      
      // Details
      ticket: 'Billet',
      travelTime: 'Temps de voyage',
      cuisine: 'Cuisine',
      location: 'Emplacement',
      priceRange: 'Gamme de prix',
      bestTime: 'Meilleur moment'
    }
  },
  de: {
    translation: {
      // Navigation and general UI
      loading: 'Wird geladen...',
      saveItinerary: 'Reiseplan speichern',
      saving: 'Speichern...',
      saved: 'Gespeichert!',
      pleaseLoginToSave: 'Bitte melden Sie sich an, um diesen Reiseplan zu speichern',
      failedToSaveTrip: 'Fehler beim Speichern der Reise. Bitte versuchen Sie es erneut.',
      errorSavingTrip: 'Beim Speichern der Reise ist ein Fehler aufgetreten.',
      
      // Hotel section
      hotelOptions: 'Hoteloptionen',
      price: 'Preis',
      rating: 'Bewertung',
      
      // Activities & Map
      activitiesMap: 'Aktivitätskarte',
      activityTimeline: 'Aktivitätszeitplan',
      day: 'Tag',
      
      // Time periods
      morning: 'Morgen',
      afternoon: 'Nachmittag',
      evening: 'Abend',
      
      // Meal types
      breakfast: 'Frühstück',
      lunch: 'Mittagessen',
      dinner: 'Abendessen',
      
      // Details
      ticket: 'Ticket',
      travelTime: 'Reisezeit',
      cuisine: 'Küche',
      location: 'Standort',
      priceRange: 'Preisklasse',
      bestTime: 'Beste Zeit'
    }
  },
  ja: {
    translation: {
      // Navigation and general UI
      loading: '読み込み中...',
      saveItinerary: '旅程を保存',
      saving: '保存中...',
      saved: '保存完了！',
      pleaseLoginToSave: 'この旅程を保存するにはログインしてください',
      failedToSaveTrip: '旅行の保存に失敗しました。もう一度お試しください。',
      errorSavingTrip: '旅行の保存中にエラーが発生しました。',
      
      // Hotel section
      hotelOptions: 'ホテルオプション',
      price: '価格',
      rating: '評価',
      
      // Activities & Map
      activitiesMap: 'アクティビティマップ',
      activityTimeline: 'アクティビティタイムライン',
      day: '日目',
      
      // Time periods
      morning: '午前',
      afternoon: '午後',
      evening: '夕方',
      
      // Meal types
      breakfast: '朝食',
      lunch: '昼食',
      dinner: '夕食',
      
      // Details
      ticket: 'チケット',
      travelTime: '移動時間',
      cuisine: '料理',
      location: '場所',
      priceRange: '価格帯',
      bestTime: 'ベストシーズン'
    }
  },
  hi: {
    translation: {
      // Navigation and general UI
      loading: 'लोड हो रहा है...',
      saveItinerary: 'यात्रा कार्यक्रम सहेजें',
      saving: 'सहेजा जा रहा है...',
      saved: 'सहेज लिया गया!',
      pleaseLoginToSave: 'इस यात्रा कार्यक्रम को सहेजने के लिए कृपया लॉग इन करें',
      failedToSaveTrip: 'यात्रा सहेजने में विफल। कृपया पुनः प्रयास करें।',
      errorSavingTrip: 'यात्रा सहेजते समय एक त्रुटि हुई।',
      
      // Hotel section
      hotelOptions: 'होटल विकल्प',
      price: 'कीमत',
      rating: 'रेटिंग',
      
      // Activities & Map
      activitiesMap: 'गतिविधि मानचित्र',
      activityTimeline: 'गतिविधि समयरेखा',
      day: 'दिन',
      
      // Time periods
      morning: 'सुबह',
      afternoon: 'दोपहर',
      evening: 'शाम',
      
      // Meal types
      breakfast: 'नाश्ता',
      lunch: 'दोपहर का भोजन',
      dinner: 'रात का खाना',
      
      // Details
      ticket: 'टिकट',
      travelTime: 'यात्रा समय',
      cuisine: 'व्यंजन',
      location: 'स्थान',
      priceRange: 'मूल्य सीमा',
      bestTime: 'सबसे अच्छा समय'
    }
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;