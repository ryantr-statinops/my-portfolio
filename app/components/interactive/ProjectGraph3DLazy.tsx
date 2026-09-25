import { useEffect, useRef, useState, type ComponentType } from "react";
import type { ProjectGraph3DProps } from "./ProjectGraph3D";
export type { ProjectGraphNode } from "./ProjectGraph3D";

export default function ProjectGraph3DLazy(props: ProjectGraph3DProps) {
  const host = useRef<HTMLDivElement>(null);
  const [Scene, setScene] = useState<ComponentType<ProjectGraph3DProps> | null>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNearViewport(true);
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const loadScene = () => {
      if (!nearViewport || reducedMotion.matches) {
        setScene(null);
        return;
      }
      void import("./ProjectGraph3D").then(({ default: GraphScene }) => {
        if (active && !reducedMotion.matches) setScene(() => GraphScene);
      }).catch(() => {
        if (active) setScene(null);
      });
    };

    loadScene();
    reducedMotion.addEventListener("change", loadScene);
    return () => {
      active = false;
      reducedMotion.removeEventListener("change", loadScene);
    };
  }, [nearViewport]);

  return <div ref={host} className="pointer-events-none absolute inset-0 z-0">{Scene && <Scene {...props} />}</div>;
}
