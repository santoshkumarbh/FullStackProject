require('dotenv').config();
const express=require('express');
const cors=require('cors');
const db=require('./models/index');


const app=express();
app.use(cors());
app.use(express.json());

//Route imports
const authRoutes=require('./routes/auth.routes');
const userRoutes=require('./routes/user.routes');

//start server after syncing db
const PORT=process.env.PORT || 5000;
db.sequelize.sync()
    .then(()=>{
        console.log('Database synced');
        app.listen(PORT,()=>console.log(`Backend running on port ${PORT}`));    
    })
    .catch(err=>console.log('DB sync error:',err));
