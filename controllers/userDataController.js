import User from "../models/userModel.js";

export const userData = async (req, res) => {
  const user = req.user;
  const { user_id } = req.params;

  try {
    if (user) {
      const existingUser = await User.findOne({ _id: user_id });
      if (!existingUser) {
        return res.status(400).json({ error: "Unable to find user profile" });
      }
      return res
        .status(200)
        .json({ message: "Welcome to your profile", existingUser });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
