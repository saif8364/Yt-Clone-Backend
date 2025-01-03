import {Router} from "express"
import RegisterUser from "../controllers/user.controller.js";
import { upload } from "../middlewares/Multer.js";

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



export default Userrouter;