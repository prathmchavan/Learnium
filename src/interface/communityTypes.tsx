
export interface CommunityContextTypes {
    questions : Question[] ;
    createQuestion: (data: any)=> Promise<void>;
    fetchQuestions: ()=>Promise<void>;
    getQuestion:(id:string)=>Promise<void>;
}

export interface Question {
    _id?:string;
    title:string;
    content:string;
    tags:string[];
    votes?:string[];
    views?:number[];
    ownerId?:string;
    answersId?:string[];
}