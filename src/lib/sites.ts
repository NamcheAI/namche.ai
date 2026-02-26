export type SiteId = 'namche' | 'tashi' | 'nima' | 'pema';

const SITE_IDS: SiteId[] = ['namche', 'tashi', 'nima', 'pema'];

export interface SiteMeta {
  title: string;
  description: string;
  brandLabel?: string;
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
  };
}

export const SITE_META: Record<SiteId, SiteMeta> = {
  namche: {
    title: 'namche.ai',
    description: "Central hub for Jodok Batlogg's AI work.",
    hero: {
      eyebrow: 'Hub',
      headline: 'namche.ai',
      tagline: "Central hub for Jodok Batlogg's AI work. Named after Namche Bazaar, gateway to the Himalayas.",
    },
  },
  tashi: {
    title: "Tashi 🐐 -- Jodok's AI Assistant",
    description: "Tashi is Jodok Batlogg's personal AI agent.",
    brandLabel: 'Tashi 🐐',
    hero: {
      eyebrow: 'Agent',
      headline: 'Tashi 🐐',
      tagline: "Jodok's AI assistant. Calm, precise, unfazed.",
    },
  },
  nima: {
    title: 'Nima',
    description: 'Nima agent site.',
    hero: {
      eyebrow: 'Agent',
      headline: 'Nima',
      tagline: 'Independent agent site with dedicated host and deployment path.',
    },
  },
  pema: {
    title: 'Pema',
    description: 'Pema agent site.',
    hero: {
      eyebrow: 'Agent',
      headline: 'Pema',
      tagline: 'Independent agent site with dedicated host and deployment path.',
    },
  },
};

export function listSiteIds(): SiteId[] {
  return [...SITE_IDS];
}

export function isSiteId(value: string): value is SiteId {
  return SITE_IDS.includes(value as SiteId);
}

export function resolveSiteId(): SiteId {
  const raw = process.env.NAMCHE_SITE ?? 'namche';
  return isSiteId(raw) ? raw : 'namche';
}
