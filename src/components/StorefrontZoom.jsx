import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { asset } from "../lib/asset.js";

const shots = [
  {
    key: "exterior",
    src: "assets/act0/facade-after.jpg",
    alt: "The lit DreamWorks storefront on an Amsterdam canal street at night, sign glowing above the entrance.",
  },
  {
    key: "interior",
    src: "assets/act0/storefront-interior.jpg",
    alt: "Inside the DreamWorks storefront: a warm gallery-like space with exposed wood beams, shelving, and a large painting on the wall.",
  },
  {
    key: "floor",
    src: "assets/act0/storefront-floor-detail.jpg",
    alt: "Close-up of the light stone floor and the corner of a neutral abstract painting on the plaster wall above it.",
  },
  {
    key: "cabinetry",
    src: "assets/act0/storefront-cabinetry.jpg",
    alt: "Close-up of custom oak cabinetry showing precise dovetail joinery and blackened-steel hardware, warm light raking across the wood grain.",
  },
];

function StaticStorefrontZoom() {
  return (
    <section className="zoom-static" aria-label="From storefront to craftsmanship">
      {shots.map((shot) => (
        <figure className="zoom-static__frame" key={shot.key}>
          <img className="zoom-static__img" src={asset(shot.src)} alt={shot.alt} />
        </figure>
      ))}
      <div className="zoom-static__captions">
        <p>Every detail, considered.</p>
        <p>Custom carpentry, built in-house.</p>
      </div>
    </section>
  );
}

export default function StorefrontZoom() {
  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);

  const exteriorOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const interiorOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const floorOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.68, 0.78], [0, 1, 1, 0]);
  const cabinetryOpacity = useTransform(scrollYProgress, [0.68, 0.78, 1], [0, 1, 1]);

  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

  const floorCaptionOpacity = useTransform(scrollYProgress, [0.55, 0.62, 0.72, 0.78], [0, 1, 1, 0]);
  const cabinetryCaptionOpacity = useTransform(scrollYProgress, [0.78, 0.85, 0.92], [0, 1, 1]);

  if (prefersReducedMotion) {
    return <StaticStorefrontZoom />;
  }

  return (
    <section className="zoom" ref={wrapRef} aria-label="From storefront to craftsmanship">
      <div className="zoom__pin">
        <motion.img
          className="zoom__img"
          style={{ opacity: exteriorOpacity, scale }}
          src={asset(shots[0].src)}
          alt={shots[0].alt}
        />
        <motion.img
          className="zoom__img"
          style={{ opacity: interiorOpacity, scale }}
          src={asset(shots[1].src)}
          alt={shots[1].alt}
        />
        <motion.img
          className="zoom__img"
          style={{ opacity: floorOpacity, scale }}
          src={asset(shots[2].src)}
          alt={shots[2].alt}
        />
        <motion.img
          className="zoom__img"
          style={{ opacity: cabinetryOpacity, scale }}
          src={asset(shots[3].src)}
          alt={shots[3].alt}
        />

        <div className="zoom__scrim" />

        <motion.div
          className="hero-build__final zoom__text"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          <p className="hero__eyebrow">DreamWorks &middot; Advertising &amp; Signage</p>
          <h1 className="hero__title">
            No signage? No visibility?
            <br />
            No problem.
          </h1>
          <p className="hero__subhead">A business that can&rsquo;t be seen doesn&rsquo;t exist yet. We make sure yours does.</p>
        </motion.div>

        <motion.p className="zoom__caption" style={{ opacity: floorCaptionOpacity }}>
          Every detail, considered.
        </motion.p>
        <motion.p className="zoom__caption" style={{ opacity: cabinetryCaptionOpacity }}>
          Custom carpentry, built in-house.
        </motion.p>
      </div>
    </section>
  );
}
