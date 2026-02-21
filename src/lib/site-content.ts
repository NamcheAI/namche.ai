import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import matter from 'gray-matter';
import { marked } from 'marked';

export type SiteId = 'namche' | 'tashi' | 'nima' | 'pema';

export interface SiteData {
  id: string;
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    headline: string;
    tagline: string;
  };
  contentHtml: string;
}

const VALID_SITES: SiteId[] = ['namche', 'tashi', 'nima', 'pema'];

export function listSiteIds(): SiteId[] {
  return [...VALID_SITES];
}

export function isSiteId(value: string): value is SiteId {
  return VALID_SITES.includes(value as SiteId);
}

export function resolveSiteId(): SiteId {
  const raw = process.env.NAMCHE_SITE ?? 'namche';
  return isSiteId(raw) ? raw : 'namche';
}

export function loadSiteData(siteId: SiteId = resolveSiteId()): SiteData {
  const path = resolve(process.cwd(), 'content', siteId, 'site.md');
  if (!existsSync(path)) {
    throw new Error(`Missing content file: ${path}`);
  }

  const file = readFileSync(path, 'utf-8');
  const parsed = matter(file);
  const frontmatter = parsed.data as {
    id?: string;
    title?: string;
    description?: string;
    hero?: {
      eyebrow?: string;
      headline?: string;
      tagline?: string;
    };
  };

  const html = marked.parse(parsed.content, { async: false });

  return {
    id: frontmatter.id ?? siteId,
    title: frontmatter.title ?? siteId,
    description: frontmatter.description ?? '',
    hero: {
      eyebrow: frontmatter.hero?.eyebrow ?? 'Site',
      headline: frontmatter.hero?.headline ?? frontmatter.title ?? siteId,
      tagline: frontmatter.hero?.tagline ?? '',
    },
    contentHtml: html,
  };
}
