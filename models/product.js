import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
    },
    description:{
        type:String,
        required:true,
        maxlength:100,
    },
    quantity:{
        type:Number,
        default:1,
        min:1,
    },
    image:{
          type:String,
          required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
    },
    discount:{
        type:Number,
        defalut:0,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
},{timestamps:true});

const Product = mongoose.model('Product',productSchema);

export default Product;