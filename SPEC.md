# HXP — Human eXperience Protocol

**Version:** 1.0.0  
**Status:** Draft Standard  
**Last-Updated:** 2026-02-17

---

## 1. Abstract

The Human eXperience Protocol (HXP) defines a model- and transport-agnostic, machine-readable metadata envelope for AI↔Human communication. HXP standardizes how systems express communicative intent, delivery profile, cognitive complexity, transparency signals, and interaction affordances.

HXP does not constrain model architecture, internal reasoning, or alignment method. Its purpose is to improve **clarity**, **trust**, **interoperability**, and **observability** of human-facing AI behavior.

---

## 2. Goals

HXP aims to:

1. **Reduce ambiguity** by explicitly declaring message **intent** and **delivery**.
2. **Improve trust** with structured **transparency signals** (confidence, assumptions, verification needs).
3. **Manage human consumption cost** via **cognitive complexity** fields.
4. **Enable UI and workflow integration** through **actions/affordances**.
5. **Provide stable interoperability** across different models, agents, and products.

---

## 3. Non-Goals

HXP does **not**:

- require disclosure of chain-of-thought or private reasoning traces
- define training methods, safety policies, or alignment doctrines
- provide authentication, authorization, or identity primitives
- replace product UX design; it provides metadata to **power** UX

---

## 4. Terminology

| Term          | Definition                                                   |
|---------------|--------------------------------------------------------------|
| **Producer**  | System generating an HXP message                             |
| **Consumer**  | System/UI interpreting an HXP message                        |
| **Envelope**  | The `hxp` object containing metadata                         |
| **Content**   | The human-facing payload                                     |
| **Affordance**| A structured next-step action offered to the user            |

Normative terms **MUST**, **SHOULD**, **MAY** are as defined in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

---

## 5. Message Model

An HXP message consists of:

- `hxp` — envelope (metadata)
- `content` — human-facing payload (text / markdown / structured / multimodal reference)
- Optional additional top-level fields **MAY** exist but **MUST NOT** conflict with `hxp` and `content`.

### 5.1 Canonical JSON Shape

```json
{
  "hxp": { "..." },
  "content": "..."
}
```

---

## 6. Compliance Levels

### 6.1 HXP-Core (minimal)

Producer **MUST** include:

- `hxp.version`
- `hxp.intent`
- `hxp.delivery.verbosity`
- `hxp.transparency.confidence`
- `hxp.actions` (may be empty array)
- `content`

### 6.2 HXP-Standard (recommended)

Includes HXP-Core plus **SHOULD** include:

- `hxp.delivery.format`, `hxp.delivery.tone`, `hxp.delivery.language`
- `hxp.cognition.load`, `hxp.cognition.estimated_read_seconds`, `hxp.cognition.chunking`
- `hxp.transparency.verification_needed`, `hxp.transparency.assumptions`
- `hxp.negotiation.intent_confirmed`, `hxp.negotiation.clarifying_questions`

### 6.3 HXP-Full (extended)

HXP-Standard plus **MAY** include:

- `hxp.refusal` (structured refusal metadata)
- `hxp.safety` (alignment-aware but doctrine-neutral signals)
- `hxp.extensions` (namespaced domain/vendor additions)

---

## 7. Field Definitions (Normative)

### 7.1 `hxp.version` (REQUIRED)

- **Type:** `string` (semver)
- Producer **MUST** emit valid semantic version, e.g. `"1.0.0"`.
- Consumer **MUST** ignore unknown fields and **MUST NOT** fail on additional properties unless strict mode is enabled.

### 7.2 `hxp.intent` (REQUIRED)

- **Type:** `string`
- Intent is the primary communicative purpose.
- Producer **MUST** provide exactly one intent.

**Recommended common intents:**

| Intent       | Semantics                                |
|--------------|------------------------------------------|
| `explain`    | Clarify a concept or system              |
| `plan`       | Outline steps toward a goal              |
| `debug`      | Diagnose and fix an issue                |
| `brainstorm` | Generate ideas without committing        |
| `draft`      | Produce a first version of content       |
| `summarize`  | Condense information                     |
| `evaluate`   | Assess options, tradeoffs, or quality    |
| `decide`     | Recommend or choose between options      |
| `teach`      | Educate with pedagogical structure       |
| `refuse`     | Decline to fulfill a request             |
| `reflect`    | Provide meta-analysis or self-assessment |

Consumers **MAY** maintain local registries; producers **SHOULD** prefer widely used intents.

### 7.3 `hxp.delivery` (REQUIRED)

#### 7.3.1 `hxp.delivery.verbosity` (REQUIRED)

- **Enum:** `low` | `medium` | `high`
- Represents expected depth/length relative to the task.

#### 7.3.2 Optional delivery fields (STANDARD)

| Field      | Type   | Values                                           |
|------------|--------|--------------------------------------------------|
| `format`   | string | `bullets` · `steps` · `narrative` · `code` · `table` · `mixed` |
| `tone`     | string | `neutral` · `direct` · `warm` · `formal` · `playful` |
| `language` | string | BCP-47 language tag (e.g., `en`, `tr`, `en-US`)  |

### 7.4 `hxp.cognition` (STANDARD)

| Field                    | Type    | Constraints       | Description                          |
|--------------------------|---------|-------------------|--------------------------------------|
| `load`                   | integer | 1..10             | Relative mental effort to understand |
| `estimated_read_seconds` | integer | ≥ 0               | Rough estimate                       |
| `chunking`               | string  | `none` · `light` · `structured` | Content segmentation level |

