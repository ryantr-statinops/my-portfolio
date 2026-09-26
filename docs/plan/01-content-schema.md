# L1 — Content and Unit Tests

Status: complete. The project collection may be empty; when entries exist, schema and per-entry checks still apply.

## Contract

The MDX project collection may contain zero or more projects. Each project must contain `id`, `title`, `description`, `date`, `category`, `status`, `priority`, `tags`, `impact`, `thumbnail`, `github`, `demo` and `stack`. Categories are `software-engineering`, `data-engineering`, `ai-engineering` and `other`; statuses are allowlisted; IDs and priorities are unique; dates use `YYYY-MM-DD`; URLs are HTTP(S); tags and stack remain within schema limits.

Priority `1` is highest. Tests and `getSortedProjects()` both enforce ascending order. Duplicate priority fails with the project/file context.

Thumbnails must match exactly:

```text
/images/projects/<filename-slug>/thumbnail.webp
```

The test compares the MDX filename slug, checks the corresponding folder and verifies that the file exists under `public/`.

## Logic coverage

Vitest covers empty-collection support, required fields, allowlists, date/URL formats, ID/priority uniqueness, thumbnail path/existence, tag/stack limits, multi-select filter state, terminal command parsing and the four-track Strategy scaffold.

## Maintenance

When a new project or schema field is introduced, update the schema and its focused test in the same commit. Keep Strategy copy grounded in reviewed project evidence and do not publish empty slots as capability claims.
