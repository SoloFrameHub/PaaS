# API-Driven Lesson Creation - Documentation Suite

**Complete documentation for creating production-ready lessons using Typebot and Gamma APIs**

---

## 📚 Documentation Index

### 1. [WORKFLOW-API-DRIVEN-LESSON-CREATION.md](./WORKFLOW-API-DRIVEN-LESSON-CREATION.md)
**Comprehensive step-by-step guide**

Complete workflow documentation covering:
- Prerequisites and API setup
- Step-by-step instructions for each API
- Troubleshooting common issues
- Production deployment procedures
- API reference and examples

**Use this when**: Creating your first lesson or need detailed explanations

---

### 2. [LESSON-DEPLOYMENT-CHECKLIST.md](./LESSON-DEPLOYMENT-CHECKLIST.md)
**Quick reference checklist**

Streamlined checklist for rapid deployment:
- Pre-deployment requirements
- Step-by-step deployment tasks
- Verification procedures
- Post-deployment testing
- Quick command reference
- Rollback procedures

**Use this when**: Deploying lessons after you've learned the workflow

---

### 3. [LESSON-1-1-DEPLOYMENT-RECORD.md](./LESSON-1-1-DEPLOYMENT-RECORD.md)
**Real-world deployment example**

Actual production deployment record showing:
- All IDs, URLs, and API responses
- Exact commands used
- Troubleshooting issues encountered
- Verification results
- Performance metrics

**Use this when**: You need a concrete example or reference values

---

## 🚀 Quick Start

### First Time? Start Here:

1. **Read** → [WORKFLOW-API-DRIVEN-LESSON-CREATION.md](./WORKFLOW-API-DRIVEN-LESSON-CREATION.md)
   - Understand the complete process
   - Set up API credentials
   - Learn troubleshooting techniques

2. **Reference** → [LESSON-1-1-DEPLOYMENT-RECORD.md](./LESSON-1-1-DEPLOYMENT-RECORD.md)
   - See actual API responses
   - Copy working configurations
   - Learn from solved problems

3. **Execute** → [LESSON-DEPLOYMENT-CHECKLIST.md](./LESSON-DEPLOYMENT-CHECKLIST.md)
   - Follow the checklist step-by-step
   - Verify each stage
   - Deploy with confidence

---

## 📖 What This Workflow Accomplishes

### Creates Production-Ready Lessons That Include:

✅ **Interactive Typebot Assessments**
- Created programmatically via API
- Embedded in lesson HTML
- Configured for student interaction

✅ **Professional Gamma Presentations**
- Generated via AI with custom content
- Exported as PDF automatically
- Embedded as interactive slides

✅ **Complete File Management**
- PDFs stored in Directus CMS
- Files deployed to production web server
- Proper permissions and access control

✅ **Production Deployment**
- Nginx configuration
- Docker container setup
- SSL-ready infrastructure
- Verified HTTP 200 responses

---

## 🔑 Key APIs Used

### Typebot API
- **Purpose**: Create interactive chatbot assessments
- **Endpoint**: `http://46.202.88.248:3000/api/v1`
- **Auth**: Bearer token
- **Docs**: Check your Typebot instance

### Gamma API
- **Purpose**: Generate AI-powered presentations
- **Endpoint**: `https://public-api.gamma.app/v0.2`
- **Auth**: x-api-key header
- **Docs**: https://developers.gamma.app

### Directus API
- **Purpose**: Store and manage PDF files
- **Endpoint**: `http://46.202.88.248:8055`
- **Auth**: Bearer token or access_token
- **Storage**: Local file system

---

## 📊 Workflow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   LESSON CREATION WORKFLOW                  │
└─────────────────────────────────────────────────────────────┘

1. CREATE TYPEBOT ASSESSMENT
   ├─ Get workspace ID from database
   ├─ POST to /api/v1/typebots
   ├─ Receive typebot ID
   └─ Update HTML with typebot ID

