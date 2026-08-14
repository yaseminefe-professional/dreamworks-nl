import { useEffect, useState } from "react";
import { LogoMark } from "./Logo.jsx";

export default function Nav() {
  const [solid, setSolid] = useState(false);

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

  function jumpTo(e, id) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const leftLinks = [
    { id: "who-we-are", label: "Who we are" },
    { id: "garden", label: "Garden" },
    { id: "carpentry", label: "Carpentry" },
    { id: "demolition", label: "Demolition" },
  ];

  const rightLinks = [
    { id: "development", label: "Development" },
    { id: "signage-work", label: "Signage" },
    { id: "craftsmanship", label: "Craftsmanship" },
  ];

  return (
    <>
      <nav className={`nav${solid ? " nav--solid" : ""}`}>
        <div className="nav__group nav__group--left">
          {leftLinks.map((link) => (
            <a key={link.id} className="nav__pill" href={`#${link.id}`} onClick={(e) => jumpTo(e, link.id)}>
              {link.label}
            </a>
          ))}
        </div>

        <a className="nav__brand" href="#home" aria-label="DreamWorks, back to top">
          <LogoMark className="nav__logo" />
        </a>

        <div className="nav__group nav__group--right">
          {rightLinks.map((link) => (
            <a key={link.id} className="nav__pill" href={`#${link.id}`} onClick={(e) => jumpTo(e, link.id)}>
              {link.label}
            </a>
          ))}
          <a className="nav__pill nav__pill--cta" href="#contact" onClick={(e) => jumpTo(e, "contact")}>
            Contact
          </a>
        </div>
      </nav>

      <a className="nav__tab" href="#contact" onClick={(e) => jumpTo(e, "contact")}>
        Get a quote
      </a>
    </>
  );
}
