const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports=(sequelize,DataTypes)=>{
    return sequelize.define("user",{
        username:{type:DataTypes.STRING, unique:true},
        email:{type:DataTypes.STRING},
        password:{type:DataTypes.STRING},
        role:{type:DataTypes.STRING, defaultValue:"user"}
    })
}