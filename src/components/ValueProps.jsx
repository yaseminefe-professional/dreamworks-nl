import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function ValueProps() {
  const { t } = useLanguage();

  return (
    <section className="values" aria-label="Why DreamWorks">
      <motion.ul
        className="values__list"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {t.values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </motion.ul>
    </section>
  );
}
