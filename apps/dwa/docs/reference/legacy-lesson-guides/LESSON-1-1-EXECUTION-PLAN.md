# Complete Lesson 1.1 Execution Plan
**Date**: October 24, 2025  
**Objective**: Transform wireframe into fully functional production lesson

---

## EXECUTION TIMELINE: 3-4 Hours Total

### PHASE 1: JavaScript Implementation (1.5 hours)
**What**: Build all missing JS functionality
**Why**: Nothing works without this foundation

**Files to Create:**
1. ✅ `/js/shared-utilities.js` (20 min) - Core functions
2. ✅ `/js/lesson-1-1-interactions.js` (30 min) - Body map with data
3. ✅ `/js/crisis-detection.js` (10 min) - Safety monitoring
4. ✅ `/js/flowise-integration.js` (15 min) - AI chat connection
5. ✅ `/js/main.js` (15 min) - Initialization & orchestration

**Deployment**: Copy to `/opt/digital-wellness/static-files/anxiety-toolkit/js/`

---

### PHASE 2: Typebot Flow Creation (45 min)
**What**: Build actual assessment questions in Typebot
**Why**: Current flow is empty shell

**Steps:**
1. Log into Typebot: http://46.202.88.248:3000
2. Open flow: `cmh41usv80001p41y7yzlcou7`
3. Build conversation flow with branching logic
4. Test responses
5. Connect to Form.io for data storage (optional)

**Content Needed:**
- 10-15 assessment questions
- Branching based on anxiety severity
- Summary/results screen
- Save to localStorage + optional backend

---

### PHASE 3: Forms.io Knowledge Check (30 min)
**What**: Implement actual quiz with scoring
**Why**: Current placeholder needs real questions

**Implementation Options:**
A. **Pure JavaScript** (Recommended - fastest)
   - Create quiz.js with 5 questions
   - Immediate feedback
   - Score tracking
   
B. **Form.io Integration** (If you want backend storage)
   - Create form in Form.io
   - Embed in lesson
   - Store results in database

---

### PHASE 4: Flowise AI Chat Integration (45 min)
**What**: Connect actual Flowise chatbot
**Why**: Placeholder HTML needs real backend

**Steps:**
1. Create Flowise chatflow (or use existing)
2. Get chatflow API endpoint
3. Implement sendToFlowise() function
4. Add message threading
5. Test question/answer flow

---

### PHASE 5: Resource Generation (30 min)
**What**: Create downloadable PDFs
**Why**: Links currently go nowhere

**PDFs Needed:**
1. Anxiety Symptoms Checklist (1-page)
2. Research Summary (2-page with citations)
3. Body Map Workbook (2-page printable)
4. Quick Reference Card (wallet-sized)

**Method**: Use Gamma API or Puppeteer to generate from HTML

---

### PHASE 6: Testing & QA (30 min)
**What**: Verify everything works
**Why**: Ensure production quality

**Test Checklist:**
- [ ] Body map clickable and shows content
- [ ] All accordions open/close
- [ ] Typebot assessment flows properly
- [ ] Flowise chat responds
- [ ] Quiz scores correctly
- [ ] Reflections save
- [ ] PDFs download
- [ ] Crisis detection triggers
- [ ] Progress bar updates
- [ ] Mobile responsive
- [ ] No console errors

---

## DETAILED IMPLEMENTATION GUIDE

### Part 1: Complete JavaScript Stack

**File 1: shared-utilities.js** (DONE - see previous file)

**File 2: lesson-1-1-interactions.js** (DONE - see previous file)

**File 3: crisis-detection.js**
```javascript
// Monitor for crisis language and show support resources

const crisisKeywords = [
    'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
    'better off dead', 'hurt myself', 'self harm', 'self-harm',
    'no reason to live', 'hopeless', 'can\'t go on'
];

function checkForCrisisLanguage(text) {
    const lowerText = text.toLowerCase();
    const detected = crisisKeywords.some(keyword => lowerText.includes(keyword));
    
    if (detected) {
        showCrisisBanner();
        // Optional: Log to analytics/notify admin
        console.warn('Crisis language detected');
    }
    
    return detected;
}

function showCrisisBanner() {
    const banner = document.getElementById('crisis-banner');
    if (banner) {
        banner.style.display = 'block';
        banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function initializeCrisisDetection() {
    // Monitor reflection textareas
    document.querySelectorAll('textarea[data-reflection]').forEach(textarea => {
        textarea.addEventListener('blur', function() {
            checkForCrisisLanguage(this.value);
        });
    });
    
    // Monitor Flowise chat (if implemented)
    const chatInput = document.getElementById('flowise-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkForCrisisLanguage(this.value);
            }
        });
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', initializeCrisisDetection);
```

