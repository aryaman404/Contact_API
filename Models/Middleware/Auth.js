import jwt from "jsonwebtoken";

export const Authenticate = async (req, res, next) => {
  const token = req.header("Auth");
  console.log("This is token ", token);
  if (!token) return res.status(400).json({ message: "Login First" });

  const decoded = jwt.verify(token, process.env.JWT_Secret);

  const id = decoded.userId;

  let user = await user.findbyid(id);
  if (!user) return res.json({ message: "User not found" });
  req.user = user;

  next();
};
