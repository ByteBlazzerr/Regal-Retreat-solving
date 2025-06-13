import User from "../models/User.js";

// Middleware to check if the user is authenticated

export const protect =async(req,res,next)=>{
    console.log("authMiddleware called");
    try{
        const {userId}=req.auth();
        if(!userId){
            return res.json({
                success:false,
                message:"Not authenticated"
            });
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        req.user=user;
        next();
    }
    catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }

}
