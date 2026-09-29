# Project operating instructions

This repository is the source of truth for the Dizzy Mirrors website.

## Deployment model

- GitHub repository: `vikramdimba/dizzymirrors`
- Production branch: `main`
- Hosting: Vercel project `dizzymirrors`
- Production URL: `https://dizzymirrors.vercel.app`
- Build command: `npm run build`
- Published directory: `dist`
- GitHub Pages and OpenAI Sites are not deployment targets for this project.

## Required workflow

Before committing or deploying:

1. Read `DEPLOYMENT.md`.
2. Inspect `git status` and the relevant diff.
3. Run `npm run check` and `npm run build`.
4. Commit only intended files with a descriptive message.
5. Push to the requested branch. A push to `main` is a production deployment.
6. Verify the GitHub checks and the resulting Vercel deployment.

Never commit secrets or `.env` files. Do not force-push `main`, change Vercel
projects, change domain/DNS records, or alter production access without explicit
user authorization. Preserve GoDaddy email-related DNS records during any domain
cutover.