2. GENERATE GAMMA PRESENTATION
   ├─ POST to /v0.2/generations with exportAs: "pdf"
   ├─ Poll API until status: "completed"
   ├─ Receive Gamma URL and PDF export URL
   ├─ Download PDF
   └─ Update HTML with Gamma ID

3. STORE PDF IN DIRECTUS
   ├─ Copy PDF to VPS
   ├─ Copy to Directus container
   ├─ Create database entry
   └─ Verify file accessible

4. UPDATE LESSON HTML
   ├─ Replace typebot placeholder
   ├─ Replace Gamma placeholder
   ├─ Add PDF download button
   └─ Validate all links

5. DEPLOY TO PRODUCTION
   ├─ Create static files directory
   ├─ Copy HTML, PDF, and CSS files
   ├─ Create nginx configuration
   ├─ Update docker-compose volume
   ├─ Restart nginx container
   └─ Verify HTTP 200 responses

6. VERIFICATION & TESTING
   ├─ Test HTML loads
   ├─ Test PDF downloads
   ├─ Test CSS applies
   ├─ Verify Typebot interactive
   ├─ Verify Gamma embed displays
   └─ Test on mobile devices

✅ LESSON LIVE IN PRODUCTION
```

---

## 🎯 Success Example

### Lesson 1.1: Your Interactive Anxiety Journey

**Created**: October 24, 2025
**Time**: 15 minutes (fully automated)

**Results**:
- ✅ Typebot ID: `cmh41usv80001p41y7yzlcou7`
- ✅ Gamma ID: `fears3gbe8sq43x`
- ✅ PDF: 2.1MB, stored in Directus
- ✅ Production URL: `http://46.202.88.248/lesson-1-1-your-interactive-anxiety-journey.html`
- ✅ All components functional
- ✅ HTTP 200 on all resources

See full details in [LESSON-1-1-DEPLOYMENT-RECORD.md](./LESSON-1-1-DEPLOYMENT-RECORD.md)

---

## ⚠️ Common Pitfalls to Avoid

### Typebot API
❌ Forgetting to include `workspaceId` in request
✅ Always query database for workspace ID first

❌ Using expired API tokens
✅ Regenerate tokens if getting 401 errors

### Gamma API
❌ Using `Authorization: Bearer` header
✅ Use `x-api-key` header instead

❌ Trying to export PDF in separate call
✅ Include `exportAs: "pdf"` in initial generation

### Directus
❌ Assuming API upload will work without permissions
✅ Create admin policy or use direct file copy method

❌ Forgetting to restart Directus after permission changes
✅ Always restart: `docker-compose restart directus`

### Nginx
❌ Not recreating container after volume mount changes
✅ Use: `docker-compose down nginx && docker-compose up -d nginx`

❌ Syntax errors in nginx config
✅ Test before restart: `docker exec nginx nginx -t`

---

## 🛠️ Essential Commands

### Check API Status
```bash
# Typebot
curl -I http://46.202.88.248:3000/api/v1/typebots

# Gamma
curl -s https://public-api.gamma.app/v0.2/generations \
  -H "x-api-key: $GAMMA_KEY" | jq .

# Directus
curl -I http://46.202.88.248:8055/server/health
```

### Verify Production Deployment
```bash
ssh root@46.202.88.248 "
  docker exec nginx ls -lh /usr/share/nginx/html/anxiety-toolkit/
  curl -I -H 'Host: anxiety-toolkit.realpsychiatricservices.com' \
    http://localhost/lesson.html
"
```

### View Logs
```bash
# Nginx
docker logs nginx --tail 50

# Directus
docker logs directus --tail 50

# All containers
docker-compose logs --tail 50
```

---

## 📈 Scalability

### This Workflow Supports:

**Multiple Lessons**
- Each lesson gets its own directory
- Isolated nginx configurations
- Independent deployments

