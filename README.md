# Dizzy Mirrors

Independent source for the dizzymirrors.com launch page. This replaces the GoDaddy Website Builder page without changing the domain registration.

## Preview locally

```bash
npm run dev
```

Open <http://localhost:4173>.

## Contact form

The form currently opens the visitor's email app and addresses the message to `hello@dizzymirrors.com`. Confirm that mailbox before pointing the live domain at this site, or replace `contactEmail` in `script.js` with the correct inbox.

## GitHub Pages

The included workflow deploys every push to `main`. In the GitHub repository settings, choose **GitHub Actions** as the Pages source. The included `CNAME` file prepares Pages for `dizzymirrors.com`.

Before changing GoDaddy DNS, verify the GitHub Pages URL, then add GitHub's four apex `A` records and the `www` CNAME shown in GitHub's custom-domain setup. Keep the current GoDaddy site live until GitHub confirms the custom domain and HTTPS certificate.
