import {Asynchandler} from "../utils/asynhandler.js"

const RegisterUser=Asynchandler(
  async  (req,res) => {
      res.status(200).json({
        message:"ok"
      })
    }
    
)

export default RegisterUser