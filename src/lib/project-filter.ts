import { PROJECT_CATEGORIES } from "./constants";

export type ProjectFilterState = {
  categories: string[];
};

export const createFilterState = (categories: string[] = []): ProjectFilterState => ({
  categories: normalizeCategories(categories),
});

export const normalizeCategories = (categories: string[]): string[] =>
  [...new Set(categories)].filter((category) => PROJECT_CATEGORIES.includes(category));

export const toggleFilterCategory = (state: ProjectFilterState, category: string): ProjectFilterState => {
  if (category === "all") return createFilterState();
  if (!PROJECT_CATEGORIES.includes(category)) return createFilterState(state.categories);

  const categories = state.categories.includes(category)
    ? state.categories.filter((current) => current !== category)
    : [...state.categories, category];

  return createFilterState(categories);
};

export const matchesFilter = (category: string, state: ProjectFilterState): boolean =>
  state.categories.length === 0 || state.categories.includes(category);

export const filterProjects = <T extends { data: { category: string } }>(
  projects: T[],
  state: ProjectFilterState,
): T[] => projects.filter((project) => matchesFilter(project.data.category, state));
