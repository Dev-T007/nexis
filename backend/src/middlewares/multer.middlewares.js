import multer from "multer";
import { randomUUID } from "crypto";
import path from "path";
import { ApiError } from "../utils/ApiError.js";

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB max per file
  },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new ApiError(400, `Unsupported file type: ${file.mimetype}`),
        false
      );
    }
    cb(null, true);
  },
});
