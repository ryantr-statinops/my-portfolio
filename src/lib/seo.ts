import { SITE } from "./constants";

export const buildTitle = (pageTitle: string) => `${pageTitle} | Ryan Tran`;
export const buildCanonical = (path: string) => `${SITE.site}${SITE.base}${path}`;
export const defaultDescription = SITE.description;
