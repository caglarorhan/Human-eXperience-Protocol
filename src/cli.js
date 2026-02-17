#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawnSync } from 'child_process';
import { HXP_VERSION } from './version.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BANNER = `Human eXperience Protocol (HXP) v${HXP_VERSION}\nhttps://github.com/caglarorhan/Human-eXperience-Protocol\n`;

if (process.argv.includes('--version') || process.argv.includes('-v')) {
  console.log(BANNER);
  process.exit(0);
}

function run(script, args) {
  const scriptPath = join(__dirname, script);
  const res = spawnSync(process.execPath, [scriptPath, ...args], { stdio: 'inherit' });
  process.exitCode = res.status;
}

const [command, ...rest] = process.argv.slice(2);

switch (command) {
  case 'validate':
    run('validate.js', rest);
    break;
  default:
    console.log(BANNER);
    console.log('Usage: hxp <command> [options]\n');
    console.log('Commands:');
    console.log('  validate <file.json>   Validate an HXP message against the schema');
    console.log('  --version, -v          Show version');
    console.log('');
    if (command) {
      console.error(`Unknown command: ${command}`);
      process.exit(2);
    }
    break;
}
