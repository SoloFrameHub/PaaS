import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore, WriteBatch } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { FounderCategory, Industry, ClientRole, DiscPattern } from '../types/roleplay';

// --- CONFIGURATION ---
const SERVICE_ACCOUNT_PATH = path.join(process.cwd(), 'config/sales-academy-7f17a-3ad46fbb2776.json');
const SEED_DATA_DIR = path.join(process.cwd(), 'seed-data');

// --- INITIALIZATION ---
function initAdmin(): App {
    if (!getApps().length) {
        if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
            throw new Error(`❌ Service account key not found at ${SERVICE_ACCOUNT_PATH}`);
        }
        const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
        return initializeApp({
            credential: cert(serviceAccount),
        });
    }
    return getApps()[0];
}

const app = initAdmin();
const db = getFirestore(app);

// --- UTILS ---
async function commitBatch(batch: WriteBatch, label: string) {
    console.log(`⏳ Committing batch for ${label}...`);
    await batch.commit();
    console.log(`✅ ${label} committed successfully.`);
}

// --- SEEDING FUNCTIONS ---

async function seedFounderCategories() {
    console.log('\n--- Seeding Founder Categories ---');
    const data: FounderCategory[] = JSON.parse(
        fs.readFileSync(path.join(SEED_DATA_DIR, 'founderCategories.json'), 'utf8')
    );
    const batch = db.batch();

    data.forEach((item) => {
        const ref = db.collection('founderCategories').doc(item.category_id);
        batch.set(ref, {
            ...item,
            _seededAt: new Date().toISOString(),
        });
        console.log(`  + Registered: ${item.category_id}`);
    });

    await commitBatch(batch, 'Founder Categories');
}

async function seedClientRoles() {
    console.log('\n--- Seeding Client Roles ---');
    const data: ClientRole[] = JSON.parse(
        fs.readFileSync(path.join(SEED_DATA_DIR, 'clientRoles.json'), 'utf8')
    );

    // Client roles can be many (up to 60), so we might need multiple batches if > 500
    // But 60 is well within the 500 batch limit.
    const batch = db.batch();

    data.forEach((item) => {
        const ref = db.collection('clientRoles').doc(item.role_id);
        batch.set(ref, {
            ...item,
            _seededAt: new Date().toISOString(),
        });
        console.log(`  + Registered: ${item.role_id}`);
    });

    await commitBatch(batch, 'Client Roles');
}

async function seedDiscPatterns() {
    console.log('\n--- Seeding DISC Patterns ---');
    const data: DiscPattern[] = JSON.parse(
        fs.readFileSync(path.join(SEED_DATA_DIR, 'discPatterns.json'), 'utf8')
    );
    const batch = db.batch();

    data.forEach((item) => {
        const ref = db.collection('discPatterns').doc(item.disc_type);
        batch.set(ref, {
            ...item,
            _seededAt: new Date().toISOString(),
        });
        console.log(`  + Registered: ${item.disc_type}`);
    });

    await commitBatch(batch, 'DISC Patterns');
}

async function seedIndustries() {
    console.log('\n--- Seeding Industries ---');
    const industriesDir = path.join(SEED_DATA_DIR, 'industries');
    const files = fs.readdirSync(industriesDir).filter(f => f.endsWith('.json'));

    const batch = db.batch();

    files.forEach((file) => {
        const filePath = path.join(industriesDir, file);
        const industry: Industry = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const ref = db.collection('industries').doc(industry.industry_id);
        batch.set(ref, {
            ...industry,
            _seededAt: new Date().toISOString(),
        });
        console.log(`  + Registered: ${industry.industry_id}`);
    });

    await commitBatch(batch, 'Industries');
}

// --- MAIN ---
async function run() {
    console.log('🚀 Starting Production Data Seed...');

    try {
        await seedFounderCategories();
        await seedClientRoles();
        await seedDiscPatterns();
        await seedIndustries();

        console.log('\n🎉 ALL COLLECTIONS SEEDED SUCCESSFULLY!');
    } catch (error) {
        console.error('\n❌ SEEDING FAILED:');
        console.error(error);
        process.exit(1);
    }
}

run();
