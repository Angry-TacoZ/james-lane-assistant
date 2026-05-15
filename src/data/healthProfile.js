export const healthProfileIntro = {
  eyebrow: "Accessibility / Work Design",
  title: "Health & Accessibility Lens",
  summary:
    "Self-disclosed health and neurodivergence context James has approved for early employer discussion. This section is meant to make work-design needs visible before late-stage surprises.",
  boundary:
    "This is not medical advice, a disability determination, or a request for every accommodation in every role. It is a practical fit document: the goal is to discuss job design, onsite load, communication load, and reasonable accommodations early."
};

export const healthConditions = [
  {
    id: "autism-level-1",
    condition: "Autism Level 1",
    label: "SOCIAL / SENSORY",
    description:
      "James reports Autism Level 1 with severe social-cue difficulty and sensory-aversion anxiety. In work terms, indirect expectations, noisy environments, crowded spaces, and ambiguous social signaling can consume disproportionate bandwidth.",
    workImpact:
      "Best fit is a direct, low-sensory environment where expectations are explicit and important information is written down instead of implied.",
    accommodations: [
      "Use clear written expectations, agendas, acceptance criteria, and follow-up notes.",
      "Use direct language; do not rely on implied social rules as the main instruction channel.",
      "Reduce sensory load through remote/hybrid work, quiet work areas, camera/audio flexibility, and fewer interruption-heavy meetings.",
      "Give advance notice for changes, meetings, and priority shifts when possible."
    ],
    resources: [
      {
        label: "CDC autism signs and symptoms",
        url: "https://www.cdc.gov/autism/signs-symptoms/index.html"
      },
      {
        label: "DSM-5 autism severity levels via HHS/IACC",
        url: "https://iacc.hhs.gov/about-iacc/subcommittees/resources/dsm5-diagnostic-criteria.shtml"
      },
      {
        label: "JAN autism accommodation ideas",
        url: "https://askjan.org/disabilities/Autism-Spectrum.cfm"
      }
    ]
  },
  {
    id: "adhd-executive-dysfunction",
    condition: "ADHD with executive-function dysregulation",
    label: "TASK CONTROL",
    description:
      "James reports ADHD with severe executive-function dysregulation. He describes himself as strong at perceptual-load tasks, such as noticing patterns and concrete system signals, and much weaker at cognitive-load tasks, such as holding many ambiguous threads in working memory.",
    workImpact:
      "He is better matched to visible systems, concrete artifacts, and structured problem solving than to vague prioritization, constant context switching, or memory-heavy admin.",
    accommodations: [
      "Break work into explicit next actions, priorities, and definitions of done.",
      "Use a single source of truth for tasks, deadlines, and decisions.",
      "Protect uninterrupted work blocks and reduce avoidable context switching.",
      "Use checklists, reminders, written instructions, timers, and lightweight progress reviews.",
      "Prefer structured async communication over rapid-fire live verbal task changes."
    ],
    resources: [
      {
        label: "NIMH ADHD overview",
        url: "https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd"
      },
      {
        label: "JAN ADHD accommodation ideas",
        url: "https://askjan.org/disabilities/Attention-Deficit-Hyperactivity-Disorder-AD-HD.cfm"
      }
    ]
  },
  {
    id: "type-2-diabetes-insulin",
    condition: "Type 2 diabetes, insulin dependent",
    label: "GLUCOSE MANAGEMENT",
    description:
      "James reports insulin-dependent Type 2 diabetes. Work impact is less about capability and more about reliable access to glucose checks, food, medication, supplies, appointments, and recovery from blood-sugar disruptions.",
    workImpact:
      "Stable schedules, predictable breaks, remote/hybrid flexibility, and low-stigma access to supplies reduce avoidable health-management friction.",
    accommodations: [
      "Allow breaks to check glucose, eat, take medication, use the restroom, or recover until blood sugar normalizes.",
      "Allow diabetes supplies, food, and medication to stay nearby.",
      "Allow insulin administration at work, with a private area available if requested.",
      "Use schedule flexibility for treatment, medical appointments, or diabetes-management training.",
      "Avoid treating health-management breaks as ordinary attendance or productivity failures."
    ],
    resources: [
      {
        label: "CDC Type 2 diabetes overview",
        url: "https://www.cdc.gov/diabetes/about/about-type-2-diabetes.html"
      },
      {
        label: "American Diabetes Association reasonable accommodations",
        url: "https://diabetes.org/advocacy/know-your-rights/reasonable-accommodations"
      },
      {
        label: "ADA common diabetes accommodations",
        url: "https://diabetes.org/advocacy/know-your-rights/common-reasonable-accommodations"
      }
    ]
  },
  {
    id: "peripheral-neuropathy-advanced",
    condition: "Advanced peripheral neuropathy",
    label: "MOBILITY / PAIN",
    description:
      "James reports advanced peripheral neuropathy. Peripheral neuropathy is nerve damage that commonly affects the feet and legs and can involve pain, numbness, weakness, balance issues, and reduced tolerance for prolonged walking or standing.",
    workImpact:
      "The best work design preserves energy for the actual job by limiting unnecessary commuting, standing, walking, stairs, and movement between sites.",
    accommodations: [
      "Prefer remote/hybrid work when the role does not require physical presence.",
      "Limit prolonged standing, long walking distances, stairs, and frequent movement between locations.",
      "Provide ergonomic seating, permission to sit, accessible parking, elevator access, and predictable onsite layouts.",
      "Allow breaks to manage pain, numbness, balance, or foot-care needs.",
      "Avoid roles where physical mobility is an unstated requirement."
    ],
    resources: [
      {
        label: "NIDDK diabetic neuropathy",
        url: "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/nerve-damage-diabetic-neuropathies"
      },
      {
        label: "ADA diabetes accommodations for neuropathy",
        url: "https://diabetes.org/advocacy/know-your-rights/common-reasonable-accommodations"
      }
    ]
  },
  {
    id: "charcot-foot",
    condition: "Charcot foot",
    label: "FOOT PROTECTION",
    description:
      "James reports Charcot foot. Charcot foot is a serious complication connected to diabetes-related neuropathy where loss of sensation can allow injuries or stress to worsen before they are noticed.",
    workImpact:
      "This makes avoidable foot stress a real work-design issue, especially for onsite roles that assume standing, walking, stairs, or moving between locations.",
    accommodations: [
      "Reduce or eliminate prolonged standing, long walking routes, stairs, and frequent onsite movement.",
      "Support remote/hybrid work when physical presence is not essential.",
      "Provide accessible parking, elevator access, close workstation placement, and seating.",
      "Allow medically directed footwear, braces, mobility aids, or offloading devices without stigma.",
      "Allow flexibility for podiatry, wound-care, imaging, or urgent foot-related appointments."
    ],
    resources: [
      {
        label: "Cleveland Clinic Charcot foot overview",
        url: "https://my.clevelandclinic.org/health/diseases/15836-charcot-foot"
      },
      {
        label: "NIDDK diabetic neuropathy",
        url: "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/nerve-damage-diabetic-neuropathies"
      }
    ]
  },
  {
    id: "collapsed-diaphragm",
    condition: "Collapsed diaphragm",
    label: "BREATHING / EXERTION",
    description:
      "James reports a collapsed diaphragm. Diaphragm dysfunction can reduce breathing capacity and make exertion, stairs, long walks, heat, poor air quality, and physically demanding onsite logistics more costly.",
    workImpact:
      "The important workplace distinction is between mental work capacity and physical logistics. Reducing unnecessary exertion preserves capacity for the actual job.",
    accommodations: [
      "Prefer remote/hybrid work when onsite presence is not essential.",
      "Avoid stairs, long walks, physically demanding duties, and roles requiring frequent movement between buildings.",
      "Use accessible parking, elevator access, close workstation placement, and predictable onsite scheduling.",
      "Allow rest breaks and avoid penalizing slower movement during flares or high-exertion days.",
      "Prefer environments with manageable air quality, temperature, and crowding."
    ],
    resources: [
      {
        label: "Cleveland Clinic phrenic nerve and paralyzed diaphragm",
        url: "https://my.clevelandclinic.org/health/body/22270-phrenic-nerve"
      }
    ]
  },
  {
    id: "gastroparesis",
    condition: "Gastroparesis",
    label: "DIGESTIVE / SCHEDULE",
    description:
      "James reports gastroparesis. Gastroparesis, also called delayed gastric emptying, can cause early fullness, prolonged fullness, nausea, vomiting, and unpredictable digestion; diabetes is a common known cause.",
    workImpact:
      "The work issue is predictability: food timing, restroom access, nausea, glucose stability, and flare days may not align neatly with rigid schedules.",
    accommodations: [
      "Allow flexible meal timing, hydration, medication timing, and short breaks without stigma.",
      "Provide easy restroom access and the option to work away from strong food smells or crowded break areas.",
      "Use remote/hybrid flexibility for flare days when the work can still be completed.",
      "Allow schedule flexibility for medical appointments and symptom-management needs.",
      "Avoid rigid meeting blocks that prevent food, medication, or restroom access."
    ],
    resources: [
      {
        label: "NIDDK gastroparesis overview",
        url: "https://www.niddk.nih.gov/health-information/digestive-diseases/gastroparesis"
      },
      {
        label: "Cancer and Careers accommodation planning examples",
        url: "https://www.cancerandcareers.org/en/at-work/legal-and-financial/requesting-reasonable-accommodations"
      }
    ]
  },
  {
    id: "tinnitus",
    condition: "Tinnitus",
    label: "AUDIO / CONCENTRATION",
    description:
      "James reports tinnitus. Tinnitus is the perception of sound without an external source, often described as ringing, buzzing, roaring, humming, or similar sounds.",
    workImpact:
      "Tinnitus can make noisy spaces, poor audio, constant notification sounds, and live verbal environments harder to process, especially when concentration or sleep has already been affected.",
    accommodations: [
      "Provide quiet workspace, remote/hybrid options, or permission to use noise control when possible.",
      "Use written follow-ups, captions, transcripts, and meeting notes for important information.",
      "Allow headset choice, sound masking, or hearing-related assistive tools.",
      "Reduce unnecessary alarms, notification noise, and open-office audio clutter.",
      "Prefer async communication for complex instructions when audio clarity matters."
    ],
    resources: [
      {
        label: "NIDCD tinnitus overview",
        url: "https://www.nidcd.nih.gov/health/tinnitus"
      },
      {
        label: "JAN autism accommodation list includes noise-control tools",
        url: "https://askjan.org/disabilities/Autism-Spectrum.cfm"
      }
    ]
  },
  {
    id: "frozen-shoulders",
    condition: "Frozen shoulders, both sides",
    label: "RANGE OF MOTION",
    description:
      "James reports frozen shoulder on both sides. Frozen shoulder, or adhesive capsulitis, involves shoulder stiffness and pain that limits movement and can make reaching, lifting, carrying, and some workstation positions difficult.",
    workImpact:
      "The issue is physical range of motion, not willingness. The right setup reduces shoulder strain and avoids tasks that assume normal overhead reach or carrying capacity.",
    accommodations: [
      "Provide ergonomic desk setup, adjustable keyboard/mouse placement, arm support, and monitor positioning.",
      "Avoid overhead reaching, lifting, carrying, repetitive arm strain, or workstation layouts that require awkward reach.",
      "Allow voice dictation, alternative input devices, or workflow adjustments if typing/mousing becomes painful.",
      "Allow short movement breaks and flexibility for physical therapy or medical appointments.",
      "Prefer remote setup where equipment can be controlled and tuned for shoulder limitations."
    ],
    resources: [
      {
        label: "Mayo Clinic frozen shoulder overview",
        url: "https://www.mayoclinic.org/diseases-conditions/frozen-shoulder/symptoms-causes/syc-20372684"
      },
      {
        label: "Cancer and Careers accommodation planning examples",
        url: "https://www.cancerandcareers.org/en/at-work/legal-and-financial/requesting-reasonable-accommodations"
      }
    ]
  },
  {
    id: "colon-cancer-remission",
    condition: "Colon cancer in remission",
    label: "SURVIVORSHIP",
    description:
      "James reports colon cancer in remission. Remission does not mean the history becomes irrelevant: surveillance appointments, digestive effects, fatigue, anxiety around recurrence, or post-treatment side effects can still affect work logistics.",
    workImpact:
      "The best employer posture is not panic or avoidance. It is privacy-respecting flexibility for appointments, monitoring, lingering side effects, and changing needs over time.",
    accommodations: [
      "Allow schedule flexibility for oncology, gastroenterology, surveillance, labs, imaging, or follow-up appointments.",
      "Allow restroom access, breaks, remote/hybrid flexibility, or temporary schedule changes when symptoms require it.",
      "Keep health details confidential and discuss work restrictions only with people who need to implement accommodations.",
      "Treat accommodation needs as potentially changing over time rather than one fixed request.",
      "Evaluate role fit on current ability and objective job needs, not fear or stereotypes about cancer history."
    ],
    resources: [
      {
        label: "EEOC cancer in the workplace and ADA",
        url: "https://www.eeoc.gov/laws/guidance/cancer-workplace-and-ada"
      },
      {
        label: "Cancer and Careers reasonable accommodations",
        url: "https://www.cancerandcareers.org/en/at-work/legal-and-financial/requesting-reasonable-accommodations"
      }
    ]
  }
];

