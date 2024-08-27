module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json', // Your tsconfig file
                diagnostics: true, // Set to false to disable type checking during tests
            },
        ],
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
    testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    setupFiles: ['<rootDir>/mock-extension-apis.js'],
};
