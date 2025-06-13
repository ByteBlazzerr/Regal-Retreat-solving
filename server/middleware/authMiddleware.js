import User from "../models/User.js";

// Middleware to check if the user is authenticated

export const protect =async(req,res,next)=>{
    console.log("authMiddleware called");
    try{
        const {userId}=req.auth();
        console.log("User ID from auth:", userId); // Log the userId for debugging
        if(!userId){
            return res.json({
                success:false,
                message:"Not authenticated"
            });
        }
        console.log("Fetching user with ID:", userId); // Log the userId before fetching
         // Fetch the user from the database
        const user=await User.findById(userId);
        console.log("Fetched user:", user); // Log the fetched user for debugging
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        console.log("User found:", user); // Log the user object
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
