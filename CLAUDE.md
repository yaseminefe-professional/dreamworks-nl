# CLAUDE.md — DreamWorks Website

This file is the standing brief for Claude (Claude Code) when working on this repository. Read it in full before making changes. It covers who the client is, what the site must say, and how the build should look, feel, and behave.

---

## 1. The client

**DreamWorks** — Construction • Garden • Property Development • Advertising

DreamWorks is a Dutch multi-disciplinary contractor: one company, five trades, one point of contact. The website's job is to make that pitch instantly legible — a visitor with a garden, a kitchen, a demolition job, a development site, or a shopfront should each land on a page that speaks directly to their job, while understanding it's all one outfit.

The site language is **English** (source content below is the translated brief; do not leave any Dutch in the shipped copy unless the client later asks for a language switcher).

### Services

**🌿 Garden & Landscaping**
Garden design & construction · Garden maintenance · Paving · Fencing · Carports & canopies · Decking · Artificial grass · Planting

**🪚 Carpentry**
Custom furniture · Kitchens · Cabinetry · Window & door frames · Doors · Ceilings · Flooring · Renovations

**🏗️ Demolition**
Full demolition · Bathroom strip-outs · Kitchen strip-outs · General strip-out work · Concrete cutting & drilling · Construction waste removal

**🏢 Property Development**
Real estate acquisition · Development · New-build construction · Renovation · Transformation · Permit management · Investment projects

**🎨 Advertising & Signage**
Facade advertising · Illuminated signage · LED lettering · Vehicle wraps & lettering · Window film · Signboards · Banners · Interior signage

### Why DreamWorks (value props to weave through the site, not just list once)

- One point of contact
- From design to delivery
- Craftsmen under one roof
- Quality & guarantee
- Clear communication

---

## 2. Design direction

Before touching code, `view` **`/mnt/skills/public/frontend-design/SKILL.md`** (and re-read it if a lot of time has passed since the last session) — it governs how this project approaches visual design, and the notes below are the project-specific application of it.

**Ground it in the subject.** This is not a generic "contractor template" brief. DreamWorks' real material is physical and textural: timber grain, poured concrete, wet-cut stone, powder-coated aluminum, LED glow at dusk, site dust, blueprints. Pull the palette, imagery, and motion language from that world — not from generic SaaS or generic "construction company" stock templates. Avoid the three AI-design defaults called out in the skill (cream+serif+terracotta; near-black+single acid accent; broadsheet hairline-rule layout) unless a deliberate choice earns it.

**Five trades, one identity.** Recommended structure: a strong single home page that establishes the DreamWorks brand and one-point-of-contact pitch, then five distinct-but-related service "worlds" (Garden, Carpentry, Demolition, Development, Signage) each with its own accent/imagery treatment inside a shared type system and layout grammar — like five chapters of one book, not five unrelated sites. Each service section's accent color and hero imagery should feel native to that trade (e.g. Garden reads green/organic/soft light; Demolition reads raw/high-contrast/industrial; Signage reads night/neon/glow) while shared elements (nav, footer, buttons, type scale) stay constant so it never fragments.

**Hero as thesis.** The homepage hero should be the single most characteristic DreamWorks image or moment — not a generic stock photo of a hard hat. Favor a real or generated shot that captures the "under one roof" idea: e.g. a job site where landscaping, structural work, and signage visibly meet.

**Typography.** Pick a display face with some presence (this is a trade/craft brand, it can afford weight and confidence) paired with a clean, highly legible body face. Set a real type scale. Don't reach for the same faces you'd default to on any SaaS landing page.

**Motion & dynamism** (the client explicitly asked for this — treat it as a requirement, not a nice-to-have, but apply the skill's restraint principle):
- A deliberate page-load sequence on the homepage hero (not a generic fade-in-up on every element).
- Scroll-triggered reveals for the five service sections — consider a transition that visually signals moving between "worlds" (a subtle background/palette shift as you scroll from Garden into Carpentry into Demolition, etc.).
- Hover micro-interactions on service cards, the nav, and CTAs — tactile, quick, purposeful.
- Before/after or process imagery (garden transformation, demolition-to-renovation, blank facade to signage) is a natural fit for scroll-scrubbed or slider-based reveals — this is real content-driven motion, not decoration.
- Respect `prefers-reduced-motion` throughout. Cut any animation that doesn't serve legibility or the pitch.

**Numbered markers / process steps.** Only use 01/02/03-style sequencing where the content is genuinely sequential — e.g. "Design → Build → Deliver" as an actual process, not as decoration on the services grid (the five services are not a sequence, don't number them like one).

**Copy.** Write real, specific copy per service — not filler. Active voice, plain verbs, sentence case. Sell by being concrete (name the material, the trade, the outcome) rather than by adjectives. Match the "one point of contact" pitch in the actual language used across CTAs (e.g. a single unified contact/quote flow, not five disconnected contact forms).

**Quality floor:** responsive down to mobile, visible keyboard focus states, real alt text on all imagery, accessible color contrast even within bold accent choices.

---

## 3. Skills & tooling

### Built-in skills
Before generating any file (React components, HTML, etc.), check `/mnt/skills/public/frontend-design/SKILL.md` as above. If the build involves other file types (docx proposals, pdf quotes, xlsx pricing sheets for the client), check the matching skill under `/mnt/skills/public/` first.

### jeffallan/claude-skills (fullstack dev skill pack)
This project should use the community skill pack at **github.com/jeffallan/claude-skills** (66 specialized skills across languages, frontend/backend frameworks, testing, DevOps, security) for the engineering side of the build — component architecture, state management, testing, deployment, etc. — while the visual/aesthetic direction stays governed by section 2 above and the built-in `frontend-design` skill.

If Claude Code and the skill pack aren't already installed in this environment, set them up with:
```
/plugin marketplace add jeffallan/claude-skills
/plugin install fullstack-dev-skills@jeffallan
```
See the pack's own `QUICKSTART.md` and `SKILLS_GUIDE.md` (in that repo) for which specific skill activates for a given task — they trigger contextually (e.g. a React component task activates the React expert skill, an API auth task activates the relevant backend skill).

### higgsfield.ai (visual asset generation)
Higgsfield is connected as an MCP tool and should be used for generating and preparing bespoke visual assets the site needs and stock photography can't cover well:
- Hero imagery / atmosphere shots that need to match the exact five-trades-under-one-roof concept
- Short ambient background video/motion loops for section transitions, if the design calls for them
- Upscaling, background removal, or reframing of client-supplied job-site photos so they slot cleanly into the layout
- LED-letter / signage mockups for the Advertising & Signage section specifically, since that's DreamWorks' own product category

Use it deliberately per the "spend your boldness in one place" principle — not to generate every image on the site. Real client photography (job sites, completed projects) should be preferred wherever available; generated assets fill genuine gaps (hero concept art, mockups, stylized transitions).

---

## 4. Content notes for future sessions

- Keep this file updated if the client adds services, changes the value props, or gives explicit brand direction (colors, logo, existing photography).
- If real project photos, logo files, or brand guidelines are supplied later, prioritize them over any generated/placeholder assets already in the build.
- The five service categories above are the backbone of the site's information architecture — don't restructure them without the client's input.
