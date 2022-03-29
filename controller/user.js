const { v4: uuidv4 } = require("uuid");
const Database = require("../db");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const usersController = {
  register: async (req, res, next) => {
    try {
      const { firstname, lastname, password, age } = req.body;

      const id = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);
      await Database.query(
        "INSERT INTO users (id, firstname, lastname, password, age) VALUES ($1, $2, $3, $4, $5)",
        [id, firstname, lastname, hashedPassword, age]
      );

      const token = signJwtToken(id, firstname, lastname, age);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { firstname, password } = req.body;

      const result = await Database.query(
        "SELECT * FROM users WHERE firstname = $1",
        [firstname]
      );
      const user = result.rows[0];
      console.log("user", user);
      if (!user) {
        return next(
          new AppError(
            400,
            `There is no user with this firstname: ${firstname}`
          )
        );
      }

      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) {
        return next(new AppError(400, `Password is incorrect`));
      }

      const token = signJwtToken(
        user.id,
        user.firstname,
        user.lastname,
        user.type
      );
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = usersController;
