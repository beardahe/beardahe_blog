import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const PAGE_SIZE = 5;

export function sortPostsDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

export function getTagSlug(tag: string): string {
  return encodeURIComponent(normalizeTag(tag));
}

export function getTagGroups(posts: BlogPost[]): Array<{ name: string; slug: string; count: number }> {
  const map = new Map<string, { name: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const name = tag.trim();
      if (!name) continue;

      const slug = getTagSlug(name);
      const item = map.get(slug);
      if (item) {
        item.count += 1;
      } else {
        map.set(slug, { name, count: 1 });
      }
    }
  }

  return Array.from(map.entries())
    .map(([slug, item]) => ({ slug, name: item.name, count: item.count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}
