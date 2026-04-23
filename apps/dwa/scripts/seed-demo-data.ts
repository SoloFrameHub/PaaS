/**
 * Seed realistic demo data for screenshot capture
 *
 * Creates:
 * - Provider account with patients
 * - Patient accounts with progress
 * - Course enrollments and completions
 * - Journal entries (some with distress signals)
 * - Quiz attempts
 * - Alerts
 */

const BASE_URL = 'http://localhost:3000'

const DEMO_PATIENTS = [
  { email: 'patient1@demo.com', name: 'Sarah Chen', progress: 65 },
  { email: 'patient2@demo.com', name: 'Michael Rodriguez', progress: 42 },
  { email: 'patient3@demo.com', name: 'Emily Johnson', progress: 89 },
  { email: 'patient4@demo.com', name: 'James Williams', progress: 23 },
  { email: 'patient5@demo.com', name: 'Maria Garcia', progress: 71 },
]

async function seedDemoData() {
  console.log('🌱 Seeding demo data...')

  try {
    // Note: With mock auth, we can't actually create persistent data
    // Instead, this script documents what demo data would look like

    console.log('\n📋 Demo Data Structure:')
    console.log('\nProvider Account:')
    console.log('  Email: provider@demo.com')
    console.log('  Name: Dr. Jennifer Martinez')
    console.log('  NPI: 1234567890')
    console.log('  Patients: 5 active')

    console.log('\nPatients:')
    DEMO_PATIENTS.forEach((patient, idx) => {
      console.log(`  ${idx + 1}. ${patient.name}`)
      console.log(`     Email: ${patient.email}`)
      console.log(`     Progress: ${patient.progress}%`)
      console.log(`     Status: ${patient.progress > 60 ? 'Engaged' : patient.progress > 30 ? 'Active' : 'Needs attention'}`)
    })

    console.log('\n⚠️  Distress Alerts:')
    console.log('  1. Sarah Chen - High distress detected in journal entry')
    console.log('     "I feel completely overwhelmed and don\'t know how to cope anymore"')
    console.log('     Timestamp: 2 hours ago')
    console.log('     Status: Unresolved')

    console.log('\n📚 Course Progress:')
    console.log('  - Anxiety Management: 3 students, avg 67% complete')
    console.log('  - Mood & Emotions: 2 students, avg 45% complete')
    console.log('  - Movement for Performance: 4 students, avg 52% complete')

    console.log('\n✅ Demo data structure documented')
    console.log('\n💡 Next step: Use Playwright to navigate to pages and capture screenshots')

    return {
      provider: { email: 'provider@demo.com', password: 'demo123' },
      patients: DEMO_PATIENTS,
    }

  } catch (error) {
    console.error('❌ Error seeding demo data:', error)
    throw error
  }
}

if (require.main === module) {
  seedDemoData()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export { seedDemoData }
