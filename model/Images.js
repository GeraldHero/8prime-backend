import mongoose from 'mongoose';
const { Schema } = mongoose;

const ImagesSchema = Schema(
  {
    section: {
      type: String,
      require: true,
    },
    photos: [
      {
        path: String,
        filename: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Images = mongoose.model('Image', ImagesSchema);
export default Images;
