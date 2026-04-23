# Lesson Creation Guide

**IMPORTANT**: This guide defines the correct folder structure and process for creating all future lessons.

## 📁 Correct Folder Structure

### ✅ Production Lessons Location
All lessons MUST be created in:
```
github-deployment/[course-name]/
```

**Examples:**
- `github-deployment/anxiety-toolkit/lesson-1-1-your-interactive-anxiety-journey.html`
- `github-deployment/course-1-movement-medicine/lesson-1-1-the-science-of-exercise-as-medicine.html`
- `github-deployment/course-2-workplace-mental-health/lesson-2-1-workplace-crisis.html`

### ❌ NEVER Create Lessons Here
Do NOT create production lessons in:
- `apps/student-platform/` (development/testing only)
- Root directory
- Any other location

---

## 🎯 Lesson File Naming Convention

### Pattern
```
lesson-[module]-[number]-[descriptive-title].html
```

### Examples
- `lesson-1-1-your-interactive-anxiety-journey.html`
- `lesson-1-2-the-science-of-exercise-as-medicine.html`
- `lesson-2-3-workplace-stress-management.html`

### Rules
1. Use lowercase letters only
2. Use hyphens (not underscores or spaces)
3. Keep titles concise but descriptive
4. Module and lesson numbers use format: `[module]-[lesson]`

---

## 📋 Lesson Template Structure

Every lesson MUST include these elements:

### 1. SEO Meta Tags (Required)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>Lesson X.X: Title | Course Name | Real Psychiatric Services</title>
    <meta name="description" content="Lesson description (150-160 chars)">
    <meta name="keywords" content="keyword1, keyword2, keyword3">

    <!-- Open Graph -->
    <meta property="og:title" content="Lesson Title">
    <meta property="og:description" content="Lesson description">
    <meta property="og:type" content="article">

    <!-- Schema.org LearningResource -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "name": "Lesson Full Title",
      "description": "Lesson description",
      "educationalLevel": "Beginner|Intermediate|Advanced",
      "learningResourceType": "Lesson",
      "teaches": "Topic 1, Topic 2, Topic 3",
      "timeRequired": "PT45M",
      "isPartOf": {
        "@type": "Course",
        "name": "Course Name",
        "provider": {
          "@type": "Organization",
          "name": "Real Psychiatric Services"
        }
      },
      "instructor": {
        "@type": "Person",
        "name": "David Glenn",
        "jobTitle": "Board-Certified Psychiatric Mental Health Nurse Practitioner (PMHNP-BC)"
      }
    }
    </script>
```

### 2. CSS Includes (Required)
```html
    <!-- Lesson Stylesheets -->
    <link rel="stylesheet" href="css/lesson-styles.css">
    <link rel="stylesheet" href="css/interactive-components.css">
    <link rel="stylesheet" href="css/crisis-detection.css">
</head>
```

### 3. Crisis Support Banner (Required)
```html
<body>
    <div class="lesson-container">
        <!-- Crisis Support Banner -->
        <div id="crisis-banner" class="crisis-banner" style="display: none;">
            <div class="crisis-content">
                <h3>🆘 Need Immediate Support?</h3>
                <p>If you're experiencing thoughts of self-harm, please reach out immediately:</p>
                <div class="crisis-contacts">
                    <a href="tel:988" class="crisis-link">📞 Call 988 (Suicide & Crisis Lifeline)</a>
                    <a href="sms:741741" class="crisis-link">💬 Text HOME to 741741 (Crisis Text Line)</a>
                </div>
            </div>
            <button class="crisis-close" onclick="document.getElementById('crisis-banner').style.display='none'">×</button>
        </div>
```

### 4. Lesson Header with Breadcrumbs (Required)
```html
        <div class="lesson-header">
            <div class="breadcrumb">
                <a href="index.html">Course Name</a> >
                <a href="#module-X">Module X: Module Name</a> >
                <span>Lesson X.X</span>
            </div>

            <h1>📚 Lesson Title</h1>
            <p class="lesson-subtitle">Lesson subtitle or description</p>

            <div class="lesson-stats">
                <div class="stat">
                    <span class="stat-icon">⏱️</span>
                    <span>45 min</span>
                </div>
                <div class="stat">
                    <span class="stat-icon">🎯</span>
                    <span>Beginner</span>
                </div>
                <div class="stat">
                    <span class="stat-icon">🧠</span>
                    <span>Interactive Learning</span>
                </div>
            </div>

            <div class="progress-bar">
                <div class="progress" id="lesson-progress" style="width: 0%"></div>
            </div>
        </div>
```

### 5. JavaScript Includes (Required at end)
```html
    <!-- JavaScript -->
    <script src="js/shared-utilities.js"></script>
    <script src="js/lesson-X-X-interactions.js"></script>
    <script src="js/crisis-detection.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

---

## 📂 Associated Files

For each lesson, you may need to create:

### JavaScript File (if interactive)
Location: `github-deployment/[course-name]/js/lesson-X-X-interactions.js`

