# 🚀 Getting Started with HXP

Integrate the Human eXperience Protocol into your AI system in minutes.

## What You'll Get

Wrap your AI responses in HXP envelopes to get:

- ✅ Declared **intent** (explain, debug, brainstorm, refuse, etc.)
- ✅ **Delivery profile** (verbosity, format, tone, language)
- ✅ **Cognitive load** signals (how hard is this to read?)
- ✅ **Transparency** (confidence score, assumptions, verification needs)
- ✅ **Actions** (structured "next steps" for UIs)
- ✅ **Observability** (telemetry-ready metadata)

## Prerequisites

- **Node.js 18+** ([download](https://nodejs.org/))
- A JSON-producing AI system (LLM wrapper, agent, chatbot, etc.)

## Installation (2 minutes)

### Option A: CLI Validator

```bash
# Install globally
npm install -g human-experience-protocol

# Validate an HXP message
hxp validate your-message.json
```

### Option B: TypeScript Bindings

```bash
# From npm
npm install hxp-protocol

# From GitHub Packages
npm config set @caglarorhan:registry https://npm.pkg.github.com
npm install @caglarorhan/hxp-protocol
```

```typescript
import { HxpMessage, isHxpMessage } from 'hxp-protocol';

const msg: HxpMessage = {
  hxp: {
    version: '1.0.0',
    intent: 'explain',
    delivery: { verbosity: 'medium' },
    transparency: { confidence: 0.85 },
    actions: []
  },
  content: 'Your AI response here...'
};

console.log(isHxpMessage(msg)); // true
```

### Option C: Just Use the Schema

No dependencies needed — validate with any JSON Schema library:

```bash
# Python
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

## Step-by-Step Integration

### Step 1: Choose a Compliance Level

| Level            | What to include                              | When to use          |
|------------------|----------------------------------------------|----------------------|
| **HXP-Core**     | version, intent, delivery.verbosity, confidence, actions | MVP / prototyping    |
| **HXP-Standard** | Core + format, tone, cognition, negotiation  | Production           |
| **HXP-Full**     | Standard + refusal, safety, extensions       | Enterprise/regulated |

**Start with HXP-Core.** You can always add fields later (they're backward-compatible).

### Step 2: Wrap Your AI Output

Before:
```json
{
  "response": "Here are 5 ideas for your landing page..."
}
```

After (HXP-Core):
```json
{
  "hxp": {
    "version": "1.0.0",
    "intent": "brainstorm",
    "delivery": { "verbosity": "low" },
    "transparency": { "confidence": 0.62 },
    "actions": [
      { "type": "generate_variant", "label": "Give 10 more ideas" }
    ]
  },
  "content": "Here are 5 ideas for your landing page..."
}
```

### Step 3: Use the Metadata

**In your UI:**
```javascript
// Show confidence badge
if (msg.hxp.transparency.confidence < 0.7) {
  showWarning("AI is less certain about this response");
}

// Render action buttons
msg.hxp.actions.forEach(action => {
  renderButton(action.label, () => handleAction(action.type));
});

// Adapt presentation
if (msg.hxp.delivery.verbosity === 'low') {
  renderCompact(msg.content);
}
```

**In your analytics:**
```javascript
// Log HXP telemetry
analytics.track('hxp_response', {
  intent: msg.hxp.intent,
  confidence: msg.hxp.transparency.confidence,
  cogLoad: msg.hxp.cognition?.load,
  actionCount: msg.hxp.actions.length
});
```

### Step 4: Validate

```bash
# Validate a single file
hxp validate my-response.json

# Validate all examples
npm run validate
```

## Example Envelopes

| File | Level | Intent | What it shows |
|------|-------|--------|---------------|
| [`explain.standard.json`](examples/explain.standard.json) | Standard | explain | Full delivery + cognition |
| [`debug.standard.json`](examples/debug.standard.json) | Standard | debug | Negotiation + clarifying questions |
| [`refusal.standard.json`](examples/refusal.standard.json) | Full | refuse | Safety + refusal metadata |
| [`brainstorm.core.json`](examples/brainstorm.core.json) | Core | brainstorm | Minimal valid envelope |

## Common Patterns

### Express Uncertainty
```json
{
  "transparency": {
    "confidence": 0.45,
    "verification_needed": true,
    "assumptions": ["Assuming you're using v3.x of the library"],
    "limits": ["I don't have access to your config file"]
  }
}
```

### Structured Refusal
```json
{
  "intent": "refuse",
  "refusal": {
    "type": "capability",
    "severity": "soft",
    "redirect_available": true
  }
}
```

### Domain Extensions
```json
{
  "extensions": {
    "medical": { "evidence_level": "meta-analysis", "disclaimer": true },
    "vendor.acme": { "model_id": "acme-v3" }
  }
}
```

## Next Steps

- 📖 Read the full [Specification](SPEC.md)
- 📐 Browse the [JSON Schema](schema/hxp.schema.json)
- 💡 Open an [issue](https://github.com/caglarorhan/Human-eXperience-Protocol/issues) with questions
- 🤝 See [CONTRIBUTING.md](CONTRIBUTING.md) to help improve HXP
