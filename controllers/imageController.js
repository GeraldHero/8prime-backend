import sharp from 'sharp';
import Images from '../model/Images.js';
import fs from 'fs';

const deleteFile = (path) => {
  fs.unlink(path, function () {
    console.log('File deleted!');
  });
};

// @route   Get api/images
// @desc    Get all image
// @access  Private

export const getAllImage = async (req, res) => {
  try {
    let images = await Images.find();
    return res.status(200).send(images);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route   Get api/images/:id
// @desc    Get one section images
// @access  Private

export const getSpecificImages = async (req, res) => {
  try {
    let images = await Images.find({ _id: req.params.id });
    return res.status(200).send(images);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route   POST api/images
// @desc    Upload image
// @access  Private

// req.files if using multer array and req.file using single
export const uploadImage = async (req, res) => {
  try {
    const { section } = req.body;
    let image = await Images.findOne({
      section: section.toLowerCase(),
    });
    const photos = req.files.map((data) => {
      return {
        path: data.path,
        filename: data.filename,
      };
    });

    if (image) {
      image.photos = [...image.photos, ...photos];
      await image.save();
      return res.status(201).send({ msg: `Images added to ${section}`, image });
    }

    image = await new Images({
      section: section.toLowerCase(),
      photos,
    });

    await image.save();
    return res.status(201).send({ msg: 'Image saved', image });
  } catch (error) {
    return res.status(400).send({ msg: 'Something went wrong :(' });
  }
};

// @route   DELETE api/images/:id
// @desc    Delete image using mainID then required photoId for the specific data to be deleted.
// @access  Private

export const deleteImage = async (req, res) => {
  const { path, filename } = req.body;

  try {
    const image = await Images.findOne({ _id: req.params.id.toLowerCase() });
    image.photos = await image.photos.filter(
      (photo) => photo.filename !== filename
    );

    deleteFile(`images/uploads/${filename}`);
    await image.save();
    return res.status(200).send({ msg: 'Image deleted!' });
  } catch (error) {
    return res.status(400).send({ msg: 'Something went wrong :(' });
  }
};

// @route   DELETE api/images/deleteAll/:id
// @desc    Delete all images
// @access  Private

export const deleteAllImage = async (req, res) => {
  try {
    const image = await Images.findOne({ _id: req.params.id.toLowerCase() });
    await image.photos.map((data) => {
      deleteFile(`images/uploads/${data.filename}`);
    });
    image.photos = [];
    await image.save();
    return res.status(200).send({ msg: 'All Image deleted!' });
  } catch (error) {
    return res.status(400).send({ msg: 'Something went wrong :(' });
  }
};

// const { buffer, fieldname, originalname } = req.file;
// const sharpBuffer = await sharp(buffer)
//   .webp({ lossless: true, quality: 60 })
//   .toFormat('png')
//   .toBuffer();
// .resize(100)

// delete in buffer
// image.photos = await image.photos.filter(
//   (photo) => photo._id.toString() !== photoId.toString()
// );
