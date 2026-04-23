import { describe, expect, it } from 'vitest';
import { parsePrompt } from '../src/parser.js';

describe('parsePrompt', () => {
  it('extracts frontmatter and body', () => {
    const raw = `---
task: coaching
model: openai/gpt-4o-mini
temperature: 0.5
vars:
  - userName
  - goal
evals:
  - tone_supportive
---
You are a coach. Hello {{userName}}.`;

    const { frontmatter, body } = parsePrompt(raw);
    expect(frontmatter.task).toBe('coaching');
    expect(frontmatter.model).toBe('openai/gpt-4o-mini');
    expect(frontmatter.temperature).toBe(0.5);
    expect(frontmatter.vars).toEqual(['userName', 'goal']);
    expect(frontmatter.evals).toEqual(['tone_supportive']);
    expect(body).toBe('You are a coach. Hello {{userName}}.');
  });

  it('handles bodies without frontmatter', () => {
    const { frontmatter, body } = parsePrompt('plain text');
    expect(frontmatter).toEqual({});
    expect(body).toBe('plain text');
  });

  it('coerces booleans and ints', () => {
    const { frontmatter } = parsePrompt(`---
on: true
off: false
n: 7
---
body`);
    expect(frontmatter.on).toBe(true);
    expect(frontmatter.off).toBe(false);
    expect(frontmatter.n).toBe(7);
  });
});
