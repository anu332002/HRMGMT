import React from 'react';
import i18n from "i18next";
import enLocale from './english'
import esLocale from './spanish'
import { initReactI18next } from "react-i18next";
import { getLocalStorage as GetLocalStorage } from "../store/localStorage";

const resources = {
    en: {
        translation: {
            ...enLocale
        }
    },
    es: {
        translation: {
            ...esLocale
        }
    }
};

const language = GetLocalStorage("language");

i18n
    .use(initReactI18next)
    .init({
        lng: language !== null ? language : "en",
        fallbackLng: language !== null ? language : "en",
        debug: true,
        resources,
        interpolation: {
            escapeValue: false,
            formatSeparator: '.'
        },
        react: {
            wait: true,
        },
    });

export default i18n;