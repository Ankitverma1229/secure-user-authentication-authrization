import Jwt from "jsonwebtoken";
export const verifiedUser = (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    const secretKey = process.env.JWT_SECRET;
    const user = Jwt.verify(authorization, secretKey);
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Please login your account to access this feature" });
    console.log(error.message);
  }
};
