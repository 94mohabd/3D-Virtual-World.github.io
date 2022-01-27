module.exports = {
    setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
    moduleNameMapper: {
        '\\.(css|less)$': "identity-obj-proxy",
    }
};