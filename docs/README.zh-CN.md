# userscript

[English](../README.md)

使用 Bun 构建的用户脚本项目，兼容 Tampermonkey 等浏览器扩展。

## 功能特性

- TypeScript 支持及严格类型检查
- 内置 linting 和格式化工具 (oxlint, oxfmt)
- Tampermonkey 元数据自动从 `package.json` 配置生成
- ESM 模块支持
- 使用 [TamperDAV](https://github.com/Tampermonkey/tamperdav) 热重载开发
- husky 提交钩子

## 快速开始

### 安装依赖

```bash
bun install
```

### 开发

```bash
# 直接运行脚本（用于测试）
bun run src/index.ts

# 或使用 TamperDAV 热重载（需要浏览器扩展）
bun run preview
```

TamperDAV 是一个类似 WebDAV 的服务器，可同步 Tampermonkey 脚本并支持使用外部编辑器编辑。详见 [TamperDAV 文档](https://github.com/Tampermonkey/tamperdav)。

### 构建

```bash
bun run build
```

构建产物输出到 `dist/` 目录，可直接在 Tampermonkey 等扩展中安装。

### 代码质量

```bash
bun run fmt        # 格式化
bun run fmt:check  # 检查格式
bun run lint       # Lint
bun run lint:fix   # 自动修复
bun run lint:github # GitHub 格式输出
```

## 配置

在 `package.json` 中配置用户脚本：

`config` 字段：

| 字段          | 说明               | 映射到         |
| ------------- | ------------------ | -------------- |
| `match`       | 匹配的 URL 模式    | `@match`       |
| `include`     | 包含的 URL         | `@include`     |
| `exclude`     | 排除的 URL         | `@exclude`     |
| `connect`     | 允许连接的域名     | `@connect`     |
| `require`     | 外部依赖脚本       | `@require`     |
| `resource`    | 资源文件           | `@resource`    |
| `run-at`      | 运行时机           | `@run-at`      |
| `namespace`   | 脚本命名空间       | `@namespace`   |
| `icon`        | 脚本图标 URL       | `@icon`        |
| `icon64`      | 64x64 脚本图标 URL | `@icon64`      |
| `sandbox`     | 沙箱模式           | `@sandbox`     |
| `antifeature` | 反功能配置         | `@antifeature` |
| `noframes`    | 禁用框架           | `@noframes`    |
| `updateURL`   | 更新 URL           | `@updateURL`   |
| `downloadURL` | 下载 URL           | `@downloadURL` |
| `webRequest`  | WebRequest 阻塞    | `@webRequest`  |
| `run-in`      | 运行模式           | `@run-in`      |
| `unwrap`      | 无包装注入         | `@unwrap`      |
| `tag`         | 脚本标签           | `@tag`         |

根级字段：

| 字段          | 说明     | 映射到         |
| ------------- | -------- | -------------- |
| `name`        | 脚本名称 | `@name`        |
| `version`     | 脚本版本 | `@version`     |
| `description` | 脚本描述 | `@description` |
| `author`      | 脚本作者 | `@author`      |
| `license`     | 版权声明 | `@copyright`   |
| `homepage`    | 主页 URL | `@homepage`    |
| `keywords`    | 脚本标签 | `@tag`         |
| `bugs.url`    | 支持 URL | `@supportURL`  |

> **注意**：`@grant` 在构建时会自动从代码中检测生成。

## 项目结构

```
src/index.ts    # 入口点 - 在此编写用户脚本
build.ts        # 构建脚本
dist/           # 构建产物
package.json    # 项目配置和元数据
```

## 技术栈

- [Bun](https://bun.sh) - JavaScript 运行时
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [oxlint](https://oxc.rs/) - Linter
- [oxfmt](https://oxc.rs/) - 代码格式化
- [husky](https://typicode.github.io/husky/) - Git 钩子
