import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJSON(p) {
  const abs = path.resolve(p);
  return JSON.parse(fs.readFileSync(abs, 'utf-8'));
}

function validateFile(instancePath) {
  // Load schema from package directory, not cwd
  const schemaPath = path.join(__dirname, '..', 'schema', 'hxp.schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  const instance = loadJSON(instancePath);

  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const ok = validate(instance);
  if (ok) {
    console.log(`✓ valid: ${instancePath}`);
    process.exit(0);
  } else {
    console.error(`✗ invalid: ${instancePath}`);
    console.error(validate.errors);
    process.exit(1);
  }
}

// Support glob-like usage: validate all JSON files in a directory
const arg = process.argv[2];
if (!arg) {
  console.error('Usage: node src/validate.js <path/to/hxp-message.json>');
  process.exit(2);
}

// If arg contains *, expand it (basic glob support)
if (arg.includes('*')) {
  const dir = path.dirname(arg);
  const pattern = path.basename(arg);
  const ext = path.extname(pattern);
  const files = fs.readdirSync(dir).filter(f => f.endsWith(ext));
  let allValid = true;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'schema', 'hxp.schema.json'), 'utf-8'));
    const instance = loadJSON(filePath);

    const ajv = new Ajv2020({ allErrors: true, strict: false });
    addFormats(ajv);

    const validate = ajv.compile(schema);
    const ok = validate(instance);
    if (ok) {
      console.log(`✓ valid: ${filePath}`);
    } else {
      console.error(`✗ invalid: ${filePath}`);
      console.error(validate.errors);
      allValid = false;
    }
  }

  process.exit(allValid ? 0 : 1);
} else {
  validateFile(arg);
}