Producers **SHOULD** avoid presenting very high load unless explicitly requested.

### 7.5 `hxp.transparency` (REQUIRED container, partial required)

#### 7.5.1 `hxp.transparency.confidence` (REQUIRED)

- **Type:** `number`, range `0..1`
- Subjective likelihood response is correct/helpful for intent.
- Producers **MUST NOT** present fabricated "certainty". If uncertain, lower confidence and/or set verification flags.

#### 7.5.2 `verification_needed` (STANDARD)

- **Type:** `boolean`
- `true` if user should verify with sources, experts, or additional checks.

#### 7.5.3 `assumptions` (STANDARD)

- **Type:** `array` of `string`
- Brief, user-relevant assumptions.

#### 7.5.4 `limits` (OPTIONAL)

- **Type:** `array` of `string`
- Known limitations (missing info, time sensitivity, etc.).

### 7.6 `hxp.actions` (REQUIRED)

- **Type:** `array` of Action objects (may be empty)

**Action object fields:**

| Field     | Required | Type   | Description                 |
|-----------|----------|--------|-----------------------------|
| `type`    | **YES**  | string | Action identifier           |
| `label`   | no       | string | User-facing display text    |
| `payload` | no       | object | Arbitrary structured data   |

#### 7.6.1 Recommended action types

```
ask_followup, refine_request, simplify, expand, generate_variant,
compare_options, verify_sources, create_plan, export_schema, show_examples
```

Consumers **MAY** map types to UI buttons.

### 7.7 `hxp.negotiation` (STANDARD)

| Field                  | Type    | Description                       |
|------------------------|---------|-----------------------------------|
| `intent_confirmed`     | boolean | Whether intent was validated      |
| `clarifying_questions` | array   | Questions to align understanding  |

Used to manage iterative intent alignment.

### 7.8 `hxp.refusal` (FULL; OPTIONAL)

Structured refusal metadata:

| Field                | Type   | Values                                        |
|----------------------|--------|-----------------------------------------------|
| `type`               | string | `safety` · `legal` · `capability` · `policy` · `unknown` |
| `severity`           | string | `soft` · `hard`                               |
| `redirect_available` | boolean| Whether a safer alternative can be offered    |

When `hxp.intent` is `refuse`, producers **SHOULD** include `hxp.refusal`.

### 7.9 `hxp.safety` (FULL; OPTIONAL, doctrine-neutral)

A minimal compatibility surface for systems using internal constitutions/policies without naming vendors:

| Field              | Type    | Values                          |
|--------------------|---------|---------------------------------|
| `alignment_source` | string  | e.g., `constitutional`, `policy`, `local_rules` |
| `harm_risk`        | string  | `low` · `medium` · `high`      |
| `safety_flag`      | boolean | Policy-triggered flag           |

### 7.10 `hxp.extensions` (FULL; OPTIONAL)

- **Type:** `object` keyed by namespace (e.g., `education`, `medical`, `finance`, `vendor.x`)

**Rules:**

1. Extensions **MUST NOT** redefine core fields.
2. Extensions **SHOULD** be stable and documented.
3. Vendor namespaces **SHOULD** be prefixed with `vendor.` (e.g., `vendor.acme`).

---

## 8. Transport Bindings

HXP is **transport-agnostic**.

### 8.1 JSON API Binding

Envelope as shown in Section 5.1.

### 8.2 HTTP Header Binding (optional)

Producers **MAY** emit:

| Header           | Mapped field              |
|------------------|---------------------------|
| `HXP-Intent`    | `hxp.intent`              |
| `HXP-Verbosity` | `hxp.delivery.verbosity`  |
| `HXP-Confidence`| `hxp.transparency.confidence` |
| `HXP-CogLoad`   | `hxp.cognition.load`      |

Consumers **MUST** treat headers as advisory; the canonical source is the JSON envelope when available.

### 8.3 Streaming Binding

Producers **MAY** send the envelope as a prelude frame before content streaming begins.

---

## 9. Privacy Considerations

- Producers **SHOULD** avoid embedding personal identity data in HXP fields.
- Human preference fields **MUST** remain non-sensitive and non-identifying.
- Extensions **MUST** document any sensitive fields and provide opt-out guidance.

---

## 10. Security Considerations

Consumers **SHOULD** assume envelopes can be spoofed unless validated:

- confidence inflation
- misleading actions
- manipulation via tone fields

Security-sensitive contexts **SHOULD** require server-side validation and audit logs.

---

## 11. Observability

HXP enables consistent telemetry for AI UX:

| Metric                       | Source field                   |
|------------------------------|-------------------------------|
| Intent distribution          | `hxp.intent`                  |
| Confidence histograms        | `hxp.transparency.confidence` |
| Cognitive load trends        | `hxp.cognition.load`          |
| Refusal rates and reasons    | `hxp.refusal`                 |
| Action click-through rates   | `hxp.actions[].type`          |

---

## 12. Versioning and Compatibility

- **Backward compatible additions:** MINOR versions.
- **Breaking changes:** MAJOR versions.
- Producers **SHOULD** include `hxp.version`.
- Consumers **SHOULD** ignore unknown fields.

---

## 13. Examples

See [`examples/`](examples/) directory.
