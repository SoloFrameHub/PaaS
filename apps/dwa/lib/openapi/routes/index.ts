import { registerAuthRoutes } from './auth';
import { registerOnboardingRoutes } from './onboarding';
import { registerAcademyRoutes } from './academy';
import { registerAiRoutes } from './ai';
import { registerForumRoutes } from './forum';
import { registerHealthRoutes } from './health';

export function registerAllRoutes() {
  registerAuthRoutes();
  registerOnboardingRoutes();
  registerAcademyRoutes();
  registerAiRoutes();
  registerForumRoutes();
  registerHealthRoutes();
}
