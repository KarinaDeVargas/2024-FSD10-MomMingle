import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  return new Promise((resolve, reject) => {
    //CHECK USER
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
      if (err) {
        reject(err);
      } else if (data.length === 0) {
        reject("User not found!");
      } else {
        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          data[0].password
        );

        if (!isPasswordCorrect) {
          reject("Wrong username or password!");
        } else {
          const token = jwt.sign({ user_id: data[0].user_id }, "jwtkey");
          const { password, ...other } = data[0];

          console.log("Login response data:", other); // Log the response data
          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(other);
          resolve(other); // Resolve with the user data (without password)
        }
      }
    });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
