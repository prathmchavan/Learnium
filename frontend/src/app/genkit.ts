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
const questionGenerationFlow = defineFlow(
  {
    name: 'questionGenerationFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    // Construct a request and send it to the model API.
    const llmResponse = await generate({
      prompt: `Generate 30 multiple-choice aptitude questions for  ${subject} difficulty level with the following structure for each question:
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
5)The questions should be varied and cover topics commonly found in aptitude tests.`,
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

const resultFlow = defineFlow(
  {
    name: 'resultFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    // Construct a request and send it to the model API.
    const llmResponse = await generate({
      prompt: `Please evaluate the user's answers and create a report card that includes:
        1. Total number of questions.
        2. Number of correct answers .
        3. Number of incorrect answers .
        4. Score as a percentage .
        5. A brief feedback message based on the score . 
        6. Create answersheet in that show user answer and correct answer.
        format of above should be followed by below format :
        {
          "reportCard": {
          "totalQuestions": 10,
          "correctAnswers": 1,
          "incorrectAnswers": 9,
          "score": 10,
          "feedback": "You answered 1 out of 10 questions correctly. Keep practicing and you'll improve!"  
        },
          "answerSheet": 
     [
       {
          "questionId": 1,
          "userAnswer": "a",
          "correctAnswer": "a"
        }
      ]
        
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


const oaquestionFlow = defineFlow(
  {
    name: 'oaquestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    // Construct a request and send it to the model API.
    const llmResponse = await generate({
      prompt: `Please create 1 coding Online Assesment question of ${subject} difficulty which will be asked in real online assesment test , with the following structure for each question:
      {
    "id": 1,
    "text": "What is the capital of France?"
    }

    Please follow this format closely:
    1) Provide a unique id for each question.
    2) text should be the question itself.
    3) the question should be solvable in any language.
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



const oaresultFlow = defineFlow(
  {
    name: 'oaresultFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    // Construct a request and send it to the model API.
    const llmResponse = await generate({
      prompt: `Please evaluate the user's answers and create a reportCard that includes:
        1. A brief feedback message based on the useranswer. 
        2. Create answersheet in that show user answer and correct answer.
      
        
        the user answers and question set is in : ${subject} as well as provide the correct answer in user selected language that 
        
        Give me the above response in below json format
        {
        "reportCard": {
          "feedback": "",
          "answerSheet": [
            {
              "question": "",
              "userAnswer": "",
              "correctAnswer": ""
            }
          ]
        }
      }
     
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

export async function callQuestionGenerationFlow(difficulty: string) {
  // Invoke the flow. The value you pass as the second parameter must conform to
  // your flow's input schema.
  const flowResponse = await runFlow(questionGenerationFlow, difficulty);
  console.log(flowResponse);
  return flowResponse;
}

export async function callOaQuestionGenerationFlow(difficulty: string) {
  // Invoke the flow. The value you pass as the second parameter must conform to
  // your flow's input schema.
  const flowResponse = await runFlow(oaquestionFlow, difficulty);
  console.log(flowResponse);
  return flowResponse;
}

export async function callResultFlow(data: string) {
  // Invoke the flow. The value you pass as the second parameter must conform to
  // your flow's input schema.
  const flowResponse = await runFlow(resultFlow, data);
  console.log(flowResponse);
  return flowResponse;
}

export async function callOaResultFlow(data: string) {
  // Invoke the flow. The value you pass as the second parameter must conform to
  // your flow's input schema.
  const flowResponse = await runFlow(oaresultFlow, data);
  console.log(flowResponse);
  return flowResponse;
}
