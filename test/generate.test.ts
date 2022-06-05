import { defineConfig } from "windicss/helpers";
import { describe, expect, it } from "vitest";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import { generateHtml } from "../src/generate";

const windiConfig = defineConfig({
  darkMode: "media",
});

describe("Generate HTML", () => {
  ["basic"].forEach((name) =>
    it("Basic", async () => {
      const result = await generateHtml({
        config: windiConfig,
        inputPath: join(process.cwd(), "test", `${name}.input.html`),
        write: false,
      });

      const expectedOutput = readFileSync(
        join(process.cwd(), "test", `${name}.output.html`),
        "utf-8"
      );

      expect(result).toEqual(expectedOutput);
    })
  );
});
