import express from "express"
import { registerUser } from "../controller/registerUserController.js";
import checkReferer from "../middleware/middleware.js"

const router=express.Router();
//creating routes for api with middleware
router.route("/register").post(registerUser);

export default router;