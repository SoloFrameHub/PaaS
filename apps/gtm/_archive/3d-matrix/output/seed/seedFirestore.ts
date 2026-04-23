import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import * as fs from 'fs'
import * as path from 'path'

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json')
initializeApp({
  credential: cert(serviceAccount)
})

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
  const industriesDir = path.join(__dirname, '../data/industries')
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
      fs.readFileSync(path.join(__dirname, '../data/founderCategories.json'), 'utf-8')
    )
    await seedCollection('founderCategories', founderCategories)

    // Seed industries
    await seedIndustries()

    // Seed client roles
    const clientRoles = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/clientRoles.json'), 'utf-8')
    )
    await seedCollection('clientRoles', clientRoles)

    // Seed DISC patterns
    const discPatterns = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/discPatterns.json'), 'utf-8')
    )
    await seedCollection('discPatterns', discPatterns)

    console.log('\n🎉 All collections seeded successfully!')

  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

main()
