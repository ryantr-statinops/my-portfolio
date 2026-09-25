export function projectComplexity(priority: number) {
  return priority * 2 + 4;
}

export function projectNodeRadius(priority: number) {
  return Math.min(0.19, 0.085 + projectComplexity(priority) * 0.007);
}
