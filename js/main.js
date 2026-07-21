document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ignite the signage headline into individual letters for the flagship reveal.
  document.querySelectorAll(".world__title--ignite").forEach((el) => {
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "letter";
      span.setAttribute("aria-hidden", "true");
      span.style.transitionDelay = `${i * 28}ms`;
      span.textContent = char === " " ? " " : char;
      el.appendChild(span);
    });
  });

  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  // Continuous scroll-scrubbed depth: each scene gets a 0-1 progress value
  // driving parallax on its layered background/image/grain via CSS.
  if (!prefersReducedMotion) {
    const scenes = document.querySelectorAll(".world, [data-scene]");
    let ticking = false;

    const updateScenes = () => {
      const vh = window.innerHeight;
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const total = rect.height + vh;
        let progress = (vh - rect.top) / total;
        progress = Math.min(1, Math.max(0, progress));
        scene.style.setProperty("--progress", progress.toFixed(3));
      });
      ticking = false;
    };

    updateScenes();
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateScenes);
          ticking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", updateScenes);
  }

  // Background/ambient videos: respect reduced motion (stay paused on their
  // poster frame), otherwise play the hero immediately and lazily play/pause
  // the others as they enter and leave the viewport.
  const allVideos = document.querySelectorAll("video");
  if (prefersReducedMotion) {
    allVideos.forEach((v) => v.pause());
  } else {
    const heroVideo = document.querySelector(".hero__bg");
    if (heroVideo) heroVideo.play().catch(() => {});

    const lazyVideos = document.querySelectorAll(
      ".world__bg-image, .world__mid video, .world__gallery-item--video video"
    );
    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.play().catch(() => {});
            } else {
              entry.target.pause();
            }
          });
        },
        { threshold: 0.25 }
      );
      lazyVideos.forEach((v) => videoObserver.observe(v));
    } else {
      lazyVideos.forEach((v) => v.play().catch(() => {}));
    }
  }
});
