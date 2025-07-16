import express from "express";
import userController from "../controller/user-controller.js";
import { requestOtpController, verifyOtpController } from "../controller/otp-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/register", userController.register);
publicRouter.post("/login", userController.login);
publicRouter.post("/request-otp", requestOtpController);
publicRouter.post("/verify-otp", verifyOtpController);

export { publicRouter };
