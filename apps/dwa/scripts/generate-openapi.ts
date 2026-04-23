import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { generateOpenAPIDocument } from '../lib/openapi/generator';

const doc = generateOpenAPIDocument();
const outputPath = resolve(__dirname, '..', 'public', 'openapi.json');
writeFileSync(outputPath, JSON.stringify(doc, null, 2));
console.log(`OpenAPI spec written to ${outputPath}`);
console.log(`Routes: ${Object.keys(doc.paths ?? {}).length} paths`);
