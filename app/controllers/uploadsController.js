const express = require("express");
const router = express.Router();

const upload = require("./uploads/libUploads");
const profileUpload = require("./uploads/libProfileUpload");

router.get("/", upload.getProductPictures);

router.post("/product", upload.createProduct);
router.post("/customProfile", profileUpload.customProfile);

router.put("/product/edit/:id", upload.updateProduct);

router.delete("/deleteProduct", upload.deleteProduct);
router.delete("/deleteAvatar", profileUpload.deleteProfilePic);

module.exports = router;
