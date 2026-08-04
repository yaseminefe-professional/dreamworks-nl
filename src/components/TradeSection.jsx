import { asset } from "../lib/asset.js";

export default function TradeSection({ id, eyebrow, title, body, services, image, alt }) {
  return (
    <section className="trade" id={id} aria-label={title}>
      <img className="trade__img" src={asset(image)} alt={alt} />
      <div className="trade__scrim" />
      <div className="trade__content">
        <p className="hero__eyebrow">{eyebrow}</p>
        <h2 className="trade__title">{title}</h2>
        <p className="trade__body">{body}</p>
        {services && (
          <ul className="service-list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
