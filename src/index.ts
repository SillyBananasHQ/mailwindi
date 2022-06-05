#!/usr/bin/env node

import yargs from "yargs";
import { bundleRequire } from "bundle-require";
import { defineConfig } from "windicss/helpers";
import { existsSync } from "node:fs";
import { hideBin } from "yargs/helpers";
import { join, parse } from "node:path";

import { generateHtml } from "~/generate";

(async () => {
  const {
    config: configPath,
    input,
    minify,
  } = await yargs(hideBin(process.argv))
    .version()
    .help()
    .option("input", {
      alias: "i",
      description: "Path to the input HTML file",
      requiresArg: true,
      type: "string",
    })
    .option("minify", {
      alias: "m",
      default: false,
      description: "Minify the HTML",
      type: "boolean",
    })
    .option("config", {
      alias: "c",
      default: join(process.cwd(), "windi.config.js"),
      description: "Path to Windi CSS config file",
      type: "string",
    })
    .parse();

  try {
    if (!input) throw "No or invalid input file path provided";

    let config = defineConfig({
      darkMode: "media",
    });

    if (existsSync(configPath)) {
      const { mod } = await bundleRequire({
        filepath: configPath,
      });

      config = mod.default ?? mod.config;
    }

    const { ext: inputExt, name: inputName, dir: inputDir } = parse(input);
    const outputPath = join(inputDir, `${inputName}-inline${inputExt}`);

    await generateHtml({
      config,
      inputPath: input as string,
      minify,
      outputPath,
    });

    console.log(`\n✅ Successfully generated: ${outputPath}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
