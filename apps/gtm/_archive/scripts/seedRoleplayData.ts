import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') })

// Initialize Firebase Admin using the service account from config
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(__dirname, '../config/sales-academy-7f17a-3ad46fbb2776.json')

if (!getApps().length) {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'))
    initializeApp({ credential: cert(serviceAccount) })
    console.log('🔥 Firebase Admin initialized with service account')
  } else {
    initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID })
    console.log('☁️ Firebase Admin initialized with ADC')
  }
}

const db = getFirestore()


async function seedCollection(collectionName: string, data: any[]) {
  console.log(`Seeding ${collectionName}...`)
  const batch = db.batch()

  for (const item of data) {
    const docId = item.category_id || item.industry_id || item.role_id || item.disc_type
    const ref = db.collection(collectionName).doc(docId)
    batch.set(ref, {
      ...item,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  await batch.commit()
  console.log(`✅ Seeded ${data.length} documents to ${collectionName}`)
}

async function seedIndustries() {
  console.log('Seeding industries...')
  const industriesDir = path.join(__dirname, '../seed-data/industries')
  const files = fs.readdirSync(industriesDir).filter(f => f.endsWith('.json'))

  for (const file of files) {
    const industry = JSON.parse(fs.readFileSync(path.join(industriesDir, file), 'utf-8'))
    await db.collection('industries').doc(industry.industry_id).set({
      ...industry,
      created_at: new Date(),
      updated_at: new Date()
    })
  }
  console.log(`✅ Seeded ${files.length} industries`)
}

async function main() {
  try {
    // Seed founder categories
    const founderCategories = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../seed-data/founderCategories.json'), 'utf-8')
    )
    await seedCollection('founderCategories', founderCategories)

    // Seed industries
    await seedIndustries()

    // Seed client roles
    const clientRoles = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../seed-data/clientRoles.json'), 'utf-8')
    )
    await seedCollection('clientRoles', clientRoles)

    // Seed DISC patterns
    const discPatterns = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../seed-data/discPatterns.json'), 'utf-8')
    )
    await seedCollection('discPatterns', discPatterns)

    console.log('\n🎉 All collections seeded successfully!')

  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

main()
