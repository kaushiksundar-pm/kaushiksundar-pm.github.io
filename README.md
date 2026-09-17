# Kaushik Portfolio

A static portfolio built with semantic HTML, CSS, and vanilla JavaScript. The live site is [https://kaushik.github.io/](https://kaushik.github.io/).

## Preview

```sh
npm install
npm run serve
```

Open [http://localhost:4173](http://localhost:4173).

## Verify

```sh
npm test
npm run check:links
```

With the server running, `npm run test:visual` performs browser verification. A normal `npm install` provides Playwright.

## Deployment

This is the GitHub Pages user site repository `kaushik.github.io`. Publish the `main` branch from the repository root.

The same static directory can deploy to Cloudflare Pages, Netlify, or Vercel with no build command and the repository root as the output directory.

## Add A Case Study

Add a record to the root-level `public.json`. The site renders every record whose `status` is exactly `active`, sorted by numeric `order`.

## Product Case Study Convention

Each record uses this compact structure:

```json
{
  "title": "Case study title",
  "problem": "The customer or business problem.",
  "approach": "How the product was shaped and delivered.",
  "impact": "The supported outcome or value created.",
  "order": 1,
  "status": "active"
}
```

There is no fixed case-study limit. Entries do not require source-code or live-demo links.
