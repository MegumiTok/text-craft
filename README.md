# Text Craft with Vanilla JS

## Project Overview

A lightweight collection of text processing utilities crafted with **Vanilla JavaScript** (no frameworks or libraries), focusing on:

- Browser-first design (no Node.js).
- ES Modules (`import/export`) for modern, modular usage.

### Module System Considerations

`browser/`: Contains simple scripts that can be opened directly using `file://`. Because ESM imports don’t work with `file://` due to CORS restrictions, this code doesn’t use the module system. It’s built to run straight in the browser without any setup. (Note: I know the code in `browser/` doesn’t fully embrace modularity, but I’m keeping it here for learning purposes.)

`browser-esm/`: Shows a modern approach using ES Modules (ESM) in the browser. Since `file://` URLs have CORS issues, you’ll need a local server to test this.

## Run Locally

### For Simple Browser Usage (no server needed, `browser/`)

1. Navigate to the browser implementation

2. Open `index.html` directly in your browser

### For ESM Module Usage (requires local server, `browser-esm/`)

#### Option 1: VS Code Live Server

If you're using VS Code:

1. Open the `browser-esm` folder in VS Code
2. Click "Go Live" from the status bar

#### Option 2: Python HTTP Server

If you have Python installed:

```sh
cd src/browser-esm
python -m http.server 8000
```

Then open: http://localhost:8000

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

## 作業ログ（つぶやき）

### 1. Vanilla JSで感じたフレームワークの恩恵とトレードオフ

Reactに慣れた後にこのVanilla JSのプロジェクトに取り組んでみると、やっぱりReactのコンポーネント設計のありがたさが身にしみますね。フレームワークなしだと、どうしても同じコードを繰り返し書いちゃったり、「この部分を別のモジュールに分けるべきか？」とか「アーキテクチャをどう整理しよう？」とか考えるのが結構大変です。

でも逆に、`browser/`に置いてるコードみたいに、単純な関数を動かしたいだけなら、HTMLとJSの2ファイルさえあればブラウザでやりたいことが一応できちゃうのはいいですよね。ファイルを開くだけなら動かすのも超簡単ですし、環境に依存しないので安心していつでもお気に入りの関数を実行できます。ただ、やはり同じコードがあちこちに散見しますし、何よりテストが難しいので本当に趣味だけのコードになっちゃいますね。結局、メリットとデメリットを両方感じるプロジェクトになって個人的には勉強になってます。

### 2. はじめてテストコード書きたいと思いました

`removeBlankLines()`関数の bug fix での学びをば。

`browser/`の制約でコーディングしてるとデバッグが難しいと感じざるを得ない。
たとえば正規表現のマッチにおいて、[regex101.com](https://regex101.com/)で確認しながらやる地道な作業は効率が悪い。

実際、空行を取り除くための関数をかいたときにスペースを含んだ改行を見落としていたケースがあった。
テストケース書いてたら、それが考慮されてコーディングされてるかは一目瞭然なんですよね。変更で何を壊したかも恐れずに済むし。
テストドリブン開発（あまりできてないですが）的には、テストケース書いてそれが通るかで確認したい..とか思ってしまったり。

テスト書くの嫌いでしたが制約の上で作業してはじめてテスト書きたいって思ったよーっていう話です..笑

## TODO

全体

- [ ] ESLintのルール調整
- [ ] JS -> TS
  - 今回のプロジェクトではやらないかも

`browser/`

- [ ] `browser/`の制約上でもテストコード書いてみる
  - テストするコードが実際動かしてるコードじゃないのでメンテナンス性にかける問題が気になりますが..
- [ ] モジュールパターンとしてのIIFYを意識してみる
