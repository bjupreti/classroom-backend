import multer from 'multer';
import path from 'path';

const fileTypes = /pdf|pptx|docx|xlsx|ipynb|jpg|jpeg|png/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public/uploads'));
  },
  filename: function (req, file, cb) {
    // cb(null, `${new Date().valueOf()}${file.originalname}`);
    cb(null, `${new Date().valueOf()}${path.extname(file.originalname)}`);
  }
});

const upload = (req, res, next) => {
  const files = multer({
    fileFilter: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      // using regex to test supported file extension
      const extTest = fileTypes.test(fileExtension);
      // chcking mimetype so that user won't change the extension and upload other files than supported files
      const mimetypeTest = fileTypes.test(file.mimetype);
      if (!extTest || !mimetypeTest) {
        return cb(new Error(`Only these ${fileTypes} are supported.`));
      }
      cb(null, true);
    },
    limits: {
      fileSize: 52428800, //50MB in bytes
      files: 12 // max file count
    },
    storage
  }).array('files', 12);
  // next is called inside the files methos by multer.
  // also it add files in request obj inside this method
  files(req, res, next);
};
export default upload;
