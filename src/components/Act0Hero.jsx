import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
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

const staticFrames = [
  {
    key: "drone",
    src: "assets/act0/storefront-drone.jpg",
    alt: "An elevated, drone-like view of the DreamWorks interior just through the front door: exposed beams, shelving, a large painting, and the stone floor, all visible in one sweep.",
    caption: null,
  },
  {
    key: "cabinetry",
    src: "assets/act0/storefront-cabinetry.jpg",
    alt: "Close-up of custom oak cabinetry showing precise dovetail joinery and blackened-steel hardware.",
    caption: "Custom carpentry, built in-house.",
  },
];

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
      <section className="zoom-static" aria-label="Inside DreamWorks: from the door to the craftsmanship">
        {staticFrames.map((frame) => (
          <figure className="zoom-static__frame" key={frame.key}>
            <img className="zoom-static__img" src={asset(frame.src)} alt={frame.alt} />
          </figure>
        ))}
        <div className="zoom-static__captions">
          <p>Every detail, considered.</p>
          <p>Custom carpentry, built in-house.</p>
        </div>
      </section>
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

  // Raw progress drives the visual progress bar so it reads the true scroll
  // position; everything else rides a springed value for fluid, lerped motion.
  const progressWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const p = useSpring(scrollYProgress, { stiffness: 55, damping: 22, mass: 0.4 });

  const cueOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  const heroTextOpacity = useTransform(p, [0, 0.12, 0.22], [1, 1, 0]);
  const heroTextY = useTransform(p, [0, 0.22], [0, -30]);

  // ---- Facade: dark -> lit, then a hard push toward the door ----
  const beforeOpacity = useTransform(p, [0, 0.14, 0.2], [1, 1, 0]);
  const afterOpacity = useTransform(p, [0.12, 0.2, 0.38, 0.46], [0, 1, 1, 0]);
  const facadeScale = useTransform(p, [0, 0.2, 0.3, 0.46], [1, 1.04, 1.12, 2.3]);
  const flashOpacity = useTransform(p, [0.38, 0.44, 0.5], [0, 1, 0]);

  // ---- Interior: one continuous canvas. Camera pans/zooms across the SAME
  // photo for the floor and wall beats (true crops, no swap); only the final
  // cabinet beat blends into a macro detail shot for real joinery resolution. ----
  const baseOpacity = useTransform(p, [0.42, 0.5], [0, 1]);

  const baseScale = useTransform(
    p,
    [0.5, 0.56, 0.68, 0.74, 0.8, 0.88, 0.92, 0.98],
    [1.05, 1.05, 2.3, 1.55, 2.35, 1.65, 2.15, 2.15]
  );
  const baseX = useTransform(
    p,
    [0.5, 0.56, 0.68, 0.74, 0.8, 0.88, 0.92, 0.98],
    ["0%", "0%", "24%", "8%", "-32%", "-6%", "-14%", "-14%"]
  );
  const baseY = useTransform(
    p,
    [0.5, 0.56, 0.68, 0.74, 0.8, 0.88, 0.92, 0.98],
    ["0%", "0%", "-28%", "-8%", "2%", "-4%", "-10%", "-10%"]
  );

  const cabinetOpacity = useTransform(p, [0.92, 0.97], [0, 1]);
  const cabinetBlur = useTransform(p, [0.92, 0.96, 1], [8, 0, 0]);
  const baseBlurAtEnd = useTransform(p, [0.92, 0.97], [0, 6]);
  const cabinetScale = useTransform(p, [0.92, 1], [1.3, 1.12]);

  const floorCaptionOpacity = useTransform(p, [0.6, 0.66, 0.72, 0.76], [0, 1, 1, 0]);
  const wallCaptionOpacity = useTransform(p, [0.8, 0.85, 0.9, 0.93], [0, 1, 1, 0]);
  const cabinetCaptionOpacity = useTransform(p, [0.95, 0.98, 1], [0, 1, 1]);

  const blurFilter = useTransform(baseBlurAtEnd, (v) => `blur(${v}px)`);
  const cabinetBlurFilter = useTransform(cabinetBlur, (v) => `blur(${v}px)`);

  if (prefersReducedMotion) {
    return <StaticHero />;
  }

  return (
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

        <motion.img
          className="hero-build__img"
          style={{ opacity: baseOpacity, scale: baseScale, x: baseX, y: baseY, filter: blurFilter }}
          src={asset(staticFrames[0].src)}
          alt={staticFrames[0].alt}
        />
        <motion.img
          className="hero-build__img"
          style={{ opacity: cabinetOpacity, scale: cabinetScale, filter: cabinetBlurFilter }}
          src={asset(staticFrames[1].src)}
          alt={staticFrames[1].alt}
        />

        <motion.div
          className="hero-build__flash"
          style={{ opacity: flashOpacity, background: `radial-gradient(circle at ${DOOR_ORIGIN}, rgba(255,244,214,1) 0%, rgba(255,244,214,0.9) 35%, rgba(255,244,214,0.3) 65%, transparent 100%)` }}
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

        <motion.div className="zoom__caption" style={{ opacity: floorCaptionOpacity }}>
          <p className="zoom__caption-head">Handcrafted flooring.</p>
          <p className="zoom__caption-sub">Cut, laid, and finished by hand.</p>
        </motion.div>
        <motion.div className="zoom__caption" style={{ opacity: wallCaptionOpacity }}>
          <p className="zoom__caption-head">Curated details.</p>
          <p className="zoom__caption-sub">Every finish chosen with intent.</p>
        </motion.div>
        <motion.div className="zoom__caption" style={{ opacity: cabinetCaptionOpacity }}>
          <p className="zoom__caption-head">Custom carpentry.</p>
          <p className="zoom__caption-sub">Built in-house, joint by joint.</p>
        </motion.div>

        <motion.div className="hero-build__cue" style={{ opacity: cueOpacity }}>
          <span className="hero-build__mouse" />
          Scroll to build
        </motion.div>
      </div>
    </header>
  );
}
