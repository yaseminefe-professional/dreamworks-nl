import { motion } from "framer-motion";

const values = ["One point of contact", "From design to delivery", "Craftsmen under one roof", "Quality & guarantee", "Clear communication"];

export default function WhoWeAre() {
  return (
    <section className="who" id="who-we-are" aria-label="Who we are">
      <motion.div
        className="who__content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="hero__eyebrow">Who we are</p>
        <h2 className="who__title">One outfit. Five trades. One point of contact.</h2>
        <p className="who__body">
          DreamWorks is a Dutch multi-disciplinary contractor. Garden and landscaping, carpentry, demolition, property development, and advertising and signage, all under one roof, all through one point of contact from design to delivery.
        </p>
        <ul className="who__values">
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
