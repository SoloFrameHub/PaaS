
import { flattenObject } from '../lib/utils/object';

console.log('Running Cycle Detection Test for flattenObject...');

const circular: any = { a: 1 };
circular.self = circular;

try {
    const flattened = flattenObject(circular);
    console.log('✅ Successfully handled circular reference.');
    console.log('Result keys:', Object.keys(flattened));

    if (flattened['self']) {
        console.error('❌ Circular reference was not pruned!');
        process.exit(1);
    }
} catch (e) {
    console.error('❌ Crashed on circular reference:', e);
    process.exit(1);
}

const deep: any = { a: { b: { c: 1 } } };
deep.a.b.cycle = deep.a;

try {
    const flattenedDeep = flattenObject(deep);
    console.log('✅ Successfully handled deep circular reference.');
    console.log('Result:', JSON.stringify(flattenedDeep, null, 2));
} catch (e) {
    console.error('❌ Crashed on deep circular reference:', e);
}
