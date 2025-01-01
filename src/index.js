import dotenv from "dotenv"
import connection from './db/connection.js';
import app from "./app.js";

dotenv.config()


connection()
.then(() => {
    try{
        app.listen(process.env.PORT,() => {
            console.log("server is running");
          }
          )
    }
    catch(error){
console.log("Error in listening Port.....",error);
    }
 
}
)
.catch((error) => {
  console.log("db connection failed....",error)
}
)