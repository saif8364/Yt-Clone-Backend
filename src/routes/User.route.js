import {Router} from "express"
import RegisterUser from "../controllers/user.controller";

const Userrouter=Router();
Userrouter.route("/register").post(RegisterUser)


export default Userrouter;