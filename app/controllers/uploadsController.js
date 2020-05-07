const express = require("express");
const router = express.Router();

const upload = require("./uploads/libUploads");
const profileUpload = require("./uploads/libProfileUpload");

router.get("/", upload.getProductPictures);
router.get("/deleteAvatar", profileUpload.deleteProfilePic);

router.post("/product", upload.createProduct);
router.post("/customProfile", profileUpload.customProfile);

router.put("/product/edit/:id", upload.updateProduct);

router.delete("/deleteProduct", upload.deleteProduct);

module.exports = router;
