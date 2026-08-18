import { useReducedMotion } from "framer-motion";
import Preloader from "./components/Preloader.jsx";
import Nav from "./components/Nav.jsx";
import GridGuides from "./components/GridGuides.jsx";
import Act0Hero from "./components/Act0Hero.jsx";
import { InteriorExperience } from "./components/Act0Hero.jsx";
import TradeSection, { Connector } from "./components/TradeSection.jsx";
import { Manifesto, ProcessInterlude, Closing } from "./components/Interlude.jsx";
import Contact from "./components/Contact.jsx";
import { useLanguage } from "./i18n/LanguageContext.jsx";

const TRADE_META = [
  { key: "garden", id: "garden", variant: "letterbox", image: "assets/trades/garden.jpg" },
  { key: "carpentry", id: "carpentry", variant: "diptych", image: "assets/trades/carpentry.jpg" },
  { key: "demolition", id: "demolition", variant: "contrast", image: "assets/trades/drilling.jpg" },
  { key: "development", id: "development", variant: "plate", image: "assets/trades/construction.jpg" },
  { key: "signage", id: "signage-work", variant: "closing", image: "assets/trades/signage.jpg" },
];

const SIGNAGE_EXAMPLE_SRCS = [
  "assets/trades/signage-examples/dunkin.jpg",
  "assets/trades/signage-examples/jut-jul.jpg",
  "assets/trades/signage-examples/smashed.jpg",
];

export default function App() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const tradeSections = TRADE_META.map((meta) => {
    const data = t.trades[meta.key];
    const section = { ...meta, ...data };
    if (meta.key === "signage") {
      section.examples = SIGNAGE_EXAMPLE_SRCS.map((src, i) => ({ src, ...data.examples[i] }));
    }
    return section;
  });

  return (
    <>
      <Preloader />
      <Nav />
      <GridGuides />
      <main id="main">
        <Act0Hero />
        <Manifesto />

        <TradeSection {...tradeSections[0]} />
        <Connector>{t.connectors[0]}</Connector>

        <TradeSection {...tradeSections[1]} />
        <Connector>{t.connectors[1]}</Connector>

        <TradeSection {...tradeSections[2]} />
        <Connector>{t.connectors[2]}</Connector>

        <TradeSection {...tradeSections[3]} />
        <Connector>{t.connectors[3]}</Connector>

        <TradeSection {...tradeSections[4]} />
        <ProcessInterlude />

        <InteriorExperience motionEnabled={!prefersReducedMotion} />
        <Closing />
        <Contact />
      </main>
    </>
  );
}
