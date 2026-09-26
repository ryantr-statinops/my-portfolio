# GitHub Pages deployment

[Documentation index](../README.md) · [Section index](README.md)

Trace a pushed commit through validation, artifact upload and publication.

## Contents

- [Triggers and runtime](#triggers-and-runtime)
- [Validation pipeline](#validation-pipeline)
- [Deployment gate](#deployment-gate)
- [Diagnose a failed run](#diagnose-a-failed-run)
- [Release verification](#release-verification)
- [Source references](#source-references)
- [Related documents](#related-documents)

## Triggers and runtime

The Deploy to GitHub Pages workflow runs for pushes to `main`, pull requests targeting `dev` or `main`, and manual dispatch. Build runs on Ubuntu 24.04 inside the pinned Playwright 1.63.0 Noble container, with Node 22.12.0.

Pages and identity-token write permissions support deployment; repository contents access is read-only. The `pages` concurrency group coordinates runs and `cancel-in-progress: false` keeps the active run from being interrupted by a newer push.

## Validation pipeline

1. Checkout, select Node and install with `npm ci`.
2. Report outdated packages and dependency audit findings. These steps do not update dependencies and are configured as report-only.
3. Run unit tests, type-check and build.
4. Assert the artifact has `2 + catalog.length` index pages.
5. Run smoke/static tests and visual tests.
6. Verify sitemap and robots files.
7. Upload failure test artifacts when a step fails; otherwise upload `dist/` for eligible production runs.

The job named build includes tests. A failed visual step therefore marks the build job failed even if bundling and prerender succeeded.

## Deployment gate

Artifact upload and the deploy job require `refs/heads/main` and a non-pull-request event. Deploy also depends on build success. Pull requests validate without publishing. Successful deployment publishes the static artifact through `actions/deploy-pages` to the `github-pages` environment.

The intended public URL is `https://ryantr-statinops.github.io/my-portfolio/`. The repository root is not the upload artifact. The workflow does not need a root `.nojekyll` file for its artifact-based process.

## Diagnose a failed run

Open the run for the exact pushed SHA and find the first failing step. For install errors, compare manifest/lockfile and Node requirements. For schema/type errors, follow the reported file or field. For page-count failures, compare catalog slugs with generated index files. For visual failures, inspect the expected/actual/diff files in the uploaded Playwright artifact and follow the baseline-review procedure.

When all build steps pass but deploy fails, inspect the deploy job and repository Pages/environment configuration. A dependency report warning alone does not explain a failed build. Preserve the check instead of skipping it to publish.

## Release verification

After push, wait for both build and deploy on the intended commit to succeed. Open the Pages URL and verify home, registry, a published detail route when available, asset loading and an unknown-path 404. To roll back an application change, revert the relevant commit on main and let the same pipeline validate and deploy the resulting tree; avoid rewriting shared history.

## Source references

- [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — `on:` ([source line 3](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/.github/workflows/deploy.yml#L3)).
- [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — `image:` ([source line 23](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/.github/workflows/deploy.yml#L23)).
- [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — `L3 - Visual` ([source line 54](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/.github/workflows/deploy.yml#L54)).
- [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml) — `deploy:` ([source line 74](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/.github/workflows/deploy.yml#L74)).
- [scripts/prepare-static-artifact.mjs](../../scripts/prepare-static-artifact.mjs) — `const artifactDirectory` ([source line 8](https://github.com/ryantr-statinops/my-portfolio/blob/1ad473623a2d8cd3f1e5efe8831e539433543349/scripts/prepare-static-artifact.mjs#L8)).

## Related documents

- [Testing and baselines](../development/testing.md)
- [Artifact generation](../architecture/rendering.md)
