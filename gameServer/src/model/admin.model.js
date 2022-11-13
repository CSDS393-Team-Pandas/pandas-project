const mongoose = require('mongoose');
const verifyPassword = require('../utils/bcrypt');
const bcrypt = require('bcrypt')

const AdminSchema = new mongoose.Schema({
  nickname: {
    type: String,
    default: ''
  },
  phoneNumber: {
    type: String,
    default: ''
  },
  isAuth: {
    type: Boolean,
    default: true
  },
  username: {
    type: String,
    default: '',
    unique: true
  },
  avatar: {
    type: String,
    default: 'https://img0.baidu.com/it/u=3661751063,3479210146&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
  },
  password: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
}, {
  timestamps: true
})

AdminSchema.pre("save", async function (next) { // Encrypt and save the password
  const user = this;
  if (!user.isModified("password")) {
    return next()
  }
  const hash = await verifyPassword(user.password);
  user.password = hash; //将加密后的数据复制给password
  return next()
})

AdminSchema.methods.validatePassword = function (password, callback) { //在model上挂载密码验证函数
  bcrypt.compare(password, this.password, (err, isMatch) => { //通过bcrypt的compare函数进行解密处理
    if (err) return callback(err);
    callback(null, isMatch);
  });
};


module.exports = mongoose.model("Admin", AdminSchema)
