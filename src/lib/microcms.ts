import { createClient } from 'microcms-js-sdk';

// microCMSクライアントの初期化
export const client = createClient({
	serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN || '',
	apiKey: import.meta.env.MICROCMS_API_KEY || '',
});

// ブログ記事の型定義
export interface Blog {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	title: string;
	description: string;
	content: string;
	eyecatch?: {
		url: string;
		width: number;
		height: number;
	};
}

// ブログ記事一覧を取得する関数
export async function getBlogs(limit?: number): Promise<Blog[]> {
	try {
		const response = await client.get({
			endpoint: 'ma-japan',
			queries: {
				limit: limit || 100,
				orders: '-publishedAt',
			},
		});

		return response.contents as Blog[];
	} catch (error) {
		console.error('Failed to fetch blogs from microCMS:', error);
		return [];
	}
}

// ブログ記事詳細を取得する関数
export async function getBlogDetail(contentId: string): Promise<Blog | null> {
	try {
		const response = await client.get({
			endpoint: 'ma-japan',
			contentId,
		});

		return response as Blog;
	} catch (error) {
		console.error(`Failed to fetch blog detail (${contentId}) from microCMS:`, error);
		return null;
	}
}

// すべてのブログ記事IDを取得する関数（getStaticPaths用）
export async function getAllBlogIds(): Promise<string[]> {
	try {
		const response = await client.get({
			endpoint: 'ma-japan',
			queries: {
				fields: 'id',
				limit: 1000,
			},
		});

		return response.contents.map((content: { id: string }) => content.id);
	} catch (error) {
		console.error('Failed to fetch blog IDs from microCMS:', error);
		return [];
	}
}

