import cors from "cors";
import express from "express";
import path from "path";
import { keys } from "./config";
import {
  checkAndCreateDir,
  convertEbook,
  readFileToBuffer,
  removeFile,
  upload,
  uploadObject,
} from "./utils";

const app = express();
const PORT = keys.httpPort;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./uploads")));

app.get("/", (req, res) => {
  res.send("Ebook Converter.");
});

app.post("/convert", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
  }

  const filename = req.file.filename.split(".")[0];

  // setup ebook filename and filepath
  const convertedFilename = `${filename}.epub`;
  const convertedFile = `${req.file.destination}/${convertedFilename}`;

  // convert ebook
  await convertEbook(req.file.path, convertedFile, {
    calibrePath: keys.calibreLibPath,
  });

  // remove the source file if ebook convert success
  await removeFile(req.file.path);

  // setup s3 file key and convert epub file to buffer data
  const s3FileKey = `storage/${convertedFilename}`;
  const fileBuffer = await readFileToBuffer(convertedFile);

  // upload buffer data to s3 storage
  await uploadObject(s3FileKey, fileBuffer);

  // remove the converted epub file
  await removeFile(convertedFile);

  // setup s3 file link using s3 storage url and file key
  const s3FileLink = `${keys.s3BaseStorageUrl}/${s3FileKey}`;

  await res.json({
    message: "Successfully converted",
    epubFile: s3FileLink,
  });
});

app.listen(PORT, async () => {
  await checkAndCreateDir(path.join(__dirname, "./uploads"));
  console.log(`Server running in http://localhost:${PORT}`);
});
