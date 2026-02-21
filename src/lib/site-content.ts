import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface SiteItem {
  title?: string;
  text: string;
}

interface SiteSection {
  label: string;
  type: 'cards' | 'list' | 'text';
  items: SiteItem[];
}

interface SiteData {
  id: string;
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
  };
  sections: SiteSection[];
  footer?: string;
}

const VALID_SITES = new Set(['namche', 'tashi', 'nima', 'pema']);

export function resolveSiteId(): string {
  const raw = process.env.NAMCHE_SITE ?? 'namche';
  return VALID_SITES.has(raw) ? raw : 'namche';
}

export function loadSiteData(siteId = resolveSiteId()): SiteData {
  const path = resolve(process.cwd(), 'content', siteId, 'site.json');
  if (!existsSync(path)) {
    throw new Error(`Missing content file: ${path}`);
  }

  const parsed = JSON.parse(readFileSync(path, 'utf-8')) as SiteData;
  return parsed;
}
