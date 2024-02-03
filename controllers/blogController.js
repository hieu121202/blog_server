import blogModel from "../models/blogModel.js";

class BlogController {
  static getAllBlogs = async (req, res) => {
    try {
      const fetchAllBlogs = await blogModel.find({ user: req.user._id });
      return res.status(200).json({ fetchAllBlogs });
    } catch (error) {
      return res.status(400).json({ message: "error.message" });
    }
  };
  static addNewBlog = async (req, res) => {
    const { title, category, description } = req.body;
    try {
      if (title && category && description) {
        const addBlog = new blogModel({
          title: title,
          description: description,
          category: category,
          thumnail: req.file.filename,
          user: req.user._id,
        });

        const savedBlog = await addBlog.save();
        if (savedBlog) {
          return res.status(200).json({ message: "Blog added successfully" });
        }
      } else {
        return res.status(400).json({ message: "all fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static getSingleBlog = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const fetchBlogByID = await blogModel.findById(id);
        return res.status(200).json(fetchBlogByID);
      } else {
        return res.status(400).json({ message: "Invalid URL" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, category, description } = req.body;

    try {
      if (id && title && category && description) {
        const updatedBlog = await blogModel.findByIdAndUpdate(
          id,
          {
            title: title,
            description: description,
            category: category,
            thumnail: req.file ? req.file.filename : undefined, // Cập nhật ảnh nếu có
          },
          { new: true }
        );

        if (updatedBlog) {
          return res.status(200).json({ message: "Blog updated successfully" });
        } else {
          return res.status(404).json({ message: "Blog not found" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
      if (id) {
        const deletedBlog = await blogModel.findByIdAndDelete(id);

        if (deletedBlog) {
          return res.status(200).json({ message: "Blog deleted successfully" });
        } else {
          return res.status(404).json({ message: "Blog not found" });
        }
      } else {
        return res.status(400).json({ message: "Invalid URL" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default BlogController;
