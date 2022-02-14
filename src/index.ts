#!/usr/bin/env node

import juice from "juice";
import yargs from "yargs";
import { bundleRequire } from "bundle-require";
import { defineConfig } from "windicss/helpers";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { hideBin } from "yargs/helpers";
import { HTMLParser } from "windicss/utils/parser";
import { join } from "path/posix";
import { minify as minifyHtml } from "html-minifier";
import { parse } from "path";
import { Processor } from "windicss/lib";

(async () => {
  const {
    config: configPath,
    input,
    minify,
  } = await yargs(hideBin(process.argv))
    .option("input", {
      alias: "i",
      type: "string",
      description: "Path to the input HTML file",
      default: join(process.cwd(), "index.html"),
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
    let config: ReturnType<typeof defineConfig>;
    if (existsSync(configPath)) {
      const { mod } = await bundleRequire({
        filepath: configPath,
      });

      config = mod.default ?? mod.config;
    } else {
      config = defineConfig({
        darkMode: "media",
      });
    }

    const html = readFileSync(join(process.cwd(), input), "utf-8");
    const processor = new Processor(config);
    const preflightSheet = processor.preflight(html);

    const htmlClasses = new HTMLParser(html)
      .parseClasses()
      .map(({ result }) => result)
      .join(" ");

    const { styleSheet: interpretedSheet } = processor.interpret(htmlClasses);
    const styles = interpretedSheet.extend(preflightSheet, false).build(minify);

    const juicedHtml = juice.inlineContent(html, styles);

    const { ext: inputExt, name: inputName, dir: inputDir } = parse(input);

    writeFileSync(
      join(process.cwd(), inputDir, `${inputName}-inline${inputExt}`),
      minify
        ? minifyHtml(juicedHtml, {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyJS: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            useShortDoctype: true,
          })
        : juicedHtml
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
