// ============================================================================
// Static mock data for the "AI vs. Human Evaluation in Psychometrics" platform
// ============================================================================

export type Role = "student" | "teacher" | "auditor"

export const ROLES: { value: Role; label: string; description: string }[] = [
  {
    value: "student",
    label: "Student",
    description: "Take exams & evaluate feedback quality",
  },
  {
    value: "teacher",
    label: "Teacher / Rater",
    description: "Blind-grade anonymized responses",
  },
  {
    value: "auditor",
    label: "Auditor / Supervisor",
    description: "Audit scores & run psychometric models",
  },
]

// ---------------------------------------------------------------------------
// STUDENT — Exam panel
// ---------------------------------------------------------------------------
export const EXAM = {
  title: "Cognitive & Behavioral Psychology — Section II",
  current: 3,
  total: 10,
  question: {
    id: "Q3",
    construct: "Attachment Theory",
    difficulty: "Moderate",
    prompt:
      "Bowlby's attachment theory posits an evolutionary basis for the infant–caregiver bond. Critically evaluate the internal working model construct and discuss how it accounts for continuity in relational patterns across the lifespan. Support your reasoning with at least one empirical study.",
  },
}

// ---------------------------------------------------------------------------
// STUDENT — Feedback evaluation (A/B)
// ---------------------------------------------------------------------------
export const FEEDBACK_EVAL = {
  question:
    "Explain how test–retest reliability differs from internal consistency, and describe a scenario where a scale could exhibit high internal consistency but poor test–retest reliability.",
  optionA: {
    source: "Feedback A",
    score: 8.4,
    text: "Your distinction between the two reliability types is accurate. Test–retest captures temporal stability, while internal consistency (e.g., Cronbach's α) captures item homogeneity at a single time point. To strengthen the answer, add a concrete example: a state-anxiety scale can show high α yet low test–retest reliability because the trait it measures genuinely fluctuates over time.",
  },
  optionB: {
    source: "Feedback B",
    score: 6.1,
    text: "Good attempt. You correctly note that these are different forms of reliability. Consider expanding on the statistical methods used for each and try to be more precise about when each is appropriate. Overall a reasonable response that could use more detail.",
  },
}

// ---------------------------------------------------------------------------
// TEACHER — Blind grading
// ---------------------------------------------------------------------------
export const TEACHER_QUESTIONS = [
  { value: "q1", label: "Q1 · Attachment Theory" },
  { value: "q2", label: "Q2 · Reliability & Validity" },
  { value: "q3", label: "Q3 · Cognitive Dissonance" },
]

export const GRADING_CONTEXT = {
  questionLabel: "Question 1",
  construct: "Attachment Theory",
  question:
    "Critically evaluate the internal working model construct within Bowlby's attachment theory and its role in explaining continuity of relational patterns.",
  anonymizedEssay:
    "The internal working model (IWM) functions as a cognitive-affective schema derived from early caregiver interactions. Bowlby argued that these models operate largely outside conscious awareness, shaping expectations of availability and responsiveness in later relationships. Longitudinal evidence, such as the Minnesota Study of Risk and Adaptation, supports moderate continuity between infant attachment classifications and adolescent relational functioning. However, critics note that discontinuity is common following major life transitions, suggesting IWMs are revisable rather than fixed. The construct therefore offers a probabilistic — not deterministic — account of relational continuity...",
  rubric: [
    { id: "r1", label: "Conceptual Accuracy", score: 8 },
    { id: "r2", label: "Critical Analysis", score: 7 },
    { id: "r3", label: "Use of Evidence", score: 6 },
  ],
}

export const TEACHER_FILTERS = [
  { value: "pending", label: "Pending" },
  { value: "graded", label: "Graded" },
  { value: "all", label: "All submissions" },
]

// ---------------------------------------------------------------------------
// AUDITOR — Audit & edit scores
// ---------------------------------------------------------------------------
export const EVALUATORS = [
  { value: "human1", label: "Human Rater · R-04" },
  { value: "human2", label: "Human Rater · R-07" },
  { value: "gpt4", label: "AI · GPT-4o" },
  { value: "claude", label: "AI · Claude 3.5" },
  { value: "gemini", label: "AI · Gemini 1.5" },
]

export const AUDIT_RECORD = {
  student: "Respondent #A-2291 (anonymized)",
  evaluator: "AI · Gemini 1.5",
  answerExcerpt:
    "Cognitive dissonance, as formulated by Festinger (1957), describes the aversive tension that arises when an individual holds two psychologically inconsistent cognitions. The drive to reduce this tension motivates attitude change, selective exposure to information, or trivialization of the conflicting element...",
  scores: [
    { id: "s1", label: "Conceptual Accuracy", score: 7 },
    { id: "s2", label: "Critical Analysis", score: 5 },
    { id: "s3", label: "Use of Evidence", score: 6 },
  ],
}

// ---------------------------------------------------------------------------
// AUDITOR — Generalizability Theory (G-Theory)
// ---------------------------------------------------------------------------
export const G_STATS = {
  gCoefficient: 0.84,
  phi: 0.79,
}

// Stacked variance components (single 100% bar)
export const VARIANCE_COMPONENTS = [
  {
    facet: "Variance",
    Persons: 65,
    Raters: 12,
    Items: 5,
    Error: 18,
  },
]

