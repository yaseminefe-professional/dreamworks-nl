import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { asset } from "../lib/asset.js";

export default function Nav() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  const background = useTransform(
    scrollY,
    [0, 80],
    ["rgba(243, 241, 234, 0)", "rgba(243, 241, 234, 0.92)"]
  );
  const blur = useTransform(scrollY, [0, 80], [0, 10]);
  const navFg = useTransform(scrollY, [0, 80], ["#f3f1ea", "#1b1a17"]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const boxShadow = useTransform(
    shadowOpacity,
    (v) => `0 1px 0 rgba(216, 211, 198, ${v})`
  );

  const links = [
    { href: "#garden", label: t.nav.garden },
    { href: "#carpentry", label: t.nav.carpentry },
    { href: "#demolition", label: t.nav.demolition },
    { href: "#development", label: t.nav.development },
    { href: "#signage", label: t.nav.signage },
  ];

  return (
    <motion.nav
      className="nav"
      style={{
        background,
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        boxShadow,
        "--nav-fg": navFg,
      }}
    >
      <a className="nav__brand" href="#home">
        <img src={asset("assets/images/logo-dreamworks.png")} alt="DreamWorks" className="nav__logo" />
      </a>

      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Menu</span>
        <span className="nav__toggle-bar" />
      </button>

      <div className="nav__links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <LanguageSwitcher />
        <a href="#contact" className="nav__cta">
          {t.nav.cta}
        </a>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-menu"
            className="nav__menu"
            initial={{ opacity: 0, scaleY: 0.9 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.9 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
            <a href="#contact" className="nav__cta" onClick={() => setOpen(false)}>
              {t.nav.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
