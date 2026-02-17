// ─────────────────────────────────────────────────────────────
// HXP — Human eXperience Protocol · TypeScript Bindings
// Version 1.0.0
// ─────────────────────────────────────────────────────────────

// ── Delivery ────────────────────────────────────────────────

export type HxpVerbosity = "low" | "medium" | "high";

export type HxpFormat =
  | "bullets"
  | "steps"
  | "narrative"
  | "code"
  | "table"
  | "mixed";

export type HxpTone =
  | "neutral"
  | "direct"
  | "warm"
  | "formal"
  | "playful";

export interface HxpDelivery {
  verbosity: HxpVerbosity;
  format?: HxpFormat;
  tone?: HxpTone;
  /** BCP-47 language tag, e.g. "en", "tr", "en-US" */
  language?: string;
}

// ── Cognition ───────────────────────────────────────────────

export interface HxpCognition {
  /** 1..10 relative cognitive effort */
  load?: number;
  /** Rough estimate of reading/comprehension time in seconds */
  estimated_read_seconds?: number;
  /** Level of content segmentation */
  chunking?: "none" | "light" | "structured";
}

// ── Transparency ────────────────────────────────────────────

export interface HxpTransparency {
  /** 0..1 subjective correctness/helpfulness likelihood */
  confidence: number;
  /** True if user should verify with external sources */
  verification_needed?: boolean;
  /** Brief, user-relevant assumptions the response depends on */
  assumptions?: string[];
  /** Known limitations (missing info, time sensitivity, etc.) */
  limits?: string[];
}

// ── Negotiation ─────────────────────────────────────────────

export interface HxpNegotiation {
  /** Whether the producer has validated the user's intent */
  intent_confirmed?: boolean;
  /** Questions to align understanding before proceeding */
  clarifying_questions?: string[];
}

// ── Actions ─────────────────────────────────────────────────

export interface HxpAction {
  /** Action identifier (e.g. "expand", "simplify", "ask_followup") */
  type: string;
  /** User-facing display text */
  label?: string;
  /** Arbitrary structured data associated with the action */
  payload?: Record<string, unknown>;
}

// ── Refusal ─────────────────────────────────────────────────

export interface HxpRefusal {
  type?: "safety" | "legal" | "capability" | "policy" | "unknown";
  severity?: "soft" | "hard";
  redirect_available?: boolean;
}

// ── Safety ──────────────────────────────────────────────────

export interface HxpSafety {
  /** Doctrine-neutral label for the alignment source */
  alignment_source?: string;
  harm_risk?: "low" | "medium" | "high";
  safety_flag?: boolean;
}

// ── Envelope ────────────────────────────────────────────────

export interface HxpEnvelope {
  /** Semantic version of the HXP spec (e.g. "1.0.0") */
  version: string;
  /** Primary communicative intent */
  intent: string;
  delivery: HxpDelivery;
  cognition?: HxpCognition;
  transparency: HxpTransparency;
  negotiation?: HxpNegotiation;
  refusal?: HxpRefusal;
  safety?: HxpSafety;
  /** Interaction affordances offered to the user */
  actions: HxpAction[];
  /** Namespaced domain/vendor extensions */
  extensions?: Record<string, unknown>;
  /** Forward-compatibility: allow unknown keys */
  [k: string]: unknown;
}

// ── Content ─────────────────────────────────────────────────

/** Human-facing payload: plain text / markdown or structured object */
export type HxpContent = string | Record<string, unknown>;

// ── Message ─────────────────────────────────────────────────

export interface HxpMessage {
  hxp: HxpEnvelope;
  content: HxpContent;
  /** Forward-compatibility: allow unknown top-level keys */
  [k: string]: unknown;
}

// ── Runtime Guard ───────────────────────────────────────────

/**
 * Tiny runtime type guard for HXP-Core compliance.
 *
 * Checks the structural shape required by HXP-Core:
 * - `hxp.version` (string)
 * - `hxp.intent` (string)
 * - `hxp.delivery.verbosity` (string)
 * - `hxp.transparency.confidence` (number)
 * - `hxp.actions` (array)
 * - `content` (defined)
 *
 * **Not** a full JSON Schema validator — use proper schema
 * validation (e.g. Ajv) in production.
 */
export function isHxpMessage(value: unknown): value is HxpMessage {
  if (!value || typeof value !== "object") return false;

  const v = value as Record<string, unknown>;

  // Top-level structure
  if (!v.hxp || typeof v.hxp !== "object") return false;
  if (typeof v.content === "undefined") return false;

  const hxp = v.hxp as Record<string, unknown>;

  // Required scalar fields
  if (typeof hxp.version !== "string") return false;
  if (typeof hxp.intent !== "string") return false;

  // Delivery
  if (!hxp.delivery || typeof hxp.delivery !== "object") return false;
  const delivery = hxp.delivery as Record<string, unknown>;
  if (typeof delivery.verbosity !== "string") return false;

  // Transparency
  if (!hxp.transparency || typeof hxp.transparency !== "object") return false;
  const transparency = hxp.transparency as Record<string, unknown>;
  if (typeof transparency.confidence !== "number") return false;

  // Actions
  if (!Array.isArray(hxp.actions)) return false;

  return true;
}
