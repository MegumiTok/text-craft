# Text Craft - Vanilla JS Markdown Toolkit

## Project Overview

A collection of lightweight Markdown text processing tools implemented purely with **Vanilla JavaScript** (no frameworks or libraries).

This project focuses on:

- Browser environments (no Node.js).
- ES Modules (`import/export`) as the default.

## Directory Structure

```text
text-craft/               # Project root
└── src/                  # Source code (multi-module)
    ├── markdown-text-processor/
    │   ├── browser/      # Browser implementation（Works without a local server）
    │   └── browser-esm/  # Browser-compatible ESM implementations requiring a local server
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
pnpm format
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

## Run Locally

### For Simple Browser Usage (no server needed)

1. Navigate to the browser implementation:

   ```sh
   cd src/markdown-text-processor/browser
   ```

2. Open `index.html` directly in your browser

### For ESM Module Usage (requires local server)

#### Option 1: VS Code Live Server

If you're using VS Code:

1. Open the `browser-esm` folder in VS Code
2. Click "Go Live" from the status bar

#### Option 2: Python HTTP Server

If you have Python installed:

```sh
cd src/markdown-text-processor/browser-esm
python -m http.server 8000
```

Then open: http://localhost:8000

### Run Tests

This project uses [Jest](https://jestjs.io/) for unit testing.

```sh
pnpm test
```

## Code Style Guide

### Code Documentation Guidelines

- コードには How
- テストコードには What
  - 「やったこと」はコメント無しでも解るように書くべき
  - セマンティックなマークアップで「What」を表現するように努めるか
- コミットログには Why
- コードコメントには Why not

> 参考: [和田卓人さんのツイート](https://x.com/t_wada/status/904916106153828352)
