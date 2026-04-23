import noDirectDbAccess from './no-direct-db-access.js';
import noCrossVerticalImport from './no-cross-vertical-import.js';

const plugin = {
  meta: { name: '@platform/eslint-plugin', version: '0.0.0' },
  rules: {
    'no-direct-db-access': noDirectDbAccess,
    'no-cross-vertical-import': noCrossVerticalImport,
  },
};

export default plugin;
export { noDirectDbAccess, noCrossVerticalImport };
