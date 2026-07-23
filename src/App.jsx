import Nav from "./components/Nav.jsx";
import Act0Hero from "./components/Act0Hero.jsx";
import StorefrontZoom from "./components/StorefrontZoom.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Act0Hero />
        <StorefrontZoom />
      </main>
    </>
  );
}
