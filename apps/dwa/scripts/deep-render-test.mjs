/**
 * Deep render test: compiles every lesson's MDX with the ACTUAL component stubs
 * that match what page.tsx registers. This catches:
 * - MDX syntax errors
 * - Unregistered components (capitalized tags not in the map)
 * - Props type mismatches that cause JSX compilation errors
 */
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createElement } from 'react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '..', 'server', 'data', 'content');

// Stub components that mirror EXACTLY what page.tsx registers
// Each returns a simple div so React rendering succeeds
const stub = (name) => {
  const Component = (props) => createElement('div', { 'data-component': name }, props.children || null);
  Component.displayName = name;
  return Component;
};

const COMPONENTS = {
  BoxBreathingDiagram: stub('BoxBreathingDiagram'),
  CBTTriangleDiagram: stub('CBTTriangleDiagram'),
  ThoughtFlowDiagram: stub('ThoughtFlowDiagram'),
  InteractiveBreathingExercise: stub('InteractiveBreathingExercise'),
  ExposureHierarchyBuilder: stub('ExposureHierarchyBuilder'),
  CopingStrategyRanker: stub('CopingStrategyRanker'),
  MindfulnessTimer: stub('MindfulnessTimer'),
  Checkin: stub('Checkin'),
  ExposureLog: stub('ExposureLog'),
  ExposurePlanWorksheet: stub('ExposurePlanWorksheet'),
  ToolkitCard: stub('ToolkitCard'),
  Callout: stub('Callout'),
  InsightGrid: stub('InsightGrid'),
  InsightItem: stub('InsightItem'),
  StepByStep: stub('StepByStep'),
  Step: stub('Step'),
  ScenarioCard: stub('ScenarioCard'),
  FlipCard: stub('FlipCard'),
  EnhancedAccordion: stub('EnhancedAccordion'),
  AccordionItem: stub('AccordionItem'),
  SlideNavigation: stub('SlideNavigation'),
  Slide: stub('Slide'),
  InteractiveScenario: stub('InteractiveScenario'),
  Choice: stub('Choice'),
  BodyMap: stub('BodyMap'),
  GuidedGrounding: stub('GuidedGrounding'),
  ThoughtRecord: stub('ThoughtRecord'),
  Checklist: stub('Checklist'),
  TrackingLog: stub('TrackingLog'),
  LikertAssessment: stub('LikertAssessment'),
};

function walkDir(dir) {
  const items = fs.readdirSync(dir);
  const files = [];
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) files.push(...walkDir(fullPath));
    else if (item.endsWith('.md')) files.push(fullPath);
  }
  return files;
}

function extractContent(raw) {
  // Simple frontmatter extraction
  if (raw.startsWith('---')) {
    const end = raw.indexOf('---', 3);
    if (end !== -1) {
      return raw.slice(end + 3).trim();
    }
  }
  return raw;
}

async function testFile(filePath) {
  const rel = path.relative(contentDir, filePath);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const content = extractContent(raw);

    await compileMDX({
      source: content,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
      components: COMPONENTS,
    });
    return null;
  } catch (err) {
    return { file: rel, error: err.message.substring(0, 300) };
  }
}

async function main() {
  const files = walkDir(contentDir);
  console.log(`Deep render testing ${files.length} MDX files with full component map...\n`);

  const failures = [];
  let passed = 0;

  for (const f of files) {
    const result = await testFile(f);
    if (result) {
      failures.push(result);
      process.stdout.write('✗');
    } else {
      passed++;
      process.stdout.write('.');
    }
  }

  console.log('\n');

  if (failures.length > 0) {
    console.log(`\n❌ FAILURES (${failures.length}):\n`);
    for (const f of failures) {
      console.log(`  ${f.file}`);
      console.log(`    ${f.error}\n`);
    }
  }

  console.log(`\nResults: ${passed} passed, ${failures.length} failed out of ${files.length} files`);

  if (failures.length > 0) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
