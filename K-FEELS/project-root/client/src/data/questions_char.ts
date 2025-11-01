import type { Question } from "../types";
import type { AnswerOption } from "../types";

export const questionCharacter: Question[] = [
  {
    id: 1,
    text: "Your friend is late again. What do you do?",
    options: [
      {
        answer: "Make a dramatic entrance yourself",
        tag: "main",
      },
      { answer: "Plot mild revenge", tag: "villian" },
      {
        answer: "Smile and say 'no worries!",
        tag: "softie",
      },
    ],
  },
  {
    id: 2,
    text: "Someone flirts with your crush",
    options: [
      {
        answer: "Step in with main-character confidence",
        tag: "main",
      },
      {
        answer: "Smirk… they’ll regret it later",
        tag: "villian",
      },
      {
        answer: "Look away and hope love finds you too",
        tag: "softie",
      },
    ],
  },
  {
    id: 3,
    text: "What’s your morning vibe",
    options: [
      {
        answer: "Coffee and world domination",
        tag: "villian",
      },
      {
        answer: "Late again but still fabulous",
        tag: "main",
      },
      {
        answer: "Pajamas till noon",
        tag: "softie",
      },
    ],
  },
  {
    id: 4,
    text: "You get bad news. What’s your reaction?",
    options: [
      {
        answer: "Single tear, cinematic lighting",
        tag: "main",
      },
      {
        answer: "Evil laugh — challenge accepted",
        tag: "villian",
      },
      {
        answer: "Bake cookies for comfort",
        tag: "softie",
      },
    ],
  },
  {
    id: 5,
    text: "Choose your power:",
    options: [
      {
        answer: "Perfect hair even in chaos",
        tag: "main",
      },
      {
        answer: "Turning drama into victory",
        tag: "villian",
      },
      {
        answer: "Making everyone feel safe",
        tag: "softie",
      },
    ],
  },
];
