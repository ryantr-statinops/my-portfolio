export const cn = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");

export const getBaseUrl = (path: string) => {
  const base = import.meta.env.BASE_URL;
  // BASE_URL already ends with /my-portfolio/ in prod, / in dev
  return `${base.replace(/\/$/, "")}${path}`;
};

export const formatYear = (dateStr: string) => dateStr.split("-")[0];
