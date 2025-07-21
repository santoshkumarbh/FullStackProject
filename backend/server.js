const express=require('express')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const authRouter=require("../backend/routes/auth/auth-routes")
const adminProductsRouter=require('./routes/admin/products-routes')
const shopProductRouter=require('./routes/shop/products-routes')

mongoose.connect("mongodb+srv://admin:admin123@cluster0.hud5ay8.mongodb.net/fullstack-project")
    .then(()=>console.log("MongoDB connected"))
    .catch((error)=>console.log(error))

const app=express()
const PORT=process.env.PORT || 5000;

app.use(
    cors({
        origin:'http://localhost:5173',   //forntend running port
        methods:['GET','POST','DELETE','PUT'],  
        allowedHeaders:[
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products",shopProductRouter);

app.listen(PORT, ()=>console.log("Server is running on port", PORT)
)