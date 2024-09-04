"use server";

import * as z from "zod";
import { generate } from "@genkit-ai/ai";
import { configureGenkit } from "@genkit-ai/core";
import { defineFlow } from "@genkit-ai/flow";
import { googleAI } from "@genkit-ai/googleai";
import { gemini15Flash } from "@genkit-ai/googleai";

configureGenkit({
  plugins: [
    googleAI({
      apiKey: "AIzaSyAWkxQfA2zgSdR6IDoMH7Lx1diGO4h6g_M",
    }),
  ],
});

// Define a simple flow that prompts an LLM to generate menu suggestions.
export const questionGenerationFlow = defineFlow(
  {
    name: "questionGenerationFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Generate exactly 3 multiple-choice aptitude questions for the ${subject} difficulty level. Each question should adhere to the following structure:

[
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
  },
  {
    "id": 2,
    "text": "If a train travels at 60 miles per hour, how far will it travel in 3 hours?",
    "options": [
      { "id": "a", "text": "120 miles" },
      { "id": "b", "text": "180 miles" },
      { "id": "c", "text": "240 miles" },
      { "id": "d", "text": "300 miles" }
    ],
    "correctAnswer": "b"
  },
  {
    "id": 3,
    "text": "What is the next number in the sequence: 2, 4, 6, 8, ...?",
    "options": [
      { "id": "a", "text": "10" },
      { "id": "b", "text": "12" },
      { "id": "c", "text": "14" },
      { "id": "d", "text": "16" }
    ],
    "correctAnswer": "a"
  }
]
1. Ensure each question has a unique id.
2. The text field should be the question itself.
3. The options array must contain four choices, each with a unique id ('a', 'b', 'c', 'd') and corresponding text.
4. The correctAnswer field should match the id of the correct option.
5. The output must be a valid JSON array following the structure provided.
 Please respond only with the JSON format as specified above without any additional explanations or characters.`,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);

export const resultFlow = defineFlow(
  {
    name: "resultFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Please evaluate the user's answers and create a report card that includes:
        1. Total number of questions.
        2. Number of correct answers .
        3. Number of incorrect answers .
        4. Score as a percentage .
        5. A brief feedback message based on the score . 
        6. Create answersheet that shows the user's answers and correct answers.
        Format the response using the following structure:
        {
          "reportCard": {
            "totalQuestions": 10,
            "correctAnswers": 1,
            "incorrectAnswers": 9,
            "score": 10,
            "feedback": "You answered 1 out of 10 questions correctly. Keep practicing and you'll improve!"  
          },
          "answerSheet": [
            {
              "questionId": 1,
              "userAnswer": "a",
              "correctAnswer": "a"
            }
          ]
        }
        
        The user's answers and question set are in: ${subject}
        Provide the above response in JSON format without any additional explanation.`,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);

export const oaquestionFlow = defineFlow(
  {
    name: "oaquestionFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Please create 1 coding Online Assessment question of ${subject} difficulty that could be asked in a real online assessment test, using the following structure:
      {
        "id": 1,
        "text": "What is the capital of France?"
      }
      Please follow this format closely:
      1) Provide a unique id for each question.
      2) The "text" field should contain the question itself.
      3) The question should be solvable in any programming language.`,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);

export const oaresultFlow = defineFlow(
  {
    name: "oaresultFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Please evaluate the user's answers and create a report card that includes:
        1. A brief feedback message based on the user's answers.
        2. Create an answer sheet showing the user's answers and correct answers.
        The user's answers and question set are in: ${subject}. Additionally, provide the correct answer in the user's selected programming language.
        
        Provide the above response in the following JSON format:
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
        }`,
      model: gemini15Flash,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);
