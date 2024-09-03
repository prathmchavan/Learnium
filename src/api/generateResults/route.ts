// app/api/generateResults/route.ts

import { NextResponse } from 'next/server';
import { callResultFlow } from '@/app/genkit'; // Ensure this path is correct

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    const flowResponse = await callResultFlow(data);
    return NextResponse.json({ data: flowResponse });
  } catch (error: any) {
    console.error("Error in generateResults API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
