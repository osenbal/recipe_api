import multer from "multer";

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/local/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const memoryStorage = multer.memoryStorage();

const uploadDiskStorage = multer({
  storage: diskStorage,
});

const uploadMemoryStorage = multer({
  storage: memoryStorage,
});

export { uploadDiskStorage, uploadMemoryStorage };