**File 4: flowise-integration.js**
```javascript
// Flowise AI Chat Integration

const FLOWISE_API = 'http://46.202.88.248:3001'; // Your Flowise URL
const CHATFLOW_ID = 'YOUR_CHATFLOW_ID'; // Get from Flowise

let conversationHistory = [];

async function sendToFlowise() {
    const input = document.getElementById('flowise-input');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Clear input
    input.value = '';
    
    // Show user message
    addMessage(question, 'user');
    
    // Check for crisis language
    if (checkForCrisisLanguage(question)) {
        addMessage('I notice you might be struggling. Please reach out to a crisis counselor at 988 or text HOME to 741741.', 'ai');
        return;
    }
    
    try {
        // Call Flowise API
        const response = await fetch(`${FLOWISE_API}/api/v1/prediction/${CHATFLOW_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                history: conversationHistory
            })
        });
        
        if (!response.ok) throw new Error('Flowise API error');
        
        const data = await response.json();
        const answer = data.text || data.answer || 'I apologize, I encountered an error. Please try again.';
        
        // Add to conversation history
        conversationHistory.push({ question, answer });
        
        // Show AI response
        addMessage(answer, 'ai');
        
    } catch (error) {
        console.error('Flowise error:', error);
        addMessage('I\'m having trouble connecting. Please try again in a moment.', 'ai');
    }
}

