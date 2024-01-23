import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    result: "src/result/index.ts",
    "custom-error": "src/custom-error/index.ts",
    domain: "src/domain/index.ts",
    miscellaneous: "src/miscellaneous/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
