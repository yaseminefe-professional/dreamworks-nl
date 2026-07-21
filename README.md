# DreamWorks

Website for DreamWorks, a Dutch multi-disciplinary contractor spanning garden
and landscaping, carpentry, demolition, property development, and advertising
and signage. See [`CLAUDE.md`](./CLAUDE.md) for the full project brief.

Built with React, Vite, and Framer Motion. English, Dutch, and Turkish,
switchable from the nav.

## Structure

- `src/App.jsx`: page composition. Hero, value props, process, five cinematic
  service "worlds" connected by liquid scroll-driven transitions, contact.
- `src/components/`: `Nav`, `LanguageSwitcher`, `Hero`, `ValueProps`,
  `Process`, `World` (the four standard service sections), `SignageWorld`
  (the flagship cinematic sequence and real-work gallery), `Seam` (the
  liquid, goo-filtered transition between worlds), `Contact`, `Footer`.
- `src/i18n/`: `translations.js` (en/nl/tr copy) and a `LanguageContext`
  provider that persists the chosen language to `localStorage` and detects
  the browser's language on first visit.
- `src/styles/global.css`: design system, per-world accent themes, and the
  liquid seam styling.
- `public/assets/images/`: logo, generated atmosphere shots, and real
  signage work photos (`public/assets/images/work/`).
- `public/assets/video/`: real client footage used as background video
  (hero interior, garden, signage fabrication).
- `.github/workflows/deploy.yml`: builds and deploys to GitHub Pages on
  every push to `main`.

## Development

```
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Notes

- Contact form currently submits via `mailto:` with a placeholder address.
  Replace with real contact details and a proper form backend before launch.
- Carpentry, demolition, and development still use AI-generated placeholder
  atmosphere shots. Swap in real DreamWorks job-site photography as it
  becomes available.
- Hero, garden, and signage backgrounds are real client video, and the
  signage section's gallery uses real finished signage photos, all
  prioritized over generated placeholders per the project brief.
- The video files are raw phone-recorded MP4s (2.5 to 6 MB each). Worth
  compressing before a real production launch to keep page weight down.
- GitHub Pages must be enabled once, with the source set to "GitHub
  Actions," under the repo's Settings -> Pages.
