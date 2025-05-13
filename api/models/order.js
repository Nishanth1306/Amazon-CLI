import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            title:{
                type: String,
                // required: true,
            },
            quantity:{
                type: Number,
                required: true,
            },
            price:{
                type: String,
                required: true,
            },
            image:{
                type: String,
                required: true,
            },
        },
    ],
    totalPrice:{
        type:String,
        required: true,
    },
    shippingAddress:{
        name:{
            type: String,
            required: true,
            minlength: 3,
        
        },
        mobileNo:{
            type: Number,
            required: true,
            minlength: 10,
        },
        houseNo:{
            type: String,
            required: true,
            minlength:1,
        },
        street:{
            type: String,
            required: true,
            minlength:3,
        },
        landmark:{
            type: String,
            required: true,
            minlength:3,
        },
        postalCode:{
            type:Number,
            required: true,
            minlength:6,
            maxlength:6,

        },

    },
    paymentMethod:{
        type: String,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
    
})

const Order = mongoose.model("Order",orderSchema);

export default Order;