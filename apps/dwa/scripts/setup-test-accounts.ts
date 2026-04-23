/**
 * Create test accounts for screenshot capture
 */

const BASE_URL = 'http://localhost:3000'

async function createTestAccounts() {
  console.log('🔧 Creating test accounts...')

  try {
    // Create test student
    console.log('Creating test student...')
    const studentRes = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'student@test.com',
        password: 'test123',
        name: 'Test Student',
      }),
    })

    if (studentRes.ok) {
      console.log('✅ Test student created')
    } else {
      const error = await studentRes.text()
      console.log('⚠️  Student might already exist:', error.substring(0, 100))
    }

    // Create test provider
    console.log('Creating test provider...')
    const providerRes = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'provider@test.com',
        password: 'test123',
        name: 'Test Provider',
        role: 'provider',
      }),
    })

    if (providerRes.ok) {
      console.log('✅ Test provider created')
    } else {
      const error = await providerRes.text()
      console.log('⚠️  Provider might already exist:', error.substring(0, 100))
    }

    console.log('\n✅ Test accounts ready!')
    console.log('   Student: student@test.com / test123')
    console.log('   Provider: provider@test.com / test123')

  } catch (error) {
    console.error('❌ Error creating test accounts:', error)
    throw error
  }
}

createTestAccounts().catch(console.error)
