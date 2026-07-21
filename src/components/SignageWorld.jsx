import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { asset } from "../lib/asset.js";

const easeOut = [0.23, 1, 0.32, 1];

const specContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const specItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
};

const letterContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028 } },
};
const letter = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    textShadow: "0 0 22px rgba(255, 62, 165, 0.6)",
    transition: { duration: 0.2, ease: easeOut },
  },
};

export default function SignageWorld() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, (p) => `${(p - 0.5) * -50}px`);
  const wipeInset = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const wipeClipPath = useTransform(wipeInset, (v) => `inset(0 ${v}% 0 0)`);

  const gallery = [
    {
      type: "img",
      src: asset("assets/images/work/signage-dunkin.png"),
      alt: "A backlit illuminated LED sign shaped like a to-go cup with the letter D, mounted on a wood panel wall.",
      caption: t.signage.gallery[0],
    },
    {
      type: "img",
      src: asset("assets/images/work/signage-smashed.jpeg"),
      alt: "A backlit facade sign reading Smashed with a fist icon, mounted on a concrete wall.",
      caption: t.signage.gallery[1],
    },
    {
      type: "img",
      src: asset("assets/images/work/signage-jut-jul.jpeg"),
      alt: "An illuminated round projecting sign reading Jut and Jul, mounted on a brick building at dusk.",
      caption: t.signage.gallery[2],
    },
    {
      type: "video",
      src: asset("assets/video/signage-fabrication-cnc.mp4"),
      poster: asset("assets/images/work/signage-fabrication-cnc-poster.png"),
      ariaLabel: "CNC cutting machine fabricating a signage panel in the workshop.",
      caption: t.signage.gallery[3],
    },
  ];

  return (
    <section className="world world--signage" id="signage" ref={ref} aria-labelledby="signage-heading">
      <div className="world__scene">
        <motion.div
          className="world__flicker"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={
            prefersReducedMotion
              ? { opacity: 0.5 }
              : { opacity: [0, 0.9, 0.1, 0.8, 0.15, 1, 0.5] }
          }
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, times: [0, 0.08, 0.14, 0.22, 0.3, 0.4, 1], ease: "linear" }}
        />
        <motion.video
          className="world__bg-image"
          muted
          loop
          playsInline
          preload="auto"
          poster={asset("assets/images/service-signage-poster.png")}
          aria-hidden="true"
          autoPlay={!prefersReducedMotion}
          style={
            prefersReducedMotion
              ? undefined
              : { y: mediaY, scale: 1.08, clipPath: wipeClipPath }
          }
        >
          <source src={asset("assets/video/signage-fabrication-laser.mp4")} type="video/mp4" />
        </motion.video>
        <div className="world__scrim" aria-hidden="true" />
        <div className="world__content world__content--overlay">
          <p className="world__label">{t.signage.label}</p>
          <motion.h2
            id="signage-heading"
            className="world__title"
            aria-label={t.signage.title}
            variants={letterContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            {[...t.signage.title].map((char, i) => (
              <motion.span
                key={i}
                className="letter"
                variants={letter}
                aria-hidden="true"
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.h2>
          <p className="world__copy">{t.signage.copy}</p>
          <motion.ul
            className="world__spec"
            variants={specContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.signage.spec.map((s) => (
              <motion.li key={s} variants={specItem}>
                {s}
              </motion.li>
            ))}
          </motion.ul>
          <a className="world__cta" href="#contact">
            {t.signage.cta}
          </a>
        </div>
      </div>

      <div className="world__gallery">
        <p className="world__gallery-label">{t.signage.galleryLabel}</p>
        <ul className="world__gallery-grid">
          {gallery.map((entry) => (
            <li className="world__gallery-item" key={entry.src}>
              {entry.type === "img" ? (
                <img src={entry.src} alt={entry.alt} loading="lazy" />
              ) : (
                <video
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={entry.poster}
                  aria-label={entry.ariaLabel}
                  autoPlay={!prefersReducedMotion}
                >
                  <source src={entry.src} type="video/mp4" />
                </video>
              )}
              <span>{entry.caption}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
