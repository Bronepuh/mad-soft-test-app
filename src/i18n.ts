import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend"; // Для загрузки переводов через HTTP

i18n.use(HttpApi) // Подключаем загрузку переводов через HTTP
	.use(LanguageDetector) // Определение языка браузера
	.use(initReactI18next) // Интеграция с React
	.init({
		fallbackLng: "en", // Язык по умолчанию
		backend: {
			loadPath: "/locales/{{lng}}/translation.json", // Путь к JSON файлам
		},
		detection: {
			order: ["localStorage", "navigator"], // Определение языка через localStorage или настройки браузера
			caches: ["localStorage"],
		},
		interpolation: {
			escapeValue: false, // React уже экранирует значения
		},
	});

export default i18n;
