# L1 — Content and Unit Tests

Status: complete. `npm run test:unit` currently passes 22 tests.

## Contract

There are exactly five MDX projects. Each project must contain `id`, `title`, `description`, `date`, `category`, `status`, `priority`, `tags`, `impact`, `thumbnail`, `github`, `demo` and `stack`. Categories and statuses are allowlisted; IDs and priorities are unique; dates use `YYYY-MM-DD`; URLs are HTTP(S); tags and stack remain within schema limits.

Priority `1` is highest. Tests and `getSortedProjects()` both enforce ascending order. Duplicate priority fails with the project/file context.

Thumbnails must match exactly:

```text
/images/projects/<filename-slug>/thumbnail.webp
```

The test compares the MDX filename slug, checks the corresponding folder and verifies that the file exists under `public/`.

## Logic coverage

Vitest covers the project count, required fields, allowlists, date/URL formats, ID/priority uniqueness and ordering, thumbnail path/existence, tag/stack limits, multi-select filter state and terminal command parsing.

## Maintenance

When a new project or schema field is introduced, update the schema and its focused test in the same commit. A future Cluster project must be introduced in a separate content commit with an explicitly chosen priority; it is not part of the current five-project assertion.
