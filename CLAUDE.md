# CLAUDE.md — DreamWorks Website

This file is the standing brief for Claude (Claude Code) when working on this repository. Read it in full before making changes. It covers who the client is, what the site must say, and how the build should look, feel, and behave.

---

## 1. The client

**DreamWorks**. Construction, Garden, Property Development, Advertising.

DreamWorks is a Dutch multi-disciplinary contractor: one company, five trades, one point of contact. The website's job is to make that pitch instantly legible. A visitor with a garden, a kitchen, a demolition job, a development site, or a shopfront should each land on a page that speaks directly to their job, while understanding it's all one outfit.

The site language is **English** (source content below is the translated brief; do not leave any Dutch in the shipped copy unless the client later asks for a language switcher).

### Services

**🌿 Garden & Landscaping**
Garden design & construction, Garden maintenance, Paving, Fencing, Carports & canopies, Decking, Artificial grass, Planting

**🪚 Carpentry**
Custom furniture, Kitchens, Cabinetry, Window & door frames, Doors, Ceilings, Flooring, Renovations

**🏗️ Demolition**
Full demolition, Bathroom strip-outs, Kitchen strip-outs, General strip-out work, Concrete cutting & drilling, Construction waste removal

**🏢 Property Development**
Real estate acquisition, Development, New-build construction, Renovation, Transformation, Permit management, Investment projects

**🎨 Advertising & Signage**
Facade advertising, Illuminated signage, LED lettering, Vehicle wraps & lettering, Window film, Signboards, Banners, Interior signage

### Why DreamWorks (value props to weave through the site, not just list once)

- One point of contact
- From design to delivery
- Craftsmen under one roof
- Quality & guarantee
- Clear communication

---

## 2. Design direction

### Mandatory: frontend-design skill

Before generating any UI file in this project (components, pages, styles, anything visual), Claude MUST first `view` **`/mnt/skills/public/frontend-design/SKILL.md`** and follow it. This is not optional and not a one-time read: reload it at the start of every session that touches design, and re-check it before building each of the five service worlds, since each one is effectively its own design pass. The notes below are the project-specific application of that skill, not a replacement for it.

**Ground it in the subject.** This is not a generic "contractor template" brief. DreamWorks' real material is physical and textural: timber grain, poured concrete, wet-cut stone, powder-coated aluminum, LED glow at dusk, site dust, blueprints. Pull the palette, imagery, and motion language from that world, not from generic SaaS or generic "construction company" stock templates. Avoid the three AI-design defaults called out in the skill (cream and serif and terracotta; near-black with a single acid accent; broadsheet hairline-rule layout) unless a deliberate choice earns it.

**Five trades, one identity.** Recommended structure: a strong single home page that establishes the DreamWorks brand and one-point-of-contact pitch, then five distinct-but-related service "worlds" (Garden, Carpentry, Demolition, Development, Signage) each with its own accent and imagery treatment inside a shared type system and layout grammar. Think five chapters of one book, not five unrelated sites. Each world's accent color and imagery should feel native to that trade (Garden reads green and organic and soft light, Demolition reads raw and high-contrast and industrial, Signage reads night and neon and glow) while shared elements (nav, footer, type scale) stay constant so it never fragments.

**Each world is a cinematic scene, not a section.** This is the client's core direction and it should shape the build more than any other single note. Each of the five worlds should feel like a short, directed sequence, closer to a film title sequence or a game's world-intro than a scrolling webpage section. Concretely:
- Give each world its own entrance moment as it comes into view: a staged reveal (layered parallax, a mask or wipe transition, elements assembling into place) rather than a simple fade or slide.
- Use scroll to choreograph, not just to trigger. Scroll-scrubbed animation (progress tied directly to scroll position) so imagery, type, and layered elements move together as one composed shot while the visitor scrolls through that world.
- Treat the transition between worlds as a scene change: a deliberate color, light, or texture shift (for instance daylight garden greens dissolving into raw concrete grays into demolition dust into blueprint blues into neon signage glow) so moving from one world to the next reads as a location change, not a new div.
- Layer depth deliberately: foreground texture or debris, a mid-ground hero image or object, background atmosphere, moving at different scroll speeds, to sell real dimensionality rather than flat parallax.
- Sound off, motion on: this is silent cinema, so the visual choreography has to carry the drama on its own. Lean on light, shadow, motion timing, and reveal pacing rather than gimmicks.
- Full commitment beats scattered effects. Better to give one world an unforgettable five-second sequence than to sprinkle small animations across all five.
- Still respect `prefers-reduced-motion`: build a calmer, static-reveal fallback that keeps the same content and structure without the scroll choreography.