export const VARIANCE_KEYS = [
  { key: "Persons", label: "Persons (Object)", color: "var(--chart-1)" },
  { key: "Raters", label: "Raters", color: "var(--chart-3)" },
  { key: "Items", label: "Items", color: "var(--chart-2)" },
  { key: "Error", label: "Residual Error", color: "var(--chart-4)" },
]

// D-Study projection: reliability as number of raters increases
export const D_STUDY = [
  { raters: 1, gCoef: 0.61, phi: 0.55 },
  { raters: 2, gCoef: 0.74, phi: 0.68 },
  { raters: 3, gCoef: 0.81, phi: 0.75 },
  { raters: 4, gCoef: 0.84, phi: 0.79 },
  { raters: 5, gCoef: 0.87, phi: 0.83 },
  { raters: 6, gCoef: 0.89, phi: 0.85 },
  { raters: 8, gCoef: 0.91, phi: 0.88 },
]

// ---------------------------------------------------------------------------
// AUDITOR — Many-Facet Rasch (MFRM)
// ---------------------------------------------------------------------------
// Wright map simulated via scatter: x = facet category, y = logits
export const WRIGHT_MAP = [
  // Students (ability)
  { facet: 1, logit: 2.4, label: "S-118", group: "student" },
  { facet: 1, logit: 1.3, label: "S-072", group: "student" },
  { facet: 1, logit: 0.4, label: "S-205", group: "student" },
  { facet: 1, logit: -0.6, label: "S-041", group: "student" },
  { facet: 1, logit: -1.7, label: "S-160", group: "student" },
  // Judges (severity) — Human severe (high), Gemini lenient (low)
  { facet: 2, logit: 1.9, label: "Human R-04", group: "human" },
  { facet: 2, logit: 1.1, label: "Human R-07", group: "human" },
  { facet: 2, logit: 0.2, label: "GPT-4o", group: "ai" },
  { facet: 2, logit: -0.5, label: "Claude 3.5", group: "ai" },
  { facet: 2, logit: -1.8, label: "Gemini 1.5", group: "ai" },
  // Items (difficulty)
  { facet: 3, logit: 1.2, label: "Q2", group: "item" },
  { facet: 3, logit: 0.1, label: "Q1", group: "item" },
  { facet: 3, logit: -0.9, label: "Q3", group: "item" },
]

export const WRIGHT_FACETS = ["", "Students", "Judges", "Items"]

// Rater fit statistics (Infit MnSq). Acceptable range 0.6 – 1.4
export const RATER_FIT = [
  { rater: "Human R-04", infit: 1.12, type: "human" },
  { rater: "Human R-07", infit: 0.94, type: "human" },
  { rater: "GPT-4o", infit: 0.88, type: "ai" },
  { rater: "Claude 3.5", infit: 1.05, type: "ai" },
  { rater: "Gemini 1.5", infit: 1.47, type: "ai" },
  { rater: "Human R-11", infit: 0.58, type: "human" },
]

// ---------------------------------------------------------------------------
// AUDITOR — Feedback preferences
// ---------------------------------------------------------------------------
export const PREFERENCE_SPLIT = [
  { name: "Preferred AI Feedback", value: 58, color: "var(--chart-1)" },
  { name: "Preferred Human Feedback", value: 42, color: "var(--chart-2)" },
]

export const AI_WINNERS = [
  { model: "Claude 3.5", wins: 41 },
  { model: "GPT-4o", wins: 37 },
  { model: "Gemini 1.5", wins: 22 },
]

export const JUSTIFICATIONS = [
  {
    id: "j1",
    choice: "AI",
    respondent: "#A-1043",
    text: "The AI feedback pinpointed the exact sentence where my argument lost rigor and offered a concrete example. The human comment was encouraging but vaguer.",
  },
  {
    id: "j2",
    choice: "Human",
    respondent: "#A-0781",
    text: "The human rater understood the nuance of my counter-argument and acknowledged the theoretical tension I was trying to raise. The AI missed that context.",
  },
  {
    id: "j3",
    choice: "AI",
    respondent: "#A-2210",
    text: "Feedback A (AI) was better structured — it separated conceptual accuracy from evidence use, which mirrored the rubric and made revision straightforward.",
  },
  {
    id: "j4",
    choice: "Human",
    respondent: "#A-0355",
    text: "I trusted the human evaluator more. The tone felt considered rather than templated, and it referenced a study I had cited specifically.",
  },
  {
    id: "j5",
    choice: "AI",
    respondent: "#A-1877",
    text: "The AI response was faster to act on and avoided ambiguity. It told me precisely what a top-scoring answer would have included.",
  },
]

export const AUDITOR_NAV = [
  { id: "audit", label: "Audit & Edit Scores", icon: "ClipboardCheck" },
  { id: "gtheory", label: "Generalizability Theory", icon: "SplitSquareVertical" },
  { id: "mfrm", label: "Many-Facet Rasch", icon: "Ruler" },
  { id: "preferences", label: "Feedback Preferences", icon: "ThumbsUp" },
] as const

export type AuditorPage = (typeof AUDITOR_NAV)[number]["id"]