function addMessage(text, type) {
    const container = document.getElementById('flowise-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.style.cssText = 'display: flex; gap: 1rem; margin-bottom: 1rem;';
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.style.cssText = 'width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;';
    avatar.style.background = type === 'ai' ? '#4a90a4' : '#9ca3af';
    avatar.textContent = type === 'ai' ? '🧠' : '👤';
    
    const content = document.createElement('div');
    content.className = 'content';
    content.style.cssText = 'flex: 1; padding: 1rem; border-radius: 8px;';
    content.style.background = type === 'ai' ? '#f7f8f6' : '#eff6ff';
    
    const p = document.createElement('p');
    p.style.margin = '0';
    p.textContent = text;
    content.appendChild(p);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    container.appendChild(messageDiv);
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function askFlowise(question) {
    const input = document.getElementById('flowise-input');
    input.value = question;
    sendToFlowise();
}

// Alternative: If Flowise not configured, use simple FAQ
const FAQS = {
    'why does my heart race': 'Your heart races because your sympathetic nervous system releases adrenaline, increasing heart rate to pump more oxygen to muscles. This is your body preparing for action, even when you\'re safe.',
    'can i control': 'Yes! While you can\'t directly control your amygdala\'s 23-millisecond response, you can train your "brake pedal" (parasympathetic nervous system) through techniques like deep breathing, progressive relaxation, and mindfulness.',
    'butterflies': 'The "butterflies" feeling comes from your enteric nervous system (your gut-brain). Your vagus nerve carries anxiety signals from your brain to your gut, causing that fluttering sensation. It\'s real neuroscience, not imagination!'
};

function simpleFAQ(question) {
    const lower = question.toLowerCase();
    
    for (const [key, answer] of Object.entries(FAQS)) {
        if (lower.includes(key)) {
            return answer;
        }
    }
    
    return 'That\'s a great question! For detailed answers, please refer to the science sections above or ask your healthcare provider.';
}

// If Flowise fails, fall back to FAQ
async function sendToFlowiseWithFallback() {
    try {
        await sendToFlowise();
    } catch (error) {
        const input = document.getElementById('flowise-input');
        const question = input.value.trim();
        input.value = '';
        
        addMessage(question, 'user');
        addMessage(simpleFAQ(question), 'ai');
    }
}
```

**File 5: main.js**
```javascript
// Main initialization and orchestration

// Complete lesson function
function completeLesson() {
    // Check all requirements
    const bodyMapComplete = exploredRegions && exploredRegions.size === 5;
    const reflectionsSaved = getFromStorage('lesson-1-1-reflections') !== null;
    const quizPassed = getFromStorage('lesson-1-1-quiz-score') >= 4;
    
    if (!bodyMapComplete) {
        alert('Please explore all 5 body regions before completing the lesson.');
        return;
    }
    
    if (!reflectionsSaved) {
        alert('Please complete and save your reflections before finishing.');
        return;
    }
    
    // Mark complete
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completed.includes('lesson-1-1')) {
        completed.push('lesson-1-1');
        localStorage.setItem('completedLessons', JSON.stringify(completed));
    }
    
    // Show completion
    document.getElementById('lesson-complete').style.display = 'block';
    document.getElementById('lesson-complete').scrollIntoView({ behavior: 'smooth' });
    
    // Enable next lesson
    const nextLink = document.getElementById('next-lesson-link');
    nextLink.style.opacity = '1';
    nextLink.style.pointerEvents = 'auto';
    
    updateProgress(100);
}

// Save reflections
function saveReflections() {
    const reflection1 = document.getElementById('reflection-1').value;
    const reflection2 = document.getElementById('reflection-2').value;
    const reflection3 = document.getElementById('reflection-3').value;
    
    if (!reflection1 || !reflection2 || !reflection3) {
        alert('Please complete all reflection questions before saving.');
        return;
    }
    
    const reflections = {
        bodyRegion: reflection1,
        scienceInsight: reflection2,
        perspectiveShift: reflection3,
        timestamp: new Date().toISOString()
    };
    
    saveToStorage('lesson-1-1-reflections', reflections);
    
    const status = document.getElementById('save-status');
    status.textContent = '✓ Reflections saved successfully!';
    status.style.color = '#10b981';
    
    updateProgress(80);
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🗺️ Lesson 1.1: Initializing...');
    
    // Load saved progress
    const reflections = getFromStorage('lesson-1-1-reflections');
    if (reflections) {
        document.getElementById('reflection-1').value = reflections.bodyRegion || '';
        document.getElementById('reflection-2').value = reflections.scienceInsight || '';
        document.getElementById('reflection-3').value = reflections.perspectiveShift || '';
    }
    
    // Check if already completed
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (completed.includes('lesson-1-1')) {
        document.getElementById('lesson-complete').style.display = 'block';
        const nextLink = document.getElementById('next-lesson-link');
        nextLink.style.opacity = '1';
        nextLink.style.pointerEvents = 'auto';
        updateProgress(100);
    }
    
    // Calculate initial progress
    let progress = 0;
    if (exploredRegions && exploredRegions.size > 0) progress += 40 * (exploredRegions.size / 5);
    if (reflections) progress += 30;
    if (completed.includes('lesson-1-1')) progress = 100;
    updateProgress(progress);
    
    console.log('✅ Lesson 1.1 ready');
});
```

---

### Part 2: Typebot Flow Builder

**Questions for Anxiety Assessment:**

1. **Opening**
   - "Before we begin exploring anxiety together, let's understand your unique experience. Ready?"
   
2. **Frequency**
   - "How often do you experience anxiety symptoms?"
     - Daily (Multiple times per day)
     - Several times per week
     - Occasionally
     - Rarely

3. **Intensity**
   - "When anxiety hits, how intense does it feel? (1-10 scale)"
   - [Slider: 1-10]

4. **Primary Location**
   - "Where do you MOST commonly feel anxiety in your body?"
     - Head (racing thoughts, dizziness)
     - Chest (heart pounding, breathing)
     - Stomach (butterflies, nausea)
     - Throughout body (all over)

5. **Trigger Type**
   - "What tends to trigger your anxiety most?"
     - Social situations
     - Work/school performance
     - Health concerns
     - General worry/unknown
     - Specific phobias

6. **Thoughts Pattern**
   - "When anxious, your thoughts tend to:"
     - Race uncontrollably
     - Focus on worst-case scenarios
     - Feel foggy/disconnected
     - Loop on same worry

7. **Impact on Life**
   - "How much does anxiety interfere with your daily life? (1-10)"
   - [Slider: 1-10]

8. **Current Coping**
   - "What do you typically do when anxiety strikes? (Check all that apply)"
     - [ ] Avoid the situation
     - [ ] Deep breathing
     - [ ] Talk to someone
     - [ ] Try to push through
     - [ ] Use substances (alcohol, etc.)
     - [ ] Other

9. **Goals**
   - "What would you most like to achieve with this course?"
     - Understand what's happening in my body
     - Learn practical techniques to calm down
     - Reduce frequency of panic attacks
     - Function better in daily life
     - All of the above

10. **Summary**
    - "Thank you for sharing! Based on your responses, we'll personalize your journey through this course."
    - [Show summary of their anxiety profile]
    - [Save to localStorage: 'anxiety-profile']

---

### Part 3: Knowledge Check Quiz (Pure JavaScript)

Create `/js/quiz.js`:

```javascript
const quizQuestions = [
    {
        question: "How quickly can your amygdala detect and respond to a potential threat?",
        options: [
            "23 milliseconds",
            "2 seconds",
            "10 seconds",
            "1 minute"
        ],
        correct: 0,
        explanation: "Your amygdala can detect threats and trigger anxiety in just 23 milliseconds—faster than you can consciously think about what's happening. This is the 'low road' described by Dr. Joseph LeDoux."
    },
    {
        question: "Why do you get 'butterflies' in your stomach when anxious?",
        options: [
            "It's just psychological, not real",
            "Your gut-brain axis: 100 million neurons in your gut communicating with your brain",
            "Low blood sugar",
            "Trapped gas"
        ],
        correct: 1,
        explanation: "The 'butterflies' are real! Your enteric nervous system (gut) has over 100 million neurons and communicates directly with your brain via the vagus nerve. Dr. Emeran Mayer's research shows this bidirectional gut-brain connection."
    },
    {
        question: "During anxiety, blood flow increases to your legs primarily to:",
        options: [
            "Keep you warm",
            "Improve circulation",
            "Prepare your muscles to run from danger",
            "Prevent blood clots"
        ],
        correct: 2,
        explanation: "Your body shunts blood to large leg muscles to prepare you for fight-or-flight. This is why your legs might feel weak or 'jelly-like'—they're actually primed for running, which feels unstable when standing still."
    },
    {
        question: "You're giving a presentation and your hands start shaking. This is an example of:",
        options: [
            "A medical emergency requiring immediate attention",
            "Your body's normal stress response (sympathetic nervous system activation)",
            "Permanent nerve damage",
            "A sign you should avoid all future presentations"
        ],
        correct: 1,
        explanation: "Hand shaking during stress is your sympathetic nervous system ('gas pedal') releasing adrenaline. It's uncomfortable but protective—your body preparing for action. This is temporary and not dangerous."
    },
    {
        question: "The main reason understanding the neuroscience of anxiety helps is:",
        options: [
            "It makes you sound smart at parties",
            "It reduces fear of your symptoms by explaining they're protective, not dangerous",
            "It cures anxiety immediately",
            "It helps you diagnose other people"
        ],
        correct: 1,
        explanation: "Understanding the 'why' behind your symptoms reduces the fear response. When you know your racing heart is your body trying to protect you (not a heart attack), the symptom becomes less frightening. Knowledge reduces catastrophic thinking."
    }
];

