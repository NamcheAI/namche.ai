import NamcheSite, { meta as namcheMeta } from './namche.astro';
import TashiSite, { meta as tashiMeta } from './tashi.astro';
import NimaSite, { meta as nimaMeta } from './nima.astro';
import PemaSite, { meta as pemaMeta } from './pema.astro';

export const SITES = {
  namche: { meta: namcheMeta, component: NamcheSite },
  tashi: { meta: tashiMeta, component: TashiSite },
  nima: { meta: nimaMeta, component: NimaSite },
  pema: { meta: pemaMeta, component: PemaSite },
} as const;

export type SiteId = keyof typeof SITES;

const SITE_IDS = Object.keys(SITES) as SiteId[];

export function listSiteIds(): SiteId[] {
  return [...SITE_IDS];
}

export function isSiteId(value: string): value is SiteId {
  return value in SITES;
}

export function resolveSiteId(): SiteId {
  const raw = process.env.NAMCHE_SITE ?? 'namche';
  return isSiteId(raw) ? raw : 'namche';
}
