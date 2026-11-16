# New project template

Add to `curatedProjects` in `src/content/profile.ts`:

```ts
{
  slug: 'your-project',
  title: 'Your project',
  summary: 'A concise, evidence-based description.',
  category: 'Web application',
  technologies: ['TypeScript'],
  createdAt: '2026-11-16',
  updatedAt: '2026-11-16',
  featured: false,
  githubUrl: 'https://github.com/vishaka1203/your-repository',
  // liveUrl: 'https://your-live-project.example',
  // image: '/projects/your-approved-screenshot.png',
  art: 'portfolio',
  source: 'Owner-supplied project notes and public source',
}
```

Optional `src/content/projects/your-project.mdx`:

```md
## The problem

Describe the actual user need.

## My contribution

Explain your verified individual contribution.

## Technical decisions

Describe a real tradeoff, the chosen solution, and why.

## Challenges and learnings

Include observed problems and what you learned. Omit unsupported metrics.

## Evidence

Link public source, approved screenshots, or a live demonstration.
```
