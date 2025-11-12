import { Question } from "../types";
import { AnswerOption } from "../types";

export const questionsMood: Question[] = [
  {
    id: 1,
    text: "Whats your comfort activity when life feels meh?",
    options: [
      { answer: "Stare out the window like in a K-drama", tag: "romantic"},
      { answer: "Cry dramatically under a blanket", tag: "melancholic"},
      { answer: "Eat ramen and pretend Im the main character", tag: "adventurous"}
    ],
  },
  {
    id: 2,
    text: "Whats your current emotional weather forecast?",
    options: [
      { answer: "Sunny with a chance of romance", tag: "romantic"},
      { answer: "Cloudy with 99% chance of overthinking", tag: "melancholic"},
      { answer: "Tornado of chaos and caffeine", tag: "funny" }
    ],
  },
  {
    id: 3,
    text: "Your crush just liked your photo. Whats your next move?",
    options: [
      { answer: "Pretend I didnt notice but secretly scream inside", tag: "romantic"},
      { answer: "Stalk all their old posts from 2017", tag: "melancholic" },
      { answer: "Accidentally like their pets photo — oops", tag: "funny" }
    ],
  },
  {
    id: 4,
    text: "You wake up as a K-drama lead. Whats your superpower?",
    options: [
      { answer: "Instant hair perfection after crying", tag: "romantic" },
      { answer: "Summoning sad rain whenever Im dramatic", tag: "melancholic" },
      { answer: "Teleporting to the fridge every 5 minutes", tag: "funny" }
    ],
  },
  {
    id: 5,
    text: "Youre the main character today. Whats the scene?",
    options: [
      { answer: "A slow-mo walk under cherry blossoms", tag: "romantic" },
      { answer: "Crying beautifully in the rain", tag: "melancholic" },
      {
        answer: "Tripping over nothing but pretending its a dance move",
        tag: "funny",
      },
    ],
  },
];
