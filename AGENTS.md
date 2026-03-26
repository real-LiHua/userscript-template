# AGENTS.md

This is a Bun-based userscript project compatible with Tampermonkey and similar browser extensions.

## Features

- TypeScript support with strict type checking
- Built-in linting and formatting tools (oxlint, oxfmt)
- Tampermonkey metadata auto-generation from `package.json` config
- ESM module support
- Hot reload development with tamperdav
- Pre-commit hooks with husky

## Commands

| Command                | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `bun install`          | Install dependencies                                         |
| `bun run build`        | Build userscript to `dist/` (generates Tampermonkey headers) |
| `bun run src/index.ts` | Run the script directly                                      |
| `bun run preview`      | Run tamperdav server for hot reload development              |
| `bun run fmt`          | Format all files (oxfmt)                                     |
| `bun run fmt:check`    | Check formatting without modifying                           |
| `bun run lint`         | Lint with oxlint                                             |
| `bun run lint:fix`     | Auto-fix lint issues                                         |
| `bun run lint:github`  | Lint with GitHub annotations                                 |
| `bun run prepare`      | Install husky hooks (runs automatically on `bun install`)    |

No test framework is currently configured.

## Code Style

- **Formatter**: oxfmt (80 char print width)
- **Linter**: oxlint with `eslint/no-unused-vars: error`
- **TypeScript**: strict mode with some relaxed flags (see tsconfig.json)
- **Module system**: ESM (`"type": "module"`), `verbatimModuleSyntax: true`
- **Runtime**: Bun

### Imports

Use `import` syntax. With `verbatimModuleSyntax`, use `import type` for type-only imports:

```ts
import type { SomeType } from "./module";
import { someValue, anotherValue } from "./module";
```

### Naming Conventions

- **Variables/functions**: camelCase (`getUserData`, `isValidUrl`)
- **Types/interfaces**: PascalCase (`UserData`, `ConfigOptions`)
- **Constants**: camelCase (no UPPER_SNAKE_CASE)
- **Files**: kebab-case (`user-utils.ts`, `config-handler.ts`)

### Error Handling

- Use typed errors where possible
- Let errors propagate rather than swallowing silently
- Avoid `catch` blocks that only log without re-throwing

### Types

- Prefer explicit types for function parameters and return values
- Use `unknown` instead of `any` when the type is truly unknown
- Leverage `strict` mode: `noUncheckedIndexedAccess`, `noImplicitOverride`

## Architecture

- `src/index.ts` - Entry point
- `build.ts` - Builds userscript with Tampermonkey headers from `package.json` config
- `dist/` - Build output directory
- User script metadata (match URLs, grants, etc.) is configured in `package.json` `config` field

### Project Structure

```
src/index.ts    # Entry point - write your userscript here
build.ts        # Build script
dist/           # Build output
package.json    # Project config & metadata
```

## Tampermonkey Integration

The build script reads these from `package.json`:

### `config` field

| Field         | Maps to        |
| ------------- | -------------- |
| `match`       | `@match`       |
| `include`     | `@include`     |
| `exclude`     | `@exclude`     |
| `connect`     | `@connect`     |
| `require`     | `@require`     |
| `resource`    | `@resource`    |
| `run-at`      | `@run-at`      |
| `namespace`   | `@namespace`   |
| `icon`        | `@icon`        |
| `sandbox`     | `@sandbox`     |
| `antifeature` | `@antifeature` |
| `noframes`    | `@noframes`    |
| `updateURL`   | `@updateURL`   |
| `downloadURL` | `@downloadURL` |
| `webRequest`  | `@webRequest`  |
| `run-in`      | `@run-in`      |

### Root level fields

| Field         | Maps to        |
| ------------- | -------------- |
| `name`        | `@name`        |
| `version`     | `@version`     |
| `description` | `@description` |
| `author`      | `@author`      |
| `license`     | `@copyright`   |
| `homepage`    | `@homepage`    |
| `keywords`    | `@tag`         |
| `bugs.url`    | `@supportURL`  |

> **Note**: `@grant` is automatically detected from code during build.

Available types: `@types/tampermonkey` is included in devDependencies.
