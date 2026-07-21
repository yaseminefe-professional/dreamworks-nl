import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const easeOut = [0.23, 1, 0.32, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function Process() {
  const { t } = useLanguage();

  return (
    <section className="process" id="process" aria-labelledby="process-heading">
      <h2 id="process-heading" className="process__heading">
        {t.process.heading}
      </h2>
      <motion.ol
        className="process__steps"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {t.process.steps.map((step) => (
          <motion.li className="process__step" key={step.number} variants={item}>
            <span className="process__number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
