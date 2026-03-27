export const profileModes = [
  {
    id: "profile",
    label: "Profile",
    panelTitle: "Profile Lens",
    description:
      "Use this lens to explain who James Lane is as a candidate, how he works, and where he adds value.",
    placeholder: "Ask who James is, what he is best at, or how he should be described to employers...",
    welcomeMessage:
      "I represent James Lane from the approved sources and can explain who he is as a candidate, how he works, and where he adds value.",
    defaultIntent: "identity",
    answerStyle:
      "Start with a compact professional synthesis, then add only the most relevant supporting specifics.",
    starterQuestions: [
      "Who is James Lane as a candidate?",
      "How should James Lane be described to employers?",
      "What is James best at?",
      "How does James Lane tend to work through problems?"
    ],
    briefingCards: [
      {
        eyebrow: "Identity",
        title: "Nontraditional and systems-oriented",
        body:
          "James Lane is described as a nontraditional, systems-oriented candidate whose value is better understood through reasoning, learning, and improvement patterns than title history alone.",
        ref: "core-identity / Identity Summary"
      },
      {
        eyebrow: "Work Style",
        title: "Learns by building",
        body:
          "The approved materials repeatedly describe James as someone who learns through active construction, verifies before trusting, and turns rough ideas into structured outputs.",
        ref: "cognitive-profile / Learning Style"
      },
      {
        eyebrow: "Value Thesis",
        title: "Useful where reasoning meets execution",
        body:
          "The strongest case for James is reasoning-heavy, improvement-oriented work where process quality, practical tool use, and system interpretation matter.",
        ref: "core-identity / Professional Value Thesis"
      }
    ]
  },
  {
    id: "fit",
    label: "Fit",
    panelTitle: "Fit Lens",
    description:
      "Use this lens to evaluate where James looks strong, where he is a stretch, and where mismatch risk is higher.",
    placeholder: "Ask about strong-fit roles, stretch-fit roles, environment fit, mismatch risk, or ramp potential...",
    welcomeMessage:
      "I can evaluate fit from the approved sources, including where James looks like a strong fit, a stretch fit, or a likely mismatch.",
    defaultIntent: "roleFit",
    answerStyle:
      "Answer like a fit evaluator: give the conclusion first, then explain the supporting pattern and limits.",
    starterQuestions: [
      "What roles look like a strong fit versus a stretch fit for James Lane?",
      "What kinds of environments are the best fit for James Lane?",
      "Where is mismatch risk highest for James Lane?",
      "How can James adapt when a role is a stretch fit?"
    ],
    briefingCards: [
      {
        eyebrow: "Strong Fit",
        title: "Reasoning-heavy, improvement-oriented work",
        body:
          "The profile points toward roles that reward systems thinking, troubleshooting, process improvement, workflow design, business analysis, and practical AI/tool leverage.",
        ref: "role-fit-model / Fit Categories"
      },
      {
        eyebrow: "Stretch Fit",
        title: "Better on underlying pattern than on paper",
        body:
          "Stretch-fit cases are where the reasoning style and learning pattern fit the work better than the resume or credential trail does.",
        ref: "role-fit-model / How to Explain a Stretch Fit"
      },
      {
        eyebrow: "Mismatch Risk",
        title: "Weak fit in vague or politics-heavy environments",
        body:
          "Mismatch risk rises in environments that are vague, phone-heavy, heavily managed through internal workplace politics, or resistant to initiative and process improvement.",
        ref: "environment-fit-model / Low-Fit Environment Traits"
      }
    ]
  },
  {
    id: "evidence",
    label: "Evidence",
    panelTitle: "Evidence Lens",
    description:
      "Use this lens to ground claims about James in actual projects, artifacts, repeated behavior, and source-backed examples.",
    placeholder: "Ask what evidence supports a claim, which projects matter most, or what artifacts show how James works...",
    welcomeMessage:
      "I can connect claims about James Lane to actual evidence in the approved sources, including projects, artifacts, and repeated work patterns.",
    defaultIntent: "evidence",
    answerStyle:
      "Lead with the evidence pattern, then name the strongest examples without turning the answer into a long inventory.",
    starterQuestions: [
      "What evidence shows how James Lane works?",
      "What projects best show James Lane's AI and process-improvement work?",
      "What supports the claim that James learns by building?",
      "What artifacts best show James Lane's practical reasoning?"
    ],
    briefingCards: [
      {
        eyebrow: "Pattern",
        title: "Builds to learn and clarify",
        body:
          "The evidence base emphasizes a repeated pattern: identify a useful problem, build an artifact around it, learn through the build, and refine from there.",
        ref: "evidence-and-projects / Productive Build Pattern"
      },
      {
        eyebrow: "Recent Work",
        title: "AI proposal and grounded assistants",
        body:
          "The strongest recent examples include the claims AI proposal, the proposal FAQ assistant, and the legislation-grounded internal interview bot.",
        ref: "evidence-and-projects / Major Project and Evidence Areas"
      },
      {
        eyebrow: "What It Proves",
        title: "Practical reasoning over pedigree",
        body:
          "The portfolio is framed as proof of practical reasoning, learning velocity, and systems-oriented execution rather than conventional prestige signaling.",
        ref: "evidence-and-projects / Safe Summary"
      }
    ]
  },
  {
    id: "projects",
    label: "Projects",
    panelTitle: "Projects Lens",
    description:
      "Use this lens to browse James Lane's live projects, deployed demos, and hosted portfolio media.",
    placeholder: "Ask what live projects to review, which demos are available, or what hosted portfolio media you can watch...",
    welcomeMessage:
      "I can point you to James Lane's live projects, explain what each one demonstrates, and surface hosted portfolio media from the approved sources.",
    defaultIntent: "projects",
    answerStyle:
      "Lead with the most relevant live project or demo, include the live link when it is present, and explain briefly what it demonstrates.",
    starterQuestions: [
      "What live projects can I review?",
      "Which live demos should I open first?",
      "What link should I use for James's interactive resume?",
      "What Iron Tides portfolio examples can I watch?"
    ],
    briefingCards: [
      {
        eyebrow: "Live Projects",
        title: "Deployed tools, demos, and public sites",
        body:
          "The updated resume now includes a set of live projects spanning hiring artifacts, internal-style assistants, consulting presentation, and a playable game demo.",
        ref: "resume-pdf / Projects"
      },
      {
        eyebrow: "What They Show",
        title: "Stakeholder-facing AI and practical build execution",
        body:
          "Taken together, the live projects show product thinking, source-grounded assistants, public-facing packaging, and shipping beyond mockups or concept decks.",
        ref: "resume-pdf / Professional Summary"
      },
      {
        eyebrow: "Portfolio Media",
        title: "Hosted Iron Tides examples live here",
        body:
          "Hosted Iron Tides videos are grouped in this lens so visitors can move directly from a project answer to public media examples without digging through evidence-only sections.",
        ref: "portfolio-media-index / Portfolio Media Index"
      }
    ]
  },
  {
    id: "resume",
    label: "Resume",
    panelTitle: "Resume Lens",
    description:
      "Use this lens for factual questions about James Lane's current role, work history, tools, education, and contact details.",
    placeholder: "Ask about James's current role, work history, tools, education, or contact details...",
    welcomeMessage:
      "I can answer factual resume questions about James Lane's current role, experience, tools, education, and contact details.",
    defaultIntent: "experience",
    answerStyle:
      "Answer directly and factually, with minimal framing.",
    starterQuestions: [
      "What is James Lane's current role?",
      "What tools and platforms does James Lane list?",
      "What education is listed?",
      "How can someone contact James Lane?"
    ],
    briefingCards: [
      {
        eyebrow: "Current Role",
        title: "Claims Examiner I at Capital Blue Cross",
        body:
          "The resume lists James's current role as Claims Examiner I at Capital Blue Cross, remote, beginning in 2025.",
        ref: "resume-pdf / Capital Blue Cross - Claims Examiner I"
      },
      {
        eyebrow: "Background",
        title: "Healthcare operations plus enterprise IT",
        body:
          "The resume combines healthcare claims operations experience with a longer enterprise IT and identity-access support background.",
        ref: "resume-pdf / Professional Summary"
      },
      {
        eyebrow: "Tools",
        title: "BI, data, and workflow tooling",
        body:
          "The resume specifically lists Power BI, Tableau, SQL, DAX, Excel, Python, ServiceNow, Zapier, Airtable, Microsoft 365, Active Directory, and Azure AD.",
        ref: "resume-pdf / Tools & Platforms"
      }
    ]
  }
];

