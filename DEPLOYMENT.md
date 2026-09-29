# Deployment runbook

## System of record

- Local project: `/Users/vdimba/Documents/dizzymirrors`
- GitHub repository: <https://github.com/vikramdimba/dizzymirrors>
- Production branch: `main`
- Hosting provider: Vercel
- Vercel project: `dizzymirrors`
- Stable Vercel URL: <https://dizzymirrors.vercel.app>
- Custom domain: `dizzymirrors.com` (DNS remains at GoDaddy)

GitHub stores the source and history. Vercel watches GitHub and deploys every
push. GitHub Pages and OpenAI Sites are not part of this project's deployment
path.

## Standard production deploy

From the project directory:

```bash
npm run check
npm run build
git status
git diff
git add <files-to-commit>
git commit -m "Describe the change"
git push origin main
```

Do not use `git add .` until the diff has been reviewed. Never commit `.env`
files, credentials, tokens, or generated `dist/` output.

After the push:

1. Confirm the GitHub checks complete successfully.
2. Confirm the corresponding Vercel deployment reaches **Ready**.
3. Open the Vercel deployment URL and verify the affected page or interaction.
4. For a production change, verify the stable production URL after promotion.

## Preview deploys

Use a branch and pull request when a change should be reviewed before release:

```bash
git switch -c feature/short-description
git push -u origin feature/short-description
```

Vercel creates a unique preview URL for the branch or pull request. Merge into
`main` only after the preview is approved.

## Vercel build configuration

The version-controlled `vercel.json` is authoritative:

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root (`./`)
- Environment variables: none currently required

If the Vercel dashboard differs, keep the repository configuration unless a
deliberate migration is being made.

## Custom domain and GoDaddy DNS

1. Add `dizzymirrors.com` and, if desired, `www.dizzymirrors.com` in Vercel's
   **Project Settings → Domains**.
2. Use the exact DNS records Vercel displays for this project.
3. Add or replace only those records in GoDaddy DNS.
4. Preserve unrelated MX, TXT, email, and verification records.
5. Keep the previous site available until Vercel reports the domain and SSL
   certificate as valid and the production page loads through the custom domain.

Do not hard-code generic Vercel DNS targets in this repository; use the values
shown by Vercel when the domain is added.

## Rollback

Prefer Vercel's **Instant Rollback** for an urgent restoration. Then revert the
bad Git commit so the repository and production history agree:

```bash
git revert <bad-commit-sha>
git push origin main
```

Do not rewrite shared history or force-push `main` for a normal rollback.

## One-time Git authentication on a new computer

Authenticate GitHub from the user's terminal with GitHub CLI or SSH. Do not ask
the user to paste a personal access token into chat. After authentication,
verify with:

```bash
git fetch origin
git push --dry-run origin main
```

## Troubleshooting

- Build failure: run `npm run check` and `npm run build` locally and fix the
  first reported error.
- No deployment after a push: confirm Vercel is still connected to
  `vikramdimba/dizzymirrors` and that `main` is the production branch.
- Deployment is ready but the domain is not: inspect the domain in Vercel and
  compare its requested DNS records with GoDaddy.
- Form issues: confirm `contactEmail` in `script.js` points to an active mailbox.
