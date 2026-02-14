import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
            default:1,
            min:1,
        },
    }],

    status:{
        type:String,
        enum:['Pending','Processing','Delivered','Canceled'],
        default:'Pending',
    },

    paymentMethod:{
        type:String,
        enum:['COD','ONLINE'],
        required:true,
    },

    paymentStatus:{
        type:String,
        enum:['Pending','Paid','Failed'],
        default:'Pending',
    },

    totalAmount:{
        type:Number,
        required:true,
    },

    shippingDetails:{
        address:{ type:String, required:true },
        city:{ type:String, required:true },
        zipCode:{ type:String, required:true },
        country:{ type:String, required:true },
        phone:{ type:String, required:true },
    }

},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);

export default Order;
