import { ChildProcess, spawn } from "child_process";

interface ConvertOptions {
  inputFormat?: string;
  outputFormat?: string;
  convertOptions?: Record<string, string>;
  calibrePath?: string;
}

export const convertEbook = async (
  inputFile: string,
  outputFile: string,
  options: ConvertOptions = {}
): Promise<ChildProcess> => {
  // Set default options
  options = Object.assign(
    {
      inputFormat: "pdf",
      outputFormat: "epub",
      convertOptions: {},
      calibrePath: "/usr/bin/ebook-convert", // Path to Calibre's ebook-convert command
    },
    options
  );

  // Build command arguments
  const args = [
    inputFile,
    outputFile,
    // `--input-format=${options.inputFormat}`,
    // `--output-format=${options.outputFormat}`,
  ];

  // Add any additional convert options
  for (const option in options.convertOptions) {
    args.push(`--${option}=${options.convertOptions[option]}`);
  }

  // Spawn child process
  const childProcess = spawn(options.calibrePath, args);

  // Handle process events
  childProcess.stdout.on("data", (data) => console.log(data.toString()));
  childProcess.stderr.on("data", (data) => console.error(data.toString()));

  // Return a promise that resolves with the child process when it exits
  return new Promise((resolve, reject) => {
    childProcess.on("close", (code) => {
      console.log(`Process exited with code ${code}`);
      if (code === 0) {
        resolve(childProcess);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
};
