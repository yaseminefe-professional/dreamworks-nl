import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Seam({ from, to }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const gooOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const blobAY = useTransform(scrollYProgress, [0, 0.5, 1], ["-55%", "0%", "55%"]);
  const blobBY = useTransform(scrollYProgress, [0, 0.5, 1], ["55%", "0%", "-55%"]);
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.4, 0.7]);

  const gradient = `linear-gradient(180deg, ${from}, ${to})`;

  if (prefersReducedMotion) {
    return <div className="seam" style={{ background: gradient }} aria-hidden="true" />;
  }

  return (
    <div className="seam" ref={ref} aria-hidden="true">
      <div className="seam__gradient" style={{ background: gradient }} />
      <motion.div className="seam__goo" style={{ opacity: gooOpacity }}>
        <motion.span
          className="seam__blob"
          style={{ left: "35%", background: from, y: blobAY, scale: blobScale }}
        />
        <motion.span
          className="seam__blob"
          style={{ left: "65%", background: to, y: blobBY, scale: blobScale }}
        />
      </motion.div>
    </div>
  );
}
