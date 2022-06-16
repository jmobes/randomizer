module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./src/__mocks__/client.js'],
  setupFilesAfterEnv: ['./jest.setup.js', '@testing-library/jest-dom/extend-expect'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom'
}