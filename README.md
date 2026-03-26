# userscript

[中文](./docs/README.zh-CN.md)

A Bun-based userscript project compatible with Tampermonkey and similar browser extensions.

## Features

- TypeScript support with strict type checking
- Built-in linting and formatting tools
- Tampermonkey metadata auto-generation from `package.json` config
- ESM module support
- Hot reload development with `tamperdav`

## Quick Start

### Install Dependencies

```bash
bun install
```

### Development

```bash
# Run the script directly (for testing)
bun run src/index.ts

# Or use tamperdav for hot reload (requires browser extension)
bun run preview
```

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
```

## Configuration

Configure the userscript in `package.json` `config` field:

| Field      | Description                 |
| ---------- | --------------------------- |
| `match`    | URL patterns to match       |
| `include`  | URLs to include             |
| `exclude`  | URLs to exclude             |
| `connect`  | Allowed domains to connect  |
| `require`  | External dependency scripts |
| `resource` | Resource files              |
| `run-at`   | Execution timing            |

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
