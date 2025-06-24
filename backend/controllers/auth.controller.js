require("dotenv");
const db=require("../models/index");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


exports.register=async (req,res)=>{
    const {username,email,password,role}=req.body;
    const hashedPassword=await bcrypt.hash(password,8);

    try{
        const user=await db.User.create({
            username,
            email,
            password:hashedPassword,
            role:role||"user",

        });
        res.json({message:"User registered", user});
    }
    catch(err){
        res.status(400).json({message:"User exists or error",error:err});
    }

}


exports.login=async(req,res)=>{
    const {username,password}=req.body;
    const user=await db.User.findOne({where:{username}});
    if(!user) return res.status(404).json({message:"User not found"});

    const valid =await bcrypt.compare(password,user.password);
    if(!valid) return res.status(401).json({message:"Invalid password"});

    const token=jwt.sign({id:user.id,role:user.role}, process.env.JWT_SECRET ,{
        expiresIn:"1h",
    })
}