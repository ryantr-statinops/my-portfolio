import { useEffect, useState } from "react";
import { Link } from "react-router";
import { STRATEGY_STAGES, STRATEGY_TRACKS, type StrategyStage } from "../../../src/lib/strategy";

const stageLabels: Record<StrategyStage, string> = {
  frame: "Frame",
  test: "Test",
  build: "Build",
};

export default function StrategyHub() {
  const [selectedTrackId, setSelectedTrackId] = useState(STRATEGY_TRACKS[0]?.id ?? "");
  const [selectedStage, setSelectedStage] = useState<StrategyStage>(STRATEGY_STAGES[0]);
  const [ready, setReady] = useState(false);
  const track = STRATEGY_TRACKS.find((item) => item.id === selectedTrackId) ?? STRATEGY_TRACKS[0];

  useEffect(() => setReady(true), []);

  if (!track) return null;
  const content = track.stages[selectedStage];
  const hasDecision = Boolean(content.decision || content.rationale || content.benefit || content.tradeoff);

  return (
    <section id="intelligence-hub" data-strategy className="min-h-screen w-full border-t border-border/30 bg-transparent px-6 py-20 md:px-12" aria-labelledby="strategy-title">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">02 / Capabilities &amp; Approach</p>
          <h2 id="strategy-title" className="text-4xl font-bold uppercase leading-tight tracking-tighter md:text-6xl">Capabilities &amp;<br /><span className="text-primary">Approach.</span></h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">Explore a capability and follow the process from framing a problem to building a solution.</p>
        </header>

        <div hidden={!ready} className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Choose a capability">
          {STRATEGY_TRACKS.map((item, index) => <button
            key={item.id}
            type="button"
            data-strategy-domain={item.id}
            aria-pressed={selectedTrackId === item.id}
            onClick={() => { setSelectedTrackId(item.id); setSelectedStage(STRATEGY_STAGES[0]); }}
            className="min-h-11 rounded border border-border bg-background/35 px-4 py-3 text-left font-mono text-xs text-foreground backdrop-blur-md transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-background"
          ><span className="mr-2 opacity-60">0{index + 1}</span>{item.title}</button>)}
        </div>

        <div className="grid gap-8 rounded-xl border border-border/60 bg-background/30 p-5 backdrop-blur-md md:p-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-12">
          <div className="flex flex-col justify-between gap-8 border-t border-border pt-6 lg:border-r lg:border-t-0 lg:pr-10 lg:pt-0">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Selected capability</p>
              <h3 data-strategy-title className="mt-3 text-2xl font-bold tracking-tight">{track.title}</h3>
              {track.description && <p className="mt-3 text-sm leading-relaxed text-muted">{track.description}</p>}
            </div>
            <p data-strategy-status role="status" className="font-mono text-xs text-muted">{stageLabels[selectedStage]} content is being prepared.</p>
          </div>

          <div>
            <div hidden={!ready} className="grid grid-cols-3 gap-2" role="group" aria-label="Approach stages">
              {STRATEGY_STAGES.map((stage, index) => <button
                key={stage}
                type="button"
                data-strategy-stage={stage}
                aria-pressed={selectedStage === stage}
                onClick={() => setSelectedStage(stage)}
                className="min-h-11 rounded-t border-b-2 border-border bg-background/25 px-2 py-3 text-left font-mono text-xs uppercase text-foreground backdrop-blur-md transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:text-foreground"
              ><span className="mr-1 opacity-60">0{index + 1}</span>{stageLabels[stage]}</button>)}
            </div>

            <article key={`${track.id}:${selectedStage}`} data-strategy-panel className="pt-8" aria-live="polite" aria-atomic="true">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{content.label}</p>
              {content.title && <h3 className="mt-3 text-2xl font-bold tracking-tight">{content.title}</h3>}
              <p className="mt-3 text-sm leading-relaxed text-muted">{content.description || "Content is being prepared."}</p>

              {hasDecision && <div className="mt-8 border-t border-border pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Decision</p>
                {content.decision && <h4 className="mt-2 text-lg font-semibold">{content.decision}</h4>}
                {content.rationale && <p className="mt-2 text-sm leading-relaxed text-muted">{content.rationale}</p>}
                {(content.benefit || content.tradeoff) && <details className="mt-4">
                  <summary className="min-h-11 cursor-pointer py-3 font-mono text-xs text-foreground">Explore the trade-off</summary>
                  <div className="grid gap-4 border-l border-border pl-4 sm:grid-cols-2">
                    {content.benefit && <div><p className="font-mono text-[10px] uppercase text-muted">Benefit</p><p className="mt-1 text-sm leading-relaxed">{content.benefit}</p></div>}
                    {content.tradeoff && <div><p className="font-mono text-[10px] uppercase text-muted">Trade-off</p><p className="mt-1 text-sm leading-relaxed">{content.tradeoff}</p></div>}
                  </div>
                </details>}
              </div>}

              {content.relatedProject && <Link className="mt-8 flex min-h-11 items-center border-t border-border pt-5 text-sm text-primary hover:text-foreground" to={`/projects/${content.relatedProject}/`}>Explore {content.relatedProject}</Link>}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
