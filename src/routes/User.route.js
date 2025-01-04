import {Router} from "express"
import {RegisterUser,LoginUser,LogoutUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/Multer.js";
import VerifyJWT from "../middlewares/Auth.js";

const Userrouter=Router();
Userrouter.route("/register").post(
    upload.fields([
        {
            name:"avatar",    // The "name" of the input field in the HTML form
            maxCount:1
        },
        {
           name  :"cover",
           maxCount:1,
        }
    ]),
    RegisterUser
)
Userrouter.route("/login").post(LoginUser)

//SECURED ROUTES
//here the middleware 1st execute thyen it passes control to the LogoutUser ..so thats the reason we use next() in middleware
Userrouter.route("/logout").post(VerifyJWT,LogoutUser)



export default Userrouter;