# HXP — Human eXperience Protocol

[![npm version](https://img.shields.io/npm/v/human-experience-protocol.svg)](https://www.npmjs.com/package/human-experience-protocol)
[![npm downloads](https://img.shields.io/npm/dm/human-experience-protocol.svg)](https://www.npmjs.com/package/human-experience-protocol)
[![GitHub Package](https://img.shields.io/badge/GitHub%20Packages-@caglarorhan/human--experience--protocol-blue?logo=github)](https://github.com/caglarorhan/Human-eXperience-Protocol/packages)
[![License](https://img.shields.io/github/license/caglarorhan/Human-eXperience-Protocol.svg)](https://github.com/caglarorhan/Human-eXperience-Protocol/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caglarorhan/Human-eXperience-Protocol.svg)](https://github.com/caglarorhan/Human-eXperience-Protocol/stargazers)

**HXP** is a lightweight, model-agnostic metadata protocol that standardizes **how AI systems communicate with humans**.

HXP does not dictate model internals or reasoning. It defines an **envelope** around human-facing content so that systems can reliably express:

- **Intent** — what the message is trying to do
- **Delivery profile** — verbosity, format, tone
- **Cognitive complexity** — how demanding the message is to consume
- **Transparency signals** — confidence, assumptions, verification needs
- **Actions / affordances** — what the human can do next

> If MCP helps tools talk to tools, **HXP helps AI talk to humans**.

📦 **npm:** [human-experience-protocol](https://www.npmjs.com/package/human-experience-protocol) | 📖 **Spec:** [SPEC.md](SPEC.md) | 🚀 **[Getting Started](GETTING-STARTED.md)**

---

## 🤔 Why HXP?

Modern AI output is usually plain text. Plain text is flexible but hard to:

- adapt to different humans
- audit and debug
- keep consistent across agents / models
- express uncertainty without dumping long explanations
- power UIs with structured "next steps"

HXP makes AI communication **portable**, **observable**, and **human-compatible**.

---

## 👥 Who Should Use This?

| Use Case | HXP Helps You... |
|----------|-------------------|
| **AI Product Teams** | Standardize AI output across features and models |
| **LLM Wrapper Developers** | Add structured metadata without reinventing the wheel |
| **Agent Frameworks** | Express intent, confidence, and actions consistently |
| **UX Engineers** | Power adaptive UIs with structured AI metadata |
| **ML Engineers** | Track and audit AI communication patterns |
| **Enterprise Teams** | Enforce observability, compliance, and trust signals |

---

## Installation

### From npm (recommended)

```bash
# Install globally for CLI usage
npm install -g human-experience-protocol

# Or install locally in your project
npm install human-experience-protocol
```

### From GitHub Packages

```bash
# Configure npm to use GitHub Packages for @caglarorhan scope
npm config set @caglarorhan:registry https://npm.pkg.github.com

# Install globally
npm install -g @caglarorhan/human-experience-protocol

# Or locally
npm install @caglarorhan/human-experience-protocol
```

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

```bash
# Validate an HXP message
hxp validate your-message.json

# Validate all examples
npm run validate
```

See the full **[Getting Started Guide](GETTING-STARTED.md)** for step-by-step integration.

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

## Validate an HXP Message

### Node.js (Ajv)

```bash
npm install
npm run validate
```

### Python (jsonschema)

```bash
pip install jsonschema
python -c "
import json
from jsonschema import validate, Draft202012Validator
schema = json.load(open('schema/hxp.schema.json'))
msg = json.load(open('examples/explain.standard.json'))
Draft202012Validator.check_schema(schema)
validate(instance=msg, schema=schema)
print('valid')
"
```

---

## CLI Usage

```bash
npm install -g human-experience-protocol

# Validate a message
hxp validate message.json

# Show version
hxp --version
```

Or via npm scripts:

```bash
npm run validate          # validate all examples
npm run validate:all      # validate all examples (glob)
```

---

## Contents

### Core Files
- `SPEC.md` — Full RFC-style protocol specification
- `schema/hxp.schema.json` — JSON Schema (draft 2020-12) for validation
- `CHANGELOG.md` — Version history and release notes

### Bindings
- `bindings/typescript/` — TypeScript types + `isHxpMessage()` runtime guard

### Examples
- `examples/explain.standard.json` — HXP-Standard explanation
- `examples/debug.standard.json` — HXP-Standard debug with negotiation
- `examples/refusal.standard.json` — HXP-Full refusal with safety
- `examples/brainstorm.core.json` — HXP-Core minimal

### Tools
- `src/cli.js` — CLI entry point
- `src/validate.js` — Schema validator (Ajv)
- `scripts/sync-version.js` — Version sync across all files

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
Human-eXperience-Protocol/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug-report.md
│   │   ├── feature-request.md
│   │   ├── design-question.md
│   │   ├── getting-started.md
│   │   └── config.yml
│   └── workflows/
│       └── validate.yml
├── README.md
├── SPEC.md
├── CHANGELOG.md
├── RELEASE_NOTES.md
├── GETTING-STARTED.md
├── LICENSE
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── CODE_OF_CONDUCT.md
├── package.json
├── schema/
│   └── hxp.schema.json
├── src/
│   ├── cli.js
│   ├── validate.js
│   └── version.js
├── scripts/
│   └── sync-version.js
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

## Versioning

- Protocol uses Semantic Versioning.
- See `SPEC.md` for versioning policy.
- Version is defined in ONE place: `package.json`
- All files are synced via `npm run version:sync`

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Status

**Stable draft.** Breaking changes only via major versions.

Current: **1.0.0** (initial public spec)
