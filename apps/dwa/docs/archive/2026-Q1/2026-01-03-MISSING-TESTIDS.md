# Missing data-testid Attributes (2026-01-03)

The following interactive elements in the Mosaic UI lack `data-testid` attributes, which makes E2E tests more fragile.

## ✅ Completed (2026-01-03)
- [x] **ICP Builder**: All form inputs (Industry, Company Size, Job Titles, Pain Points)
- [x] **ICP Builder**: Validate Button
- [x] **ICP Builder**: Save and Export buttons (Added to UI)
- [x] **Community Feed**: Status Input, Post/Send Button, Like/Upvote Buttons
- [x] **Community Feed**: Comment input for nested replies
- [x] **Community Forum**: Post links and Author links (Updated to functional routes)
- [x] **Roleplay**: "End Session" button
- [x] **Global Header**: Search Button, Notifications Bell, Profile Dropdown
- [x] **Notifications Panel**: Panel container and individual notification items
- [x] **Search Modal**: Modal container and search input

## 🟡 Remaining (Low Priority)
- [ ] **Courses**: Sidebar lesson navigation links (currently handled by robust text-based selectors)

---

## Technical Summary
All high-priority interactive elements now have dedicated `data-testid` attributes. This has allowed us to simplify the Playwright test suite by prioritizing these stable selectors over fragile class names or potentially ambiguous labels.

> [!TIP]
> Use `page.getByTestId('element-id')` as the primary selector in all future E2E tests.
