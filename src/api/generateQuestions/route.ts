// app/api/generateQuestions/route.ts

import { callQuestionGenerationFlow } from '@/ai/genkit';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { level } = await request.json();
    const flowResponse = await callQuestionGenerationFlow(level);
    console.log("this is res from api",flowResponse)
    return NextResponse.json({ data: flowResponse });
  } catch (error: any) {
    console.error("Error in generateQuestions API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
