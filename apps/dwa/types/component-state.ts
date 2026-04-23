/**
 * Component Interaction State Types
 * Server-persisted state for inline MDX interactive components
 * (FlipCard, EnhancedAccordion, SlideNavigation, Checkin, InteractiveScenario,
 *  BodyMap, GuidedGrounding, CopingStrategyRanker, ExposureHierarchy,
 *  ExposureLog, ExposurePlanWorksheet)
 */

/** State for a single lesson's interactive component interactions */
export interface LessonComponentState {
  courseId: string;
  lessonId: string;
  flipCards: FlipCardState;
  accordions: AccordionState;
  slides: SlideState;
  /** Checkin component state keyed by question hash */
  checkins?: Record<string, { type: string; value: string | number }>;
  /** InteractiveScenario explored choice indices keyed by scenario hash */
  scenarios?: Record<string, number[]>;
  /** BodyMap selected region IDs keyed by component hash */
  bodyMaps?: Record<string, string[]>;
  /** GuidedGrounding exercise state keyed by component hash */
  groundingExercises?: Record<string, { step: number; inputs: string[][] }>;
  /** CopingStrategyRanker ordered strategy IDs keyed by component hash */
  copingRanker?: Record<string, string[]>;
  /** ExposureHierarchy fear items keyed by component hash */
  exposureHierarchy?: Record<string, Array<{ id: string; situation: string; suds: number }>>;
  /** ExposureLog entries keyed by component hash */
  exposureLogs?: Record<string, Array<{ id: string; date: string; situation: string; expected: string; peak: string; ending: string; learned: string }>>;
  /** ExposurePlanWorksheet data keyed by component hash */
  exposurePlans?: Record<string, { targetFear: string; motivation: string; steps: Array<{ situation: string; rating: string }>; firstExposure: string; schedule: string }>;
  updatedAt: string;
}

export interface FlipCardState {
  /** persistKeys of cards that have been flipped/reviewed */
  reviewed: string[];
}

export interface AccordionState {
  /** persistKeys of accordion sections that have been opened */
  opened: string[];
}

export interface SlideState {
  /** Map of persistKey -> slide progress */
  [persistKey: string]: {
    current: number;
    visited: number[];
  };
}

// ── API Types ──

export interface ComponentStateLoadResponse {
  state: LessonComponentState | null;
}

export interface ComponentStateSaveRequest {
  flipCards?: FlipCardState;
  accordions?: AccordionState;
  slides?: SlideState;
  checkins?: Record<string, { type: string; value: string | number }>;
  scenarios?: Record<string, number[]>;
  bodyMaps?: Record<string, string[]>;
  groundingExercises?: Record<string, { step: number; inputs: string[][] }>;
  copingRanker?: Record<string, string[]>;
  exposureHierarchy?: Record<string, Array<{ id: string; situation: string; suds: number }>>;
  exposureLogs?: Record<string, Array<{ id: string; date: string; situation: string; expected: string; peak: string; ending: string; learned: string }>>;
  exposurePlans?: Record<string, { targetFear: string; motivation: string; steps: Array<{ situation: string; rating: string }>; firstExposure: string; schedule: string }>;
}

export interface ComponentStateSaveResponse {
  state: LessonComponentState;
}
