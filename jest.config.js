module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy'
    }
};
