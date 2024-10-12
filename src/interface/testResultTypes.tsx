export interface AptiResultTypes  {
    _id?: string;
    testDate?: string;
    testType?:string;
    difficulty?:string;
    totalQuestions?:number;
    correctAnswers?:number;
    incorrectAnswers?:number;
    score?:number;
    feeBack?: Feedback;
    answerSheet? :AnswerSheet[];
}

interface Feedback{
    strengths:string;
    improvements:string;
}

interface AnswerSheet {
    question:string;
    correctAnswer:string;
    userAnswer:string;
}


export interface OaResultTypes  {
    _id?: string;
    testDate?: string;
    testType?:string;
    difficulty?:string;
    question?:string;
    userAnswer?:string;
    correctAnswer?:string;
    feeBack?: Feedback;
}
