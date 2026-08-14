import { useReducedMotion } from "framer-motion";
import Nav from "./components/Nav.jsx";
import GridGuides from "./components/GridGuides.jsx";
import Act0Hero from "./components/Act0Hero.jsx";
import { InteriorExperience } from "./components/Act0Hero.jsx";
import TradeSection, { Connector } from "./components/TradeSection.jsx";
import { Manifesto, ProcessInterlude, Closing } from "./components/Interlude.jsx";
import Contact from "./components/Contact.jsx";

const tradeSections = [
  {
    id: "garden",
    variant: "letterbox",
    eyebrow: "DreamWorks · Garden & Landscaping",
    title: "A garden built to be used, not just looked at.",
    body: "We design and build the whole outdoor space, then keep it that way. Paving, fencing, decking, and planting, laid out to work for how you actually live.",
    image: "assets/trades/garden.jpg",
    alt: "A landscaper laying natural stone pavers on a garden path in warm late-afternoon light.",
    services: ["Garden design & construction", "Garden maintenance", "Paving", "Fencing", "Carports & canopies", "Decking", "Artificial grass", "Planting"],
  },
  {
    id: "carpentry",
    variant: "diptych",
    eyebrow: "DreamWorks · Carpentry",
    title: "Built by hand, made to last.",
    body: "Custom furniture, kitchens, and cabinetry, cut and joined in our own workshop. If it is made of wood, we build it, fit it, and finish it ourselves.",
    image: "assets/trades/carpentry.jpg",
    alt: "A carpenter's hands guiding a chisel into an oak cabinet joint on a workshop bench at night.",
    services: ["Custom furniture", "Kitchens", "Cabinetry", "Window & door frames", "Doors", "Ceilings", "Flooring", "Renovations"],
  },
  {
    id: "demolition",
    variant: "contrast",
    eyebrow: "DreamWorks · Demolition",
    title: "Clear the way, safely.",
    body: "Full demolition, strip-outs, and precision concrete cutting and drilling, handled safely and cleared fast, so the next phase can start on schedule.",
    image: "assets/trades/drilling.jpg",
    alt: "A diamond core drill boring a precise hole through a concrete wall, water cooling the bit.",
    services: ["Full demolition", "Bathroom strip-outs", "Kitchen strip-outs", "General strip-out work", "Concrete cutting & drilling", "Construction waste removal"],
  },
  {
    id: "development",
    variant: "plate",
    eyebrow: "DreamWorks · Property Development",
    title: "From acquisition to a finished building.",
    body: "We buy, develop, and transform property from the ground up, managing permits and investment along the way, so what starts on paper ends as a finished, occupied building.",
    image: "assets/trades/construction.jpg",
    alt: "A building under renovation with scaffolding, exposed steel framing, and blueprints on a sawhorse.",
    services: ["Real estate acquisition", "Development", "New-build construction", "Renovation", "Transformation", "Permit management", "Investment projects"],
  },
  {
    id: "signage-work",
    variant: "closing",
    eyebrow: "DreamWorks · Advertising & Signage",
    title: "Signage that gets you seen.",
    body: "We design, fabricate, and install every kind of signage in-house, from illuminated letters to full vehicle wraps.",
    image: "assets/trades/signage.jpg",
    alt: "A craftsman assembling an illuminated LED channel letter in a signage workshop at night.",
    services: ["Facade advertising", "Illuminated signage", "LED lettering", "Vehicle wraps & lettering", "Window film", "Signboards", "Banners", "Interior signage"],
    examples: [
      { src: "assets/trades/signage-examples/dunkin.jpg", alt: "Backlit illuminated Dunkin' cup logo sign", label: "Dunkin'" },
      { src: "assets/trades/signage-examples/jut-jul.jpg", alt: "Illuminated circular Jut & Jul facade sign at dusk", label: "Jut & Jul" },
      { src: "assets/trades/signage-examples/smashed.jpg", alt: "Backlit Smashed logo lettering on an interior wall", label: "Smashed" },
    ],
  },
];

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Nav />
      <GridGuides />
      <main id="main">
        <Act0Hero />
        <Manifesto />

        <TradeSection {...tradeSections[0]} />
        <Connector>Then the work moves indoors.</Connector>

        <TradeSection {...tradeSections[1]} />
        <Connector>Some things come down before they go up.</Connector>

        <TradeSection {...tradeSections[2]} />
        <Connector>Out of the rubble, a plan.</Connector>

        <TradeSection {...tradeSections[3]} />
        <Connector>The building gets its name in light.</Connector>

        <TradeSection {...tradeSections[4]} />
        <ProcessInterlude />

        <InteriorExperience motionEnabled={!prefersReducedMotion} />
        <Closing />
        <Contact />
      </main>
    </>
  );
}
