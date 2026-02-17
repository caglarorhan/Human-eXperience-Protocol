# Contributing to HXP

Thank you for your interest in improving the Human eXperience Protocol!

## Principles

- **Keep HXP small and implementable.** Every field must earn its place.
- **Prefer additive changes** (backward compatible) over breaking ones.
- **Avoid vendor lock-in.** HXP is model- and transport-agnostic by design.
- **Extensions must be namespaced and documented.** Core stays clean.

## How to Contribute

### 1. Open an Issue

Start by describing your proposal in an issue. Include:

- **Motivation** — what problem does this solve?
- **Example payloads** — show before/after HXP messages.
- **Compatibility impact** — does this break existing consumers?

### 2. Discussion

Maintainers and community will review and refine the proposal. We aim for rough consensus documented in the issue.

### 3. Submit a Pull Request

If the proposal is accepted, submit a PR updating:

- `SPEC.md` — normative field definitions
- `schema/hxp.schema.json` — JSON Schema
- `examples/` — add or update examples if relevant
- `bindings/typescript/src/index.ts` — TypeScript types
- `CHANGELOG.md` — document the change

### 4. Review & Merge

- At least one maintainer must approve.
- CI checks (schema validation, TypeScript build) must pass.
- Breaking changes require a **major version bump**.

## Commit Convention

Use clear, descriptive commit messages:

```
feat: add hxp.cognition.chunking field
fix: correct confidence range in schema
docs: clarify intent registry recommendations
```

## Code of Conduct

All participants must follow the [Code of Conduct](CODE_OF_CONDUCT.md).
