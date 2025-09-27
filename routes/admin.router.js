const router = require("express").Router();
const multer = require("multer");
const check = require("express-validator").check;

const adminController = require("../controllers/admin.controller");
const adminGuard = require("./guards/admin.guard");

router.get('/admin/add', adminGuard, adminController.getAdd);

router.post(
    "/admin/add",
    adminGuard,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        })
    }).single("image"),
    check("name").not().isEmpty()
    .withMessage('name is required'),
    check("price").isInt({min: 1})
    .withMessage("price must be greater than 0"),
    check("description").not().isEmpty()
    .withMessage('description is required'),
    check("category").not().isEmpty()
    .withMessage('category is required')
    .isIn(['phones', 'clothes', 'computers'])
    .withMessage('Invalid category selected'),
    check("password").isLength({min: 3, max:30}).withMessage('Invalid length'),
    check('image').custom((value, { req }) => {
        if (req.file) return true;
        else throw 'image is required';
    }),
    adminController.postAdd
);

module.exports = router;