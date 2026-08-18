import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { asset } from "../lib/asset.js";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const easeOut = [0.23, 1, 0.32, 1];

const PALETTE = {
  night: { deep: "#0a0b0c", mid: "#1c1f22" },
  garden: { deep: "#1f3a26", mid: "#3d6b46" },
  carpentry: { deep: "#4a2f14", mid: "#a5652a" },
  concrete: { deep: "#2c2e30", mid: "#6d7278" },
  blueprint: { deep: "#14243a", mid: "#2c4f7c" },
  neon: { deep: "#0b0912", mid: "#3a1f52" },
  dusk: { deep: "#1c120a", mid: "#7a4520" },
  day: { deep: "#e9e4d6", mid: "#f6f3ea" },
};

const TRADE_KEYS = ["garden", "carpentry", "concrete", "blueprint", "neon"];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [18, 0]);
  return (
    <motion.span className="interlude__word" style={{ opacity, y }}>
      {children}
      &nbsp;
    </motion.span>
  );
}

function TradeGlyph({ color, progress, start, span }) {
  const circumference = 2 * Math.PI * 8;
  const dashoffset = useTransform(progress, [start, start + span], [circumference, 0]);
  return (
    <svg className="interlude__trade-ring" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <motion.circle
        cx="10"
        cy="10"
        r="8"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        style={{ strokeDashoffset: dashoffset, rotate: -90 }}
      />
    </svg>
  );
}

function TradeItem({ trade, progress, start, span }) {
  const opacity = useTransform(progress, [start, start + span], [0, 1]);
  const x = useTransform(progress, [start, start + span], [-24, 0]);
  return (
    <motion.li style={{ opacity, x }}>
      <TradeGlyph color={PALETTE[trade.key].mid} progress={progress} start={start} span={span} />
      <span>{trade.label}</span>
    </motion.li>
  );
}

function RevealItem({ children, progress, start, span, axis = "y", tag: Tag = "li" }) {
  const opacity = useTransform(progress, [start, start + span], [0, 1]);
  const offset = useTransform(progress, [start, start + span], [axis === "x" ? -24 : 18, 0]);
  const style = axis === "x" ? { opacity, x: offset } : { opacity, y: offset };
  const MotionTag = motion[Tag];
  return <MotionTag style={style}>{children}</MotionTag>;
}

