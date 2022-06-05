import { defineConfig } from "windicss/helpers";

export type WindiCSSConfig = ReturnType<typeof defineConfig>;

export type GenerateHtmlOptions = MailwindiConfig & {
  /**
   * Windi CSS config options
   */
  config: WindiCSSConfig;

  /**
   * Path to the input file
   */
  inputPath: string;
} & (
    | {
        /**
         * Write the output to the file system
         *
         * @default true
         */
        write?: false;
      }
    | {
        /**
         * Path to the output file
         */
        outputPath: string;

        /**
         * Write the output to the file system
         *
         * @default true
         */
        write?: true;
      }
  );

export interface MailwindiConfig {
  /**
   * Minify the generated output HTML
   *
   * @default false
   */
  minify?: boolean;
}
