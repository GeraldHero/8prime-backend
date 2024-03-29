import Projects from "../model/Projects.js";
import sharp from "sharp";

// @route   GET api/projects/
// @desc    Get All Projects Data
// @access  Public

export const getAllProjectsData = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const startIndex = page * limit;

  try {
    const totalProject = await Projects.countDocuments({});
    const projects = await Projects.find().limit(limit).skip(startIndex).sort({
      name: "asc",
    });
    return res.status(200).send({ projects, totalProject });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Something went wrong :(" });
  }
};

// @route   GET api/projects/:id
// @desc    Get Specific Project Data
// @access  private

export const getProjectData = async (req, res) => {
  if (!req.params.id) throw new Error();
  try {
    const project = await Projects.findOne({ _id: req.params.id });

    return res.status(200).send({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Something went wrong :(" });
  }
};

// @route POST /api/projects/
// @desc  Create project
// @access Private

export const createProjects = async (req, res) => {
  const { title, description, listTitle, bedrooms, cr, sq, price } = req.body;

  let project, area;
  // Conver area String to array
  if (req.body.area) area = req.body.area.split(", ");

  if (!req.file) {
    project = await new Projects({
      title,
      description,
      listTitle,
      bedrooms,
      cr,
      sq,
      area,
      price,
    });

    await project.save();
    return res.status(201).send(project);
  }

  const { buffer } = req.file;
  // Edit Image using sharp
  const sharpBuffer = await sharp(buffer)
    .webp({ lossless: true, quality: 80 })
    .toFormat("png")
    .resize({ width: 300, height: 300 })
    .toBuffer();

  try {
    //Saving data to database
    project = await new Projects({
      image: sharpBuffer,
      title,
      description,
      listTitle,
      bedrooms,
      cr,
      sq,
      area,
      price,
    });
    await project.save();
    return res.status(201).send(project);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "something went wrong :(" });
  }
};

// @route   DELETE /api/projects/:id
// @desc    delete project
// @access  Private

export const deleteProject = async (req, res) => {
  const _id = req.params.id;

  try {
    // Verify params id
    const project = await Projects.findById(_id);
    if (!project) throw new Error();

    // find by _id and params _id
    await Projects.findByIdAndDelete({ _id });
    return res.status(200).send({ msg: "Deleted Successfully!" });
  } catch (error) {
    return res.status(500).send({ msg: "Something went wrong :(" });
  }
};

// @route   PATCH /api/projects/:id
// @desc    Edit user
// @access  Private

export const editProject = async (req, res) => {
  // Check key name if valid
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "description",
    "listTitle",
    "bedrooms",
    "cr",
    "sq",
    "area",
    "price",
  ];
  const isValidUpdates = updates.every((items) =>
    allowedUpdates.includes(items)
  );
  if (!isValidUpdates) {
    return res.status(400).send({ error: "error updates" });
  }

  try {
    const project = await Projects.findOne({
      _id: req.params.id,
    });

    if (!project) return res.res.status(400).send({ msg: "Invalid project" });

    if (req.file) {
      const { buffer } = req.file;
      // Edit Image using sharp
      const sharpBuffer = await sharp(buffer)
        .webp({ lossless: true, quality: 60 })
        .toFormat("png")
        .toBuffer();
      project.image = sharpBuffer;
    }

    if (req.body.area) req.body.area = req.body.area.split(", ");

    await updates.forEach((update) => {
      project[update] = req.body[update];
    });

    await project.save();

    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
};
