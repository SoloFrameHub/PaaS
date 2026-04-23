// CLI entrypoint for the tenant-leak harness. Mirrors the invocations from
// test/harness.test.ts but without vitest — the ops-runner container runs
// this directly via tsx so the harness doesn't depend on dev-only test
// tooling (and the pre-flight + integration pieces both run in one pass
// against TEST_DATABASE_URL).
//
// Exits 0 on success. Exits 1 on any assertion failure or unexpected error.
// stdout is a single JSON line with the result + verdict — easy to grep,
// easy to decode from system_audit.meta.out_b64.

import { TenancyError } from '@platform/tenancy';
import { __closePool } from '@platform/tenancy/internal';

import { tenantLeakHarness } from './tenantLeakHarness.js';

interface Verdict {
  ok: boolean;
  reason?: string;
  preflightThrew: boolean;
  result?: Awaited<ReturnType<typeof tenantLeakHarness>>;
}

async function preflight(): Promise<boolean> {
  const prev = process.env.TEST_DATABASE_URL;
  delete process.env.TEST_DATABASE_URL;
  try {
    await tenantLeakHarness();
    return false;
  } catch (err) {
    return err instanceof TenancyError;
  } finally {
    if (prev !== undefined) process.env.TEST_DATABASE_URL = prev;
  }
}

async function main(): Promise<void> {
  const verdict: Verdict = { ok: false, preflightThrew: false };
  try {
    verdict.preflightThrew = await preflight();
    if (!verdict.preflightThrew) {
      verdict.reason = 'pre-flight: tenantLeakHarness() did not throw when TEST_DATABASE_URL was unset';
      process.stdout.write(JSON.stringify(verdict) + '\n');
      process.exit(1);
    }

    if (!process.env.TEST_DATABASE_URL) {
      verdict.reason = 'TEST_DATABASE_URL not set — integration harness skipped';
      process.stdout.write(JSON.stringify(verdict) + '\n');
      process.exit(1);
    }

    const result = await tenantLeakHarness();
    verdict.result = result;

    const reasons: string[] = [];
    if (result.crossReadRows !== 0) reasons.push(`crossReadRows=${result.crossReadRows}`);
    if (result.crossWriteDenied !== true) reasons.push('crossWriteDenied=false');
    if (result.resolverMatched !== true) reasons.push('resolverMatched=false');
    if (result.tenantA === result.tenantB) reasons.push('tenantA==tenantB');
    if (result.slugA === result.slugB) reasons.push('slugA==slugB');

    verdict.ok = reasons.length === 0;
    if (!verdict.ok) verdict.reason = reasons.join(', ');

    process.stdout.write(JSON.stringify(verdict) + '\n');
    process.exit(verdict.ok ? 0 : 1);
  } catch (err) {
    verdict.reason = `unexpected: ${err instanceof Error ? err.message : String(err)}`;
    process.stdout.write(JSON.stringify(verdict) + '\n');
    process.exit(1);
  } finally {
    try {
      await __closePool();
    } catch {
      // pool may not have been opened; swallow.
    }
  }
}

void main();
