import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "./Logo.jsx";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const easeOut = [0.23, 1, 0.32, 1];

export default function Nav() {
  const { t } = useLanguage();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");

    const onScroll = () => {
      if (!hero) {
        setSolid(window.scrollY > 80);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setSolid(rect.bottom < window.innerHeight * 0.6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function jumpTo(e, id) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const leftLinks = [
    { id: "who-we-are", label: t.nav.whoWeAre },
    { id: "garden", label: t.nav.garden },
    { id: "carpentry", label: t.nav.carpentry },
    { id: "demolition", label: t.nav.demolition },
  ];

  const rightLinks = [
    { id: "development", label: t.nav.development },
    { id: "signage-work", label: t.nav.signage },
  ];

  const allLinks = [...leftLinks, ...rightLinks, { id: "contact", label: t.nav.contact }];

  return (
    <>
      <nav className={`nav${solid || menuOpen ? " nav--solid" : ""}`}>
        <div className="nav__group nav__group--left">
          {leftLinks.map((link) => (
            <a key={link.id} className="nav__pill" href={`#${link.id}`} onClick={(e) => jumpTo(e, link.id)}>
              {link.label}
            </a>
          ))}
        </div>

        <a className="nav__brand" href="#home" aria-label={t.nav.backToTop}>
          <LogoMark className="nav__logo" />
        </a>

        <div className="nav__group nav__group--right">
          {rightLinks.map((link) => (
            <a key={link.id} className="nav__pill" href={`#${link.id}`} onClick={(e) => jumpTo(e, link.id)}>
              {link.label}
            </a>
          ))}
          <a className="nav__pill nav__pill--cta" href="#contact" onClick={(e) => jumpTo(e, "contact")}>
            {t.nav.contact}
          </a>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className={`nav__burger${menuOpen ? " nav__burger--open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="nav__mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            {allLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => jumpTo(e, link.id)}>
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
          </motion.div>
        )}
      </AnimatePresence>

      <a className="nav__tab" href="#contact" onClick={(e) => jumpTo(e, "contact")}>
        {t.nav.getQuote}
      </a>
    </>
  );
}
