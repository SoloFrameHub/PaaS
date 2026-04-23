# Cloud Architecture Strategy for HIPAA-Compliant Healthcare Deployment

**Focus:** Enabling licensed mental health practices to migrate to Google Cloud with Business Associate Agreements (BAA)

---

## Overview

The mental-health-education platform is architected to be **cloud-agnostic** and **HIPAA-ready**, enabling straightforward migration to Google Cloud infrastructure that supports Business Associate Agreements with healthcare practices.

---

## Current Architecture: Hostinger VPS

```
┌────────────────────────────────────────────────────┐
│         Hostinger Managed VPS (46.202.88.248)      │
│         KVM 8 | 32GB RAM | 8 CPU | NVMe SSD       │
└────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───▼─────┐  ┌──────▼──────┐  ┌─────▼──────┐
    │ Dokploy  │  │  PostgreSQL │  │   Redis    │
    │          │  │  (Managed)  │  │ (Managed)  │
    └──────────┘  └─────────────┘  └────────────┘
        │
        ├─ Next.js 16 (mhe-nextjs)
        │  └─ Routes: /api/safety/classify
        │
        └─ Distress Classifier Service
           └─ FastAPI + DistilBERT Model
           └─ Internal: distress-classifier:8001
```

**Key Characteristics:**
- Docker Swarm orchestration
- Services on internal `dokploy-network`
- PostgreSQL for persistent data
- Redis for session/cache
- Classifier service accessible only internally

---

## Target Architecture: Google Cloud (with BAA)

```
┌────────────────────────────────────────────────────────┐
│    Google Cloud Project (HIPAA-eligible services)      │
│    + Business Associate Agreement with healthcare      │
│      practice / licensed therapist network             │
└────────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────────────┐
        │                │                         │
    ┌───▼──────────┐ ┌───▼────────────┐  ┌───────▼──────────┐
    │ Cloud Run    │ │  Cloud SQL     │  │ Cloud Memorystore│
    │              │ │  (PostgreSQL)  │  │ (Redis - BAA)    │
    │ - Auto-scale │ │  (BAA-eligible)│  │                  │
    │ - HTTPS only │ │                │  │ - Encrypted TLS  │
    │ - VPC native │ │ - Encrypted at │  │ - Private VPC    │
    │              │ │   rest (CMEK)  │  │ - Audit logs     │
    └──────────────┘ └────────────────┘  └──────────────────┘
        │
        ├─ Next.js Container
        │  └─ Routes: /api/safety/classify
        │  └─ Health checks
        │
        └─ Distress Classifier Container
           └─ FastAPI + DistilBERT
           └─ CPU/GPU: configurable
           └─ Scaling: 0-N replicas
           │
           └─ Additional Services:
              ├─ Cloud Pub/Sub (event stream)
              ├─ Firestore (audit logs)
              ├─ Cloud Logging (HIPAA audit trail)
              └─ Cloud Monitoring (alerting)
```

---

## Migration Strategy: Three Phases

### Phase 1: Containerization ✅ COMPLETE

**Objective:** Ensure all services run in containers without host dependencies

**Completed:**
- [x] Next.js app containerized
- [x] PostgreSQL uses standard image
- [x] Redis uses standard image
- [x] Distress Classifier containerized with DistilBERT model
- [x] No host-specific paths or binaries
- [x] Environment variables for all configuration
- [x] Health checks defined for all services

**Result:** Services can run on any Docker-compatible platform

---

### Phase 2: Cloud Preparation

**Objective:** Document cloud migration steps for licensed practices

**Required Steps:**

1. **Google Cloud Project Setup**
   ```bash
   gcloud projects create mental-health-practice
   gcloud config set project mental-health-practice
   ```

2. **Enable HIPAA-Eligible Services**
   - Cloud Run (compute)
   - Cloud SQL (database)
   - Cloud Memorystore (cache)
   - Cloud Storage (backups)
   - Cloud Logging (audit)
   - Cloud Monitoring (alerts)

3. **Configure Security**
   ```yaml
   # VPC Configuration
   network: "healthcare-vpc"
   subnet: "healthcare-subnet"
   private_ip_google_access: true
   
   # Network Policy
   ingress_rules:
     - source: "cloud-load-balancer"
       protocol: "HTTPS"
       port: 443
     
   egress_rules:
     - destination: "googleapis.com"
       protocol: "HTTPS"
   
   # Encryption
   kms_key: "projects/practice-project/locations/us-central1/keyRings/healthcare/cryptoKeys/default"
   encryption_in_transit: "TLS 1.2+"
   ```

