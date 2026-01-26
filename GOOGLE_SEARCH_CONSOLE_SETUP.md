# Google Search Console セットアップガイド

このプロジェクトのRSSフィードとサイトマップをGoogle Search Consoleに登録する手順です。

## 1. RSSフィードの確認

以下のURLでRSSフィードが生成されています：

- **英語版**: `https://ma-japan.vercel.app/rss.xml`
- **日本語版**: `https://ma-japan.vercel.app/rss-jp.xml`

ビルド後、これらのURLにアクセスしてRSSフィードが正しく生成されているか確認してください。

## 2. サイトマップの確認

Astroの`@astrojs/sitemap`プラグインにより、以下のURLでサイトマップが自動生成されています：

- **サイトマップインデックス**: `https://ma-japan.vercel.app/sitemap-index.xml`
- **サイトマップ**: `https://ma-japan.vercel.app/sitemap-0.xml`

## 3. Google Search Consoleへの登録手順

### ステップ1: Google Search Consoleにアクセス

1. [Google Search Console](https://search.google.com/search-console)にアクセス
2. Googleアカウントでログイン

### ステップ2: プロパティを追加

1. 「プロパティを追加」をクリック
2. 「URLプレフィックス」を選択
3. サイトのURLを入力: `https://ma-japan.vercel.app/`
4. 「続行」をクリック

### ステップ3: 所有権の確認

以下のいずれかの方法で所有権を確認：

#### 方法A: HTMLタグ（推奨）

1. 「HTMLタグ」を選択
2. 表示されたメタタグをコピー
3. `src/components/BaseHead.astro`に既に追加されているか確認
   - 現在のタグ: `423s3g5USTWu7mAnfbUbmZKaCvx26tnHg1wV1JhePIo`
   - 新しいタグが必要な場合は、`src/components/BaseHead.astro`の該当行を更新

#### 方法B: HTMLファイル

1. 「HTMLファイル」を選択
2. ダウンロードしたHTMLファイルを`public/`ディレクトリに配置
3. デプロイ後に「確認」をクリック

### ステップ4: サイトマップの送信

1. 左メニューから「サイトマップ」を選択
2. 「新しいサイトマップの追加」に以下を入力：
   - `sitemap-index.xml`
3. 「送信」をクリック

### ステップ5: RSSフィードの登録（オプション）

RSSフィードは直接Google Search Consoleに登録する必要はありませんが、以下の方法でインデックス登録を促進できます：

1. 「URL検査」ツールを使用
2. RSSフィードのURLを入力してインデックス登録をリクエスト
   - `https://ma-japan.vercel.app/rss.xml`
   - `https://ma-japan.vercel.app/rss-jp.xml`

## 4. インデックス登録の確認

1. 「URL検査」ツールで各記事のURLを確認
2. 必要に応じて「インデックス登録をリクエスト」をクリック

## 5. 定期的な確認

- サイトマップは自動的に更新されます
- RSSフィードも新しい記事が公開されると自動的に更新されます
- Google Search Consoleで定期的にインデックス登録状況を確認してください

## トラブルシューティング

### RSSフィードが表示されない場合

1. ビルドが正常に完了しているか確認
2. `npm run build`を実行してビルド
3. `npm run preview`でローカルプレビューを確認
4. デプロイ後に本番環境のURLで確認

### サイトマップが表示されない場合

1. `astro.config.mjs`で`@astrojs/sitemap`が正しく設定されているか確認
2. ビルド後に`dist/sitemap-index.xml`が生成されているか確認

### インデックス登録が進まない場合

1. `robots.txt`が正しく設定されているか確認
2. サイトマップが正しく送信されているか確認
3. 数日待ってから再度確認（インデックス登録には時間がかかることがあります）
