import { askAssistant } from "../src/lib/retrieval.js";

const questions = [
  "Who is James Lane as a candidate?",
  "How should James Lane be described to employers?",
  "What kinds of environments are the best fit for James Lane?",
  "What are James Lane's main tradeoffs or friction points?",
  "What evidence shows how James Lane works?",
  "What live projects can I review?",
  "What can you tell me about Iron Tides?",
  "What can you tell me about Iron Shores?",
  "Tell me about the BLKVue AI Security Intake Bot.",
  "What Iron Tides portfolio examples can I watch?",
  "What projects best show James Lane's AI and process-improvement work?",
  "What roles look like a strong fit versus a stretch fit for James Lane?",
  "How can James adapt when a role is a stretch fit?",
  "Why hire James if there are other candidates with college degrees?",
  "What is James Lane's work location preference?",
  "What is James best at?",
  "How would James do in a business analyst job?",
  "Would James be a good fit for work focused on requirements, workflow design, and reporting?",
  "Can James lead meetings?",
  "Show me James's project links.",
  "How does James Lane compare to another candidate?"
];

for (const question of questions) {
  const response = askAssistant(question);

  console.log(`Q: ${question}`);
  console.log(`A: ${response.answer}`);
  console.log(`REFUSED: ${response.refused ? "yes" : "no"}`);
  console.log("");
}

