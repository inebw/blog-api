const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma");
const bcrypt = require("bcryptjs");

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 64 })
    .withMessage("Username should be within 3 - 4 characters")
    .isAlphanumeric()
    .withMessage("Username can contain only numbers and letters"),
  body("first_name")
    .trim()
    .isAlpha()
    .withMessage("First Name can contain only alphabets")
    .isLength({ min: 1, max: 255 })
    .withMessage("First Name should be within 255 characters"),
  body("last_name")
    .trim()
    .isAlpha()
    .withMessage("Last Name can contain only alphabets")
    .isLength({ min: 1, max: 255 })
    .withMessage("Last Name should be within 255 characters"),
  body("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Password does not match");
    else return true;
  }),
];

module.exports = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json(errors.array());
    else {
      const { password } = req.body;
      const { username, first_name, last_name } = matchedData(req);
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          username,
          first_name,
          last_name,
          password: hashedPassword,
        },
      });
      res.sendStatus(201);
    }
  },
];
