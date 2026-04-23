# Lesson 1.1 Completion Plan
**Date**: October 24, 2025
**Status**: Critical gaps identified, comprehensive fix plan created

---

## PROBLEM SUMMARY

The lesson infrastructure is deployed but lacks **functional interactive elements**. APIs are connected but content/flows are missing.

### Critical Gaps Identified:

1. **Body Map Interactive Element**
   - ❌ SVG file not loading (shows "Loading..." placeholder)
   - ❌ No region data/content defined
   - ❌ Click handlers not implemented
   - ❌ Tab switching not functional

2. **Typebot Assessment**
   - ✅ API connection working
   - ❌ Flow is empty - needs assessment questions
   - ❌ Not actually collecting/storing responses

3. **Flowise AI Chat**
   - ❌ No actual connection - placeholder HTML only
   - ❌ sendToFlowise() function not implemented
   - ❌ No API endpoint configured

4. **Forms.io Knowledge Check**
   - ❌ Not implemented - placeholder only
   - ❌ No quiz questions defined
   - ❌ No scoring logic

5. **JavaScript Files Missing**
   - ❌ `shared-utilities.js` doesn't exist
   - ❌ `lesson-1-1-interactions.js` doesn't exist
   - ❌ `crisis-detection.js` doesn't exist
   - ❌ `main.js` doesn't exist

6. **Accordion Interactions**
   - ❌ `toggleAccordion()` function not defined
   - ❌ Science section accordions don't open/close

7. **Downloadable Resources**
   - ❌ PDF worksheets don't exist (placeholders)
   - ❌ Links lead nowhere

---

## COMPLETION STRATEGY

### Phase 1: Core JavaScript Functionality (1-2 hours)
**Priority**: CRITICAL - Nothing works without this

#### Task 1.1: Create shared-utilities.js
```javascript
// /anxiety-toolkit/js/shared-utilities.js
// Progress tracking
function updateProgress(percent) {
    const progressBar = document.getElementById('lesson-progress');
    if (progressBar) {
        progressBar.style.width = percent + '%';
    }
}

// Local storage helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Storage error:', e);
        return false;
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Storage error:', e);
        return null;
    }
}

// Accordion toggle
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.accordion-icon');
    const isOpen = content.style.display === 'block';
    
    // Close all accordions
    document.querySelectorAll('.accordion-content').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.accordion-icon').forEach(el => {
        el.textContent = '▼';
    });
    
    // Open this one if it was closed
    if (!isOpen) {
        content.style.display = 'block';
        icon.textContent = '▲';
    }
}

// Crisis detection keywords
const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die',
    'better off dead', 'hurt myself', 'self harm'
];

function detectCrisisLanguage(text) {
    const lowerText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
}

function showCrisisBanner() {
    const banner = document.getElementById('crisis-banner');
    if (banner) {
        banner.style.display = 'block';
        banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
```

