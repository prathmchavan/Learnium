export interface Project {
    _id: string;
    title: string;
    description: string;
    technologyUsed: string[];
    category: string;
    commentsCount: number;
    bookmarksCount:number;
    upvotes: number;
    thumbnailUrl: string | null;
    thumbnailName:string | null;
    userId: string ;
}