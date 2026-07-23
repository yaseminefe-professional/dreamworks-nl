import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { asset } from "../lib/asset.js";

const easeOut = [0.23, 1, 0.32, 1];

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};
const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

function StaticHero() {
  return (
    <header className="hero hero--static" id="home">
      <img className="hero__bg" src={asset("assets/act0/facade-after.jpg")} alt="A Dutch canal house at night with a bold illuminated sign reading DreamWorks glowing above the shopfront, warm light spilling from every window onto the wet street below." />
      <div className="hero__scrim" />
      <div className="hero__content">
        <p className="hero__eyebrow">DreamWorks &middot; Advertising &amp; Signage</p>
        <h1 className="hero__title">
          No signage? No visibility?
          <br />
          No problem.
        </h1>
        <p className="hero__subhead">A business that can&rsquo;t be seen doesn&rsquo;t exist yet. We make sure yours does.</p>
      </div>
    </header>
  );
}

export default function Act0Hero() {
  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const beforeOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const afterOpacity = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);
  const beforeScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const afterScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.08]);

  const progressWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  if (prefersReducedMotion) {
    return <StaticHero />;
  }

  return (
    <header className="hero-build" id="home" ref={wrapRef}>
      <div className="hero-build__pin">
        <motion.div className="hero-build__bar" style={{ width: progressWidth }} />

        <motion.img
          className="hero-build__img"
          style={{ opacity: beforeOpacity, scale: beforeScale }}
          src={asset("assets/act0/facade-before.jpg")}
          alt="A Dutch canal house at dusk with a stepped gable and brick facade. A bold sign board reading DreamWorks hangs above the shopfront, powered off, its letters dark and unlit. Every window in the building is dark, lit only by the blue evening sky and distant streetlamps."
        />
        <motion.img
          className="hero-build__img"
          style={{ opacity: afterOpacity, scale: afterScale }}
          src={asset("assets/act0/facade-after.jpg")}
          alt="The same canal house now fully lit: the DreamWorks sign glows bold above the shopfront and every window in the building is lit warm from inside, light spilling onto the wet brick and pavement below."
        />

        <div className="hero-build__scrim" />

        <motion.div
          className="hero-build__final"
          variants={textContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p className="hero__eyebrow" variants={textItem}>
            DreamWorks &middot; Advertising &amp; Signage
          </motion.p>
          <motion.h1 className="hero__title" variants={textItem}>
            No signage? No visibility?
            <br />
            No problem.
          </motion.h1>
          <motion.p className="hero__subhead" variants={textItem}>
            A business that can&rsquo;t be seen doesn&rsquo;t exist yet. We make sure yours does.
          </motion.p>
        </motion.div>

        <motion.div className="hero-build__cue" style={{ opacity: cueOpacity }}>
          <span className="hero-build__mouse" />
          Scroll to build
        </motion.div>
      </div>
    </header>
  );
}
