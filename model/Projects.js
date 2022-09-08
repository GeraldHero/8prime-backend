import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSchema = Schema(
  {
    image: { type: Buffer, filename: String },
    title: { type: String },
    description: { type: String },
    listTitle: { type: String },
    bedrooms: { type: Number },
    cr: { type: Number },
    sq: { type: Number },
    area: { type: Array },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Projects = mongoose.model("project", ProjectSchema);
export default Projects;
