import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }
    
  try {

   const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
  
   req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const isAdmin = (req,res,next)=>{
 if(req.user.role===0){
  return console.error("Access denied",401)
 }
 next();
}