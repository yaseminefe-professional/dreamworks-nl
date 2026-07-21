# DreamWorks

Website for DreamWorks, a Dutch multi-disciplinary contractor spanning garden
and landscaping, carpentry, demolition, property development, and advertising
and signage. See [`CLAUDE.md`](./CLAUDE.md) for the full project brief.

## Structure

- `index.html`: single-page site. Hero, value props, process, five cinematic
  service "worlds," contact.
- `css/style.css`: design system, per-world accent themes, scroll-scrubbed
  parallax, and the signage flagship sequence.
- `js/main.js`: scroll-progress engine, reveal-on-scroll, nav state, mobile
  menu, signage letter ignite.
- `assets/images/`: logo, generated atmosphere shots, and real signage work
  photos (`assets/images/work/`).
- `assets/video/`: real client footage used as background video (hero
  interior, signage fabrication).

## Development

Open `index.html` in a browser, or serve the folder with any static file server.

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
