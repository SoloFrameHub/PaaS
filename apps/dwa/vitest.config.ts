import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        alias: {
            '@': path.resolve(__dirname, './')
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', '.next/', 'out/', 'e2e/']
        },
        exclude: ['**/node_modules/**', '**/dist/**', '.next/**', 'out/**', 'e2e/**', '_archive/**'],
        setupFiles: ['./vitest-setup.ts']
    }
})
