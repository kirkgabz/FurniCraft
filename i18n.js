/**
 * i18n.js - Language translation support for FurniCraft
 * Supports English and Filipino with dynamic text replacement in the DOM.
 * Persist language choice in localStorage.
 */

const translations = {
  en: {
    "welcome": "Welcome",
    "login": "Login",
    "username": "Username",
    "password": "Password",
    "enter_username": "Enter username",
    "enter_password": "Enter password",
    "invalid_login": "Invalid username or password.",
    "login_success": "Login successful! Redirecting...",
    "select_language": "Select Language",
    "english": "English",
    "spanish": "Español",
    "french": "Français",
    "german": "Deutsch",
    "italian": "Italiano",
    "filipino": "Filipino",
    // Add other keys as needed for all pages
    "customize": "Customize",
    "logout": "Logout",
    "back": "Back",
    "additional_notes": "Additional Design Notes:",
    "save_as_png": "Save as PNG",
    "send_to_shop": "Send to Furniture Shop",
    "choose_your_furniture": "Choose Your Furniture",
    "select_furniture_desc": "Select the perfect furniture piece to start your crafting journey. Each item can be customized with premium materials and finishes.",
    "language_for_view_only_alert": "Note: Language selection is for viewing purposes only; the site is in English."
  },
  fil: {
    "welcome": "Maligayang pagdating",
    "login": "Mag-log In",
    "username": "Username",
    "password": "Password",
    "enter_username": "Ilagay ang username",
    "enter_password": "Ilagay ang password",
    "invalid_login": "Hindi wastong username o password.",
    "login_success": "Matagumpay na pag-log in! Papunta...",
    "select_language": "Piliin ang Wika",
    "english": "Ingles",
    "spanish": "Español",
    "french": "Pranses",
    "german": "Aleman",
    "italian": "Italyano",
    "filipino": "Filipino",
    // Same other keys translated as needed
    "customize": "Ipasadya",
    "logout": "Mag-log Out",
    "back": "Bumalik",
    "additional_notes": "Karagdagang Tala sa Disenyo:",
    "save_as_png": "I-save bilang PNG",
    "send_to_shop": "Ipadala sa Puwesto ng Muwebles",
    "choose_your_furniture": "Pumili ng Iyong Muwebles",
    "select_furniture_desc": "Pumili ng perpektong muwebles para simulan ang iyong paglikha. Ang bawat item ay maaaring ipasadya gamit ang premium na materyales at tapusin.",
    "language_for_view_only_alert": "Tandaan: Ang pagpili ng wika ay para lamang sa panonood; ang site ay nasa Ingles."
  }
};

/**
 * Get saved language from localStorage or default to English
 */
function getCurrentLanguage() {
  const lang = localStorage.getItem('language');
  if (lang && (lang === 'en' || lang === 'fil')) {
    return lang;
  }
  // Default to English
  return 'en';
}

/**
 * Save selected language to localStorage and update page content
 */
function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'fil') {
    lang = 'en'; // fallback
  }
  localStorage.setItem('language', lang);
  applyTranslations(lang);
}

/**
 * Apply translation text to elements with data-i18n attribute
 */
function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      if (el.placeholder !== undefined && el.tagName === 'INPUT') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerText = translations[lang][key];
      }
    }
  });
}

/**
 * Setup language dropdown selector event
 * @param {string} dropdownId - The id of the language selector dropdown
 */
function setupLanguageSelector(dropdownId) {
  const selector = document.getElementById(dropdownId);
  if (!selector) return;

  // Populate selection with available languages - English and Filipino
  selector.innerHTML = `
    <option value="en">${translations.en.english}</option>
    <option value="fil">${translations.en.filipino}</option>
  `;

  // Set current selection based on saved language
  selector.value = getCurrentLanguage();

  // Apply translations on page load
  applyTranslations(selector.value);

  // Change event to update language
  selector.addEventListener('change', (event) => {
    setLanguage(event.target.value);
  });
}

// On DOM ready - setup language selector with id 'languageSelector'
// and apply translations to page automatically
document.addEventListener('DOMContentLoaded', () => {
  setupLanguageSelector('languageSelector');
});
