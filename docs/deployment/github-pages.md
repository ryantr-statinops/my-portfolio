# GitHub Pages deployment

[Documentation index](../README.md) · [Section index](README.md)

Publish the single-page artifact only after the workflow checks pass.

## Contents

- [Triggers and environment](#triggers-and-environment)
- [Pipeline and gates](#pipeline-and-gates)
- [Troubleshooting and release verification](#troubleshooting-and-release-verification)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Triggers and environment

Pushes to main, PRs targeting dev/main and manual dispatch run validation. Build uses Ubuntu 24.04 inside mcr.microsoft.com/playwright:v1.63.0-noble with Node 22.12.0. The pages concurrency group keeps the active run from cancellation. Contents permission is read; Pages and id-token permissions support deployment.

## Pipeline and gates

Install with npm ci; report outdated dependencies/audit findings; run unit tests, type-check and build; assert exactly one index.html; run smoke and visual tests; verify sitemap/robots. Failure test artifacts are uploaded for diagnosis. Reports do not update dependencies or block solely on an audit finding.

Only non-PR runs on main upload dist and execute deploy after build succeeds. Production contains homepage assets, a one-URL sitemap and custom 404. No .nojekyll file or application server is required for this artifact workflow.

## Troubleshooting and release verification

Find the exact pushed SHA and first failing step. A visual failure marks the job named build failed even when bundling succeeded. Inspect failure images; for page-count errors confirm only the home route is registered/prerendered. For deploy-only errors inspect Pages/environment settings.

After success, open home, test Hub navigation/repository links when populated, and confirm old /projects/ URLs receive 404 with a working return link. Roll back via a revert followed by the same validation pipeline rather than rewriting shared history.

## Source references

- [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — `on:` ([line 3](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/.github/workflows/deploy.yml#L3)).
- [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — `Assert generated page count` ([line 46](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/.github/workflows/deploy.yml#L46)).
- [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — `deploy:` ([line 72](https://github.com/ryantr-statinops/my-portfolio/blob/61d2f0700d82eb1fc892d99256578d06352d56cc/.github/workflows/deploy.yml#L72)).

## Related documents

- [Artifact generation](../architecture/rendering.md)
- [Tests](../development/testing.md)
