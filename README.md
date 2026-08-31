# SK Khorrum SEO Portfolio

Preview: https://turbo-goggles-5ppp9464wxvcrpx.github.dev/

Premium SEO consultant portfolio built with React, Vite, TypeScript, and Firebase-ready collection boundaries.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The current landing experience is intentionally SEO-first: strategy, technical SEO, content, local search, and SEO-friendly web design are presented in that order. The profile image is loaded from the supplied asset URL.

## Content workflow

Content lives outside the React components:

- `posts/` accepts HTML files and is indexed into `src/data/posts.json` and `public/generated/posts.json`.
- `pages/` accepts standalone HTML pages.
- `projects/` accepts JSON metadata.
- `case-studies/` accepts JSON metadata; leave `results` empty until outcomes are verified.

Run `npm run generate-content` to regenerate indexes and `sitemap.xml`. `npm run build` runs it automatically. See each folder's README for the exact fields and examples. The homepage reads the generated post registry, so adding a post does not require editing `Home.tsx`, `Blog.tsx`, or `App.tsx`.

## Firebase

Copy the Firebase web configuration into `.env.local` using `.env.example`. Keep credentials out of source control. The rules in `firebase/firestore.rules` allow anonymous creation of contact and requirement records, while reads and all administrative writes require an authenticated UID present in the `admins` collection. Deploy rules with `firebase deploy --only firestore:rules` after installing the Firebase CLI.

To show real Google Business Profile feedback, set `VITE_GOOGLE_BUSINESS_PROFILE_URL` to the public Maps/Profile URL. Add only verified review records to the protected `verifiedReviews` Firestore collection with `author`, `rating`, `text`, and optional `date`/`profileUrl` fields. The homepage never fabricates testimonials; without connected records it shows a verified-profile link instead.

The intended collections are `admins`, `clientRequirements`, `contactMessages`, `siteSettings`, `postMetadata`, `pageMetadata`, `projectMetadata`, and `caseStudyMetadata`. The client-facing form and admin dashboard can be connected to these boundaries without changing the content discovery system.

## Deploy to Vercel

Import the repository in Vercel, set the `VITE_FIREBASE_*` environment variables for Preview and Production, and use the defaults: build command `npm run build`, output directory `dist`. Vercel will regenerate content and the sitemap during every production build. Add a custom domain in Vercel's Domains panel, then update `siteUrl` in `scripts/generate-content-index.ts` so canonical links and the sitemap match it.

## Quality checks

```bash
npm run build
```

This validates TypeScript, content discovery, sitemap generation, and the production Vite bundle. `public/robots.txt` keeps `/admin/` out of crawling while allowing public content.


Migration note: the active application is the Vite source copied from sk-khorrum/dfsf.


Firebase auth domain configured for Vercel production.
