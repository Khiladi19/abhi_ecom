import mongoose from "mongoose";

const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        require:Date.now
    }

});

export const  User = mongoose.model('User',userSchema)

