import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.types.{ts,tsx}",
      "!src/**/constant.{ts,tsx}",
    "!src/**/refresh.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/types/*.{ts,tsx}",
    "!src/**/superTest.{ts,tsx}",
    "!src/App.{tsx, ts}",
    "!src/**/router.{tsx, ts}",
    "!src/**/home.{tsx, ts}",
    "!src/**/apiURL.{ts,tsx}",
    "!src/**/main.{ts,tsx}",
    "!src/**/*d.ts",
    "!/node_modules",
  ],
  restoreMocks: true,
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.app.json",
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

export default config;
