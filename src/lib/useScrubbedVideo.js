import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent } from "framer-motion";

export function useScrubbedVideo(progress, { start = 0, end = 1 } = {}) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const seekingRef = useRef(false);
  const pendingRef = useRef(null);

  function applyTime(t) {
    const video = videoRef.current;
    if (!video) return;
    if (seekingRef.current) {
      pendingRef.current = t;
      return;
    }
    if (Math.abs(video.currentTime - t) < 0.03) return;
    seekingRef.current = true;
    video.currentTime = t;
  }

  useMotionValueEvent(progress, "change", (latest) => {
    if (!duration) return;
    const span = end - start;
    const t = Math.min(1, Math.max(0, (latest - start) / span));
    applyTime(t * duration);
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Only issue the next seek once the current one lands, applying only
    // the latest requested position, so rapid scroll events don't queue up
    // a backlog of seeks and make playback feel like it's stuttering.
    function onSeeked() {
      seekingRef.current = false;
      if (pendingRef.current !== null) {
        const t = pendingRef.current;
        pendingRef.current = null;
        applyTime(t);
      }
    }
    video.addEventListener("seeked", onSeeked);
    // Nudge the browser to decode and paint the first frame right away,
    // instead of leaving the element blank/black until a seek lands.
    const playPromise = video.play();
    if (playPromise) {
      playPromise.then(() => video.pause()).catch(() => {});
    }
    return () => video.removeEventListener("seeked", onSeeked);
  }, []);

  return { videoRef, onLoadedMetadata: (e) => setDuration(e.currentTarget.duration) };
}
