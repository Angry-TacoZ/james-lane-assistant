export const retrievalEvaluationCases = [
  {
    name: "Blue design prompt",
    question: "Tell me about the Blue design.",
    options: { modeId: "projects", preferredIntent: "projects" },
    expectedIntent: "projects",
    expectedFirstRef: "p1-project-blue-shopping-agent",
    requiredRefs: ["p1-project-blue-shopping-agent"],
    forbiddenRefs: ["art-design-catalog", "core-identity-career-direction"]
  },
  {
    name: "Blue design-work prompt",
    question: "Tell me about the Blue design work.",
    options: { modeId: "projects", preferredIntent: "projects" },
    expectedIntent: "projects",
    expectedFirstRef: "p1-project-blue-shopping-agent",
    requiredRefs: ["p1-project-blue-shopping-agent"],
    forbiddenRefs: ["art-design-catalog"]
  },
  {
    name: "Blue design-work phrasing variant",
    question: "Tell me about the design work in Blue.",
    options: { modeId: "projects", preferredIntent: "projects" },
    expectedIntent: "projects",
    expectedFirstRef: "p1-project-blue-shopping-agent",
    requiredRefs: ["p1-project-blue-shopping-agent"],
    forbiddenRefs: ["art-design-catalog"]
  },
  {
    name: "Capital Blue Cross experience",
    question: "What did James do at Capital Blue Cross?",
    expectedIntent: "experience",
    expectedFirstRef: "p2-exp-capital-blue-cross",
    requiredRefs: ["p2-exp-capital-blue-cross"],
    forbiddenRefs: ["p1-project-blue-shopping-agent", "github-project-blue-curated-journey"]
  },
  {
    name: "Updated Capital Blue Cross pilot evidence",
    question: "What happened with James's AI assistant proposal at Capital Blue Cross?",
    expectedIntent: "experience",
    expectedFirstRef: "p2-exp-capital-blue-cross",
    requiredRefs: ["p2-exp-capital-blue-cross"],
    forbiddenRefs: ["p1-project-blue-shopping-agent"],
    requiredAnswerText: "40,000 labor hours a year in savings"
  },
  {
    name: "Current resume certifications",
    question: "What certifications are listed on James Lane's resume?",
    expectedIntent: "education",
    expectedFirstRef: "p2-education",
    requiredRefs: ["p2-education"],
    forbiddenRefs: ["p2-exp-capital-blue-cross", "p2-selected-projects"],
    requiredAnswerText: "Prompt Engineering and AI Agents (LinkedIn Learning)"
  },
  {
    name: "Generic design work",
    question: "What design work has James done?",
    options: { modeId: "projects", preferredIntent: "projects" },
    expectedIntent: "projects",
    expectedFirstRef: "art-design-catalog",
    requiredRefs: ["art-design-catalog"],
    forbiddenRefs: ["p1-project-blue-shopping-agent"]
  }
];
