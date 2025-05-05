# Text Craft with Vanilla JS

## Project Overview

A lightweight collection of text processing utilities crafted with **Vanilla JavaScript** (no frameworks or libraries), focusing on:

- Browser-first design (no Node.js).
- ES Modules (`import/export`) for modern, modular usage.

### Module System Considerations

`browser/`: Contains simple scripts that can be opened directly using `file://`. Because ESM imports don't work with `file://` due to CORS restrictions, this code doesn't use the module system. It's built to run straight in the browser without any setup. (Note: I know the code in `browser/` doesn't fully embrace modularity, but I'm keeping it here for learning purposes.)

`browser-esm/`: Shows a modern approach using ES Modules (ESM) in the browser. Since `file://` URLs have CORS issues, you'll need a local server to test this.

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
  - "やったこと"はコメント無しでも解るように書くべき
  - セマンティックなマークアップで"What"を表現するように努めるか
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

### 3. Naming convention: メソッド名の付け方について考えた

今のプロジェクトはサーバーを立てずにローカルファイルをブラウザで開くだけでサクッと動くプログラムを実装ができたら個人的な都合は間に合うので最近コードのメンテナンスは /browser ディレクトリ配下のしかやってません..
テストコード書けないので修正に不安が残りますが..

さて、新しく追加した関数trimLineWhitespaceを考える際、命名のルールを再検討しました。

ポイントは動詞と名詞。

また、JavaScriptの標準メソッド名も参考にし、既存コードの慣習と機能の明確さを両立させました。

■ 動詞: RemoveからTrimへ

- 当初の考え:

  - 既存コードでは「削除」を表す動詞としてRemoveを使用（例: removeSpaces）
  - 慣習に従いremoveLineWhitespaceを検討

- 今回の修正:
  - JavaScriptの標準メソッドString.trim()が「文字列の先頭/末尾の空白削除」を指す
  - 今回の機能（各行の先頭/末尾の空白削除）にぴったり一致するため、Trimを採用

■ 名詞: SpaceからWhitespaceへ

- 問題点:
  - 既存コードではSpaceを使用（例: removeSpaces）
  - しかし、Spaceはスペース（ ）のみを連想させ、タブ（\t）や改行（\n）を含む空白全体をカバーしないことが以前の修正でも問題点だった
- 今回の修正:
  - JavaScriptの正規表現（\s）や標準用語に倣い、空白を表す用語として Space -> Whitespaceに変更
  - 過去のメソッド名（例: removeSpaces）についても同じく変更を適用

## TODO

全体

- [ ] ESLintのルール調整
- [ ] JS -> TS
  - 今回のプロジェクトではやらないかも

`browser/`

- [ ] `browser/`の制約上でもテストコード書いてみる
  - テストするコードが実際動かしてるコードじゃないのでメンテナンス性にかける問題が気になりますが..
- [ ] モジュールパターンとしてのIIFYを意識してみる