export const healthResourceIndex = [
  ...new Map(
    healthConditions
      .flatMap((condition) => condition.resources)
      .map((resource) => [resource.url, resource])
  ).values()
];

export const healthProfileCorpus = [
  {
    id: "health-accommodations-overview",
    group: "health-accommodations",
    sourceLabel: "Health & Accessibility Lens",
    referenceLabel: "Health & Accessibility Lens",
    title: "Health and Accessibility Overview",
    aliases: [
      "health",
      "health section",
      "health conditions",
      "accessibility",
      "accommodations",
      "reasonable accommodations",
      "work accommodations",
      "remote hybrid health",
      "onsite constraints"
    ],
    items: [
      healthProfileIntro.summary,
      healthProfileIntro.boundary,
      "Use this context only when the question is about health, disability, accommodations, remote or hybrid fit, onsite constraints, work style, strengths, weaknesses, or role design.",
      "The practical goal is to discuss work-design needs early: clear communication, low sensory load, written expectations, remote or hybrid flexibility, predictable scheduling, limited physical movement, and privacy-respecting accommodation discussion.",
      "Supporting resources:",
      ...healthResourceIndex.map((resource) => `${resource.label}: ${resource.url}`)
    ]
  },
  ...healthConditions.map((condition) => ({
    id: `health-accommodations-${condition.id}`,
    group: "health-accommodations",
    sourceLabel: "Health & Accessibility Lens",
    referenceLabel: condition.condition,
    title: condition.condition,
    aliases: [
      condition.condition.toLowerCase(),
      condition.label.toLowerCase(),
      ...condition.condition.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean),
      ...condition.accommodations.flatMap((item) => item.toLowerCase().match(/[a-z0-9-]+/g) ?? []).slice(0, 20)
    ],
    items: [
      `James reports: ${condition.condition}.`,
      condition.description,
      condition.workImpact,
      "Best accommodation approaches:",
      ...condition.accommodations,
      "Supporting resources:",
      ...condition.resources.map((resource) => `${resource.label}: ${resource.url}`)
    ]
  }))
];
