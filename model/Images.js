import mongoose from 'mongoose';
const { Schema } = mongoose;

const ImagesSchema = Schema(
  {
    section: { type: Buffer },
    image: { type: Buffer },
    title: { type: String },
  },
  {
    timestamps: true,
  }
);

const Images = mongoose.model('Image', ImagesSchema);
export default Images;
