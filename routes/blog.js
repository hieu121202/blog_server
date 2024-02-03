import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategotyController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";
const router = express.Router();

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/upload/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

//Protected Routes

router.get(
  "/get/allblogs",
  checkIsUserAuthenticated,
  BlogController.getAllBlogs
);
router.post(
  "/add/blog",
  upload.single("thumnail"),
  checkIsUserAuthenticated,
  BlogController.addNewBlog
);
router.get(
  "/get/blog/:id",
  checkIsUserAuthenticated,
  BlogController.getSingleBlog
);
router.put(
  "/update/blog/:id",
  upload.single("thumnail"),
  checkIsUserAuthenticated,
  BlogController.updateBlog
);
router.delete(
  "/delete/blog/:id",
  checkIsUserAuthenticated,
  BlogController.deleteBlog
);

router.get(
  "/get/categories",
  checkIsUserAuthenticated,
  CategotyController.getAllCategories
);
router.post(
  "/add/category",
  checkIsUserAuthenticated,
  CategotyController.addNewCategory
);

export default router;
