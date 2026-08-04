import { useReducedMotion } from "framer-motion";
import Nav from "./components/Nav.jsx";
import Act0Hero from "./components/Act0Hero.jsx";
import { InteriorExperience } from "./components/Act0Hero.jsx";
import TradeSection from "./components/TradeSection.jsx";
import WhoWeAre from "./components/WhoWeAre.jsx";

const tradeSections = [
  {
    id: "signage-work",
    eyebrow: "DreamWorks · Advertising & Signage",
    title: "Signage that gets you seen.",
    body: "We design, fabricate, and install every kind of signage in-house, from illuminated letters to full vehicle wraps.",
    image: "assets/trades/signage.jpg",
    alt: "A craftsman assembling an illuminated LED channel letter in a signage workshop at night.",
    services: [
      "Facade advertising",
      "Illuminated signage",
      "LED lettering",
      "Vehicle wraps & lettering",
      "Window film",
      "Signboards",
      "Banners",
      "Interior signage",
    ],
  },
  {
    id: "construction",
    eyebrow: "DreamWorks · Construction & Development",
    title: "Built from the ground up.",
    body: "From acquisition to a finished building, we manage new-build construction, renovation, and transformation projects start to finish.",
    image: "assets/trades/construction.jpg",
    alt: "A building under renovation with scaffolding, exposed steel framing, and blueprints on a sawhorse.",
    services: ["New-build construction", "Renovation", "Transformation", "Permit management", "Real estate acquisition", "Investment projects"],
  },
  {
    id: "painting",
    eyebrow: "DreamWorks · Wall Finishing",
    title: "Every wall, finished with care.",
    body: "Interior and exterior painting, wallpaper, and plastering, done to a standard that holds up close.",
    image: "assets/trades/painting.jpg",
    alt: "A painter's roller applying fresh off-white paint to an interior wall.",
    services: ["Interior and exterior painting", "Wallpaper installation and removal", "Plastering and skimming", "Drywall installation and repairs", "Decorative wall finishes"],
  },
  {
    id: "demolition",
    eyebrow: "DreamWorks · Demolition",
    title: "Clear the way, safely.",
    body: "Full demolition, strip-outs, and precision concrete cutting and drilling, handled safely and cleared fast, so the next phase can start on schedule.",
    image: "assets/trades/drilling.jpg",
    alt: "A diamond core drill boring a precise hole through a concrete wall, water cooling the bit.",
    services: ["Full demolition", "Bathroom strip-outs", "Kitchen strip-outs", "General strip-out work", "Concrete cutting & drilling", "Construction waste removal"],
  },
];

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Nav />
      <main id="main">
        <Act0Hero />
        <WhoWeAre />
        {tradeSections.map((section) => (
          <TradeSection key={section.id} {...section} />
        ))}
        <InteriorExperience motionEnabled={!prefersReducedMotion} />
      </main>
    </>
  );
}
