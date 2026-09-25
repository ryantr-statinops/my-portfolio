import { useEffect, useRef } from "react";
import "./video-background.css";

export default function VideoBackground() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const player = video.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (!player) return;
      if (preference.matches) player.pause();
      else void player.play().catch(() => {
        // The poster remains visible when the browser blocks autoplay.
      });
    };
    syncMotion();
    preference.addEventListener("change", syncMotion);
    return () => preference.removeEventListener("change", syncMotion);
  }, []);

  const poster = `${import.meta.env.BASE_URL}images/black-hole-poster.jpg`;
  return (
    <div data-video-background aria-hidden="true" className="video-background fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <img data-video-poster src={poster} alt="" className="background-media absolute inset-0 h-full w-full object-cover" />
      <video ref={video} data-background-video className="background-media background-video absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="none" poster={poster} tabIndex={-1}>
        <source src={`${import.meta.env.BASE_URL}videos/black-hole.webm`} type="video/webm" />
      </video>
    </div>
  );
}
