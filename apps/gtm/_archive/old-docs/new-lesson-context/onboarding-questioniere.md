Based on the project documentation (particularly `cohort-forum-strategy.md`, the DISC research, and the 10 founder personas in the playbook), here's a comprehensive onboarding question structure:

---

## Customer Acquisition Academy Onboarding Questions

### **SECTION 1: Business Context** (Required for personalization + roleplay)

**Q1. What are you building?**
- *Free text* → AI extracts: product type, industry, target customer

**Q2. Business Model**
- [ ] B2B - Selling to businesses
- [ ] B2C / Creator - Selling to individuals  
- [ ] Hybrid - Both

**Q3. Primary Industry/Vertical** (Multiple choice)
- [ ] SaaS / Software
- [ ] E-commerce / DTC
- [ ] Professional Services / Consulting
- [ ] Coaching / Courses / Education
- [ ] Agency / Freelance Services
- [ ] Healthcare / Wellness
- [ ] Fintech / Finance
- [ ] AI / Tech Tools
- [ ] Media / Content
- [ ] Marketplace / Platform
- [ ] Physical Products / Manufacturing
- [ ] Other: ___

**Q4. Target Deal Size** (For roleplay scenario calibration)
- [ ] Under $500 (Transactional)
- [ ] $500 - $5K (SMB)
- [ ] $5K - $25K (Mid-market)
- [ ] $25K+ (Enterprise)

---

### **SECTION 2: Current State** (For path recommendation)

**Q5. Where are you in your sales journey?**
- [ ] Haven't started outreach yet
- [ ] Doing outreach, no meetings booked
- [ ] Getting meetings, struggling to close
- [ ] Closing some deals, want to systematize
- [ ] Have a process, optimizing for scale

**Q6. Current Monthly Revenue**
- [ ] Pre-revenue / $0
- [ ] Under $1K MRR
- [ ] $1K - $5K MRR
- [ ] $5K - $20K MRR
- [ ] $20K+ MRR

**Q7. How many customers do you have?**
- [ ] 0 (seeking first customer)
- [ ] 1-10
- [ ] 11-50
- [ ] 50+

---

### **SECTION 3: Founder Profile** (For archetype matching + AI coaching tone)

**Q8. Which description fits you best?**
- [ ] Technical founder - I built the product, now need to sell it
- [ ] Domain expert - I know the industry, learning to productize
- [ ] Service provider - Running an agency/consulting, want to scale
- [ ] Creator/Coach - Building audience-driven business
- [ ] Returning founder - Did this before, starting fresh
- [ ] Side project founder - Building while employed full-time

**Q9. What's your biggest barrier to selling? (Select up to 2)**
- [ ] Fear of rejection / cold outreach feels wrong
- [ ] Don't know who to target
- [ ] Getting ghosted after first contact
- [ ] Can't explain value clearly on calls
- [ ] Struggle to handle objections
- [ ] Pricing feels uncomfortable
- [ ] Don't have time to sell AND build
- [ ] I'm the product person, not the sales person

---

### **SECTION 4: DISC Assessment** (4-5 scenario questions)

**Q10-14. Scenario-Based DISC Questions**

*Example format:*

> "You're on a sales call and the prospect starts drilling into technical details you don't know. Do you:"
> - A) Confidently redirect to business outcomes you can speak to → **D**
> - B) Engage enthusiastically and promise to get them answers → **I**
> - C) Honestly admit the gap and offer to follow up with specifics → **S**
> - D) Ask clarifying questions to understand exactly what they need → **C**

*(4-5 scenarios covering: conflict handling, communication preference, decision-making speed, relationship vs. results orientation)*

---

### **SECTION 5: Learning Priorities** (For path + content personalization)

**Q15. What feels most urgent right now?**
- [ ] Building my prospect list (finding WHO to sell to)
- [ ] Getting responses to outreach (LinkedIn, cold email)
- [ ] Running better discovery calls
- [ ] Giving demos that convert
- [ ] Handling objections and closing deals
- [ ] Systemizing what's working

**Q16. Which channels are you actively using?** (Select all)
- [ ] LinkedIn
- [ ] Cold email
- [ ] Content marketing / SEO
- [ ] Social selling (Twitter/X)
- [ ] Referrals / word of mouth
- [ ] Inbound from website
- [ ] Partnerships
- [ ] None yet

---

### **SECTION 6: Engagement Capacity**

**Q17. Weekly time commitment for learning?**
- [ ] 30 min or less
- [ ] 1-2 hours
- [ ] 3-5 hours
- [ ] 5+ hours

**Q18. Learning style preference** (For AI coaching mode)
- [ ] Give me frameworks, I'll figure it out → *Aggressive mode*
- [ ] Guide me step by step → *Assistive mode*
- [ ] Mix of both depending on topic

---

### **SECTION 7: Goals & Success Definition**

**Q19. What does success look like in 90 days?** (Free text)
*AI extracts quantifiable goals for milestone tracking*

**Q20. Do you have an ICP (Ideal Customer Profile) documented?**
- [ ] No, not yet
- [ ] Rough idea but not written down
- [ ] Yes, basic version
- [ ] Yes, detailed and tested

---

## Data Generated for Platform Use

From these questions, the system creates:

```typescript
interface StudentProfile {
  // Matching
  curriculum_stage: 'foundation' | 'marketing' | 'sales' | 'pipeline' | 'scale'
  business_context: {
    model: 'b2b' | 'b2c' | 'hybrid'
    deal_size: 'transactional' | 'smb' | 'mid_market' | 'enterprise'
    industry: string
    revenue_stage: string
  }
  
  // Personalization
  founder_archetype: string  // Maps to 10 personas
  disc_profile: { primary: 'D'|'I'|'S'|'C', secondary?: 'D'|'I'|'S'|'C' }
  barriers: string[]
  preferred_channels: string[]
  coaching_mode: 'aggressive' | 'assistive' | 'adaptive'
  
  // Goals
  goals_90_day: string
  has_icp: boolean
  time_commitment: 'minimal' | 'moderate' | 'intensive'
}
```

