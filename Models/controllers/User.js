import { User } from "../User.js"; // ✅ Correct
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register User

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (name == " " || email == " " || password == " ")
    return res.status(400).json({ message: "All fields are required" });

  let user = await User.findOne({ email });

  if (user) return res.json({ message: "User already exist..." });

  const hashPass = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashPass,
  });
  res.json({ message: "User Register Successfully", user });
};

// Login User

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email == " " || password == " ")
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.json({ message: "Invalid credential" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_Secret, {
    expiresIn: "1d",
  });

  res.json({ message: `Welcome back ${user.name}`, token });
};
