const mongoose = require('mongoose');
const verifyPassword = require('../utils/bcrypt');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    sex: {
        type: Number,
        default: 0
    },
    username: {
        type: String,
        default: '',
        unique: true
    },
    gameLabel: {
      type: String,
      default: '',
    },
    avatar: {
        type: String,
        default: 'https://img0.baidu.com/it/u=3661751063,3479210146&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
    },
    password: {
        type: String,
        default: ''
    },
    signature: {
        type: String,
        default: 'nothing left'
    },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: () => Date.now() },
},{
  timestamps: true  
})

UserSchema.pre("save", async function (next) { 
    const user = this;
    if (!user.isModified("password")) {
      return next()
    }
    const hash = await verifyPassword(user.password);
    user.password = hash; 
    return next()
  })
  
  UserSchema.methods.validatePassword = function (password, callback) { 
    bcrypt.compare(password, this.password, (err, isMatch) => { 
      callback(null, isMatch);
    });
  };
  

module.exports = mongoose.model("User",UserSchema)