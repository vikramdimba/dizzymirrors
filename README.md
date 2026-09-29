# Dizzy Mirrors

Source for dizzymirrors.com: Dizzy's handmade bags, her story, and the latest issues of her Substack newsletter.

## Preview locally

```bash
npm run dev
```

Open <http://localhost:4173>.

Before committing a change, verify the production build:

```bash
npm run check
npm run build
```

## Newsletter posts

`npm run build` pulls the three latest issues from the Substack archive
(`dizzymirrors.substack.com`) and writes them between the `posts:start` and
`posts:end` markers in `dist/index.html`. If Substack can't be reached, the build
uses `data/posts.json`. Vercel only rebuilds on push, so new issues show up after
the next deploy.

## Contact and waitlist

- The waitlist is the Substack subscribe embed in the "Get on the list" section.
- The contact form opens the visitor's email app, addressed to
  `dizzymirrors@outlook.com` (the address Dizzy uses on Substack). Change
  `contactEmail` in `script.js` and the address in `index.html` if that moves.

## Production deployment

Production is hosted by Vercel and connected to the GitHub repository
[`vikramdimba/dizzymirrors`](https://github.com/vikramdimba/dizzymirrors).

- Pushes to `main` create production deployments.
- Pull requests and non-production branches create preview deployments.
- Vercel runs `npm run build` and publishes `dist/`.
- The stable Vercel URL is <https://dizzymirrors.vercel.app>.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete deploy, verification,
domain, rollback, and troubleshooting runbook.
