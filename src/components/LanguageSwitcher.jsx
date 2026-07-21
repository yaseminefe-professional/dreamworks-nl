import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function LanguageSwitcher() {
  const { lang, setLang, languages } = useLanguage();

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {languages.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(l.code)}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="lang-switch__pill"
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              />
            )}
            <span style={{ position: "relative" }}>{l.label}</span>
          </button>
        );
      })}
    </div>
  );
}
