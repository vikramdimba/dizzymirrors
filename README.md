# Dizzy Mirrors

Independent source for the dizzymirrors.com launch page. This replaces the GoDaddy Website Builder page without changing the domain registration.

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

## Contact form

The form currently opens the visitor's email app and addresses the message to `hello@dizzymirrors.com`. Confirm that mailbox before pointing the live domain at this site, or replace `contactEmail` in `script.js` with the correct inbox.

## Production deployment

Production is hosted by Vercel and connected to the GitHub repository
[`vikramdimba/dizzymirrors`](https://github.com/vikramdimba/dizzymirrors).

- Pushes to `main` create production deployments.
- Pull requests and non-production branches create preview deployments.
- Vercel runs `npm run build` and publishes `dist/`.
- The stable Vercel URL is <https://dizzymirrors.vercel.app>.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete deploy, verification,
domain, rollback, and troubleshooting runbook.