4. **Database Migration**
   ```bash
   # Export from Hostinger
   pg_dump -h hostinger-db -U postgres > backup.sql
   
   # Import to Cloud SQL
   gcloud sql import sql practice-db backup.sql \
     --instance=practice-postgres \
     --database=mhe_db
   ```

5. **Service Deployment**
   ```bash
   # Build and push images
   gcloud builds submit --tag gcr.io/practice-project/mhe-nextjs
   gcloud builds submit --tag gcr.io/practice-project/distress-classifier
   
   # Deploy to Cloud Run
   gcloud run deploy mhe-nextjs \
     --image gcr.io/practice-project/mhe-nextjs \
     --platform managed \
     --region us-central1 \
     --vpc-connector healthcare-vpc-connector \
     --set-env-vars "DATABASE_URL=cloudsql://..." \
     --allow-unauthenticated
   
   gcloud run deploy distress-classifier \
     --image gcr.io/practice-project/distress-classifier \
     --platform managed \
     --region us-central1 \
     --vpc-connector healthcare-vpc-connector \
     --memory 4Gi \
     --cpu 4 \
     --concurrency 10 \
     --allow-unauthenticated
   ```

---

### Phase 3: HIPAA Compliance Configuration

**Objective:** Enable Business Associate Agreement with Google Cloud

**Implementation:**

1. **Audit Logging**
   ```python
   # Cloud Logging integration
   from google.cloud import logging as cloud_logging
   
   logging_client = cloud_logging.Client()
   cloud_logger = logging_client.logger('mhe-audit')
   
   # Log classification event (no PHI)
   cloud_logger.log_struct({
       'event': 'distress_classification',
       'user_id': user_id,
       'level': classification_level,
       'confidence': confidence,
       'timestamp': timestamp,
       'ip_address': request.ip,
       # NOTE: text NOT logged - HIPAA compliance
   }, severity='INFO')
   ```

2. **Access Control**
   ```yaml
   # Google Cloud IAM
   roles:
     practice_clinician:
       - roles/run.invoker
       - roles/cloudsql.client
       - roles/logging.viewer
     
     practice_admin:
       - roles/run.admin
       - roles/cloudsql.admin
       - roles/iam.securityAdmin
     
     system_service:
       - roles/run.serviceAgent
       - roles/cloudsql.serviceAgent
   
   conditions:
     timeOfDay:
       start: "08:00"
       end: "18:00"
       timezone: "America/New_York"
   ```

3. **Encryption Configuration**
   ```yaml
   # Customer-Managed Encryption Keys (CMEK)
   Cloud SQL:
     customer_key: projects/practice/locations/us-central1/keyRings/hr/cryptoKeys/sql
   
   Cloud Storage:
     customer_key: projects/practice/locations/us-central1/keyRings/hr/cryptoKeys/storage
   
   Application Secrets:
     - Secret Manager with CMEK
     - Database credentials
     - API keys
     - Model weights (if needed)
   ```

4. **VPC Service Controls**
   ```yaml
   # Create security perimeter
   accessPolicies:
     - name: "healthcare-practice"
   
   accessLevels:
     - name: "trusted_locations"
       basic:
         conditions:
           ipSubnets:
             - ipCidrRange: "203.0.113.0/24"  # Practice office
   
   servicePerimeters:
     - name: "mhe-perimeter"
       restrictedServices:
         - storage.googleapis.com
         - sql.googleapis.com
         - compute.googleapis.com
       accessLevels:
         - trusted_locations
   ```

5. **Backup & Disaster Recovery**
   ```yaml
   # Cloud SQL automated backups
   backup_configuration:
     enabled: true
     location: "us"
     binary_log_enabled: true
     replication_type: "SYNCHRONOUS"
     backup_retention_days: 30
   
   # Cross-region replication
   replicas:
     - name: "backup-replica"
       region: "us-west1"
       availability_type: "ZONAL"
   ```

---

## HIPAA Compliance Matrix