**Multiple Courses**
- Same APIs work for all courses
- Reusable CSS components
- Consistent deployment process

**Team Collaboration**
- All steps documented
- Repeatable process
- Version controlled

**Future Automation**
- Can be scripted end-to-end
- Potential for CLI tool
- Integration with CI/CD

---

## 🔄 Continuous Improvement

### Potential Enhancements:

1. **Create Bash Script**
   ```bash
   ./create-lesson.sh --title "Lesson Title" --typebot "Assessment Name"
   ```

2. **Add to CI/CD Pipeline**
   - Automatic deployment on git push
   - Staging environment testing
   - Production promotion workflow

3. **Enhance Monitoring**
   - Analytics integration
   - Error tracking
   - Performance monitoring

4. **Improve Content Management**
   - Lesson versioning in Directus
   - Content review workflow
   - Multi-language support

---

## 📞 Support & Resources

### Documentation Files
- Complete workflow: [WORKFLOW-API-DRIVEN-LESSON-CREATION.md](./WORKFLOW-API-DRIVEN-LESSON-CREATION.md)
- Quick checklist: [LESSON-DEPLOYMENT-CHECKLIST.md](./LESSON-DEPLOYMENT-CHECKLIST.md)
- Example deployment: [LESSON-1-1-DEPLOYMENT-RECORD.md](./LESSON-1-1-DEPLOYMENT-RECORD.md)

### External Resources
- Typebot Docs: Check your instance at `http://46.202.88.248:3000/api-reference`
- Gamma API Docs: https://developers.gamma.app
- Directus Docs: https://docs.directus.io

### Repository Structure
```
/Users/mike/github/rps-digital-wellness-platform/
├── WORKFLOW-API-DRIVEN-LESSON-CREATION.md    (Complete guide)
├── LESSON-DEPLOYMENT-CHECKLIST.md             (Quick checklist)
├── LESSON-1-1-DEPLOYMENT-RECORD.md            (Example deployment)
├── README-API-LESSON-WORKFLOW.md              (This file)
└── github-deployment/
    └── anxiety-toolkit/
        ├── lesson-1-1-your-interactive-anxiety-journey.html
        └── css/
            ├── lesson-styles.css
            ├── interactive-components.css
            ├── crisis-detection.css
            └── validation-fixes.css
```

---

## 🎓 Learning Path

### Beginner
1. Read the complete workflow document
2. Study the example deployment
3. Try deploying a test lesson following the checklist

### Intermediate
1. Deploy 2-3 lessons to understand variations
2. Troubleshoot common issues independently
3. Optimize deployment time

### Advanced
1. Create automation scripts
2. Set up CI/CD pipeline
3. Contribute workflow improvements

---

## ✅ Next Steps

### To Deploy Your Next Lesson:

1. **Prepare Content**
   - Write lesson HTML
   - Outline Typebot questions
   - Draft Gamma presentation content

2. **Use the Checklist**
   - Open [LESSON-DEPLOYMENT-CHECKLIST.md](./LESSON-DEPLOYMENT-CHECKLIST.md)
   - Follow each step
   - Check off as you go

3. **Verify & Launch**
   - Test all components
   - Verify HTTP 200 responses
   - Share lesson URL

4. **Document**
   - Record IDs and URLs
   - Note any issues encountered
   - Update internal documentation

---

## 🏆 Why This Workflow Rocks

**Speed**: Deploy complete lessons in 15 minutes
**Automation**: API-driven, minimal manual work
**Consistency**: Same process for every lesson
**Quality**: Production-ready with verification steps
**Scalability**: Works for 1 lesson or 100 lessons
**Documentation**: Fully documented for team use

---

**Created**: October 24, 2025
**Version**: 1.0.0
**Author**: Claude Code (AI Assistant)
**Status**: Production Ready ✅

---

*For questions or improvements, refer to the individual documentation files or update this documentation suite with new learnings.*
