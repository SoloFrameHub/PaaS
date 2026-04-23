import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registry';
import './schemas'; // register common schemas
import { registerAllRoutes } from './routes';

let registered = false;

export function generateOpenAPIDocument() {
  if (!registered) {
    registerAllRoutes();
    registered = true;
  }

  const generator = new OpenApiGeneratorV31(registry.definitions);

  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'Wellness Academy API',
      version: '1.0.0',
      description: 'API for the Mental Health Education Platform — Wellness Academy. Session-based auth via Lucia, AI coaching via OpenRouter, content moderation on community features.',
    },
    servers: [
      {
        url: 'https://mental-health-education.soloframehub.com',
        description: 'Production',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local development',
      },
    ],
  });
}
