import juice from "juice";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { HTMLParser } from "windicss/utils/parser";
import { minify as minifyHtml } from "html-minifier";
import { Processor } from "windicss/lib";

import type { GenerateHtmlOptions } from "./types";

/**
 * Generate HTML
 *
 * @description Takes a provided input file & generates new HTML file & saves it to disk
 *
 * @param {Object} options.config - Windi CSS config object
 * @param {String} options.inputPath - Input file path
 * @param {String} [options.outputPath] - Output file path
 * @param {Boolean} [options.write=true] - Write the output to the file system
 */
export async function generateHtml(
  options: GenerateHtmlOptions
): Promise<string> {
  if (!existsSync(options.inputPath))
    throw `No file will the following path found: ${options.inputPath}`;

  const html = readFileSync(options.inputPath, "utf-8");

  const processor = new Processor(options.config);

  const preflightSheet = processor.preflight(html);

  const htmlClasses = new HTMLParser(html)
    .parseClasses()
    .map(({ result }) => result)
    .join(" ");

  const { styleSheet: interpretedSheet } = processor.interpret(htmlClasses);
  const styles = interpretedSheet
    .extend(preflightSheet, false)
    .build(options.minify);

  const juicedHtml = juice.inlineContent(html, styles);

  const outputHtmlStr = options.minify
    ? minifyHtml(juicedHtml, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        useShortDoctype: true,
      })
    : juicedHtml;

  if (options.write) writeFileSync(options.outputPath, outputHtmlStr);

  return outputHtmlStr;
}
