import { DataStoreServiceClient } from '@google-cloud/discoveryengine';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'customer-acquisition-aca-182f9';
const LOCATION = 'global';
const COLLECTION_ID = 'default_collection';
const BUCKET_NAME = `${PROJECT_ID}-docs`;
const DATA_STORE_ID = 'customer-acquisition-docs';
const DATA_STORE_DISPLAY_NAME = 'Customer Acquisition Documents';

async function main() {
    console.log(`🚀 Starting Vertex AI Data Store setup for project: ${PROJECT_ID}`);

    // 1. Setup Google Cloud Storage
    const storage = new Storage();
    const bucket = storage.bucket(BUCKET_NAME);

    try {
        const [exists] = await bucket.exists();
        if (!exists) {
            console.log(`📦 Creating GCS bucket: ${BUCKET_NAME}...`);
            await bucket.create({
                location: 'US',
                starterProject: PROJECT_ID
            });
            console.log('✅ Bucket created.');
        } else {
            console.log(`ℹ️ Bucket ${BUCKET_NAME} already exists.`);
        }

        // Upload a placeholder file (Data Store requires content to be created)
        const placeholderFile = bucket.file('placeholder.txt');
        await placeholderFile.save('Placeholder content to initialize Data Store.', {
            contentType: 'text/plain'
        });
        console.log('📄 Uploaded placeholder.txt to bucket.');

    } catch (err: any) {
        console.error('❌ Error setting up GCS:', err.message);
        process.exit(1);
    }

    // 2. Create Data Store via Discovery Engine API
    const client = new DataStoreServiceClient();

    try {
        const parent = client.collectionPath(PROJECT_ID, LOCATION, COLLECTION_ID);
        const dataStoreName = `${parent}/dataStores/${DATA_STORE_ID}`;

        // Check if exists (by attempting to list or get - simplified here to just try create)
        console.log(`🔍 Creating Data Store: ${DATA_STORE_DISPLAY_NAME}...`);

        const [operation] = await client.createDataStore({
            parent,
            dataStoreId: DATA_STORE_ID,
            dataStore: {
                displayName: DATA_STORE_DISPLAY_NAME,
                industryVertical: 'GENERIC',
                solutionTypes: ['SOLUTION_TYPE_SEARCH'] as any,
                contentConfig: 'CONTENT_REQUIRED',
            }
        }) as any;

        console.log('⏳ Waiting for Data Store creation (this may take a minute)...');
        await operation.promise();
        console.log(`✅ Data Store created successfully! ID: ${DATA_STORE_ID}`);

        console.log('\n🎉 Setup Complete!');
        console.log(`   Data Store ID: ${DATA_STORE_ID}`);
        console.log(`   GCS Bucket: gs://${BUCKET_NAME}`);
        console.log('\nPlease add these to your .env.local if not already present.');

    } catch (err: any) {
        if (err.message.includes('already exists')) {
            console.log(`ℹ️ Data Store ${DATA_STORE_ID} already exists.`);
        } else {
            console.error('❌ Error creating Data Store:', err.message);
            // Don't exit here, maybe we just need to import data
        }
    }
}

main().catch(console.error);
