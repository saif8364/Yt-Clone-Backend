import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();

app.use(cors());//i didnt enter origin so its accessed by all 
app.use(cookieParser({}));
app.use(express.json())
app.use(express.static());
app.use(express.urlencoded()); 

//RoUTES IMporting
import Userrouter from "./routes/User.route.js";


//routes declaration
app.use("/users",Userrouter)


export default app;