function ProcessStep({ step, progress, start }) {
  const opacity = useTransform(progress, [start, start + 0.16], [0, 1]);
  const y = useTransform(progress, [start, start + 0.16], [28, 0]);
  const clip = useTransform(progress, [start, start + 0.2], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return (
    <motion.li style={{ opacity, y }}>
      <motion.span className="interlude__process-n" style={{ clipPath: clip }}>
        {step.n}
      </motion.span>
      <span className="interlude__process-title">{step.title}</span>
      <span className="interlude__process-body">{step.body}</span>
    </motion.li>
  );
}

function KineticLine({ text, progress, start, end, as: Tag = "p", className, color }) {
  const words = text.split(" ");
  const step = (end - start) / Math.max(words.length, 1);
  return (
    <Tag className={className} style={color ? { color } : undefined}>
      {words.map((w, i) => (
        <Word key={`${w}-${i}`} progress={progress} range={[start + i * step, Math.min(1, start + i * step + step * 1.6)]}>
          {w}
        </Word>
      ))}
    </Tag>
  );
}

function grainStyle(opacity = 0.05) {
  return {
    opacity,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  };
}

function gradientPair(from, to) {
  // Stops start above 0% so the viewport never shows the darkest "deep"
  // color at full strength, it's already blended toward "mid" by the time
  // it reaches the visible area. Keeps every break page legible immediately
  // instead of opening on a near-black frame.
  return [
    `linear-gradient(180deg, ${from.deep} -30%, ${from.mid} 70%)`,
    `linear-gradient(180deg, ${to.deep} -30%, ${to.mid} 70%)`,
  ];
}

function Scene({ id, className, children, from, to, reducedFallback, image }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [bgFrom, bgTo] = gradientPair(from, to);
  const background = useTransform(scrollYProgress, [0, 1], [bgFrom, bgTo]);

  const photo = image && <img className="interlude__bg-photo" src={asset(image)} alt="" aria-hidden="true" />;

  if (prefersReducedMotion) {
    return (
      <section className={`interlude interlude--static ${className}`} id={id} style={{ background: bgTo }}>
        {photo}
        <div className="interlude__grain" style={grainStyle(0.04)} aria-hidden="true" />
        <motion.div
          className="interlude__content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {reducedFallback}
        </motion.div>
      </section>
    );
  }

  return (
    <section className={`interlude ${className}`} id={id} ref={ref}>
      <div className="interlude__pin">
        {photo}
        <motion.div className="interlude__bg" style={{ background }} />
        <div className="interlude__grain" style={grainStyle()} aria-hidden="true" />
        <div className="interlude__content">{children(scrollYProgress)}</div>
      </div>
    </section>
  );
}

export function Manifesto() {
  const { t } = useLanguage();
  const trades = TRADE_KEYS.map((key, i) => ({ key, label: t.manifesto.trades[i] }));
  const values = t.manifesto.values;
  const from = PALETTE.night;
  const to = PALETTE.day;

  return (
    <Scene
      id="who-we-are"
      className="interlude--manifesto"
      from={from}
      to={to}
      reducedFallback={
        <>
          <p className="interlude__kicker">{t.manifesto.kicker}</p>
          <h2 className="interlude__title interlude__title--serif">{t.manifesto.title}</h2>
          <ul className="interlude__trades">
            {trades.map((trade) => (
              <li key={trade.key}>{trade.label}</li>
            ))}
          </ul>
          <ul className="interlude__values">
            {values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </>
      }
    >
      {(progress) => {
        const textColor = useTransform(progress, [0.72, 0.92], ["#f1efe7", "#1c1f22"]);
        return (
          <motion.div style={{ color: textColor }}>
            <p className="interlude__kicker">{t.manifesto.kicker}</p>
            <KineticLine
              as="h2"
              className="interlude__title interlude__title--serif"
              text={t.manifesto.title}
              progress={progress}
              start={0.02}
              end={0.16}
            />
            <ul className="interlude__trades">
              {trades.map((trade, i) => (
                <TradeItem key={trade.key} trade={trade} progress={progress} start={0.18 + i * 0.045} span={0.09} />
              ))}
            </ul>
            <ul className="interlude__values">
              {values.map((v, i) => (
                <RevealItem key={v} progress={progress} start={0.5 + i * 0.03} span={0.09}>
                  {v}
                </RevealItem>
              ))}
            </ul>
          </motion.div>
        );
      }}
    </Scene>
  );
}

export function ProcessInterlude() {
  const { t } = useLanguage();
  const steps = t.process.steps;
  const from = PALETTE.day;
  const to = PALETTE.day;

  return (
    <Scene
      id="how-we-work"
      className="interlude--process"
      from={from}
      to={to}
      reducedFallback={
        <>
          <p className="interlude__kicker">{t.process.kicker}</p>
          <ol className="interlude__process">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="interlude__process-n">{s.n}</span>
                <span className="interlude__process-title">{s.title}</span>
                <span className="interlude__process-body">{s.body}</span>
              </li>
            ))}
          </ol>
        </>
      }
    >
      {(progress) => (
        <>
          <p className="interlude__kicker">{t.process.kicker}</p>
          <ol className="interlude__process">
            {steps.map((s, i) => (
              <ProcessStep key={s.n} step={s} progress={progress} start={0.06 + i * 0.17} />
            ))}
          </ol>
        </>
      )}
    </Scene>
  );
}

export function Closing() {
  const { t } = useLanguage();
  const line = t.closing.title;
  const subline = t.closing.sub;
  const from = PALETTE.night;
  const to = PALETTE.dusk;

  return (
    <Scene
      id="closing"
      className="interlude--closing"
      from={from}
      to={to}
      image="assets/act0/storefront-drone.jpg"
      reducedFallback={
        <>
          <h2 className="interlude__closing-title">{line}</h2>
          <p className="interlude__closing-sub">{subline}</p>
        </>
      }
    >
      {(progress) => (
        <>
          <KineticLine as="h2" className="interlude__closing-title" text={line} progress={progress} start={0.06} end={0.3} />
          <KineticLine as="p" className="interlude__closing-sub" text={subline} progress={progress} start={0.34} end={0.5} />
        </>
      )}
    </Scene>
  );
}