| Requirement | Current (Hostinger) | Google Cloud | Evidence |
|-----------|-------------------|-------------|----------|
| **Encryption at Rest** | ✅ AES-256 | ✅ CMEK available | GCP Security docs |
| **Encryption in Transit** | ✅ TLS 1.2+ | ✅ TLS 1.3+ default | GCP networking |
| **Access Logging** | ✅ Custom logs | ✅ Cloud Audit Logs | Cloud Logging API |
| **User Authentication** | ✅ Lucia auth | ✅ + Identity Platform | Google Cloud IAM |
| **Data Backup** | ✅ Manual snapshots | ✅ Automated, versioned | Cloud SQL features |
| **PHI Segregation** | ✅ Text not stored | ✅ Data residency zones | GCP compliance |
| **Business Associate Agreement** | ⚠️ Not available | ✅ Signed by Google | Google Cloud BAA |
| **Audit Trail** | ✅ Application logs | ✅ Cloud Audit Logs | Automatic logging |
| **Disaster Recovery** | ✅ Manual | ✅ Automated failover | Cloud SQL HA |
| **Penetration Testing** | ⚠️ Manual | ✅ Authorized testing | GCP Acceptable Use |

---

## Cost Analysis: Hostinger vs Google Cloud

### Hostinger (Current)

```
Monthly Costs:
- VPS (KVM 8): $50
- PostgreSQL: Included
- Redis: Included
- Storage: Included
─────────────────
Total: ~$50/month

Scaling: Manual (upgrade plan)
```

### Google Cloud (Healthcare-Grade)

```
Monthly Costs (for 1,000 active users):

Compute:
- Cloud Run (mhe-nextjs): ~$40
  (100 req/s average, 0.5 GB memory)
- Cloud Run (classifier): ~$30
  (50 req/s average, 4 GB memory)

Storage:
- Cloud SQL (PostgreSQL): ~$100
  (10GB, high availability, backups)
- Cloud Memorystore (Redis): ~$60
  (1GB, encrypted, private network)

Monitoring:
- Cloud Logging: ~$20
- Cloud Monitoring: ~$10

Data Transfer: ~$10

─────────────────
Estimated Total: ~$270/month

(Scales: As traffic increases, Cloud Run auto-scales)
```

**Key Difference:** Hostinger is cheap but fixed resources. Google Cloud scales with usage but includes BAA compliance, auditing, and disaster recovery.

---

## Advantages of Cloud Migration for Licensed Practices

### Operational

1. **Compliance Automation**
   - Audit logs generated automatically
   - Encryption configured by default
   - HIPAA requirements baked in

2. **Managed Services**
   - No database administration
   - Automatic backups and recovery
   - Patch management handled

3. **Scalability**
   - Auto-scaling to handle patient load growth
   - No manual infrastructure management
   - Pay only for what you use

### Security

1. **Physical Security**
   - Google's data center security
   - Multi-layered physical access controls
   - Continuous monitoring

2. **Logical Security**
   - IAM controls down to individual permission
   - Encryption at rest and in transit
   - Network isolation with VPC

3. **Compliance**
   - Business Associate Agreement signed
   - SOC 2 Type II certified
   - HIPAA compliance certified

### Business

1. **Reliability**
   - 99.99% SLA on Cloud SQL
   - Automatic failover and recovery
   - Geographic redundancy

2. **Support**
   - 24/7 Google Cloud support
   - HIPAA compliance helpline
   - Architecture review services

3. **Innovation**
   - Access to Google AI services (Vertex AI)
   - BigQuery for de-identified research
   - Advanced security tools

---

## Implementation Timeline for Practice

```
Week 1: Assessment & Planning
├─ Review data volumes
├─ Identify compliance needs
└─ Cost estimation

Week 2-3: Infrastructure Setup
├─ Google Cloud project creation
├─ VPC and network configuration
├─ KMS and encryption setup
└─ IAM role definition

Week 4-5: Application Migration
├─ Database migration
├─ Container deployment
├─ Testing and validation
└─ Performance tuning

Week 6: Go-Live
├─ DNS cutover
├─ Monitoring verification
├─ Team training
└─ Documentation review

Week 7+: Ongoing
├─ Monthly cost optimization
├─ Quarterly security reviews
├─ Annual compliance audit
└─ Continuous monitoring
```

---

## Conclusion

The mental-health-education platform's architecture is **specifically designed to support licensed healthcare practices** seeking to operate with enterprise-grade HIPAA compliance. By leveraging containerization and cloud-agnostic design principles, practices can:

1. ✅ Start with managed infrastructure (Hostinger)
2. ✅ Graduate to enterprise cloud (Google Cloud)
3. ✅ Execute Business Associate Agreements
4. ✅ Maintain full regulatory compliance
5. ✅ Scale to serve multiple providers

This flexibility and compliance-first design is a **key competitive advantage** for Nebius in the healthcare education market.

---

**Document Version:** 1.0  
**Status:** Architectural Reference  
**Last Updated:** April 14, 2026
