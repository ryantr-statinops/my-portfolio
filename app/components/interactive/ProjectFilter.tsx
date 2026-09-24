import { CATEGORY_MAP } from "../../../src/lib/constants";
import { toggleProjectCategory } from "../../data/project-filter";

type Props = {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
};

export default function ProjectFilter({ selectedCategories, onChange }: Props) {
  const activeClass = "border-primary bg-primary text-background";
  const idleClass = "border-border bg-transparent text-muted hover:border-primary hover:text-primary";
  const categories = Object.entries(CATEGORY_MAP);

  return (
    <div data-project-filter role="group" aria-label="Filter projects by category" className="flex flex-wrap items-center gap-2">
      <span className="sr-only">Filter projects by category</span>
      <button type="button" data-filter-category="all" data-active={selectedCategories.length === 0} aria-pressed={selectedCategories.length === 0} onClick={() => onChange(toggleProjectCategory(selectedCategories, "all"))} className={`min-h-11 rounded-full border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${selectedCategories.length === 0 ? activeClass : idleClass}`}>All</button>
      {categories.map(([category, label]) => {
        const active = selectedCategories.includes(category);
        return <button key={category} type="button" data-filter-category={category} data-active={active} aria-pressed={active} onClick={() => onChange(toggleProjectCategory(selectedCategories, category))} className={`min-h-11 rounded-full border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${active ? activeClass : idleClass}`}>{label}</button>;
      })}
    </div>
  );
}