**Hero as thesis.** The homepage hero should be the single most characteristic DreamWorks image or moment, not a generic stock photo of a hard hat. Favor a real or generated shot that captures the "under one roof" idea, for instance a job site where landscaping, structural work, and signage visibly meet.

**Typography.** Pick a display face with some presence (this is a trade and craft brand, it can afford weight and confidence) paired with a clean, highly legible body face. Set a real type scale. Don't reach for the same faces you'd default to on any SaaS landing page.

**Services lists inside each world: no buttons, no pills, no chip grids.** Do not render the service list under a world as little rounded buttons, tags, or chips. That reads as an AI-generated template. Instead treat each service list as an editorial or typographic moment native to that world's scene: for example a large vertical type list that reveals line by line as the world scrolls in, an annotation style, an inline flowing sentence, or items staged as labels on the imagery itself (like callouts pointing at parts of a photo). The list should feel designed for that specific world's mood, not a reusable UI component dropped in five times.

**Numbered markers and process steps.** Only use 01/02/03-style sequencing where the content is genuinely sequential, for instance "Design, Build, Deliver" as an actual process. Do not number the five services within a world since that list is not a sequence.

**Copy: no em dashes, anywhere.** Do not use em dashes or double hyphens standing in for them in any copy on the site: headlines, body text, captions, CTAs, alt text, meta descriptions, all of it. Rewrite with periods, commas, or separate sentences instead. This applies to every verbal section, not just the hero.

**Copy, general.** Write real, specific copy per service, not filler. Active voice, plain verbs, sentence case. Sell by being concrete (name the material, the trade, the outcome) rather than by adjectives. Match the "one point of contact" pitch in the actual language used across CTAs: a single unified contact or quote flow, not five disconnected contact forms.

**Quality floor:** responsive down to mobile, visible keyboard focus states, real alt text on all imagery, accessible color contrast even within bold accent choices, and a working reduced-motion fallback for every cinematic sequence.

---

## 3. Skills & tooling

### Built-in skills
`frontend-design` is mandatory for anything visual, see section 2. If the build involves other file types (docx proposals, pdf quotes, xlsx pricing sheets for the client), check the matching skill under `/mnt/skills/public/` first.

### jeffallan/claude-skills (fullstack dev skill pack)
This project should use the community skill pack at **github.com/jeffallan/claude-skills** (66 specialized skills across languages, frontend and backend frameworks, testing, DevOps, security) for the engineering side of the build: component architecture, state management, scroll-animation implementation, testing, deployment. The visual and aesthetic direction stays governed by section 2 above and the built-in `frontend-design` skill regardless of which engineering skill is active.

If Claude Code and the skill pack aren't already installed in this environment, set them up with:
```
/plugin marketplace add jeffallan/claude-skills
/plugin install fullstack-dev-skills@jeffallan
```
See the pack's own `QUICKSTART.md` and `SKILLS_GUIDE.md` (in that repo) for which specific skill activates for a given task. They trigger contextually, for instance a scroll-driven animation task should pull in the relevant frontend or animation skill, an API auth task pulls in the relevant backend skill.

### higgsfield.ai (visual asset generation)
Higgsfield is connected as an MCP tool and should be used for generating and preparing bespoke visual assets the site needs and stock photography can't cover well:
- Hero imagery and atmosphere shots that need to match the exact five-trades-under-one-roof concept
- Short ambient background video or motion loops for the cinematic world sequences and scene-change transitions described above
- Upscaling, background removal, or reframing of client-supplied job-site photos so they slot cleanly into the layered, parallax-friendly layout
- LED-letter and signage mockups for the Advertising & Signage world specifically, since that's DreamWorks' own product category

Use it deliberately, one strong asset per moment that needs it, not to generate every image on the site. Real client photography (job sites, completed projects) should be preferred wherever available; generated assets fill genuine gaps such as hero concept art, mockups, stylized transitions, motion loops.

---

## 4. Content notes for future sessions

- Keep this file updated if the client adds services, changes the value props, or gives explicit brand direction (colors, logo, existing photography).
- If real project photos, logo files, or brand guidelines are supplied later, prioritize them over any generated or placeholder assets already in the build.
- The five service categories above are the backbone of the site's information architecture. Don't restructure them without the client's input.
- No em dashes in any shipped copy. No button or pill-style rendering for service lists. Each world is a cinematic scroll sequence, not a static section.
