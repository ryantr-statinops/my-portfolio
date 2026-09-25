import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as THREE from "three";
import { projectNodeRadius } from "../../data/graph-metrics";
import type { Project } from "../../data/project-schema";
export type ProjectGraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  category: string;
  project?: Project;
};

export type ProjectGraph3DProps = {
  projects: Project[];
  onAvailabilityChange: (available: boolean) => void;
  onHoverNode: (node: ProjectGraphNode | null, position: { x: number; y: number } | null) => void;
};

type InteractiveMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
type LayoutNode = {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  mesh: InteractiveMesh;
  label: THREE.Sprite | null;
  halo: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  radius: number;
};
type LayoutEdge = { source: LayoutNode; target: LayoutNode; line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>; length: number };

function categoryColor(category: string) {
  if (category.includes("finance")) return new THREE.Color("#00f2ff");
  if (category.includes("ai")) return new THREE.Color("#fb7185");
  if (category.includes("system")) return new THREE.Color("#a78bfa");
  return new THREE.Color("#93f8d8");
}

export default function ProjectGraph3D({ projects, onAvailabilityChange, onHoverNode }: ProjectGraph3DProps) {
  const [available, setAvailable] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposeScene = () => {};

    function initialize() {
      const container = host.current;
      const target = canvas.current;
      if (!container || !target) return;
      disposeScene();
      onAvailabilityChange(false);
      setAvailable(false);
      onHoverNode(null, null);
      if (reducedMotion.matches) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: target, alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.4, 13);
      scene.add(new THREE.HemisphereLight(0xd9faff, 0x071019, 2.2));
      const keyLight = new THREE.PointLight(0x00f2ff, 30, 24);
      keyLight.position.set(-4, 5, 6);
      scene.add(keyLight);

      const root = new THREE.Group();
      scene.add(root);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      const interactiveMeshes: InteractiveMesh[] = [];
      const layoutNodes: LayoutNode[] = [];
      const layoutEdges: LayoutEdge[] = [];
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const sphereGeometry = new THREE.SphereGeometry(0.15, 20, 20);
      geometries.add(sphereGeometry);
      const nodesById = new Map<string, LayoutNode>();
      const categories = [...new Set(projects.map((project) => project.category))];
      let hoveringId: string | null = null;
      let pointerStart: { x: number; y: number; moved: boolean } | null = null;
      let hoveredMesh: InteractiveMesh | null = null;
      let frame = 0;
      let visible = false;
      let lastFrame = 0;
      let simulationFrames = 0;

      const draw = () => renderer.render(scene, camera);
      const addLabel = (text: string, color: string, position: THREE.Vector3, scale = 1) => {
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 512;
        labelCanvas.height = 96;
        const context = labelCanvas.getContext("2d");
        if (!context) return null;
        context.font = "600 28px monospace";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;
        context.shadowColor = color;
        context.shadowBlur = 10;
        context.fillText(text.slice(0, 28), 256, 48, 500);
        const texture = new THREE.CanvasTexture(labelCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        textures.add(texture);
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
        materials.add(material);
        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position).add(new THREE.Vector3(0, 0.34, 0));
        sprite.scale.set(2.4 * scale, 0.45 * scale, 1);
        root.add(sprite);
        return sprite;
      };
      const addSphere = (position: THREE.Vector3, color: THREE.Color, radius: number, node: ProjectGraphNode, label: string, labelScale: number) => {
        const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.38, roughness: 0.35, metalness: 0.18 });
        materials.add(material);
        const mesh = new THREE.Mesh(sphereGeometry, material);
        mesh.position.copy(position);
        mesh.scale.setScalar(radius / 0.15);
        mesh.userData.graphNode = node;
        interactiveMeshes.push(mesh);
        root.add(mesh);
        const haloMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending });
        materials.add(haloMaterial);
        const halo = new THREE.Mesh(sphereGeometry, haloMaterial);
        halo.position.copy(position);
        halo.scale.setScalar(radius * 2.2 / 0.15);
        halo.visible = false;
        root.add(halo);
        const layoutNode = { id: node.id, position, velocity: new THREE.Vector3(), mesh, label: addLabel(label, color.getStyle(), position, labelScale), halo, radius };
        layoutNodes.push(layoutNode);
        nodesById.set(node.id, layoutNode);
        return layoutNode;
      };
      const addEdge = (source: LayoutNode, target: LayoutNode, color: THREE.Color, opacity: number, length: number) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([source.position, target.position]);
        const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
        geometries.add(geometry);
        materials.add(material);
        const line = new THREE.Line(geometry, material);
        line.frustumCulled = false;
        root.add(line);
        layoutEdges.push({ source, target, line, length });
      };

      const center = new THREE.Vector3(0, 0, 0);
      const centerColor = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#ffffff");
      const core = addSphere(center, centerColor, 0.28, { id: "system-core", label: "SYSTEM_CORE", x: 0, y: 0, category: "system-core" }, "SYSTEM_CORE", 1.05);

      categories.forEach((category, index) => {
        const angle = (Math.PI * 2 * index) / Math.max(categories.length, 1) - Math.PI / 2;
        const y = (index % 2 === 0 ? 1 : -1) * 0.85;
        const position = new THREE.Vector3(Math.cos(angle) * 3.25, y, Math.sin(angle) * 2.7);
        const color = categoryColor(category);
        const categoryNode = addSphere(position, color, 0.22, { id: category, label: category.replaceAll("-", "_").toUpperCase(), x: 0, y: 0, category }, category.replaceAll("-", "_").toUpperCase(), 0.9);
        addEdge(core, categoryNode, color, 0.52, 3.1);
      });

      categories.forEach((category, categoryIndex) => {
        const categoryNode = nodesById.get(category);
        if (!categoryNode) return;
        const members = projects.filter((project) => project.category === category);
        members.forEach((project, index) => {
          const angle = (Math.PI * 2 * index) / Math.max(members.length, 1) + categoryIndex * 0.61;
          const position = categoryNode.position.clone().add(new THREE.Vector3(Math.cos(angle) * 1.25, (index % 2 === 0 ? 0.75 : -0.75), Math.sin(angle) * 1.3));
          const color = categoryColor(category);
          const projectNode = addSphere(position, color, projectNodeRadius(project.priority), { id: project.routeSlug, label: project.title, x: 0, y: 0, category, project }, project.routeSlug.replaceAll("-", "_").toUpperCase(), 0.72);
          addEdge(categoryNode, projectNode, color, 0.28, 1.65);
        });
      });

      const stepLayout = () => {
        if (pointerStart || hoveredMesh) return;
        if (simulationFrames++ >= 240) return;
        for (let i = 0; i < layoutNodes.length; i++) {
          for (let j = i + 1; j < layoutNodes.length; j++) {
            const first = layoutNodes[i];
            const second = layoutNodes[j];
            const delta = first.position.clone().sub(second.position);
            const distanceSquared = Math.max(delta.lengthSq(), 0.16);
            const force = delta.normalize().multiplyScalar(0.08 / distanceSquared);
            if (first !== core) first.velocity.add(force);
            if (second !== core) second.velocity.sub(force);
          }
        }
        for (const edge of layoutEdges) {
          const delta = edge.target.position.clone().sub(edge.source.position);
          const distance = Math.max(delta.length(), 0.001);
          const force = delta.multiplyScalar(((distance - edge.length) * 0.014) / distance);
          if (edge.source !== core) edge.source.velocity.add(force);
          if (edge.target !== core) edge.target.velocity.sub(force);
        }
        for (const node of layoutNodes) {
          if (node === core) continue;
          node.velocity.multiplyScalar(0.82).clampLength(0, 0.07);
          node.position.add(node.velocity);
          node.mesh.position.copy(node.position);
          node.halo.position.copy(node.position);
          node.label?.position.copy(node.position).add(new THREE.Vector3(0, 0.34, 0));
        }
        for (const edge of layoutEdges) {
          const positions = edge.line.geometry.getAttribute("position") as THREE.BufferAttribute;
          positions.setXYZ(0, edge.source.position.x, edge.source.position.y, edge.source.position.z);
          positions.setXYZ(1, edge.target.position.x, edge.target.position.y, edge.target.position.z);
          positions.needsUpdate = true;
        }
      };

      const animate = (time: number) => {
        if (!visible || document.hidden) {
          frame = 0;
          lastFrame = 0;
          return;
        }
        const delta = lastFrame ? Math.min((time - lastFrame) / 16.67, 2) : 1;
        lastFrame = time;
        stepLayout();
        if (!pointerStart && !hoveredMesh) root.rotation.y += 0.001 * delta;
        draw();
        frame = requestAnimationFrame(animate);
      };
      const resume = () => {
        if (visible && !document.hidden && !frame) frame = requestAnimationFrame(animate);
      };
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) resume();
        else if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
          lastFrame = 0;
        }
      });
      visibilityObserver.observe(container);
      const onPageVisibility = () => {
        if (document.hidden && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
          lastFrame = 0;
        } else resume();
      };
      document.addEventListener("visibilitychange", onPageVisibility);

      const resize = () => {
        const width = Math.max(container.clientWidth, 1);
        const height = Math.max(container.clientHeight, 1);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        draw();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const cast = (event: PointerEvent) => {
        const rect = target.getBoundingClientRect();
        pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(interactiveMeshes, false);
        return hits[0]?.object as InteractiveMesh | undefined;
      };
      const move = (event: PointerEvent) => {
        if (pointerStart) {
          const dx = event.clientX - pointerStart.x;
          const dy = event.clientY - pointerStart.y;
          if (Math.abs(dx) + Math.abs(dy) > 3) pointerStart.moved = true;
          if (pointerStart.moved) {
            root.rotation.y += dx * 0.006;
            root.rotation.x = Math.max(-0.75, Math.min(0.75, root.rotation.x + dy * 0.006));
            pointerStart.x = event.clientX;
            pointerStart.y = event.clientY;
            draw();
          }
        }
        const hit = cast(event);
        const node = hit?.userData.graphNode as ProjectGraphNode | undefined;
        if (node?.id !== hoveringId) {
          if (hoveredMesh) {
            hoveredMesh.material.emissiveIntensity = 0.38;
            const previous = nodesById.get(hoveringId ?? "");
            if (previous) previous.halo.visible = false;
          }
          hoveringId = node?.id ?? null;
          hoveredMesh = hit ?? null;
          if (hoveredMesh) {
            hoveredMesh.material.emissiveIntensity = 1.4;
            const current = nodesById.get(hoveringId ?? "");
            if (current) current.halo.visible = true;
          }
        }
        const rect = target.getBoundingClientRect();
        onHoverNode(node ?? null, node ? { x: event.clientX - rect.left, y: event.clientY - rect.top } : null);
        target.style.cursor = pointerStart?.moved ? "grabbing" : node?.project ? "pointer" : "grab";
      };
      const down = (event: PointerEvent) => {
        pointerStart = { x: event.clientX, y: event.clientY, moved: false };
        target.setPointerCapture(event.pointerId);
      };
      const up = (event: PointerEvent) => {
        const start = pointerStart;
        pointerStart = null;
        if (start && !start.moved) {
          const node = cast(event)?.userData.graphNode as ProjectGraphNode | undefined;
          if (node?.project) navigate(`/projects/${node.project.routeSlug}/`);
        }
        target.style.cursor = "grab";
      };
      const leave = () => {
        pointerStart = null;
        if (hoveredMesh) hoveredMesh.material.emissiveIntensity = 0.38;
        const previous = nodesById.get(hoveringId ?? "");
        if (previous) previous.halo.visible = false;
        hoveredMesh = null;
        hoveringId = null;
        onHoverNode(null, null);
        target.style.cursor = "grab";
      };
      const wheel = (event: WheelEvent) => {
        event.preventDefault();
        camera.position.z = Math.max(8, Math.min(19, camera.position.z + event.deltaY * 0.012));
        draw();
      };
      const keydown = (event: KeyboardEvent) => {
        const step = event.shiftKey ? 0.2 : 0.08;
        if (event.key === "ArrowLeft") root.rotation.y -= step;
        else if (event.key === "ArrowRight") root.rotation.y += step;
        else if (event.key === "ArrowUp") root.rotation.x = Math.max(-0.75, root.rotation.x - step);
        else if (event.key === "ArrowDown") root.rotation.x = Math.min(0.75, root.rotation.x + step);
        else if (event.key === "+" || event.key === "=") camera.position.z = Math.max(8, camera.position.z - 0.8);
        else if (event.key === "-") camera.position.z = Math.min(19, camera.position.z + 0.8);
        else return;
        event.preventDefault();
        draw();
      };

      target.addEventListener("pointerdown", down);
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerup", up);
      target.addEventListener("pointercancel", leave);
      target.addEventListener("pointerleave", leave);
      target.addEventListener("wheel", wheel, { passive: false });
      target.addEventListener("keydown", keydown);
      target.style.cursor = "grab";
      draw();
      onAvailabilityChange(true);
      setAvailable(true);

      const contextLost = (event: Event) => {
        event.preventDefault();
        disposeScene();
        onAvailabilityChange(false);
        setAvailable(false);
        onHoverNode(null, null);
      };
      target.addEventListener("webglcontextlost", contextLost);

      disposeScene = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        visibilityObserver.disconnect();
        document.removeEventListener("visibilitychange", onPageVisibility);
        target.removeEventListener("webglcontextlost", contextLost);
        resizeObserver.disconnect();
        target.removeEventListener("pointerdown", down);
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerup", up);
        target.removeEventListener("pointercancel", leave);
        target.removeEventListener("pointerleave", leave);
        target.removeEventListener("wheel", wheel);
        target.removeEventListener("keydown", keydown);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        textures.forEach((texture) => texture.dispose());
        renderer.dispose();
        renderer.setSize(0, 0, false);
      };
    }

    const onMotionChange = () => initialize();
    initialize();
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      reducedMotion.removeEventListener("change", onMotionChange);
      disposeScene();
      onAvailabilityChange(false);
      setAvailable(false);
      onHoverNode(null, null);
    };
  }, [navigate, onAvailabilityChange, onHoverNode, projects]);

  return (
    <div ref={host} className="pointer-events-none absolute inset-0 z-0">
      <canvas
        ref={canvas}
        data-3d-graph
        role="img"
        aria-label="Interactive 3D project graph. Use arrow keys to rotate and plus or minus to zoom. Project links are available in the accessible list."
        tabIndex={0}
        className={`pointer-events-auto h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${available ? "block" : "hidden"}`}
      />
    </div>
  );
}
