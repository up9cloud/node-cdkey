import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import mochaPlugin from 'eslint-plugin-mocha';
import chaiFriendlyPlugin from "eslint-plugin-chai-friendly";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      mocha: mochaPlugin,
      "chai-friendly": chaiFriendlyPlugin,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
    },
  },
]);
