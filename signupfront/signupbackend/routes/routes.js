const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const bcrypt = require("bcrypt");
const User = require("../models/SignUpModels");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);

  const signedUpUser = new signUpTemplateCopy({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });
  signedUpUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user === null) {
      res
        .status(401)
        .json({ message: "paire identifiant/mot de passe incorrecte" });
    } else {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            console.log(user);
            res.status(401).json({
              message: "Paire identifiant/mot de passe incorrecte",
            });
          } else {
            res.status(200).json({
              message: "connecté !",
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
                expiresIn: "24h",
              }),
            });
          }
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  });
});
router.get("/login");
router.get("/signin");
module.exports = router;
