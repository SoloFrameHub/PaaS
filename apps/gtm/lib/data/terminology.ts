/**
 * Terminology Helper for Dual-Context Support
 * 
 * This utility helps switch terms between B2B SaaS context and Creator/Course context.
 * It ensures the UI speaks the user's language.
 */

export type UserContext = 'b2b' | 'creator';

export const TERMINOLOGY = {
    customer: {
        b2b: "Customer",
        creator: "Student"
    },
    customers: {
        b2b: "Customers",
        creator: "Students"
    },
    lead: {
        b2b: "Lead",
        creator: "Subscriber"
    },
    leads: {
        b2b: "Leads",
        creator: "Subscribers"
    },
    pipeline: {
        b2b: "Pipeline",
        creator: "Interest List"
    },
    deal: {
        b2b: "Deal",
        creator: "Sale"
    },
    arr: {
        b2b: "ARR",
        creator: "Annual Revenue"
    },
    sales_call: {
        b2b: "Sales Call",
        creator: "Discovery Chat"
    },
    demo: {
        b2b: "Demo",
        creator: "Course Preview"
    },
    contract: {
        b2b: "Contract",
        creator: "Checkout"
    },
    marketing: {
        b2b: "Marketing",
        creator: "Content"
    },
    buyer: {
        b2b: "Buyer",
        creator: "Member"
    },
    stakeholder: {
        b2b: "Stakeholder",
        creator: "Fan"
    },
    champion: {
        b2b: "Champion",
        creator: "Superfan"
    }
} as const;

export type TermKey = keyof typeof TERMINOLOGY;

/**
 * Get the appropriate term based on the user's context.
 * @param term - The key of the term to translate (e.g., 'customer', 'pipeline')
 * @param context - The user's context ('b2b' or 'creator')
 * @returns The translated term
 */
export function getTerm(term: TermKey, context: UserContext = 'b2b'): string {
    const entry = TERMINOLOGY[term];
    if (!entry) return term; // Fallback if key missing
    return entry[context];
}

/**
 * Helper to get a capital case term
 */
export function getTermCap(term: TermKey, context: UserContext = 'b2b'): string {
    const val = getTerm(term, context);
    return val.charAt(0).toUpperCase() + val.slice(1);
}
