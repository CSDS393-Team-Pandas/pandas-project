const { createOne,findOne,findAll,updateOne } = require('../service/admin.service');
const { signJwt } = require("../utils/jwt");
const config = require("config")
const verifyPassword = require('../utils/bcrypt')

const registerHandler = async (req, res) => { //register port
  const input = req.body;
  // check the database to see if the username is exist
  findOne({
    username: input.username
  }, (err, user) => {
    if (err) {
      return res.error('400500');
    };
    if (user) {
      res.error('402007')
    } else { //if not exist then create a new user
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
  findOne({ username }, (err, user) => { // based on the username to check user
    if (err) {
      return res.error('400500');
    }
    if (user) {
      user.validatePassword(password, async (err, isMatch) => { //if user exist then needs verification 
        if (err) {
            return res.error('400500');
        }
        if (!isMatch) { //judge if password matches
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
