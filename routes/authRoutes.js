import express from 'express';
import { registerUser, loginUser, forgetPassword, resetPassword } from '../controllers/authController.js';

const autRouter = express.Router();

autRouter.route('/register').post(registerUser);
autRouter.route('/login').post(loginUser);
autRouter.route('/forget-password').post(forgetPassword);
autRouter.route('/reset-password/:user_id').put(resetPassword);

export default autRouter;