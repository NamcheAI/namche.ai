import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import matter from 'gray-matter';
import { marked } from 'marked';

interface SiteData {
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

const VALID_SITES = new Set(['namche', 'tashi', 'nima', 'pema']);

export function resolveSiteId(): string {
  const raw = process.env.NAMCHE_SITE ?? 'namche';
  return VALID_SITES.has(raw) ? raw : 'namche';
}

export function loadSiteData(siteId = resolveSiteId()): SiteData {
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
