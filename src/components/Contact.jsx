import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const easeOut = [0.23, 1, 0.32, 1];

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const SERVICE_IDS = ["garden", "carpentry", "demolition", "development", "signage-work"];

export default function Contact() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      console.error(
        "Missing VITE_WEB3FORMS_ACCESS_KEY. Add it to a .env file to enable the contact form.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact" id="contact" aria-label={t.contact.eyebrow}>
      <motion.div
        className="contact__inner"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <div className="contact__intro">
          <p className="hero__eyebrow">{t.contact.eyebrow}</p>
          <h2 className="contact__title">{t.contact.title}</h2>
          <p className="contact__body">{t.contact.body}</p>
          <div className="contact__columns">
            <dl className="contact__details">
              <div>
                <dt>{t.contact.callLabel}</dt>
                <dd>
                  <a href="tel:+31620600693">+31 6 20600693</a>
                </dd>
              </div>
              <div>
                <dt>{t.contact.emailLabel}</dt>
                <dd>
                  <a href="mailto:oguzhanygurkan@gmail.com">oguzhanygurkan@gmail.com</a>
                </dd>
              </div>
              <div>
                <dt>{t.contact.addressLabel}</dt>
                <dd>{t.contact.address}</dd>
              </div>
            </dl>
            <div className="contact__links">
              <p className="contact__links-label">{t.contact.servicesLabel}</p>
              {SERVICE_IDS.map((id, i) => (
                <a key={id} href={`#${id}`}>
                  {t.contact.serviceLinks[i]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {status === "sent" ? (
          <div className="contact__confirm" role="status">
            <p className="contact__confirm-title">{t.contact.form.confirmTitle}</p>
            <p>{t.contact.form.confirmBody}</p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            <input type="hidden" name="subject" value="New enquiry from the DreamWorks website" />
            <input type="checkbox" name="botcheck" className="contact__honeypot" tabIndex={-1} autoComplete="off" />
            <div className="contact__field">
              <label htmlFor="contact-name">{t.contact.form.nameLabel}</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-email">{t.contact.form.emailLabel}</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-project">{t.contact.form.projectLabel}</label>
              <select id="contact-project" name="project">
                {t.contact.form.projectTypes.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message">{t.contact.form.messageLabel}</label>
              <textarea id="contact-message" name="message" rows={4} required />
            </div>
            {status === "error" && (
              <p className="contact__error" role="alert">
                {t.contact.form.error}
              </p>
            )}
            <button type="submit" className="contact__submit" disabled={status === "sending"}>
              {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
            </button>
          </form>
        )}
      </motion.div>

      <h2 className="contact__wordmark" aria-hidden="true">
        DreamWorks
      </h2>
    </section>
  );
}
