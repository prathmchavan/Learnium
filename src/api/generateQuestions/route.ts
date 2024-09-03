// app/api/generateQuestions/route.ts

import { NextResponse } from 'next/server';
import { callQuestionGenerationFlow } from '@/app/genkit'; // Ensure this path is correct

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
