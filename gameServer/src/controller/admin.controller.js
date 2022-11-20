const { createOne,findOne,findAll,updateOne } = require('../service/admin.service');
const { signJwt } = require("../utils/jwt");
const config = require("config")
const verifyPassword = require('../utils/bcrypt')

const registerHandler = async (req, res) => { //Interface registration
  const input = req.body;
  // Search whether the username exists to avoid username repetition
  findOne({
    username: input.username
  }, (err, user) => {
    if (err) {
      return res.error('400500');
    };
    if (user) {
      res.error('402007')
    } else { //Create user if no identical username
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
  findOne({ username }, (err, user) => { //Search user by username 
    if (err) {
      return res.error('400500');
    }
    if (user) {
      user.validatePassword(password, async (err, isMatch) => { //Verify password if user exists
        if (err) {
            return res.error('400500');
        }
        if (!isMatch) { //Check if the passwords match
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
