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

  return (
    <nav className={`nav${solid ? " nav--solid" : ""}`}>
      <a className="nav__brand" href="#home">
        <img src={asset("assets/images/logo-dreamworks.png")} alt="DreamWorks" className="nav__logo" />
      </a>
    </nav>
  );
}
