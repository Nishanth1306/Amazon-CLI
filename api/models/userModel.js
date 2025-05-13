import mongoose from "mongoose";

// //name: String,
// mobileNo: String,
// houseNo: String,
// street: String,
// landmark: String,
// city: String,
// country: String,
// postalCode: String,

const addressSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    
    validate: {
      validator: function (name) {
        const isValid = /^(?!.*  )[A-Za-z]+(?: [A-Za-z]+)*$/.test(name);
        return isValid && name.length >= 3 && name.length <= 50;
      },
      message: "Name must be 3–50 characters long, contain only letters, and have no consecutive spaces.",
    }
  },
  mobileNo: {
    type: String,
    required: true,
    validate:{
      validator: function (mobileNo) {
        return /^[0-9]{10}$/.test(mobileNo);
      },
      message: "Mobile number must be 10 digits",
    }
  },
  houseNo: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  // country: {
  //   type: String,
  //   required: true,
  // },
  postalCode: {
    type: String,
    required: true,
    validate:{
      validator: function (postalCode) {
        return /^[0-9]{6}$/.test(postalCode);
      },
      message: "Postal code must be 6 digits",
    }
  },
})


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    validate:{
      validator: function (name) {
        return /^[a-zA-Z ]+$/.test(name);
      },
      message: "Name can only contain letters and spaces",
    }
  },
  resetPasswordOTP: String,
resetPasswordExpires: Date,


  email: {
    type: String,
    required: true,
    unique: true,
    minlength:6,
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()_\-])[A-Za-z\d@$!%*?&()_\-]{6,}$/.test(password);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g. @$!%*?&()_-)",
    }
    
  },
  fcmToken: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  addresses: [addressSchema],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  wishlist: [
    {
      name: {
        type: String,
        required: true,
      },
    id:{
  type: String,
  required: true,
    },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        // required: true,
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model("User", userSchema);

export default User;