import { OpenAPIRegistry, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

// Extend Zod globally — must run before any .openapi() calls
extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();
