# Text Craft - Vanilla JS Markdown Toolkit

## Project Overview

A collection of lightweight Markdown text processing tools implemented purely with **Vanilla JavaScript** (no frameworks or libraries).

## Directory Structure

```text
text-craft/               # Project root
└── src/                  # Source code (multi-module)
    ├── markdown-text-processor/
    │   ├── browser/      # Browser implementation（Works without a local server）
    │   ├── browser-esm/  # Browser-compatible ESM implementations requiring a local server
    │   └── node/         # Node.js implementation
    └── (other-modules)/  # Additional modules can be added
```

## Development

### Runtime Management (via asdf)

```sh
# Install versions (check .tool-versions)
asdf install
```

### Package Management

This project uses [pnpm](https://pnpm.io/) for fast and disk-efficient dependency management.

```sh
# Install dependencies
pnpm install
```

### Code Quality Tools

| Tool                             | Usage          | Config File   |
| -------------------------------- | -------------- | ------------- |
| [Prettier](https://prettier.io/) | Code Formatter | `.prettierrc` |
| [ESLint](https://eslint.org/)    | Linter         | (WIP)         |

#### Format & Lint

```sh
pnpm exec prettier . --write
```

## コード記述の指針

- コードには How
- テストコードには What
  - 「やったこと」はコメント無しでも解るように書くべき
  - セマンティックなマークアップで「What」を表現するように努めるか
- コミットログには Why
- コードコメントには Why not

> 参考: [和田卓人さんのツイート](https://x.com/t_wada/status/904916106153828352)