#### Task 1.2: Create lesson-1-1-interactions.js with Body Map Data
```javascript
// /anxiety-toolkit/js/lesson-1-1-interactions.js

// Body map region data
const bodyMapData = {
    head: {
        title: "Head & Face",
        symptoms: [
            "Racing thoughts that won't stop",
            "Difficulty concentrating or focusing",
            "Tension headaches or migraines",
            "Jaw clenching or teeth grinding",
            "Dizziness or lightheadedness",
            "Feeling 'foggy' or disconnected"
        ],
        science: "Your prefrontal cortex (thinking brain) becomes less active during anxiety, while your amygdala (alarm center) takes over. This explains why it's hard to think clearly when anxious—your brain is literally hijacked by the threat response system.",
        why: "The amygdala activates in 23 milliseconds—faster than conscious thought. Blood flow shifts from your prefrontal cortex to survival centers, making logical thinking difficult. This is protective: in real danger, you need reflexes, not philosophy.",
        citation: "LeDoux, J. E. (2015). Anxious: Using the Brain to Understand and Treat Fear and Anxiety"
    },
    chest: {
        title: "Chest & Heart",
        symptoms: [
            "Rapid or pounding heartbeat",
            "Chest tightness or pressure",
            "Shortness of breath or feeling unable to get enough air",
            "Sharp pain in chest (often mistaken for heart attack)",
            "Feeling like you can't breathe deeply"
        ],
        science: "Your sympathetic nervous system releases adrenaline and noradrenaline, increasing heart rate to pump more oxygen-rich blood to muscles. This is your 'gas pedal' being pressed, preparing you for action.",
        why: "Your heart rate increases 20-50% during anxiety to deliver oxygen for fight-or-flight. While uncomfortable, this is your cardiovascular system doing exactly what it evolved to do: prepare you to escape danger.",
        citation: "Porges, S. W. (2011). The Polyvagal Theory: Neurophysiological Foundations of Emotions"
    },
    stomach: {
        title: "Stomach & Gut",
        symptoms: [
            "'Butterflies' or fluttering sensation",
            "Nausea or feeling sick",
            "Digestive upset or diarrhea",
            "Loss of appetite or stress eating",
            "Stomach pain or cramping"
        ],
        science: "Your enteric nervous system (100 million neurons in your gut) communicates directly with your brain via the vagus nerve. 95% of your body's serotonin is produced in your gut, creating a powerful bidirectional connection.",
        why: "During stress, blood flow diverts FROM digestion TO muscles, causing the uncomfortable gut feelings. Your gut-brain axis means anxiety signals travel both ways—stressed mind creates stressed gut, and vice versa.",
        citation: "Mayer, E. A. (2016). The Mind-Gut Connection"
    },
    hands: {
        title: "Hands & Arms",
        symptoms: [
            "Trembling or shaking hands",
            "Sweaty or clammy palms",
            "Tingling or numbness in fingers",
            "Muscle tension in arms",
            "Feeling weak or shaky"
        ],
        science: "Adrenaline causes peripheral vasoconstriction (blood vessel narrowing in extremities) and activates sweat glands. Fine motor control decreases as your body prioritizes gross motor movements for survival.",
        why: "Your body shunts blood from extremities to core and large muscles, causing the tingling/numbness. Shaking is muscle tension from adrenaline. Sweating helps regulate body temperature during expected physical exertion.",
        citation: "Sapolsky, R. M. (2004). Why Zebras Don't Get Ulcers"
    },
    legs: {
        title: "Legs & Feet",
        symptoms: [
            "Weak or wobbly legs ('jelly legs')",
            "Restlessness or unable to sit still",
            "Muscle tension or cramping",
            "Tingling or numbness in feet",
            "Urge to pace or move"
        ],
        science: "Blood flow increases to large leg muscles in preparation for running. Motor cortex activation creates the urge to move. Adrenaline causes muscle fiber contraction, leading to the characteristic 'jelly legs' feeling.",
        why: "Your legs are receiving maximum blood flow for fight-or-flight. The weakness you feel is actually your muscles being primed for action—they're READY to run, which feels unstable when you're trying to stand still.",
        citation: "Levine, P. A. (2010). In an Unspoken Voice: How the Body Releases Trauma"
    }
};

// Track explored regions
let exploredRegions = new Set();

// Initialize body map
function initializeBodyMap() {
    // Load SVG
    loadBodyMapSVG();
    
    // Set up tab switching
    document.querySelectorAll('.detail-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Load saved progress
    const saved = getFromStorage('body-map-progress');
    if (saved) {
        exploredRegions = new Set(saved.exploredRegions || []);
        updateExplorationProgress();
    }
}

function loadBodyMapSVG() {
    const container = document.getElementById('body-map-svg-container');
    if (!container) return;
    
    // Create inline SVG with clickable regions
    container.innerHTML = `
        <svg viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
            <!-- Body outline -->
            <ellipse cx="200" cy="100" rx="60" ry="80" fill="#f3f4f6" stroke="#4a90a4" stroke-width="2"/>
            
            <!-- Head region -->
            <circle cx="200" cy="80" r="45" fill="#fecaca" stroke="#4a90a4" stroke-width="2" 
                    class="body-region" data-region="head" style="cursor: pointer; transition: fill 0.3s;"
                    onmouseover="this.style.fill='#fca5a5'" onmouseout="this.style.fill='#fecaca'"
                    onclick="selectBodyRegion('head')"/>
            <text x="200" y="85" text-anchor="middle" fill="#991b1b" font-size="14" font-weight="bold">HEAD</text>
            
            <!-- Chest region -->
            <rect x="160" y="130" width="80" height="100" rx="10" fill="#fed7aa" stroke="#4a90a4" stroke-width="2"
                  class="body-region" data-region="chest" style="cursor: pointer; transition: fill 0.3s;"
                  onmouseover="this.style.fill='#fdba74'" onmouseout="this.style.fill='#fed7aa'"
                  onclick="selectBodyRegion('chest')"/>
            <text x="200" y="185" text-anchor="middle" fill="#9a3412" font-size="14" font-weight="bold">CHEST</text>
            
            <!-- Stomach region -->
            <ellipse cx="200" cy="270" rx="70" ry="50" fill="#fef3c7" stroke="#4a90a4" stroke-width="2"
                     class="body-region" data-region="stomach" style="cursor: pointer; transition: fill 0.3s;"
                     onmouseover="this.style.fill='#fde68a'" onmouseout="this.style.fill='#fef3c7'"
                     onclick="selectBodyRegion('stomach')"/>
            <text x="200" y="275" text-anchor="middle" fill="#92400e" font-size="14" font-weight="bold">STOMACH</text>
            
            <!-- Hands/Arms regions -->
            <ellipse cx="120" cy="200" rx="20" ry="60" fill="#d9f99d" stroke="#4a90a4" stroke-width="2"
                     class="body-region" data-region="hands" style="cursor: pointer; transition: fill 0.3s;"
                     onmouseover="this.style.fill='#bef264'" onmouseout="this.style.fill='#d9f99d'"
                     onclick="selectBodyRegion('hands')" transform="rotate(-20 120 200)"/>
            <ellipse cx="280" cy="200" rx="20" ry="60" fill="#d9f99d" stroke="#4a90a4" stroke-width="2"
                     class="body-region" data-region="hands" style="cursor: pointer; transition: fill 0.3s;"
                     onmouseover="this.style.fill='#bef264'" onmouseout="this.style.fill='#d9f99d'"
                     onclick="selectBodyRegion('hands')" transform="rotate(20 280 200)"/>
            <text x="120" y="205" text-anchor="middle" fill="#365314" font-size="12" font-weight="bold">HANDS</text>
            
            <!-- Legs region -->
            <rect x="170" y="320" width="30" height="150" rx="15" fill="#bfdbfe" stroke="#4a90a4" stroke-width="2"
                  class="body-region" data-region="legs" style="cursor: pointer; transition: fill 0.3s;"
                  onmouseover="this.style.fill='#93c5fd'" onmouseout="this.style.fill='#bfdbfe'"
                  onclick="selectBodyRegion('legs')"/>
            <rect x="200" y="320" width="30" height="150" rx="15" fill="#bfdbfe" stroke="#4a90a4" stroke-width="2"
                  class="body-region" data-region="legs" style="cursor: pointer; transition: fill 0.3s;"
                  onmouseover="this.style.fill='#93c5fd'" onmouseout="this.style.fill='#bfdbfe'"
                  onclick="selectBodyRegion('legs')"/>
            <text x="200" y="400" text-anchor="middle" fill="#1e3a8a" font-size="14" font-weight="bold">LEGS</text>
        </svg>
    `;
}

function selectBodyRegion(region) {
    const data = bodyMapData[region];
    if (!data) return;
    
    // Mark as explored
    exploredRegions.add(region);
    updateExplorationProgress();
    
    // Update title
    document.getElementById('region-title').textContent = data.title;
    
    // Update tabs
    document.getElementById('tab-feel').innerHTML = `
        <h4>Common Sensations:</h4>
        <ul>${data.symptoms.map(s => `<li>${s}</li>`).join('')}</ul>
    `;
    
    document.getElementById('tab-science').innerHTML = `
        <p>${data.science}</p>
    `;
    
    document.getElementById('tab-why').innerHTML = `
        <p>${data.why}</p>
    `;
    
    document.getElementById('citation-text').innerHTML = `
        <strong>Research:</strong> ${data.citation}
    `;
    
    // Switch to "What You Feel" tab
    switchTab('feel');
    
    // Save progress
    saveProgress();
    
    // Scroll to details
    document.getElementById('body-map-details').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.detail-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

function updateExplorationProgress() {
    const count = exploredRegions.size;
    const total = 5;
    const percent = (count / total) * 100;
    
    document.getElementById('explored-count').textContent = `${count} of ${total} regions explored`;
    document.getElementById('exploration-progress-bar').style.width = `${percent}%`;
    
    if (count === total) {
        document.getElementById('completion-message').style.display = 'block';
        updateProgress(40); // Body map complete = 40% of lesson
    }
}

function saveProgress() {
    saveToStorage('body-map-progress', {
        exploredRegions: Array.from(exploredRegions),
        timestamp: new Date().toISOString()
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeBodyMap);
```

#### Task 1.3: Create crisis-detection.js
```javascript
// /anxiety-toolkit/js/crisis-detection.js

// Monitor all text inputs for crisis language
function initializeCrisisDetection() {
    // Monitor reflection textareas
    document.querySelectorAll('textarea[data-reflection]').forEach(textarea => {
        textarea.addEventListener('blur', function() {
            checkForCrisisLanguage(this.value);
        });
    });
    
    // Monitor Flowise chat input
    const flowi