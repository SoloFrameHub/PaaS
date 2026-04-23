# Mosaic Component Selectors (2026-01-03)

This document maps the Mosaic UI components to their current DOM selectors after the Next.js App Router migration and recent E2E hardening.

## 🛠️ ICP Builder
**Route**: `/academy/tools/icp-builder`

| Element | data-testid | Best Playwright Selector |
| :--- | :--- | :--- |
| Industry Input | `industry-input` | `page.getByTestId('industry-input')` |
| Company Size | `company-size-input` | `page.getByTestId('company-size-input')` |
| Job Titles | `job-titles-input` | `page.getByTestId('job-titles-input')` |
| Pain Points | `pain-points-input` | `page.getByTestId('pain-points-input')` |
| Validate Button | `validate-icp-button` | `page.getByTestId('validate-icp-button')` |
| Save Button | `save-icp-button` | `page.getByTestId('save-icp-button')` |
| Export Button | `export-icp-button` | `page.getByTestId('export-icp-button')` |

---

## 👥 Community Features
**Routes**: `/community/feed`, `/community/forum`

| Element | data-testid | Best Playwright Selector |
| :--- | :--- | :--- |
| Status Input | `status-input` | `page.getByTestId('status-input')` |
| Create Post Button | `create-post-button` | `page.getByTestId('create-post-button')` |
| Post Card (Feed) | `feed-post` | `page.getByTestId('feed-post')` |
| Post Link (Forum) | `post-link` | `page.getByTestId('post-link')` |
| Author Link | `post-author-link` | `page.getByTestId('post-author-link')` |
| Like Button | `like-button` | `page.getByTestId('like-button')` |
| Comment Button | `comment-button` | `page.getByTestId('comment-button')` |
| Comment Input | `comment-input` | `page.getByTestId('comment-input')` |
| Post Detail View | `post-detail` | `page.getByTestId('post-detail')` |

---

## 🎓 Courses & Lessons
**Route**: `/academy/[courseId]/[lessonId]`

| Element | data-testid | Best Playwright Selector |
| :--- | :--- | :--- |
| Lesson Content | `lesson-content` | `page.getByTestId('lesson-content')` |
| Complete Button | `complete-lesson-button` | `page.getByTestId('complete-lesson-button')` |
| Quiz Container | `quiz` | `page.getByTestId('quiz')` |
| Quiz Question | `quiz-question` | `page.getByTestId('quiz-question')` |
| Quiz Option | `quiz-option` | `page.getByTestId('quiz-option')` |
| Quiz Submit | `submit-quiz-button` | `page.getByTestId('submit-quiz-button')` |
| Quiz Results | `quiz-results` | `page.getByTestId('quiz-results')` |

---

## 🥋 Roleplay
**Route**: `/roleplay`

| Element | data-testid | Best Playwright Selector |
| :--- | :--- | :--- |
| Industry Select | `industry-select` | `page.getByTestId('industry-select')` |
| Role Select | `role-select` | `page.getByTestId('role-select')` |
| Start Button | `start-roleplay-button` | `page.getByTestId('start-roleplay-button')` |
| Chat Input | `chat-input` | `page.getByTestId('chat-input')` |
| Send Button | `send-message-button` | `page.getByTestId('send-message-button')` |
| End Session | `end-session-button` | `page.getByTestId('end-session-button')` |
| Eval Score | `evaluation-score` | `page.getByTestId('evaluation-score')` |

---

## 🔔 Global UI
| Element | data-testid | Best Playwright Selector |
| :--- | :--- | :--- |
| Search Button | `search-button` | `page.getByTestId('search-button')` |
| Search Modal | `search-modal` | `page.getByTestId('search-modal')` |
| Search Input | `search-input` | `page.getByTestId('search-input')` |
| Notification Bell | `notifications-button` | `page.getByTestId('notifications-button')` |
| Notifications Panel| `notifications-panel` | `page.getByTestId('notifications-panel')` |
| Notification Item | `notification-item` | `page.getByTestId('notification-item')` |
| Profile Dropdown | `profile-dropdown-button` | `page.getByTestId('profile-dropdown-button')` |
