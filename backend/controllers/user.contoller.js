const db=require("../models/index");

exports.getAllUsers=async(req,res)=>{
    const users=await db.User.findAll();
    res.json(users);
}

exports.deleteUser=async (req,res)=>{
    await db.User.destroy({where:{id:req.params.id}});
    res.json({message:"User deleted"});
}