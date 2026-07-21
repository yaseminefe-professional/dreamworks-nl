import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const easeOut = [0.23, 1, 0.32, 1];

export default function World({
  id,
  reverse,
  mediaType = "video",
  mediaSrc,
  poster,
  ariaLabel,
  label,
  titleLines,
  copy,
  spec,
  ctaLabel,
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgPosition = useTransform(scrollYProgress, (p) => `0 ${p * 60}%`);
  const grainY = useTransform(scrollYProgress, (p) => `${(p - 0.5) * 60}px`);
  const mediaY = useTransform(scrollYProgress, (p) => `${(p - 0.5) * -70}px`);

  const titleContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
  };
  const titleLine = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: easeOut } },
  };

  const specContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  };
  const specItem = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <section
      className={`world${reverse ? " world--reverse" : ""}`}
      id={id}
      ref={ref}
      aria-labelledby={`${id}-heading`}
    >
      <motion.div
        className="world__bg"
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { backgroundPosition: bgPosition }}
      />
      <motion.div
        className="world__grain"
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: grainY }}
      />
      <div className="world__mid">
        {mediaType === "video" ? (
          <motion.video
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
            aria-label={ariaLabel}
            autoPlay={!prefersReducedMotion}
            style={prefersReducedMotion ? undefined : { y: mediaY, scale: 1.12 }}
          >
            <source src={mediaSrc} type="video/mp4" />
          </motion.video>
        ) : (
          <motion.img
            src={mediaSrc}
            alt={ariaLabel}
            loading="lazy"
            style={prefersReducedMotion ? undefined : { y: mediaY, scale: 1.12 }}
          />
        )}
      </div>
      <div className="world__content">
        <p className="world__label">{label}</p>
        <motion.h2
          id={`${id}-heading`}
          className="world__title"
          variants={titleContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {titleLines.map((line, i) => (
            <span className="line" key={i}>
              <motion.span variants={titleLine}>{line}</motion.span>
            </span>
          ))}
        </motion.h2>
        <p className="world__copy">{copy}</p>
        <motion.ul
          className="world__spec"
          variants={specContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {spec.map((s) => (
            <motion.li key={s} variants={specItem}>
              {s}
            </motion.li>
          ))}
        </motion.ul>
        <a className="world__cta" href="#contact">
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
