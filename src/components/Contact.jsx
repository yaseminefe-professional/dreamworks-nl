import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Contact() {
  const { t } = useLanguage();
  const f = t.contact.form;

  return (
    <motion.section
      className="contact"
      id="contact"
      aria-labelledby="contact-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="contact__intro">
        <h2 id="contact-heading">{t.contact.heading}</h2>
        <p>{t.contact.intro}</p>
        <dl className="contact__details">
          <div>
            <dt>{t.contact.phoneLabel}</dt>
            <dd>
              <a href="tel:+31000000000">+31 (0)00 000 0000</a>
            </dd>
          </div>
          <div>
            <dt>{t.contact.emailLabel}</dt>
            <dd>
              <a href="mailto:info@dreamworks-nl.example">info@dreamworks-nl.example</a>
            </dd>
          </div>
        </dl>
        <p className="contact__note">{t.contact.note}</p>
      </div>
      <form
        className="contact__form"
        method="post"
        action="mailto:info@dreamworks-nl.example"
        encType="text/plain"
      >
        <div className="field">
          <label htmlFor="name">{f.name}</label>
          <input type="text" id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">{f.email}</label>
          <input type="email" id="email" name="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="phone">
            {f.phone} <span className="field__optional">{f.phoneOptional}</span>
          </label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="service">{f.serviceLabel}</label>
          <select id="service" name="service" required defaultValue="">
            <option value="" disabled>
              {f.serviceSelect}
            </option>
            <option value="garden">{f.serviceOptions.garden}</option>
            <option value="carpentry">{f.serviceOptions.carpentry}</option>
            <option value="demolition">{f.serviceOptions.demolition}</option>
            <option value="development">{f.serviceOptions.development}</option>
            <option value="signage">{f.serviceOptions.signage}</option>
            <option value="multiple">{f.serviceOptions.multiple}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="message">{f.messageLabel}</label>
          <textarea id="message" name="message" rows="4" required />
        </div>
        <motion.button type="submit" className="btn btn--primary" whileTap={{ scale: 0.97 }}>
          {f.submit}
        </motion.button>
      </form>
    </motion.section>
  );
}
