import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LOGO_VIEWBOX, LOGO_ROOF_PATH } from "./Logo.jsx";

const easeOut = [0.23, 1, 0.32, 1];
const HOLD_MS = 2800;

export default function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, HOLD_MS);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          aria-hidden="true"
        >
          <svg viewBox={LOGO_VIEWBOX} className="preloader__svg">
            <motion.path
              d={LOGO_ROOF_PATH}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.1 }}
            />
            <motion.path
              d={LOGO_ROOF_PATH}
              fill="var(--brand)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 1.1 }}
            />
          </svg>
          <motion.p
            className="preloader__word"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 1.5 }}
          >
            DreamWorks
          </motion.p>
          <motion.p
            className="preloader__tagline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 1.8 }}
          >
            Where your dreams come true.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
