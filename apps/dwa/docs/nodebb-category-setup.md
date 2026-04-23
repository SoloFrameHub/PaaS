# NodeBB Category Setup - AI Customer Acquisition Academy

## Initial Categories (Month 0 - Launch)

Per the research document, start with only 4-5 spaces to avoid ghost town effect.

### 1. Cohort Lounge #1 (Private)
- **Name:** Founding Cohort Lounge
- **Description:** Private space for our founding cohort members. Share wins, struggles, and real talk about the founder journey.
- **Permissions:** Private - visible only to founding cohort group
- **Icon:** `fa-users`
- **Color:** `#7C3AED` (purple)

### 2. Foundations Forum (Public to enrolled)
- **Name:** Foundations
- **Description:** Discuss ICP definition, positioning, value props, and acquisition path selection. Share your drafts for peer feedback.
- **Permissions:** Visible to all enrolled members
- **Icon:** `fa-compass`
- **Color:** `#10B981` (green)
- **Sub-categories (optional, add later if needed):**
  - Course 0: Define Your ICP
  - Course 1: Positioning & Value Prop
  - Course 2: Acquisition Path Selection
  - Course 3: Building Your Prospect List
  - Course 4: Lead Magnets & Offers

### 3. Wins & Celebrations
- **Name:** Wins & Celebrations
- **Description:** Share your victories - first customer, first cold email reply, first $1K month, or just getting through a tough week.
- **Permissions:** Visible to all enrolled members
- **Icon:** `fa-trophy`
- **Color:** `#F59E0B` (amber)

### 4. Introductions
- **Name:** Introductions
- **Description:** Introduce yourself! Tell us about your business, what you're building, and what you hope to achieve in the academy.
- **Permissions:** Visible to all enrolled members
- **Icon:** `fa-hand-wave`
- **Color:** `#3B82F6` (blue)

---

## User Groups to Create

### 1. Academy Members
- All paying subscribers
- Access to: Foundations, Wins & Celebrations, Introductions

### 2. Founding Cohort
- First 8-12 members (January 2026)
- Access to: All of the above + Founding Cohort Lounge

### 3. Admins
- Mike + any moderators
- Access to: Everything

---

## Future Categories (Add as engagement warrants)

### Track Forums (Month 2-3+)
| Track | Category Name | When to Add |
|-------|---------------|-------------|
| 2 | Marketing Engine | Month 2 when first cohort completes Foundations |
| 3 | Sales Methodology | Month 3 |
| 4 | Creator Economy | Month 4 |
| 5 | Customer Success | Month 5 |
| 6 | Operations & Systems | Month 6 |

### Additional Cohort Lounges
- Cohort #2 Lounge (February 2026)
- Cohort #3 Lounge (March 2026)
- etc.

---

## NodeBB Admin Setup Steps

1. **Login to NodeBB Admin Panel**
   - URL: https://ai-caa-forum.soloframehub.com/admin
   - Use admin credentials

2. **Create User Groups** (Admin → Manage → Groups)
   - Create "Academy Members" group
   - Create "Founding Cohort" group

3. **Create Categories** (Admin → Manage → Categories)
   - Create each category with settings above
   - Set permissions per category

4. **Configure Permissions** (per category → Privileges)
   - Founding Cohort Lounge: Only "Founding Cohort" group can view/post
   - Others: "Academy Members" can view/post

5. **Seed Initial Content**
   - Create 3-5 threads per category before inviting members
   - Use founder experience stories from enterprise sales career

---

## Seeded Thread Ideas

### Foundations Forum
1. "Welcome to Foundations - Start Here"
2. "The ICP Framework That Closed $3.7M at Unisys"
3. "Share Your ICP Draft - Get Feedback"
4. "Common Positioning Mistakes (and How to Fix Them)"
5. "This Week's Challenge: Validate Your ICP with 5 Conversations"

### Wins & Celebrations
1. "First Wins Thread - No Win Too Small"
2. "The Time I Lost a Deal and What It Taught Me"

### Introductions
1. "I'm Mike - 30+ Years in Enterprise Sales, Now Helping Founders"
2. "Introduce Yourself Template: [Name], [Business], [Goal]"

---

## SSO Integration Notes

NodeBB supports OAuth2/OpenID Connect for SSO. To connect with Lucia auth:

1. Install nodebb-plugin-sso-oauth2 or use passport-oauth2
2. Configure OAuth settings:
   - Authorization URL: https://ai-customer-acquisition-academy.soloframehub.com/api/auth/authorize
   - Token URL: https://ai-customer-acquisition-academy.soloframehub.com/api/auth/token
   - User Info URL: https://ai-customer-acquisition-academy.soloframehub.com/api/auth/userinfo
3. Map user attributes (email, name)
4. Auto-create users on first login
5. Assign to "Academy Members" group automatically

**Alternative:** Use JWT tokens for seamless login from academy to forum.
