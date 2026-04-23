/**
 * Visual diagrams for lesson content, replacing ASCII art code blocks.
 * Rendered via MDXRemote components map in the lesson page.
 */

/** Animated box breathing diagram — anxiety-management lesson 4 */
export function BoxBreathingDiagram() {
  return (
    <figure className="my-10 not-prose" role="img" aria-label="Box breathing: breathe in 4 seconds, hold 4 seconds, breathe out 4 seconds, hold 4 seconds">
      <div className="max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/40 border border-teal-200/80 dark:border-teal-800/60 p-4 sm:p-6 shadow-sm">
        <svg viewBox="0 0 320 340" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="bb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,1 L10,5 L0,9 Z" className="fill-teal-400 dark:fill-teal-600" />
            </marker>
          </defs>

          {/* The square */}
          <rect x="80" y="80" width="160" height="160" rx="12"
            className="fill-none stroke-teal-300 dark:stroke-teal-700" strokeWidth="2.5" />

          {/* Direction arrows outside the square */}
          <path d="M120,68 L200,68" className="fill-none stroke-teal-400 dark:stroke-teal-600" strokeWidth="1.5" markerEnd="url(#bb-arrow)" />
          <path d="M252,120 L252,200" className="fill-none stroke-teal-400 dark:stroke-teal-600" strokeWidth="1.5" markerEnd="url(#bb-arrow)" />
          <path d="M200,252 L120,252" className="fill-none stroke-teal-400 dark:stroke-teal-600" strokeWidth="1.5" markerEnd="url(#bb-arrow)" />
          <path d="M68,200 L68,120" className="fill-none stroke-teal-400 dark:stroke-teal-600" strokeWidth="1.5" markerEnd="url(#bb-arrow)" />

          {/* Top: BREATHE IN */}
          <text x="160" y="42" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="0.05em" className="fill-teal-700 dark:fill-teal-300">BREATHE IN</text>
          <text x="160" y="56" textAnchor="middle" fontSize="10" className="fill-teal-500">4 seconds</text>

          {/* Right: HOLD */}
          <text x="284" y="164" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="0.05em" className="fill-teal-700 dark:fill-teal-300" transform="rotate(90,284,160)">HOLD</text>
          <text x="270" y="164" textAnchor="middle" fontSize="10" className="fill-teal-500" transform="rotate(90,270,160)">4 seconds</text>

          {/* Bottom: BREATHE OUT */}
          <text x="160" y="296" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="0.05em" className="fill-teal-700 dark:fill-teal-300">BREATHE OUT</text>
          <text x="160" y="282" textAnchor="middle" fontSize="10" className="fill-teal-500">4 seconds</text>

          {/* Left: HOLD */}
          <text x="36" y="164" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="0.05em" className="fill-teal-700 dark:fill-teal-300" transform="rotate(-90,36,160)">HOLD</text>
          <text x="50" y="164" textAnchor="middle" fontSize="10" className="fill-teal-500" transform="rotate(-90,50,160)">4 seconds</text>

          {/* Animated breathing indicator — traces the square path */}
          <circle r="10" className="fill-teal-500" opacity="0.9">
            <animateMotion dur="16s" repeatCount="indefinite" path="M80,80 L240,80 L240,240 L80,240 Z" />
          </circle>
          <circle r="20" className="fill-teal-400" opacity="0.15">
            <animateMotion dur="16s" repeatCount="indefinite" path="M80,80 L240,80 L240,240 L80,240 Z" />
          </circle>
        </svg>
      </div>
    </figure>
  )
}

/** CBT Triangle diagram — anxiety-management lesson 3 */
export function CBTTriangleDiagram() {
  return (
    <figure className="my-10 not-prose" role="img" aria-label="CBT Triangle: Thoughts, Feelings, and Behaviors influence each other">
      <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-b from-indigo-50 via-purple-50 to-rose-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-rose-950/30 border border-indigo-200/80 dark:border-indigo-800/60 p-4 sm:p-6 shadow-sm">
        <svg viewBox="0 0 400 320" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="cbt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,1 L10,5 L0,9 Z" className="fill-gray-400 dark:fill-gray-500" />
            </marker>
          </defs>

          {/* Triangle edges with bidirectional arrows */}
          {/* Left edge: Thoughts ↔ Feelings */}
          <line x1="170" y1="72" x2="82" y2="228" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#cbt-arrow)" />
          <line x1="92" y1="212" x2="176" y2="62" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#cbt-arrow)" />

          {/* Right edge: Thoughts ↔ Behaviors */}
          <line x1="230" y1="72" x2="318" y2="228" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#cbt-arrow)" />
          <line x1="308" y1="212" x2="224" y2="62" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#cbt-arrow)" />

          {/* Bottom edge: Feelings ↔ Behaviors */}
          <line x1="110" y1="254" x2="278" y2="254" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#cbt-arrow)" />
          <line x1="290" y1="246" x2="122" y2="246" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="2" markerEnd="url(#cbt-arrow)" />

          {/* THOUGHTS vertex — top center */}
          <circle cx="200" cy="44" r="34" className="fill-indigo-100 dark:fill-indigo-900/50 stroke-indigo-400 dark:stroke-indigo-600" strokeWidth="2" />
          <text x="200" y="40" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="0.04em" className="fill-indigo-700 dark:fill-indigo-300">THOUGHTS</text>
          <text x="200" y="53" textAnchor="middle" fontSize="8" className="fill-indigo-500 dark:fill-indigo-400">what you think</text>

          {/* FEELINGS vertex — bottom left */}
          <circle cx="68" cy="250" r="34" className="fill-rose-100 dark:fill-rose-900/50 stroke-rose-400 dark:stroke-rose-600" strokeWidth="2" />
          <text x="68" y="246" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="0.04em" className="fill-rose-700 dark:fill-rose-300">FEELINGS</text>
          <text x="68" y="259" textAnchor="middle" fontSize="8" className="fill-rose-500 dark:fill-rose-400">what you feel</text>

          {/* BEHAVIORS vertex — bottom right */}
          <circle cx="332" cy="250" r="34" className="fill-emerald-100 dark:fill-emerald-900/50 stroke-emerald-400 dark:stroke-emerald-600" strokeWidth="2" />
          <text x="332" y="246" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="0.04em" className="fill-emerald-700 dark:fill-emerald-300">BEHAVIORS</text>
          <text x="332" y="259" textAnchor="middle" fontSize="8" className="fill-emerald-500 dark:fill-emerald-400">what you do</text>

          {/* Edge labels */}
          <text x="116" y="148" textAnchor="middle" fontSize="9" className="fill-gray-400 dark:fill-gray-500" fontStyle="italic" transform="rotate(-56,116,148)">influence</text>
          <text x="284" y="148" textAnchor="middle" fontSize="9" className="fill-gray-400 dark:fill-gray-500" fontStyle="italic" transform="rotate(56,284,148)">influence</text>
          <text x="200" y="272" textAnchor="middle" fontSize="9" className="fill-gray-400 dark:fill-gray-500" fontStyle="italic">influence</text>
        </svg>
      </div>
    </figure>
  )
}

