import { LANGUAGES } from "../i18n/translations.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-switch__option${lang === l.code ? " lang-switch__option--active" : ""}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
