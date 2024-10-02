export interface Project {
    _id: string;
    title: string;
    description: string;
    technologyUsed: string[];
    category: string;
    bookmarksCount:string[] ;
    upvotes:  string[];
    thumbnailUrl: string | null;
    thumbnailName:string | null;
    userId: string ;
    commentId: string | null;
    gitLink: string | null
    // owner: any;

}