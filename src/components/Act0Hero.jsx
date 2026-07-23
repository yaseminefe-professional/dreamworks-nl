import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { asset } from "../lib/asset.js";

const easeOut = [0.23, 1, 0.32, 1];
const LIGHTING_VIDEO_END = 0.75;

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};
const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const carpentryServices = ["Custom furniture", "Kitchen", "Cabinetry", "Window and door frames", "Doors", "Ceilings"];

const floorServices = [
  "Hardwood and parquet flooring",
  "Tile and natural stone flooring",
  "Vinyl and laminate flooring",
  "Underfloor heating installation",
  "Floor preparation and levelling",
];

const wallServices = [
  "Interior and exterior painting",
  "Wallpaper installation and removal",
  "Plastering and skimming",
  "Drywall installation and repairs",
  "Decorative wall finishes",
];

const signageServices = [
  "Facade advertising",
  "Illuminated signage",
  "LED lettering",
  "Vehicle wraps & lettering",
  "Window film",
  "Signboards",
  "Banners",
  "Interior signage",
];

const spots = [
  {
    key: "floor",
    label: "Floor",
    left: "31%",
    top: "76%",
    src: "assets/act0/storefront-floor-macro.jpg",
    backdrop: "assets/act0/storefront-drone.jpg",
    alt: "Extreme close-up of the light natural stone floor, showing the grain and texture of the material.",
    head: "Handcrafted flooring.",
    sub: "Our flooring work:",
    services: floorServices,
  },
  {
    key: "wall",
    label: "Wall finishing",
    left: "89%",
    top: "42%",
    src: "assets/act0/storefront-wall-macro.jpg",
    backdrop: "assets/act0/storefront-drone.jpg",
    alt: "Extreme close-up of a freshly painted interior wall, showing a smooth, glossy paint finish.",
    head: "Every wall, finished with care.",
    sub: "Our wall finishing work:",
    services: wallServices,
  },
  {
    key: "cabinetry",
    label: "Carpentry",
    left: "64%",
    top: "58%",
    src: "assets/act0/storefront-cabinetry.jpg",
    backdrop: "assets/act0/storefront-drone.jpg",
    alt: "Close-up of custom oak cabinetry showing precise dovetail joinery and blackened-steel hardware.",
    head: "Custom carpentry.",
    sub: "Built in-house, joint by joint. Our carpentry work:",
    services: carpentryServices,
  },
];

const signageSpot = {
  key: "signage",
  label: "Signage",
  left: "42%",
  top: "24%",
  src: "assets/act0/facade-after.jpg",
  backdrop: "assets/act0/facade-after.jpg",
  alt: "The lit DreamWorks sign glowing above the shopfront entrance at night.",
  head: "Advertising & signage.",
  sub: "Everything it takes to be seen:",
  services: signageServices,
};

function LightingVideo({ progress }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const t = Math.min(1, Math.max(0, latest / LIGHTING_VIDEO_END));
    video.currentTime = t * duration;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Nudge the browser to decode and paint the first frame right away,
    // instead of leaving the element blank/black until a seek lands.
    const playPromise = video.play();
    if (playPromise) {
      playPromise
        .then(() => video.pause())
        .catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-build__img"
      src={asset("assets/act0/facade-lighting.mp4")}
      poster={asset("assets/act0/facade-before.jpg")}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
    />
  );
}

function DetailOverlay({ item, motionEnabled, onClose }) {
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

      <button type="button" className="interior__detail-close" onClick={onClose} aria-label="Back to overview">
        &times;
      </button>
    </motion.div>
  );
}

const AUTO_TOUR_ORDER = ["floor", "cabinetry", "wall"];
const AUTO_TOUR_STEP_MS = 2600;
const AUTO_TOUR_DWELL_MS = 700;

function InteriorExperience({ motionEnabled }) {
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
            onClick={() => openDetail(spot.key)}
            aria-label={`See ${spot.label} in detail`}
          >
            <span className="interior__hotspot-dot" />
            <span className="interior__hotspot-label">{spot.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeSpot && <DetailOverlay item={activeSpot} motionEnabled={motionEnabled} onClose={closeDetail} />}
      </AnimatePresence>

      <div ref={sentinelRef} className="interior__sentinel" aria-hidden="true" />
    </section>
  );
}

function SignageHotspot({ opacityStyle, pointerEventsStyle, motionEnabled }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.div className="interior__hotspots" style={{ opacity: opacityStyle, pointerEvents: pointerEventsStyle }}>
        <button
          type="button"
          className="interior__hotspot"
          style={{ left: signageSpot.left, top: signageSpot.top }}
          onClick={() => setOpen(true)}
          aria-label={`See ${signageSpot.label} in detail`}
        >
          <span className="interior__hotspot-dot" />
          <span className="interior__hotspot-label">{signageSpot.label}</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && <DetailOverlay item={signageSpot} motionEnabled={motionEnabled} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function StaticHero() {
  const [open, setOpen] = useState(false);

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
        <div className="interior__hotspots">
          <button
            type="button"
            className="interior__hotspot"
            style={{ left: signageSpot.left, top: signageSpot.top }}
            onClick={() => setOpen(true)}
            aria-label={`See ${signageSpot.label} in detail`}
          >
            <span className="interior__hotspot-dot" />
            <span className="interior__hotspot-label">{signageSpot.label}</span>
          </button>
        </div>
        <AnimatePresence>
          {open && <DetailOverlay item={signageSpot} motionEnabled={false} onClose={() => setOpen(false)} />}
        </AnimatePresence>
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

  const heroTextOpacity = useTransform(p, [0, 0.15, 0.3], [1, 1, 0]);
  const heroTextY = useTransform(p, [0, 0.3], [0, -30]);

  // Facade: a locked-off video scrubbed by scroll does the dark -> lit
  // lighting change. The frame never moves; only the lighting animates.
  // It holds on its final lit frame until the pin releases directly into
  // the hotspot interior below, no intermediate static reveal.
  const signageHotspotOpacity = useTransform(p, [0.62, 0.72, 1], [0, 1, 1]);
  const signageHotspotPointerEvents = useTransform(p, (v) => (v > 0.64 ? "auto" : "none"));

  if (prefersReducedMotion) {
    return <StaticHero />;
  }

  return (
    <>
      <header className="hero-build" id="home" ref={wrapRef}>
        <div className="hero-build__pin">
          <motion.div className="hero-build__bar" style={{ width: progressWidth }} />

          <LightingVideo progress={scrollYProgress} />
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

          <SignageHotspot opacityStyle={signageHotspotOpacity} pointerEventsStyle={signageHotspotPointerEvents} motionEnabled={!prefersReducedMotion} />

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