Example:
```javascript
/**
 * Lesson X.X: Lesson Title
 * Interactive components and functionality
 */

// Your lesson-specific JavaScript here

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Lesson X.X Loading...');

    // Initialize lesson components

    console.log('✅ Lesson X.X Ready');
});
```

### CSS File (if custom styles needed)
Location: `github-deployment/[course-name]/css/`

Use existing shared CSS files when possible:
- `css/lesson-styles.css` - Base lesson styles
- `css/interactive-components.css` - Interactive elements
- `css/crisis-detection.css` - Crisis banner styles

---

## 🎨 Interactive Components

### Available Components
1. **Body Maps** - Interactive SVG body diagrams
2. **Typebot Assessments** - Conversational assessments
3. **Flowise AI Chat** - AI-powered Q&A
4. **Gamma Presentations** - Embedded presentations
5. **Forms.io Quizzes** - Knowledge checks
6. **Drawing Canvases** - Interactive drawing tools

### Integration Example (Body Map)
```html
<div class="body-map-interactive">
    <div class="body-map-wrapper">
        <div id="body-map-svg-container">
            <p>Loading interactive body map...</p>
        </div>
    </div>
    <div class="body-map-details" id="body-map-details">
        <!-- Details panel content -->
    </div>
</div>
```

---

## ✅ Pre-Launch Checklist

Before deploying a new lesson, verify:

- [ ] File is in `github-deployment/[course-name]/` folder
- [ ] SEO meta tags are complete and accurate
- [ ] Schema.org structured data is included
- [ ] CSS files are correctly linked (relative paths)
- [ ] JavaScript files are correctly linked
- [ ] Crisis support banner is present
- [ ] Breadcrumb navigation is correct
- [ ] Lesson stats (time, level) are accurate
- [ ] All links work (test locally)
- [ ] Interactive components function properly
- [ ] Mobile responsive (test on small screens)
- [ ] Progress tracking works
- [ ] Next/previous lesson links are correct

---

## 📊 Lesson Content Guidelines

### Learning Objectives
Every lesson should clearly state:
1. What the student will learn
2. Skills they will practice
3. Expected outcomes

### Content Structure
1. **Introduction** - Set context and expectations
2. **Core Content** - Main lesson material
3. **Interactive Activities** - Hands-on practice
4. **Knowledge Check** - Assess understanding
5. **Reflection** - Personal application
6. **Summary** - Key takeaways
7. **Next Steps** - Link to next lesson

### Accessibility
- Use semantic HTML
- Include alt text for images
- Ensure keyboard navigation works
- Use sufficient color contrast
- Provide text alternatives for audio/video

---

## 🔄 Lesson Update Process

When updating existing lessons:

1. **Read the existing file first** - Understand current structure
2. **Preserve SEO elements** - Don't change meta tags unnecessarily
3. **Test thoroughly** - Ensure no breaking changes
4. **Update version date** - Add comment with update date
5. **Check dependencies** - Ensure JS/CSS files still work

---

## 🚫 Common Mistakes to Avoid

### ❌ WRONG: Creating lessons in apps folder
```
apps/student-platform/anxiety-toolkit/pages/lesson-1-1.html  ❌
```

### ✅ CORRECT: Creating lessons in github-deployment
```
github-deployment/anxiety-toolkit/lesson-1-1-your-interactive-anxiety-journey.html  ✅
```

### ❌ WRONG: Using absolute paths
```html
<link rel="stylesheet" href="/css/lesson-styles.css">  ❌
```

### ✅ CORRECT: Using relative paths
```html
<link rel="stylesheet" href="css/lesson-styles.css">  ✅
```

### ❌ WRONG: Missing Schema.org data
```html
<head>
    <title>Lesson 1.1</title>
</head>  ❌
```

### ✅ CORRECT: Complete SEO structure
```html
<head>
    <title>Lesson 1.1: Title | Course | RPS</title>
    <meta name="description" content="...">
    <script type="application/ld+json">...</script>
</head>  ✅
```

---

## 📝 Example: Complete Lesson Structure

See existing lessons for complete examples:
- `github-deployment/anxiety-toolkit/lesson-1-1-your-interactive-anxiety-journey.html`
- `github-deployment/course-1-movement-medicine/lesson-1-1-the-science-of-exercise-as-medicine.html`

---

## 🆘 Troubleshooting

### CSS not loading
- Check path: should be `css/lesson-styles.css` not `/css/...`
- Verify file exists in course folder
- Check for typos in filename

### JavaScript not working
- Open browser console for errors
- Verify `shared-utilities.js` loads first
- Check function names match HTML onclick handlers

### Interactive components not appearing
- Ensure JS file is loaded
- Check for console errors
- Verify HTML IDs match JavaScript selectors

---

## 📞 Getting Help

If you encounter issues:
1. Check this guide first
2. Review existing working lessons
3. Check browser console for errors
4. Refer to `docs/technical-guides/` for advanced topics

---

**Last Updated**: October 24, 2025

**Remember**: Always create lessons in `github-deployment/[course-name]/` folder!
