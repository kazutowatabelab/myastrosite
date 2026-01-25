import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	// あなたの実際のサイトURL
	site: 'https://ma-japan.vercel.app/', 
	integrations: [
		mdx(), 
		sitemap({
			// オプション: 必要に応じて特定のページを除外したりできますが、
			// 基本はこのままで全ページが自動的にサイトマップに含まれます。
		})
	],
});