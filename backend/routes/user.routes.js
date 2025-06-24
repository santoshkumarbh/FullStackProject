const controller=require("../controllers/user.contoller");
const {verifyToken,isAdimin}=require("../middleware/auth.middleware");

module.exports=(app)=>{
    app.get("/api/users",verifyToken,isAdimin,controller.getAllUsers);
    app.delete("/api/users/:id",verifyToken,isAdimin,controller.deleteUser);
}