import { FounderCategory as BaseFounderCategory } from './FounderCategory'
import { Industry as BaseIndustry } from './Industry'
import { ClientRole as BaseClientRole } from './ClientRole'
import { DiscPattern as BaseDiscPattern } from './DiscPattern'

// Extend interfaces with index signatures for Record compatibility
export interface FounderCategory extends BaseFounderCategory { [k: string]: unknown }
export interface Industry extends BaseIndustry { [k: string]: unknown }
export interface ClientRole extends BaseClientRole { [k: string]: unknown }
export interface DiscPattern extends BaseDiscPattern { [k: string]: unknown }

import { RagSignals } from '../profile'

export interface RoleplayContext {
    founder: FounderCategory;
    industry: Industry;
    clientRole: ClientRole;
    discPattern: DiscPattern;
    scenario: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    ragSignals?: RagSignals | null;
    /** Locale for cultural context injection (es = LatAm Spanish) */
    locale?: 'en' | 'es';
    /** Country code for country-variant prompt modifiers (CO, MX, CL, AR) */
    countryCode?: string;
}
