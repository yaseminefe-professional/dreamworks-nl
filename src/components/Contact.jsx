import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.23, 1, 0.32, 1];

const PROJECT_TYPES = [
  "Not sure yet",
  "Garden & landscaping",
  "Carpentry",
  "Demolition",
  "Property development",
  "Advertising & signage",
];

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
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
    <section className="contact" id="contact" aria-label="Get in touch">
      <motion.div
        className="contact__inner"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <div className="contact__intro">
          <p className="hero__eyebrow">Get in touch</p>
          <h2 className="contact__title">One enquiry reaches every trade.</h2>
          <p className="contact__body">
            Tell us what you need, garden, carpentry, demolition, development, or signage, and it lands with the same
            point of contact who scopes it, brings in the right craftsmen, and sees it through to delivery.
          </p>
          <div className="contact__columns">
            <dl className="contact__details">
              <div>
                <dt>Call</dt>
                <dd>
                  <a href="tel:+31620600693">+31 6 20600693</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:oguzhanygurkan@gmail.com">oguzhanygurkan@gmail.com</a>
                </dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>Niew zeelandweg 8-L, 1045 AL Amsterdam, The Netherlands</dd>
              </div>
            </dl>
            <div className="contact__links">
              <p className="contact__links-label">Services</p>
              <a href="#garden">Garden & Landscaping</a>
              <a href="#carpentry">Carpentry</a>
              <a href="#demolition">Demolition</a>
              <a href="#development">Property Development</a>
              <a href="#signage-work">Advertising & Signage</a>
            </div>
          </div>
        </div>

        {status === "sent" ? (
          <div className="contact__confirm" role="status">
            <p className="contact__confirm-title">Enquiry sent.</p>
            <p>We will get back to you shortly with next steps.</p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            <input type="hidden" name="subject" value="New enquiry from the DreamWorks website" />
            <input type="checkbox" name="botcheck" className="contact__honeypot" tabIndex={-1} autoComplete="off" />
            <div className="contact__field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-project">Project type</label>
              <select id="contact-project" name="project">
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message">Tell us about the project</label>
              <textarea id="contact-message" name="message" rows={4} required />
            </div>
            {status === "error" && (
              <p className="contact__error" role="alert">
                Something went wrong sending your enquiry. Please try again, or email us directly.
              </p>
            )}
            <button type="submit" className="contact__submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send enquiry"}
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
