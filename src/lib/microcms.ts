import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN || '',
    apiKey: import.meta.env.MICROCMS_API_KEY || '',
});

// ブログ記事の型定義（英語フィールドを追加）
export interface Blog {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    title_en?: string;        // 追加
    description: string;
    description_en?: string;  // 追加
    content: string;
    content_en?: string;      // 追加
    eyecatch?: {
        url: string;
        width: number;
        height: number;
    };
}

// 共通の取得クエリ（エンドポイント名を共通化しておくと保守が楽です）
const ENDPOINT = 'ma-japan';

export async function getBlogs(limit?: number): Promise<Blog[]> {
    try {
        const response = await client.get({
            endpoint: ENDPOINT,
            queries: {
                limit: limit || 100,
                orders: '-publishedAt',
            },
        });
        return response.contents as Blog[];
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        return [];
    }
}

export async function getBlogDetail(contentId: string): Promise<Blog | null> {
    try {
        const response = await client.get({
            endpoint: ENDPOINT,
            contentId,
        });
        return response as Blog;
    } catch (error) {
        console.error(`Failed to fetch blog detail (${contentId}):`, error);
        return null;
    }
}

// getStaticPaths用の全ID取得
export async function getAllBlogIds(): Promise<string[]> {
    try {
        const response = await client.get({
            endpoint: ENDPOINT,
            queries: { fields: 'id', limit: 1000 },
        });
        return response.contents.map((content: { id: string }) => content.id);
    } catch (error) {
        console.error('Failed to fetch blog IDs:', error);
        return [];
    }
}

