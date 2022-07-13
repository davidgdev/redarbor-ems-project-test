import Post from "../models/Post.js";

// Get Employees
export const getEmployees = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const { Name, Surname, Email, DateOfBirth, RoleId } = req.body;

    const newPost = new Post({ Name, Surname, Email, DateOfBirth, RoleId });

    await newPost.save();

    return res.json(newPost);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(500).send(errors);
    }

    // return res.status(500).json({ message: error.message });
  }
};

// Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const postRemove = await Post.deleteMany({ _id: { $in: req.params.id } });

    if (!postRemove) return res.sendStatus(400);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Multiple Employees
export const deleteMultiple = async (req, res) => {
  try {
    const ids = req.params.ids.split(",");

    const removeMultiple = await Post.deleteMany({ _id: { $in: ids } });

    if (!removeMultiple) return sendStatus(400);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Employee
export const getEmployee = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.sendStatus(404);

    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
