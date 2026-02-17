# Contributing to Human eXperience Protocol

Thank you for your interest in contributing to HXP! 🎉

## How to Contribute

### 🐛 Reporting Bugs

1. Check [existing issues](https://github.com/caglarorhan/Human-eXperience-Protocol/issues) first
2. Open a new issue using the **Bug Report** template
3. Include: expected behavior, actual behavior, steps to reproduce

### 💡 Suggesting Features

1. Open an issue using the **Feature Request** template
2. Describe the use case and provide example HXP payloads
3. Assess compatibility impact (additive vs. breaking)
4. Be open to discussion and iteration

### 🔧 Submitting Code

1. **Fork** the repository
2. **Create a branch** for your change:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** with clear, focused commits
4. **Test** your changes:
   ```bash
   npm run validate
   ```
5. **Push** and open a **Pull Request**

### 📝 Documentation

Documentation improvements are always welcome! This includes:
- README enhancements
- SPEC.md clarifications
- Getting Started guide updates
- Code comments and JSDoc

## Principles

- **Keep HXP small and implementable.** Every field must earn its place.
- **Prefer additive changes** (backward compatible) over breaking ones.
- **Avoid vendor lock-in.** HXP is model- and transport-agnostic by design.
- **Extensions must be namespaced and documented.** Core stays clean.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/caglarorhan/Human-eXperience-Protocol.git
cd Human-eXperience-Protocol

# Install dependencies
npm install

# Validate example envelopes
npm run validate

# Build TypeScript bindings
npm run build:ts
```

## Code Style

- Use **ES Modules** (`import`/`export`)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and small

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add hxp.cognition.chunking field
fix: correct confidence range in schema
docs: clarify intent registry recommendations
refactor: simplify validator logic
```

Prefixes: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

## Pull Request Guidelines

- Keep PRs focused on a single change
- Update documentation if needed
- Ensure all validation passes
- Be responsive to feedback

## Schema Changes

Changes to `schema/hxp.schema.json` require:
1. Update `SPEC.md` with field definitions
2. Update TypeScript bindings in `bindings/typescript/src/index.ts`
3. Add/update examples if relevant
4. Ensure backward compatibility when possible
5. Bump version appropriately

## Version Management

**The version is defined in ONE place:** `package.json`

All other files are automatically synced using:

```bash
npm run version:sync
```

This updates:
- `src/version.js` (imported by CLI)
- `SPEC.md` version header
- `bindings/typescript/package.json`

### To Release a New Version

```bash
# Bump version and auto-sync all files
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# The postversion script will automatically:
# 1. Run version:sync
# 2. Create git tag
# 3. Push commits and tags

# Then publish
npm publish
```

**Note:** Example JSON files use protocol version `1.0.0`, which is the data format version, not the package version. This is intentional and should NOT be changed unless the protocol itself changes.

## Questions?

- Open a [Discussion](https://github.com/caglarorhan/Human-eXperience-Protocol/discussions) for questions
- Use [Issues](https://github.com/caglarorhan/Human-eXperience-Protocol/issues) for bugs/features

## Code of Conduct

All participants must follow the [Code of Conduct](CODE_OF_CONDUCT.md).

---

**Thank you for helping make HXP better!** 💙
