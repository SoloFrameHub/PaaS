/**
 * Check the status of a Trigger.dev run.
 * Run with: TRIGGER_SECRET_KEY=tr_dev_... npx tsx trigger/check-run.ts <run-id>
 */
import { runs } from "@trigger.dev/sdk/v3";

async function main() {
  const runId = process.argv[2] || "run_cmm19k8iudlhc0uogbgamg2ls";
  const run = await runs.retrieve(runId);
  console.log(JSON.stringify({
    id: run.id,
    status: run.status,
    taskIdentifier: run.taskIdentifier,
    startedAt: run.startedAt,
    finishedAt: run.finishedAt,
    output: run.output,
    error: run.error,
    isCompleted: run.isCompleted,
    isSuccess: run.isSuccess,
  }, null, 2));
}

main().catch(console.error);
