import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { asset } from "../lib/asset.js";

const easeOut = [0.23, 1, 0.32, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <header className="hero" id="home" ref={ref}>
      <motion.video
        className="hero__bg"
        muted
        loop
        playsInline
        preload="auto"
        poster={asset("assets/images/hero-interior-poster.png")}
        aria-hidden="true"
        autoPlay={!prefersReducedMotion}
        style={prefersReducedMotion ? undefined : { y }}
      >
        <source src={asset("assets/video/hero-interior.mp4")} type="video/mp4" />
      </motion.video>
      <div className="hero__scrim" />
      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="hero__eyebrow" variants={item}>
          {t.hero.eyebrow}
        </motion.p>
        <motion.h1 className="hero__title" variants={item}>
          {t.hero.title.map((line, i) => (
            <span key={i}>
              {line}
              {i < t.hero.title.length - 1 && <br />}
            </span>
          ))}
        </motion.h1>
        <motion.p className="hero__subhead" variants={item}>
          {t.hero.subhead}
        </motion.p>
        <motion.div className="hero__actions" variants={item}>
          <motion.a
            className="btn btn--primary"
            href="#contact"
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.ctaPrimary}
          </motion.a>
          <motion.a
            className="btn btn--ghost"
            href="#garden"
            whileTap={{ scale: 0.97 }}
          >
            {t.hero.ctaSecondary}
          </motion.a>
        </motion.div>
      </motion.div>
    </header>
  );
}
