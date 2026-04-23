/**
 * @deprecated Trigger.dev has been deprecated due to high API costs.
 * Background jobs are now handled by n8n workflows at n8n.soloframehub.com.
 * This file is kept for reference but should not be used for new features.
 * TODO: Remove this file and @trigger.dev/sdk from package.json once
 * all background job logic has been migrated to n8n.
 */
import { configure, tasks } from "@trigger.dev/sdk/v3";

const TRIGGER_SECRET_KEY = process.env.TRIGGER_SECRET_KEY;

if (TRIGGER_SECRET_KEY) {
  configure({ secretKey: TRIGGER_SECRET_KEY });
}

/**
 * Trigger the persona delayed response task.
 * Fires-and-forgets — the Trigger.dev worker handles the delay and execution.
 */
export async function triggerPersonaResponse(payload: {
  personaId: string;
  podId: string;
  threadId: number;
}): Promise<void> {
  if (!TRIGGER_SECRET_KEY) {
    console.warn(
      "[trigger] TRIGGER_SECRET_KEY not set, skipping persona trigger",
    );
    return;
  }

  await tasks.trigger("caa-persona-delayed-response", payload);
}
