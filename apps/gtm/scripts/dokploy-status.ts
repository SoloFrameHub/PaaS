#!/usr/bin/env npx tsx
/**
 * Dokploy Status Check Script
 * Shows current state of all Dokploy projects, applications, and services.
 *
 * Usage: npx tsx scripts/dokploy-status.ts
 */

const DOKPLOY_API = process.env.DOKPLOY_API_URL || 'http://46.202.88.248:3000/api';
const DOKPLOY_KEY = process.env.DEPLOY_API_KEY;

if (!DOKPLOY_KEY) {
  console.error('ERROR: DEPLOY_API_KEY not set. Add it to .env.local or set it as env var.');
  process.exit(1);
}

async function dokployGet(endpoint: string) {
  const res = await fetch(`${DOKPLOY_API}/${endpoint}`, {
    headers: { 'x-api-key': DOKPLOY_KEY! },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  console.log('='.repeat(60));
  console.log('Dokploy Status Report');
  console.log('='.repeat(60));

  const projects = await dokployGet('project.all');

  for (const project of projects) {
    console.log(`\n📁 Project: ${project.name} (${project.projectId})`);
    if (project.description) console.log(`   ${project.description}`);

    for (const env of project.environments || []) {
      // Applications
      for (const app of env.applications || []) {
        const status = app.applicationStatus || 'unknown';
        const icon = status === 'done' ? '✅' : status === 'running' ? '🟢' : '⚪';
        console.log(`   ${icon} App: ${app.name} [${status}]`);
        console.log(`      Container: ${app.appName}`);
        console.log(`      Build: ${app.buildType}`);
        console.log(`      Source: ${app.sourceType} ${app.customGitUrl || app.repository || '(not configured)'}`);
        if (app.domains?.length) {
          for (const d of app.domains) {
            console.log(`      🌐 ${d.https ? 'https' : 'http'}://${d.host}`);
          }
        }
      }

      // Databases
      for (const pg of env.postgres || []) {
        const status = pg.applicationStatus || 'unknown';
        const icon = status === 'done' ? '✅' : status === 'running' ? '🟢' : '⚪';
        console.log(`   ${icon} PostgreSQL: ${pg.name} [${status}]`);
        console.log(`      Container: ${pg.appName}`);
        console.log(`      Image: ${pg.dockerImage}`);
      }

      for (const rd of env.redis || []) {
        const status = rd.applicationStatus || 'unknown';
        const icon = status === 'done' ? '✅' : status === 'running' ? '🟢' : '⚪';
        console.log(`   ${icon} Redis: ${rd.name} [${status}]`);
        console.log(`      Container: ${rd.appName}`);
      }

      // Compose services
      for (const comp of env.compose || []) {
        const status = comp.composeStatus || 'unknown';
        const icon = status === 'done' ? '✅' : status === 'running' ? '🟢' : '⚪';
        console.log(`   ${icon} Compose: ${comp.name} [${status}]`);
        console.log(`      Container prefix: ${comp.appName}`);
        console.log(`      Source: ${comp.sourceType}`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('End of Report');
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
