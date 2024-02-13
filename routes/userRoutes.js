import express from "express";
import { verifiedUser } from "../middlewares/jwtVerification.js";
import { userData } from "../controllers/userDataController.js";
import { createQuiz, getQuiz } from "../controllers/quizController.js";

const userRouter = express.Router();

userRouter.route('/profile/:user_id').get(verifiedUser, userData);
userRouter.route('/create-quiz').post(verifiedUser, createQuiz);
userRouter.route('/get-quiz/:id').get(getQuiz);

export default userRouter;
