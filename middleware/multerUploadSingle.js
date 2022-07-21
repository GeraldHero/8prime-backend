import multer from 'multer';

let upload = multer({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    return cb(undefined, true);
  },
  limits: { fileSize: 2000000 },
}).single('upload');

//  to hundle Error
var multerMiddleware = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: err.message });
    }

    return next();
  });
};

export default multerMiddleware;
