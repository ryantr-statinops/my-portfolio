# Strategy rebuild scaffold

## Direction

Replace the Intelligence Hub with a guided Strategy section. Visitors choose one of four capability groups, then move through Frame, Test and Build to see future approach notes and decisions.

## Capability groups

- Software Engineering
- Data Engineering
- AI Engineering
- Other

This release establishes the structure only. It does not reuse Intelligence Hub copy or invent capability statements, trade-offs or project evidence. Empty fields remain unpublished and display a concise preparation state.

## Portfolio transition

Remove the five existing project entries and their detail routes. Keep `/projects/` as an empty registry with an explicit rebuilding state. Remove homepage filtering; retain a four-category filter on the registry for future projects. The generated site has two HTML pages until new projects are authored.

## UX

Keep the `#intelligence-hub` anchor and Strategy navigation label. Default to Software Engineering and Frame. At mobile widths, stack the capability choices while keeping Frame, Test and Build in one row. Selection is local, does not filter projects or alter the URL, and resets to Frame when the capability changes. Hide controls until their client behavior is ready so the default preparation state remains readable without JavaScript.