/** Thought → Feeling → Behavior flow diagram — depression-action lesson 5 */
export function ThoughtFlowDiagram() {
  return (
    <figure className="my-10 not-prose" role="img" aria-label="Flow: Situation leads to Automatic Thought, then Emotional Reaction, then Behavioral Response, which reinforces thoughts">
      <div className="max-w-xs mx-auto rounded-2xl bg-gradient-to-b from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border border-violet-200/80 dark:border-violet-800/60 p-4 sm:p-6 shadow-sm">
        <svg viewBox="0 0 240 400" className="w-full" xmlns="http://www.w3.org/2000/svg">
          {/* Step 1: Situation */}
          <rect x="20" y="10" width="200" height="44" rx="10" className="fill-gray-100 dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600" strokeWidth="1.5" />
          <text x="120" y="37" textAnchor="middle" fontSize="13" fontWeight="700" className="fill-gray-700 dark:fill-gray-300">SITUATION</text>

          {/* Arrow 1→2 */}
          <line x1="120" y1="54" x2="120" y2="78" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" />
          <polygon points="114,74 120,84 126,74" className="fill-gray-400 dark:fill-gray-500" />

          {/* Step 2: Automatic Thought */}
          <rect x="10" y="84" width="220" height="56" rx="10" className="fill-amber-100 dark:fill-amber-900/40 stroke-amber-300 dark:stroke-amber-700" strokeWidth="1.5" />
          <text x="120" y="108" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-amber-800 dark:fill-amber-200">AUTOMATIC THOUGHT</text>
          <text x="120" y="126" textAnchor="middle" fontSize="10" fontStyle="italic" className="fill-amber-600 dark:fill-amber-400">(Often unconscious)</text>

          {/* Arrow 2→3 */}
          <line x1="120" y1="140" x2="120" y2="164" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" />
          <polygon points="114,160 120,170 126,160" className="fill-gray-400 dark:fill-gray-500" />

          {/* Step 3: Emotional Reaction */}
          <rect x="10" y="170" width="220" height="44" rx="10" className="fill-rose-100 dark:fill-rose-900/40 stroke-rose-300 dark:stroke-rose-700" strokeWidth="1.5" />
          <text x="120" y="197" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-rose-800 dark:fill-rose-200">EMOTIONAL REACTION</text>

          {/* Arrow 3→4 */}
          <line x1="120" y1="214" x2="120" y2="238" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" />
          <polygon points="114,234 120,244 126,234" className="fill-gray-400 dark:fill-gray-500" />

          {/* Step 4: Behavioral Response */}
          <rect x="5" y="244" width="230" height="44" rx="10" className="fill-blue-100 dark:fill-blue-900/40 stroke-blue-300 dark:stroke-blue-700" strokeWidth="1.5" />
          <text x="120" y="271" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-blue-800 dark:fill-blue-200">BEHAVIORAL RESPONSE</text>

          {/* Arrow 4→5 */}
          <line x1="120" y1="288" x2="120" y2="312" className="stroke-gray-400 dark:stroke-gray-500" strokeWidth="1.5" />
          <polygon points="114,308 120,318 126,308" className="fill-gray-400 dark:fill-gray-500" />

          {/* Step 5: Reinforces thoughts */}
          <rect x="20" y="318" width="200" height="44" rx="10" className="fill-gray-100 dark:fill-gray-800 stroke-gray-300 dark:stroke-gray-600" strokeWidth="1.5" strokeDasharray="5,3" />
          <text x="120" y="344" textAnchor="middle" fontSize="11" fontStyle="italic" className="fill-gray-500 dark:fill-gray-400">(Reinforces thoughts)</text>

          {/* Curved loop-back arrow from step 5 to step 1 */}
          <path d="M20,340 C-20,340 -20,32 20,32" className="fill-none stroke-gray-300 dark:stroke-gray-600" strokeWidth="1.5" strokeDasharray="4,3" />
          <polygon points="16,36 24,28 26,40" className="fill-gray-300 dark:fill-gray-600" />
        </svg>
      </div>
    </figure>
  )
}
