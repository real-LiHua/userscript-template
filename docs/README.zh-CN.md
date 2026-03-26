# userscript

[English](../README.md)

使用 Bun 构建的用户脚本项目，兼容 Tampermonkey 等浏览器扩展。

## 安装依赖

```bash
bun install
```

## 开发

```bash
bun run src/index.ts
```

## 构建

```bash
bun run build
```

构建产物输出到 `dist/` 目录，可直接在 Tampermonkey 等扩展中安装。

## 代码质量

```bash
bun run fmt        # 格式化
bun run fmt:check  # 检查格式
bun run lint       # Lint
bun run lint:fix   # 自动修复
```

## 配置

在 `package.json` 的 `config` 字段中配置用户脚本：

| 字段       | 说明            |
| ---------- | --------------- |
| `match`    | 匹配的 URL 模式 |
| `include`  | 包含的 URL      |
| `exclude`  | 排除的 URL      |
| `connect`  | 允许连接的域名  |
| `require`  | 外部依赖脚本    |
| `resource` | 资源文件        |
| `run-at`   | 运行时机        |

> **注意**：`@grant` 在构建时会自动从代码中检测生成。

## 技术栈

- [Bun](https://bun.sh) - JavaScript 运行时
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [oxlint](https://oxc.rs/) - Linter
- [oxfmt](https://oxc.rs/) - 代码格式化

---

This project was created using `bun init` in bun v1.3.5.
