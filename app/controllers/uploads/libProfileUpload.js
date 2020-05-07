const User = require("../../schema/schemaUser");
const Product = require("../../schema/schemaProduct");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var { authorNumber } = req.body;
    authorNumber = authorNumber.slice(1);
    const uploadDir = path.join(
      __dirname,
      "../../client/public/uploads/",
      authorNumber,
      "avatar"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var fileFilter = (req, file, cb) => {
  // allow images only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image are allowed."), false);
  }

  cb(null, true);
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 4 * 1024 * 1024 }
}).single("avatar");

module.exports = {
  deleteProfilePic(req, res) {
    const { authorNumber } = req.query;

    const uploadDir = path.join(
        __dirname,
        "../../client/public/uploads/",
        authorNumber.slice(1),
        "avatar"
    );

    fse.removeSync(uploadDir);
    res.status(200).send("Avatar pic deleted!")
  },

  customProfile(req, res) {
    upload(req, res, async err => {
      var {
        authorNumber,
        bio,
        publicName,
        facebookLink,
        instaLink,
        city,
        country
      } = req.body;

      var avatar = req.file;

      if (err) {
        console.log("Error uploading files", err);
      }

      const uploadDir = path.join(
        __dirname,
        "../../client/public/uploads/",
        authorNumber,
        "avatar"
      );

      if(avatar) {
        avatar.path = path.join(
            "uploads",
            authorNumber.slice(1),
            "avatar",
            avatar.filename
        );
      }

      try {
        User.findOne({ phoneNumber: authorNumber }).exec((err, user) => {
          if (err) console.log("Error custom profile", err);

          if (user) {
            user.profilePicture = avatar;
            user.publicName = publicName;
            user.bio = bio;
            user.linkFB = facebookLink;
            user.linkInstagram = instaLink;
            user.city = city;
            user.country = country;

            user.save();
            return res.status(200).json({ user });
          } else {
            fse.removeSync(uploadDir)
            return res.status(409).json({ text: "User not found. " });
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
};
