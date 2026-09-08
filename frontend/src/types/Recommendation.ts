export type Recommendation = {
    id?: string;
    title: string;
    author: string;
    summary?: string;
    description?: string | string[];
    genre?: string;
    reason?: string;
    recommendedFromTitle?: string;
}