import { LanguageProvider, useLanguage } from "./i18n/LanguageContext.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ValueProps from "./components/ValueProps.jsx";
import Process from "./components/Process.jsx";
import World from "./components/World.jsx";
import SignageWorld from "./components/SignageWorld.jsx";
import Seam from "./components/Seam.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { asset } from "./lib/asset.js";

const WORLD_COLORS = {
  garden: ["#f3f1ea", "#3f5c3b"],
  carpentry: ["#3f5c3b", "#8b5a2b"],
  demolition: ["#8b5a2b", "#232320"],
  development: ["#232320", "#1f3a5f"],
  signage: ["#1f3a5f", "#101014"],
};

function SiteContent() {
  const { t } = useLanguage();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <ValueProps />
        <Process />

        <Seam from={WORLD_COLORS.garden[0]} to={WORLD_COLORS.garden[1]} />
        <World
          id="garden"
          mediaType="video"
          mediaSrc={asset("assets/video/garden-transformation.mp4")}
          poster={asset("assets/images/service-garden-poster.png")}
          ariaLabel="A finished garden with a wooden summerhouse, a freshly planted flower bed, a greenhouse, and a lawn."
          label={t.garden.label}
          titleLines={t.garden.title}
          copy={t.garden.copy}
          spec={t.garden.spec}
          ctaLabel={t.garden.cta}
        />

        <Seam from={WORLD_COLORS.carpentry[0]} to={WORLD_COLORS.carpentry[1]} />
        <World
          id="carpentry"
          reverse
          mediaType="image"
          mediaSrc={asset("assets/images/service-carpentry.png")}
          ariaLabel="A carpentry workshop with a half-built oak kitchen cabinet frame, wood shavings on the floor, and hand tools on a workbench."
          label={t.carpentry.label}
          titleLines={t.carpentry.title}
          copy={t.carpentry.copy}
          spec={t.carpentry.spec}
          ctaLabel={t.carpentry.cta}
        />

        <Seam from={WORLD_COLORS.demolition[0]} to={WORLD_COLORS.demolition[1]} />
        <World
          id="demolition"
          mediaType="image"
          mediaSrc={asset("assets/images/service-demolition.png")}
          ariaLabel="A demolition site with a partially demolished wall exposing brick and rebar, concrete rubble, and a hydraulic breaker."
          label={t.demolition.label}
          titleLines={t.demolition.title}
          copy={t.demolition.copy}
          spec={t.demolition.spec}
          ctaLabel={t.demolition.cta}
        />

        <Seam from={WORLD_COLORS.development[0]} to={WORLD_COLORS.development[1]} />
        <World
          id="development"
          reverse
          mediaType="image"
          mediaSrc={asset("assets/images/service-development.png")}
          ariaLabel="A new-build construction site at dusk with a structural steel and concrete frame, a crane, and blueprints laid on a site table."
          label={t.development.label}
          titleLines={t.development.title}
          copy={t.development.copy}
          spec={t.development.spec}
          ctaLabel={t.development.cta}
        />

        <Seam from={WORLD_COLORS.signage[0]} to={WORLD_COLORS.signage[1]} />
        <SignageWorld />

        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      {/* Shared goo filter for the liquid world-to-world seam transitions */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="seam-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
            result="goo"
          />
        </filter>
      </svg>
      <SiteContent />
    </LanguageProvider>
  );
}
