import * as fs from "fs";

export const removeFile = async (filepath: string) => {
  try {
    fs.unlinkSync(filepath);

    return {
      message: "File is deleted.",
    };
  } catch (err) {
    return {
      message: "Could not delete the file. " + err,
    };
  }
};

export const readFileToBuffer = (filepath: string) => {
  try {
    return fs.readFileSync(filepath);
  } catch (err) {
    return {
      message: "Could not delete the file. " + err,
    };
  }
};

export const checkAndCreateDir = (directory: string) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
    console.log(`Directory '${directory}' created.`);
  }
};
