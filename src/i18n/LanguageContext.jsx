import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations.js";

const STORAGE_KEY = "dreamworks-lang";

const LanguageContext = createContext(null);

function detectDefaultLang() {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && translations[stored]) return stored;
  const nav = (window.navigator.language || "").toLowerCase();
  if (nav.startsWith("nl")) return "nl";
  if (nav.startsWith("tr")) return "tr";
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectDefaultLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  function setLang(next) {
    if (translations[next]) setLangState(next);
  }

  const t = translations[lang];

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
