import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { asset } from "../lib/asset.js";

const easeOut = [0.23, 1, 0.32, 1];

function ServiceItem({ service, progress, start, span }) {
  const opacity = useTransform(progress, [start, start + span], [0, 1]);
  const x = useTransform(progress, [start, start + span], [-16, 0]);
  return <motion.li style={{ opacity, x }}>{service}</motion.li>;
}

export default function TradeSection({ id, eyebrow, title, body, services, image, alt, variant = "letterbox" }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const titleClip = useTransform(scrollYProgress, [0.14, 0.32], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const bodyOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.3, 0.4], [16, 0]);

  const imgStyle = prefersReducedMotion ? undefined : { scale: imgScale };
  const titleStyle = prefersReducedMotion ? undefined : { clipPath: titleClip };
  const bodyStyle = prefersReducedMotion ? undefined : { opacity: bodyOpacity, y: bodyY };

  const kicker = <p className="interlude__kicker">{eyebrow}</p>;
  const coords = <p className="trade__coords">[ The Netherlands ]</p>;
  const titleEl = (
    <motion.h2 className="trade__title" style={titleStyle}>
      {title}
    </motion.h2>
  );
  const bodyEl = (
    <motion.p className="trade__body" style={bodyStyle}>
      {body}
    </motion.p>
  );

  const inlineServices = services && <p className="trade__services-inline">{services.join(" · ")}</p>;

  const staggeredServices = services && (
    <ul className="service-list">
      {services.map((service, i) =>
        prefersReducedMotion ? (
          <li key={service}>{service}</li>
        ) : (
          <ServiceItem key={service} service={service} progress={scrollYProgress} start={0.2 + i * 0.025} span={0.08} />
        )
      )}
    </ul>
  );

  const img = <motion.img className="trade__photo" style={imgStyle} src={asset(image)} alt={alt} />;

  return (
    <section className={`trade trade--${variant}`} id={id} ref={ref} aria-label={title}>
      {variant === "diptych" && (
        <div className="trade-diptych">
          <div className="trade-diptych__media">{img}</div>
          <div className="trade-diptych__copy">
            {kicker}
            {coords}
            {titleEl}
            {bodyEl}
            {staggeredServices}
          </div>
        </div>
      )}

      {variant === "plate" && (
        <div className="trade-plate">
          <div className="trade-plate__frame">
            {img}
            <div className="trade-plate__grid" aria-hidden="true" />
          </div>
          <p className="trade-plate__annotation">Fig. 01 — {title}</p>
          <div className="trade__body-wrap">
            {kicker}
            {titleEl}
            {bodyEl}
            {staggeredServices}
          </div>
        </div>
      )}

      {variant === "contrast" && (
        <>
          {img}
          <div className="trade-contrast__scrim" />
          <div className="trade-contrast__content">
            {kicker}
            {coords}
            {titleEl}
            {bodyEl}
            {staggeredServices}
          </div>
        </>
      )}

      {(variant === "letterbox" || variant === "closing") && (
        <>
          <div className="trade-letterbox__heading">
            {kicker}
            {titleEl}
          </div>
          <div className="trade-letterbox__media">{img}</div>
          <div className="trade__body-wrap">
            {coords}
            {bodyEl}
            {inlineServices}
          </div>
        </>
      )}
    </section>
  );
}

export function Connector({ children }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="trade-connector">
      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        {children}
      </motion.p>
    </div>
  );
}
