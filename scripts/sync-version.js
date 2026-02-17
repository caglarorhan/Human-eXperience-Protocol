#!/usr/bin/env node

/**
 * Version synchronization script
 * Reads version from package.json and updates all project files
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Read version from package.json
const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
const version = pkg.version;

console.log(`📦 Syncing version to ${version}...`);

// Update src/version.js
const versionFile = join(rootDir, 'src', 'version.js');
const versionContent = `/**
 * Single source of truth for HXP version
 * Updated automatically by scripts/sync-version.js
 */

export const HXP_VERSION = '${version}';
export const SCHEMA_VERSION = '1.0';
export const SPEC_VERSION = '${version}';
`;
writeFileSync(versionFile, versionContent);
console.log(`✓ Updated src/version.js`);

// Update SPEC.md version header
const specPath = join(rootDir, 'SPEC.md');
let spec = readFileSync(specPath, 'utf-8');
spec = spec.replace(/\*\*Version:\*\* \d+\.\d+\.\d+/, `**Version:** ${version}`);
writeFileSync(specPath, spec);
console.log(`✓ Updated SPEC.md`);

// Update bindings/typescript/package.json
const tsPackagePath = join(rootDir, 'bindings', 'typescript', 'package.json');
const tsPkg = JSON.parse(readFileSync(tsPackagePath, 'utf-8'));
tsPkg.version = version;
writeFileSync(tsPackagePath, JSON.stringify(tsPkg, null, 2) + '\n');
console.log(`✓ Updated bindings/typescript/package.json`);

console.log(`\n✅ All files synced to v${version}`);
