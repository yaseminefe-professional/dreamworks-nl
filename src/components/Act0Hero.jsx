import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { asset } from "../lib/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const easeOut = [0.23, 1, 0.32, 1];

const HERO_POSTER = "assets/act0/exterior-dutch-house.jpg";

const HERO_FRAME_META = [
  { key: "exterior", src: HERO_POSTER },
  { key: "kitchen-living", src: "assets/act0/interior-kitchen-living.jpg", altKey: "kitchenLiving" },
  { key: "kitchen-island", src: "assets/act0/interior-kitchen-island.jpg", altKey: "kitchenIsland" },
  { key: "living-room", src: "assets/act0/interior-living-room.jpg", altKey: "livingRoom" },
  { key: "bathroom", src: "assets/act0/interior-bathroom.jpg", altKey: "bathroom" },
];

// [inStart, inEnd, outStart, outEnd] scroll-progress breakpoints per frame.
const FRAME_WINDOWS = [
  [0, 0, 0.28, 0.32],
  [0.28, 0.32, 0.42, 0.46],
  [0.42, 0.46, 0.56, 0.6],
  [0.56, 0.6, 0.72, 0.76],
  [0.72, 0.76, 1, 1],
];

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};
const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const SPOT_META = [
  { key: "floor", left: "31%", top: "76%", src: "assets/act0/storefront-floor-macro.jpg", backdrop: "assets/act0/storefront-drone.jpg" },
  { key: "wall", left: "89%", top: "42%", src: "assets/act0/storefront-wall-macro.jpg", backdrop: "assets/act0/storefront-drone.jpg" },
  { key: "cabinetry", left: "64%", top: "58%", src: "assets/act0/storefront-cabinetry.jpg", backdrop: "assets/act0/storefront-drone.jpg" },
];

