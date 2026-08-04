import { useEffect, useState } from "react";
import { asset } from "../lib/asset.js";

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

  const links = [
    { id: "signage-work", label: "Signage" },
    { id: "construction", label: "Construction" },
    { id: "painting", label: "Wall finishing" },
    { id: "demolition", label: "Demolition" },
    { id: "drilling", label: "Concrete drilling" },
    { id: "craftsmanship", label: "Craftsmanship" },
  ];

  return (
    <nav className={`nav${solid ? " nav--solid" : ""}`}>
      <a className="nav__brand" href="#home">
        <img src={asset("assets/images/logo-dreamworks.png")} alt="DreamWorks" className="nav__logo" />
      </a>
      <div className="nav__links">
        {links.map((link) => (
          <a key={link.id} className="nav__link" href={`#${link.id}`} onClick={(e) => jumpTo(e, link.id)}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
