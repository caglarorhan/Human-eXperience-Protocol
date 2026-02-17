# HXP — Human eXperience Protocol

**HXP** is a lightweight, model-agnostic metadata protocol that standardizes **how AI systems communicate with humans**.

HXP does not dictate model internals or reasoning. It defines an **envelope** around human-facing content so that systems can reliably express:

- **Intent** — what the message is trying to do
- **Delivery profile** — verbosity, format, tone
- **Cognitive complexity** — how demanding the message is to consume
- **Transparency signals** — confidence, assumptions, verification needs
- **Actions / affordances** — what the human can do next

> If MCP helps tools talk to tools, **HXP helps AI talk to humans**.

---

## Why HXP?

Modern AI output is usually plain text. Plain text is flexible but hard to:

- adapt to different humans
- audit and debug
- keep consistent across agents / models
- express uncertainty without dumping long explanations
- power UIs with structured "next steps"

HXP makes AI communication **portable**, **observable**, and **human-compatible**.

---

## Core Model

An HXP message is a pair:

| Part      | Role                                    |
|-----------|-----------------------------------------|
| `hxp`     | Structured metadata envelope (machine-readable) |
| `content` | Human-facing payload (text / markdown / structured / multimodal ref) |

```json
{
  "hxp": {
    "version": "1.0.0",
    "intent": "explain",
    "delivery": { "verbosity": "medium" },
    "transparency": { "confidence": 0.86 },
    "actions": [{ "type": "expand", "label": "Go deeper" }]
  },
  "content": "HXP standardizes how AI communicates with humans..."
}
```

---

## Compliance Levels

| Level            | Fields                                  | When to use                          |
|------------------|-----------------------------------------|--------------------------------------|
| **HXP-Core**     | Minimal required fields                 | MVP, broad adoption                  |
| **HXP-Standard** | Recommended fields for quality UX       | Production, analytics, observability |
| **HXP-Full**     | Negotiation, safety, domain extensions  | Enterprise, regulated domains        |

See: [SPEC.md](SPEC.md) for full normative definitions.

---

## Quick Start

### 1 · Pick a compliance level

Start with **HXP-Core** in MVP. Upgrade to **HXP-Standard** for better UX and analytics.

### 2 · Wrap responses with HXP

Add an envelope around whatever your AI generates.

### 3 · Log envelopes

Treat HXP envelopes like telemetry — track:

- intent mismatch
- confidence distribution
- cognitive overload patterns
- refusal rates

---

## Schema & Bindings

| Artifact                  | Path                            |
|---------------------------|---------------------------------|
| JSON Schema (2020-12)     | [`schema/hxp.schema.json`](schema/hxp.schema.json) |
| TypeScript types + helper | [`bindings/typescript/`](bindings/typescript/) |

---

## Extensions (vendor / domain specific)

HXP supports namespaced extensions:

```json
{
  "hxp": {
    "version": "1.0.0",
    "intent": "teach",
    "delivery": { "verbosity": "medium" },
    "transparency": { "confidence": 0.75 },
    "actions": [],
    "extensions": {
      "education": { "grade_level": 8 }
    }
  },
  "content": "..."
}
```

Rules for extensions are defined in [SPEC.md § 7.10](SPEC.md#710-hxpextensions-full-optional).

---

## Examples

| File | Level | Intent |
|------|-------|--------|
| [`explain.standard.json`](examples/explain.standard.json) | Standard | explain |
| [`debug.standard.json`](examples/debug.standard.json) | Standard | debug |
| [`refusal.standard.json`](examples/refusal.standard.json) | Standard | refuse |
| [`brainstorm.core.json`](examples/brainstorm.core.json) | Core | brainstorm |

---

## Repository Layout

```
hxp/
├── README.md
├── SPEC.md
├── CHANGELOG.md
├── LICENSE
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── CODE_OF_CONDUCT.md
├── schema/
│   └── hxp.schema.json
├── bindings/
│   └── typescript/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           └── index.ts
└── examples/
    ├── explain.standard.json
    ├── debug.standard.json
    ├── refusal.standard.json
    └── brainstorm.core.json
```

---

## License

[MIT](LICENSE)

---

## Status

**Stable draft.** Breaking changes only via major versions.

Current: **1.0.0** (initial public spec)
