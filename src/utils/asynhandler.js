//

const Asynchandler= (fn)=> async (req,res,next)=>
{
   try{
  await fn(req,res,next)
   } 
   catch(error)
   {
console.log(error,res.status(error.code));
   }
}



export default Asynchandler;