import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getBlogs } from '../lib/microcms';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context: APIContext) {
	const posts = await getBlogs(50); // 最新50件を取得
	const site = context.site || 'https://ma-japan.vercel.app/';
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: site,
		items: posts.map((post) => {
			// 日本語版のタイトルと説明文を使用
			const title = post.title || '無題';
			const description = post.description || '';
			const content = post.content || '';
			
			// 説明文がない場合は、本文から最初の100文字を抽出
			let finalDescription = description;
			if (!finalDescription && content) {
				// HTMLタグを除去
				const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
				finalDescription = text.substring(0, 100);
				if (text.length > 100) {
					finalDescription += '...';
				}
			}
			
			// 絶対URLを生成
			const link = new URL(`/blog/jp/${post.id}`, site).toString();
			
			return {
				title: title,
				description: finalDescription || '',
				pubDate: new Date(post.publishedAt),
				link: link,
			};
		}),
		customData: `<language>ja</language>`,
	});
}
