'use server'

import * as z from 'zod';

// Import the Genkit core libraries and plugins.
import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, runFlow } from '@genkit-ai/flow';
import { googleAI } from '@genkit-ai/googleai';

// Import models from the Google AI plugin. The Google AI API provides access to
// several generative models. Here, we import Gemini 1.5 Flash.
import { gemini15Flash } from '@genkit-ai/googleai';
import { Question } from '@/context/AptiContext';
import { sub } from 'three/webgpu';

configureGenkit({
  plugins: [
    // Load the Google AI plugin. You can optionally specify your API key
    // by passing in a config object; if you don't, the Google AI plugin uses
    // the value from the GOOGLE_GENAI_API_KEY environment variable, which is
    // the recommended practice.
    googleAI(),

  ],

  // Log debug output to tbe console.
  logLevel: "debug",
  // Perform OpenTelemetry instrumentation and enable trace collection.
  enableTracingAndMetrics: true,
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
const menuSuggestionFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    // Construct a request and send it to the model API.
    const llmResponse = await generate({
      prompt: `Generate 2 multiple-choice aptitude questions at the ${subject} with the following structure for each question:
      {
    "id": 1,
    "text": "What is the capital of France?",
    "options": [
        { "id": "a", "text": "Berlin" },
        { "id": "b", "text": "Madrid" },
        { "id": "c", "text": "Paris" },
        { "id": "d", "text": "Rome" }
    ],
    "correctAnswer": "c"
      }
Please follow this format closely:

1) Provide a unique id for each question.
2) text should be the question itself.
3) options should be an array of four choices, each with a unique id ('a', 'b', 'c', 'd') and the corresponding text.
4) correctAnswer should be the id of the correct option.
The questions should be varied and cover topics commonly found in aptitude tests.
      `,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    });

    // Handle the response from the model API. In this sample, we just
    // convert it to a string, but more complicated flows might coerce the
    // response into structured output or chain the response into another
    // LLM call, etc.
    return llmResponse.text();
  }
);

const ResultFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    // Construct a request and send it to the model API.
    const llmResponse = await generate({
      prompt: `Please evaluate the user's answers and create a report card that includes:
        1. Total number of questions.
        2. Number of correct answers.
        3. Number of incorrect answers.
        4. Score as a percentage.
        5. A brief feedback message based on the score. 
        6. Create answersheet in that show user answer and correct answer.
      
        
        the user answers and question set is in : ${subject}
        
        Give me the above response in json formate
        `,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    });

    // Handle the response from the model API. In this sample, we just
    // convert it to a string, but more complicated flows might coerce the
    // response into structured output or chain the response into another
    // LLM call, etc.
    return llmResponse.text();
  }
);


export async function callMenuSuggestionFlow(difficulty: string) {
  // Invoke the flow. The value you pass as the second parameter must conform to
  // your flow's input schema.
  const flowResponse = await runFlow(menuSuggestionFlow, difficulty);
  console.log(flowResponse);
  return flowResponse;
}


export async function callResultFlow (data:string) {
  // Invoke the flow. The value you pass as the second parameter must conform to
  // your flow's input schema.
  const flowResponse = await runFlow(ResultFlow, data);
  console.log(flowResponse);
  return flowResponse;
}
