"use server";

import { runFlow } from "@genkit-ai/flow";
import { questionGenerationFlow, oaquestionFlow, resultFlow, oaresultFlow } from "./flow";

export async function callQuestionGenerationFlow(difficulty: string) {
  try {
    const flowResponse = await runFlow(questionGenerationFlow, difficulty);
    console.log(flowResponse);
    return flowResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function callOaQuestionGenerationFlow(difficulty: string) {
  try {
    const flowResponse = await runFlow(oaquestionFlow, difficulty);
    console.log(flowResponse);
    return flowResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function callResultFlow(data: any) {
  try {
    const flowResponse = await runFlow(resultFlow, data);
    console.log(flowResponse);
    return flowResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function callOaResultFlow(data: any) {
  try {
    const flowResponse = await runFlow(oaresultFlow, data);
    console.log(flowResponse);
    return flowResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
