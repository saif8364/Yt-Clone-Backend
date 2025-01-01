import AsyncHandler from "../utils/asynhandler.js"

const RegisterUser=AsyncHandler(
  async  (req,res) => {
      res.status(200).json({
        message:"ok"
      })
    }
    
)

export default RegisterUser