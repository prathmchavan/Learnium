
export interface CommunityContextTypes {
    questions : Question[] ;
    createQuestion: (data: Question)=> Promise<void>;
    fetchQuestions: ()=>Promise<void>;
    getQuestion:(id:string)=>Promise<void>;
    writeAnswer:(data:Answer)=>Promise<void>;
    fetchAnswer: ()=>Promise<void>;
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

export interface Answer {
    _id?: string;
    content : string;
    votes?:string[];
    ownerId?:string;
    questionId?: string;
}