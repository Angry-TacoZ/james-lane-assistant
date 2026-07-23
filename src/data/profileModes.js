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
    id: "writing",
    label: "Writing",
    panelTitle: "Writing Lens",
    description:
      "Use this lens to browse James Lane's published essays, public analysis, and linked supporting writing sources.",
    placeholder: "Ask what James has written, which article to start with, or what a specific piece is about...",
    welcomeMessage:
      "I can point you to James Lane's published writing, summarize what each piece is about, and distinguish public essays from supporting analysis.",
    defaultIntent: "writing",
    answerStyle:
      "Lead with the most relevant article or writing pattern, note when something is a published opinion piece, and keep the distinction from internal cognition explicit.",
    starterQuestions: [
      "What has James Lane written on Medium?",
      "What writing best shows James's AI thinking?",
      "What is P(doom) or Big Boon about?",
      "Are these writing samples opinion pieces or internal cognition?"
    ],
    briefingCards: [
      {
        eyebrow: "Writing",
        title: "Published essays and public analysis",
        body:
          "This lens collects James Lane's published Medium essays and linked public analysis across AI, politics, civil liberties, and personal narrative.",
        ref: "public-writing-index / Writing Catalog"
      },
      {
        eyebrow: "Featured Analysis",
        title: "AI writing with real argument structure",
        body:
          "The strongest AI-specific piece is P(doom) or Big Boon, which explains hallucinations, search gaps, and AGI risk in plain language rather than marketing abstractions.",
        ref: "public-writing-index / P(doom) or Big Boon"
      },
      {
        eyebrow: "Range",
        title: "Analysis, politics, and personal narrative",
        body:
          "The writing set spans AI analysis, political and civil-liberties essays, and a personal long-form narrative piece, giving visitors a clearer sense of voice and subject range.",
        ref: "public-writing-index / Writing Catalog"
      }
    ]
  },
  {
    id: "health",
    label: "Health",
    panelTitle: "Health Lens",
    description:
      "Use this lens for James Lane's self-disclosed health, accessibility, remote/hybrid fit, and accommodation context.",
    placeholder: "Ask about James's health accommodations, onsite constraints, or sources supporting a condition...",
    welcomeMessage:
      "I can answer health and accommodation questions from James's self-disclosed accessibility context, including source links for general definitions and workplace accommodation guidance.",
    defaultIntent: "healthContext",
    answerStyle:
      "Answer with practical work-design implications first, distinguish self-disclosed context from general medical definitions, and include resource links when asked.",
    starterQuestions: [
      "What health accommodations should employers discuss with James early?",
      "What sources support James's health accommodation guidance?",
      "Why does James prefer remote or hybrid work for health reasons?",
      "How do James's AuDHD and ADHD affect workplace fit?"
    ],
    briefingCards: [
      {
        eyebrow: "Boundary",
        title: "Fit, not medical advice",
        body:
          "The health lens is a work-design document. It explains self-disclosed conditions, likely workplace friction, and reasonable accommodation topics without giving treatment advice.",
        ref: "Health & Accessibility Lens / Overview"
      },
      {
        eyebrow: "Accommodation Pattern",
        title: "Remote, written, predictable, low-sensory",
        body:
          "The recurring supports are remote or hybrid flexibility, written expectations, predictable schedules, reduced sensory load, limited physical movement, breaks, and privacy-respecting discussion.",
        ref: "Health & Accessibility Lens / Accommodations"
      },
      {
        eyebrow: "Sources",
        title: "Public medical and workplace resources linked",
        body:
          "The health section links to CDC, NIH/NIDDK/NIDCD, Mayo Clinic, Cleveland Clinic, EEOC, Cancer and Careers, American Diabetes Association, and JAN resources.",
        ref: "Health & Accessibility Lens / Resource Index"
      }
    ]
  },
  {
    id: "resume",
    label: "Resume",
    panelTitle: "Resume Lens",
    description:
      "View James Lane's current resume or ask factual questions about his work history, applications, tools, education, certifications, and contact details.",
    placeholder: "Ask about James's consulting work, experience, applications, tools, certifications, or contact details...",
    welcomeMessage:
      "I can answer factual questions from James Lane's current resume, including consulting work, experience, applications, tools, certifications, and contact details.",
    defaultIntent: "experience",
    answerStyle:
      "Answer directly and factually, with minimal framing.",
    starterQuestions: [
      "What is James Lane's current consulting role?",
      "What systems and automation tools does James Lane list?",
      "What education and certifications are listed?",
      "How can someone contact James Lane?"
    ],
    briefingCards: [
      {
        eyebrow: "Current Role",
        title: "AI Consultant and Owner at James Lane AI Consulting",
        body:
          "The resume lists James's current role as AI Consultant and Owner at James Lane AI Consulting, beginning in April 2026.",
        ref: "resume-pdf / AI Consultant and Owner - James Lane AI Consulting | Apr 2026-Present | Carlisle, PA"
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
        title: "AI systems, software, automation, and enterprise tooling",
        body:
          "The resume lists Codex, ChatGPT, Claude, Gemini API, React, Vite, JavaScript, TypeScript, Firebase, Cloudflare Workers, Python, APIs, SQL, Power BI, ServiceNow, Microsoft 365, Active Directory, Azure AD, Oracle EBS, and FACETS.",
        ref: "resume-pdf / Core Skills"
      }
    ]
  }
];

