# v1.0.0 — Initial Public Release

🎉 **First official release of the Human eXperience Protocol (HXP)**

A lightweight, model-agnostic metadata protocol that standardizes how AI systems communicate with humans.

## ✨ Features

### Core Protocol
- **JSON Schema v1.0** — Complete schema for validating HXP messages (draft 2020-12)
- **Full Specification** — RFC-style normative document with MUST/SHOULD/MAY language
- **Three Compliance Levels** — HXP-Core, HXP-Standard, HXP-Full

### 💻 CLI Tools
```bash
npm install -g human-experience-protocol

hxp validate message.json
```

### 📐 TypeScript Bindings
```bash
# From npm
npm install hxp-protocol

# From GitHub Packages
npm config set @caglarorhan:registry https://npm.pkg.github.com
npm install @caglarorhan/hxp-protocol
```
- Full type definitions for all HXP envelope fields
- `isHxpMessage()` runtime type guard for HXP-Core compliance

### 📄 Example Envelopes
- `explain.standard.json` — HXP-Standard explanation
- `debug.standard.json` — HXP-Standard debugging with negotiation
- `refusal.standard.json` — HXP-Full refusal with safety metadata
- `brainstorm.core.json` — HXP-Core minimal brainstorm

## 📦 Installation

### From npm
```bash
npm install -g human-experience-protocol
```

### From GitHub Packages
```bash
npm config set @caglarorhan:registry https://npm.pkg.github.com
npm install -g @caglarorhan/human-experience-protocol
```

## 🔗 Links

- **GitHub:** https://github.com/caglarorhan/Human-eXperience-Protocol
- **GitHub Release:** https://github.com/caglarorhan/Human-eXperience-Protocol/releases/tag/v1.0.0
- **npm (CLI):** https://www.npmjs.com/package/human-experience-protocol
- **npm (TypeScript bindings):** https://www.npmjs.com/package/hxp-protocol
- **GitHub Packages (CLI):** https://github.com/caglarorhan/Human-eXperience-Protocol/packages
- **GitHub Packages (TypeScript bindings):** https://github.com/caglarorhan/Human-eXperience-Protocol/packages
- **Specification:** [SPEC.md](SPEC.md)
- **Schema:** [schema/hxp.schema.json](schema/hxp.schema.json)

## 📝 License

MIT