function HeroFrame({ frame, breakpoints, index, p }) {
  const [inStart, inEnd, outStart, outEnd] = breakpoints;
  const isFirst = index === 0;
  const isLast = index === FRAME_WINDOWS.length - 1;

  const opacity = useTransform(
    p,
    isFirst ? [inEnd, outStart, outEnd] : isLast ? [inStart, inEnd, outEnd] : [inStart, inEnd, outStart, outEnd],
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const scale = useTransform(p, [inStart, outEnd], [1, 1.06]);

  return (
    <motion.img
      className="hero-build__img"
      src={asset(frame.src)}
      alt={frame.alt}
      style={{ opacity, scale }}
    />
  );
}

function HeroSequence({ p, frames }) {
  return (
    <>
      {frames.map((frame, i) => (
        <HeroFrame key={frame.key} frame={frame} breakpoints={FRAME_WINDOWS[i]} index={i} p={p} />
      ))}
    </>
  );
}

function DetailOverlay({ item, motionEnabled, onClose, closeLabel }) {
  return (
    <motion.div
      className="interior__detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
      onClick={onClose}
    >
      <img className="interior__detail-backdrop" src={asset(item.backdrop)} alt="" />

      <motion.div
        className="interior__detail-frame"
        initial={motionEnabled ? { opacity: 0, scale: 0.97 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <img className="interior__detail-img" src={asset(item.src)} alt={item.alt} />
        <div className="interior__detail-scrim" />
        <div className="interior__detail-text">
          <p className="interior__detail-head">{item.head}</p>
          <p className="interior__detail-sub">{item.sub}</p>
          {item.services && (
            <ul className="service-list">
              {item.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>

      <button type="button" className="interior__detail-close" onClick={onClose} aria-label={closeLabel}>
        &times;
      </button>
    </motion.div>
  );
}

const AUTO_TOUR_ORDER = ["floor", "cabinetry", "wall"];
const AUTO_TOUR_STEP_MS = 2600;
const AUTO_TOUR_DWELL_MS = 700;

export function InteriorExperience({ motionEnabled }) {
  const { t } = useLanguage();
  const spots = SPOT_META.map((m) => ({ ...m, ...t.interior.spots[m.key] }));

  const [active, setActive] = useState(null);
  const activeSpot = spots.find((s) => s.key === active) || null;

  const sentinelRef = useRef(null);
  const interactedRef = useRef(false);
  const tourStartedRef = useRef(false);
  const tourCancelledRef = useRef(false);

  function closeDetail() {
    interactedRef.current = true;
    tourCancelledRef.current = true;
    document.body.style.overflow = "";
    setActive(null);
  }

  function openDetail(key) {
    interactedRef.current = true;
    tourCancelledRef.current = true;
    document.body.style.overflow = "";
    setActive(key);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeDetail();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!motionEnabled) return undefined;
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    let dwellTimer = null;

    async function runAutoTour() {
      document.body.style.overflow = "hidden";
      for (const key of AUTO_TOUR_ORDER) {
        if (tourCancelledRef.current) break;
        setActive(key);
        await new Promise((resolve) => setTimeout(resolve, AUTO_TOUR_STEP_MS));
      }
      if (!tourCancelledRef.current) setActive(null);
      document.body.style.overflow = "";
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !interactedRef.current && !tourStartedRef.current) {
          dwellTimer = setTimeout(() => {
            if (!interactedRef.current && !tourStartedRef.current) {
              tourStartedRef.current = true;
              runAutoTour();
            }
          }, AUTO_TOUR_DWELL_MS);
        } else if (dwellTimer) {
          clearTimeout(dwellTimer);
          dwellTimer = null;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (dwellTimer) clearTimeout(dwellTimer);
      document.body.style.overflow = "";
    };
  }, [motionEnabled]);

  return (
    <section className="interior" id="craftsmanship" aria-label={t.interior.ariaLabel}>
      <img className="interior__img" src={asset("assets/act0/storefront-drone.jpg")} alt={t.interior.droneAlt} />
      <div className="interior__scrim" />

      <div className="interior__hotspots">
        {spots.map((spot) => (
          <button
            key={spot.key}
            type="button"
            className="interior__hotspot"
            style={{ left: spot.left, top: spot.top }}
            onClick={() => openDetail(spot.key)}
            aria-label={spot.label}
          >
            <span className="interior__hotspot-dot" />
            <span className="interior__hotspot-label">{spot.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeSpot && (
          <DetailOverlay item={activeSpot} motionEnabled={motionEnabled} onClose={closeDetail} closeLabel={t.interior.closeLabel} />
        )}
      </AnimatePresence>

      <div ref={sentinelRef} className="interior__sentinel" aria-hidden="true" />
    </section>
  );
}

function StaticHero({ t }) {
  return (
    <header className="hero hero--static" id="home">
      <img className="hero__bg" src={asset(HERO_POSTER)} alt={t.hero.posterAlt} />
      <div className="hero__scrim" />
      <p className="hero__caption">
        {t.hero.captionLine1}
        <br />
        {t.hero.captionLine2}
      </p>
      <div className="hero__content">
        <h1 className="hero-build__wordmark">{t.hero.wordmark}</h1>
        <p className="hero__subhead">{t.hero.subhead}</p>
      </div>
    </header>
  );
}

export default function Act0Hero() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const p = useSpring(scrollYProgress, { stiffness: 55, damping: 22, mass: 0.4 });

  const cueOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  const heroTextOpacity = useTransform(p, [0, 0.15, 0.3], [1, 1, 0]);
  const heroTextY = useTransform(p, [0, 0.3], [0, -30]);

  if (prefersReducedMotion) {
    return <StaticHero t={t} />;
  }

  const frames = HERO_FRAME_META.map((m) => ({
    key: m.key,
    src: m.src,
    alt: m.key === "exterior" ? t.hero.posterAlt : t.hero.frameAlts[m.altKey],
  }));

  return (
    <>
      <header className="hero-build" id="home" ref={wrapRef}>
        <div className="hero-build__pin">
          <motion.div className="hero-build__bar" style={{ width: progressWidth }} />

          <HeroSequence p={p} frames={frames} />
          <div className="hero-build__scrim" />

          <motion.div
            className="hero-build__caption"
            style={{ opacity: heroTextOpacity }}
            variants={textContainer}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={textItem}>
              {t.hero.captionLine1}
              <br />
              {t.hero.captionLine2}
            </motion.p>
          </motion.div>

          <motion.div
            className="hero-build__final"
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            variants={textContainer}
            initial="hidden"
            animate="show"
          >
            <motion.h1 className="hero-build__wordmark" variants={textItem}>
              {t.hero.wordmark}
            </motion.h1>
            <motion.p className="hero__subhead" variants={textItem}>
              {t.hero.subhead}
            </motion.p>
          </motion.div>

          <motion.div className="hero-build__cue" style={{ opacity: cueOpacity }}>
            <span className="hero-build__mouse" />
            {t.hero.scrollCue}
          </motion.div>
        </div>
      </header>
    </>
  );
}
