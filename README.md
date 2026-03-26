# userscript

[中文](./docs/README.zh-CN.md)

A Bun-based userscript project compatible with Tampermonkey and similar browser extensions.

## Features

- TypeScript support with strict type checking
- Built-in linting and formatting tools (oxlint, oxfmt)
- Tampermonkey metadata auto-generation from `package.json` config
- ESM module support
- Hot reload development with [TamperDAV](https://github.com/Tampermonkey/tamperdav)
- Pre-commit hooks with husky

## Quick Start

### Install Dependencies

```bash
bun install
```

### Development

```bash
# Run the script directly (for testing)
bun run src/index.ts

# Or use TamperDAV for hot reload (requires browser extension)
bun run preview
```

TamperDAV is a WebDAV-like server that syncs Tampermonkey scripts and allows editing with an external editor. For more details, see the [TamperDAV documentation](https://github.com/Tampermonkey/tamperdav).

### Build

```bash
bun run build
```

Build output is written to `dist/` and can be installed directly in Tampermonkey or similar extensions.

### Code Quality

```bash
bun run fmt        # Format code
bun run fmt:check  # Check formatting without modifying
bun run lint       # Lint code
bun run lint:fix   # Auto-fix lint issues
bun run lint:github # Lint with GitHub annotations
```

## Configuration

Configure the userscript in `package.json`:

| Field         | Description                 | Maps to        |
| ------------- | --------------------------- | -------------- |
| `match`       | URL patterns to match       | `@match`       |
| `include`     | URLs to include             | `@include`     |
| `exclude`     | URLs to exclude             | `@exclude`     |
| `connect`     | Allowed domains to connect  | `@connect`     |
| `require`     | External dependency scripts | `@require`     |
| `resource`    | Resource files              | `@resource`    |
| `run-at`      | Execution timing            | `@run-at`      |
| `namespace`   | Script namespace            | `@namespace`   |
| `icon`        | Script icon URL             | `@icon`        |
| `icon64`      | 64x64 script icon URL       | `@icon64`      |
| `sandbox`     | Sandbox mode                | `@sandbox`     |
| `antifeature` | Antifeature configs         | `@antifeature` |
| `noframes`    | Disable frames              | `@noframes`    |
| `updateURL`   | Update URL                  | `@updateURL`   |
| `downloadURL` | Download URL                | `@downloadURL` |
| `webRequest`  | WebRequest blocking         | `@webRequest`  |
| `run-in`      | Run-in mode                 | `@run-in`      |
| `unwrap`      | Inject without wrapper      | `@unwrap`      |
| `tag`         | Script tags                 | `@tag`         |

The following fields are read from the root level of `package.json`:

| Field         | Description        | Maps to        |
| ------------- | ------------------ | -------------- |
| `name`        | Script name        | `@name`        |
| `version`     | Script version     | `@version`     |
| `description` | Script description | `@description` |
| `author`      | Script author      | `@author`      |
| `license`     | Copyright notice   | `@copyright`   |
| `homepage`    | Homepage URL       | `@homepage`    |
| `keywords`    | Script tags        | `@tag`         |
| `bugs.url`    | Support URL        | `@supportURL`  |

> **Note**: `@grant` is automatically detected from code during build.

## Project Structure

```
src/index.ts    # Entry point - write your userscript here
build.ts        # Build script
dist/           # Build output
package.json    # Project config & metadata
```

## Tech Stack

- [Bun](https://bun.sh) - JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [oxlint](https://oxc.rs/) - Linter
- [oxfmt](https://oxc.rs/) - Code formatter
- [husky](https://typicode.github.io/husky/) - Git hooks
