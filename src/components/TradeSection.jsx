import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { asset } from "../lib/asset.js";

const easeOut = [0.23, 1, 0.32, 1];

export default function TradeSection({ id, eyebrow, title, body, services, image, alt }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section className="trade" id={id} ref={ref} aria-label={title}>
      <motion.img
        className="trade__img"
        style={prefersReducedMotion ? undefined : { scale: imgScale, y: imgY }}
        src={asset(image)}
        alt={alt}
      />
      <div className="trade__scrim" />
      <motion.div
        className="trade__content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <p className="hero__eyebrow">{eyebrow}</p>
        <h2 className="trade__title">{title}</h2>
        <p className="trade__body">{body}</p>
        {services && (
          <ul className="service-list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        )}
      </motion.div>
    </section>
  );
}
