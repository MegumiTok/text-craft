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

| Tool                             | Usage          | Config File         |
| -------------------------------- | -------------- | ------------------- |
| [Prettier](https://prettier.io/) | Code Formatter | `.prettierrc`       |
| [ESLint](https://eslint.org/)    | Linter         | `eslint.config.mjs` |

#### Format & Lint

```sh
pnpm exec prettier . --write
pnpm eslint src/
```

This project uses Husky and lint-staged to automatically check code quality before commits:

```sh
# Pre-commit hook runs:
pnpm exec lint-staged
```

### Module System Considerations

This project explores different ways to handle JavaScript modules in the browser and Node.js.

`browser/`: Contains simple scripts that can be opened directly using `file://`. Since ESM imports are restricted by CORS in this case, the code does not rely on the module system and is structured for direct usage in a browser environment.

`browser-esm/`: This project demonstrates a modern approach using ES Modules (ESM) in the browser. Note that due to CORS restrictions with `file://` URLs, you'll need a local server to test this.

■ Option 1: VS Code Live Server
If you're using VS Code:

1. Open the project in VS Code
2. Click "Go Live" from the status bar
   - The simplest option if you already use VS Code

■ Option 2: Python HTTP Server
If you have Python installed:

```sh
cd src/markdown-text-processor/browser-esm
python -m http.server
```

And then access in your browser:
`http://localhost:8000`

## Code Style Guide

### Code Documentation Guidelines

- コードには How
- テストコードには What
  - 「やったこと」はコメント無しでも解るように書くべき
  - セマンティックなマークアップで「What」を表現するように努めるか
- コミットログには Why
- コードコメントには Why not

> 参考: [和田卓人さんのツイート](https://x.com/t_wada/status/904916106153828352)

### Naming Conventions

JavaScriptの慣習:

UPPER_CASE: 変更不可な設定値/定数（Airbnb Style Guide）

camelCase: 通常の変数/関数
