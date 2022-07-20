import multer from 'multer';

// for storing local and not on database
// diskStorage do not use when using buffer data because it removes buffer and replace it a destination file or path.
// use ./ for storing on root
// http://expressjs.com/en/resources/middleware/multer.html
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./images/uploads/`);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${file.originalname}`.toLocaleLowerCase()
    );
  },
});

// Filter file size and type
let upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    return cb(undefined, true);
  },
  limits: { fileSize: 2000000 },
}).array('upload', 30);

// middleware to hundle Error
var multerMiddleware = function (req, res, next) {
  upload(req, res, function (err) {
    //send error response if Multer threw an error
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: err.message });
    }
    //move to the next middleware, or to the route after no error was found
    return next();
  });
};
export default multerMiddleware;
