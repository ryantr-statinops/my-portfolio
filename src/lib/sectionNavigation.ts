export function navigateToSection(event: MouseEvent, link: HTMLAnchorElement, sectionId: string) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) return;

  const destination = new URL(link.href);
  if (
    destination.origin !== window.location.origin ||
    destination.pathname !== window.location.pathname ||
    destination.search !== window.location.search ||
    destination.hash !== `#${sectionId}`
  ) return;

  const target = document.getElementById(sectionId);
  if (!target) return;

  event.preventDefault();
  if (destination.href !== window.location.href) {
    window.history.pushState(null, "", destination.href);
  }

  target.tabIndex = -1;
  target.focus({ preventScroll: true });
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });
}