let currentQuestion = 0;
let score = 0;
let answers = [];

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    showQuestion();
    
    // Hide start button, show quiz
    document.querySelector('.btn.btn-primary').style.display = 'none';
    document.getElementById('knowledge-check-container').innerHTML = '<div id="quiz-container"></div>';
}

function showQuestion() {
    const q = quizQuestions[currentQuestion];
    const container = document.getElementById('quiz-container');
    
    container.innerHTML = `
        <div class="quiz-question">
            <div class="quiz-progress" style="margin-bottom: 2rem;">
                <p style="color: #666;">Question ${currentQuestion + 1} of ${quizQuestions.length}</p>
                <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px;">
                    <div style="width: ${((currentQuestion) / quizQuestions.length) * 100}%; height: 100%; background: #4a90a4; border-radius: 4px; transition: width 0.3s;"></div>
                </div>
            </div>
            
            <h3 style="margin-bottom: 2rem;">${q.question}</h3>
            
            <div class="quiz-options" style="display: flex; flex-direction: column; gap: 1rem;">
                ${q.options.map((opt, i) => `
                    <button class="quiz-option" onclick="selectAnswer(${i})" 
                            style="padding: 1rem; text-align: left; background: white; border: 2px solid #d1d5db; border-radius: 8px; cursor: pointer; transition: all 0.2s;"
                            onmouseover="this.style.borderColor='#4a90a4'; this.style.background='#f0f9ff'"
                            onmouseout="this.style.borderColor='#d1d5db'; this.style.background='white'">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function selectAnswer(answerIndex) {
    const q = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === q.correct;
    
    if (isCorrect) score++;
    answers.push({ question: currentQuestion, answer: answerIndex, correct: isCorrect });
    
    // Show feedback
    showFeedback(isCorrect, q.explanation);
}

function showFeedback(correct, explanation) {
    const container = document.getElementById('quiz-container');
    
    container.innerHTML = `
        <div class="quiz-feedback" style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">
                ${correct ? '✅' : '❌'}
            </div>
            <h3 style="margin-bottom: 1rem; color: ${correct ? '#10b981' : '#ef4444'};">
                ${correct ? 'Correct!' : 'Not quite'}
            </h3>
            <p style="margin-bottom: 2rem; color: #666; max-width: 600px; margin-left: auto; margin-right: auto;">
                ${explanation}
            </p>
            <button onclick="${currentQuestion < quizQuestions.length - 1 ? 'nextQuestion()' : 'showResults()'}" 
                    class="btn btn-primary" 
                    style="padding: 1rem 2rem; background: #4a90a4; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1.1rem;">
                ${currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
        </div>
    `;
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showResults() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = score >= 4;
    
    // Save score
    saveToStorage('lesson-1-1-quiz-score', score);
    
    const resultsDiv = document.getElementById('quiz-results');
    resultsDiv.style.display = 'block';
    resultsDiv.style.background = passed ? '#f0fdf4' : '#fef2f2';
    resultsDiv.style.borderColor = passed ? '#86efac' : '#fca5a5';
    
    document.getElementById('quiz-score').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">
                ${passed ? '🎉' : '📚'}
            </div>
            <h3 style="margin-bottom: 1rem;">Your Score: ${score}/${quizQuestions.length} (${percentage}%)</h3>
            ${passed 
                ? '<p style="color: #10b981; font-weight: 600;">Excellent work! You passed!</p>'
                : '<p style="color: #ef4444;">You need 4/5 to pass. Review the science sections and try again.</p>'
            }
        </div>
    `;
    
    document.getElementById('quiz-feedback').innerHTML = `
        <h4>Review Your Answers:</h4>
        <div style="text-align: left; margin-top: 1rem;">
            ${answers.map((a, i) => `
                <div style="padding: 1rem; margin-bottom: 0.5rem; background: ${a.correct ? '#f0fdf4' : '#fef2f2'}; border-radius: 4px;">
                    <p style="margin: 0;"><strong>Q${i+1}:</strong> ${a.correct ? '✓' : '✗'} ${quizQuestions[i].question}</p>
                </div>
            `).join('')}
        </div>
        ${passed ? '' : '<button onclick="startQuiz()" class="btn btn-primary" style="margin-top: 1rem; padding: 0.75rem 1.5rem;">Retake Quiz</button>'}
    `;
    
    if (passed) {
        updateProgress(90);
    }
}
```

---

## DEPLOYMENT COMMANDS

### Deploy JavaScript Files
```bash
# From local machine
cd /Users/mike/github/rps-digital-wellness-platform/github-deployment/anxiety-toolkit

# Copy all JS files to VPS.
# NOTE: The committed password that used to be on these two lines was
# redacted as part of B-057. That credential must be considered compromised
# and rotated out of band. Use SSH key auth only; if the passphrase escapes
# ~/.ssh/config, set it via `sshpass -e` reading from SSHPASS env, never
# inline.
scp -r js/ \
  root@46.202.88.248:/opt/digital-wellness/static-files/anxiety-toolkit/

# Verify deployment
ssh root@46.202.88.248 \
  "docker exec nginx ls -lh /usr/share/nginx/html/anxiety-toolkit/js/"
```

### Test in Browser
```
http://46.202.88.248/lesson-1-1-your-interactive-anxiety-journey.html
```

**Expected Results:**
- ✅ Body map SVG loads with clickable regions
- ✅ Clicking regions shows content in tabs
- ✅ Progress bar updates as regions explored
- ✅ Accordions open/close when clicked
- ✅ Reflections save to localStorage
- ✅ Quiz starts and scores correctly
- ✅ No console errors

---

## NEXT: Resource PDF Generation

Use this after JS is working to create downloadable worksheets.

Would you like me to continue with the PDF generation automation?
