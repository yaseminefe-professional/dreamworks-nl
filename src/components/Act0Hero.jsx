import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { asset } from "../lib/asset.js";

const easeOut = [0.23, 1, 0.32, 1];
const DOOR_ORIGIN = "38% 58%";

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};
const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const spots = [
  {
    key: "floor",
    label: "Floor",
    left: "31%",
    top: "76%",
    src: "assets/act0/storefront-floor-macro.jpg",
    alt: "Extreme close-up of the light natural stone floor, showing the grain and texture of the material.",
    head: "Handcrafted flooring.",
    sub: "Cut, laid, and finished by hand.",
  },
  {
    key: "wall",
    label: "Wall finishing",
    left: "89%",
    top: "42%",
    src: "assets/act0/storefront-wall-macro.jpg",
    alt: "Extreme close-up of a freshly painted interior wall, showing the smooth plaster and paint finish.",
    head: "Interior painting & finishing.",
    sub: "Every wall prepared and painted with care.",
  },
  {
    key: "cabinetry",
    label: "Carpentry",
    left: "64%",
    top: "58%",
    src: "assets/act0/storefront-cabinetry.jpg",
    alt: "Close-up of custom oak cabinetry showing precise dovetail joinery and blackened-steel hardware.",
    head: "Custom carpentry.",
    sub: "Built in-house, joint by joint.",
  },
];

function InteriorExperience({ motionEnabled }) {
  const [active, setActive] = useState(null);
  const activeSpot = spots.find((s) => s.key === active) || null;

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="interior" aria-label="Inside DreamWorks: click a spot to see the craftsmanship">
      <img className="interior__img" src={asset("assets/act0/storefront-drone.jpg")} alt="An elevated, drone-like view of the DreamWorks interior just through the front door: exposed beams, shelving, a bare wall, and the stone floor, all visible in one sweep." />
      <div className="interior__scrim" />

      <div className="interior__hotspots">
        {spots.map((spot) => (
          <button
            key={spot.key}
            type="button"
            className="interior__hotspot"
            style={{ left: spot.left, top: spot.top }}
            onClick={() => setActive(spot.key)}
            aria-label={`See ${spot.label} in detail`}
          >
            <span className="interior__hotspot-dot" />
            <span className="interior__hotspot-label">{spot.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeSpot && (
          <motion.div
            className="interior__detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            onClick={() => setActive(null)}
          >
            <motion.img
              className="interior__detail-img"
              src={asset(activeSpot.src)}
              alt={activeSpot.alt}
              initial={motionEnabled ? { scale: 1.15 } : false}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: easeOut }}
            />
            <div className="interior__detail-scrim" />
            <div className="interior__detail-text">
              <p className="zoom__caption-head">{activeSpot.head}</p>
              <p className="zoom__caption-sub">{activeSpot.sub}</p>
            </div>
            <button type="button" className="interior__detail-close" onClick={() => setActive(null)} aria-label="Back to overview">
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StaticHero() {
  return (
    <>
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
      <InteriorExperience motionEnabled={false} />
    </>
  );
}

export default function Act0Hero() {
  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const p = useSpring(scrollYProgress, { stiffness: 55, damping: 22, mass: 0.4 });

  const cueOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  const heroTextOpacity = useTransform(p, [0, 0.25, 0.4], [1, 1, 0]);
  const heroTextY = useTransform(p, [0, 0.4], [0, -30]);

  // Facade: dark -> lit, then a gentle push toward the door. Holds lit until
  // the pin releases directly into the interior below, no in-between step.
  // Placeholder cut until this becomes a real POV video walkthrough (see plan).
  const beforeOpacity = useTransform(p, [0, 0.32, 0.45], [1, 1, 0]);
  const afterOpacity = useTransform(p, [0.28, 0.45, 1], [0, 1, 1]);
  const facadeScale = useTransform(p, [0, 1], [1, 1.4]);

  if (prefersReducedMotion) {
    return <StaticHero />;
  }

  return (
    <>
      <header className="hero-build" id="home" ref={wrapRef}>
        <div className="hero-build__pin">
          <motion.div className="hero-build__bar" style={{ width: progressWidth }} />

          <motion.img
            className="hero-build__img"
            style={{ opacity: beforeOpacity, scale: facadeScale, transformOrigin: DOOR_ORIGIN }}
            src={asset("assets/act0/facade-before.jpg")}
            alt="A Dutch canal house at dusk with a stepped gable and brick facade. A bold sign board reading DreamWorks hangs above the shopfront, powered off, its letters dark and unlit. Every window in the building is dark, lit only by the blue evening sky and distant streetlamps."
          />
          <motion.img
            className="hero-build__img"
            style={{ opacity: afterOpacity, scale: facadeScale, transformOrigin: DOOR_ORIGIN }}
            src={asset("assets/act0/facade-after.jpg")}
            alt="The same canal house now fully lit: the DreamWorks sign glows bold above the shopfront and every window in the building is lit warm from inside, light spilling onto the wet brick and pavement below. The front door stands ready to enter."
          />
          <div className="hero-build__scrim" />

          <motion.div
            className="hero-build__final"
            style={{ opacity: heroTextOpacity, y: heroTextY }}
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

      <InteriorExperience motionEnabled={!prefersReducedMotion} />
    </>
  );
}
