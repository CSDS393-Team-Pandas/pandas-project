const { createOne,findOne,findAll,updateOne } = require('../service/admin.service');
const { signJwt } = require("../utils/jwt");
const config = require("config")
const verifyPassword = require('../utils/bcrypt')

const registerHandler = async (req, res) => { //注册接口
  const input = req.body;
  // 先查找数据库看用户名是否已存在，避免出现用户名一样的情况
  findOne({
    username: input.username
  }, (err, user) => {
    if (err) {
      return res.error('400500');
    };
    if (user) {
      res.error('402007')
    } else { //未出现用户名相同的的情况则创建用户
      createOne(input, (err, _newUser) => {
        if (err)
          return res.error('400500');
        res.success(_newUser)
      });
    }
  });
}

const loginHandler = async (req, res) => {
  const {
    username,
    password,
  } = req.body;
  findOne({ username }, (err, user) => { //根据username查找用户
    if (err) {
      return res.error('400500');
    }
    if (user) {
      user.validatePassword(password, async (err, isMatch) => { //如果用户存在则验证密码
        if (err) {
            return res.error('400500');
        }
        if (!isMatch) { //判断密码是否匹配
            return res.error('402013');
        } else {
          const {_id,nickname,avatar,isAuth,username} = user;
          const token = await signJwt({_id,isAuth,nickname,avatar,username})
          res.success({username,token,avatar,nickname})
        }
      });
    } else {
      res.error('402014')
    }
  })
}

const userEditHandler = (req,res) => {
  const {avatar,nickname,signature} = req.body;
  const { _id } = res.locals.user;
  updateOne({ _id },{
    avatar,nickname,signature
  },(err,user) => {
    if (err) {
      res.error('400500');
    } else {
      res.success(user)
    }
  })
}

const getUserInfoHandler = (req,res) => {
  const { _id } = res.locals.user;
  findOne({_id}, (err, user) => {
    if (err) {
      res.error('400500');
    } else {
      res.success(user)
    }
  })
}

module.exports = {
    registerHandler,
    loginHandler,
    userEditHandler,
    getUserInfoHandler
};
