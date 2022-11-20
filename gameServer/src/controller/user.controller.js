const { createOne,findOne,findAll,updateOne,deleteOne } = require('../service/user.service');
const { signJwt } = require("../utils/jwt");
const { findAll: findUserRate } = require('../service/rate.service');
const { findAll: getGameList } = require('../service/game.service');
// User registration
const registerHandler = async (req, res) => { //Register port
  const input = req.body;
  findOne({
    username: input.username
  }, (err, user) => {
    if (err) {
      return res.error('400500');
    };
    if (user) {
      res.error('402007')
    } else { //Create user if no same user names appear
      createOne(input, (err, data) => {
        if (err)
          return res.error('400500');
        // createUserBehavior({userId: data._id},(err,beh) => {
        //   if (err)
        //     return res.error('400500');
        // })
          res.success(data)
      });
    }
  });
}

// Initialize user list and used by admin
const initUserList = (req,res) => {
    findAll({},(err,data) => {
      if(err) 
        return res.error('400500');
      res.success(data)
    })
}

//user log in
const loginHandler = async (req, res) => {
  const {
    username,
    password,
    phoneNumber,
    type
  } = req.body;
  findOne({ username }, (err, user) => { //based on username to check users
    if (err) {
      return res.error('400500');
    }
    if (user) {
      user.validatePassword(password, async (err, isMatch) => { //Verify password if user exists
        if (err) {
            return res.error('400500');
        }
        if (!isMatch) { //check if the password matches
            return res.error('402013');
        } else {
          const {_id,nickname,avatar,username} = user;
          const token = await signJwt({_id,nickname,avatar,username})
          res.success({username,token,avatar,nickname})
        }
      });
    } else {
      res.error('402014')
    }
  })
}

// Receive user rating
const getUserRate = (req,res) => {
    const { _id: userId } = res.locals.user;
    findUserRate({userId},(err,data) => {
        if(err) {
            return res.error('400500');
        }
        const gameList = data.map(item => {
            return item.gameId;
        })
        getGameList({_id: { $in: gameList }},(err,list)=> {
            if (err)
                return res.error('400500');
            res.success(list.map((item,index) => {
                return {
                    thumb: item.thumb,
                    name: item.name,
                    gameId: item._id,
                    rate: data[index].rate,
                }
            }))
          })
    })
}

const deleteUserHandler = (req,res) => {
  const { id } = req.body;
  deleteOne({_id: id},(err,result) => {
    if(err) {
      res.error('400500').end();
    } 
    res.success(result)
  })
}

//User profile edit
const userEditHandler = (req,res) => {
  const {avatar,nickname,signature,sex,gameLabel} = req.body;
  const { _id } = res.locals.user;
  updateOne({ _id },{
    avatar,nickname,signature,sex,gameLabel
  },(err,user) => {
    if (err) {
      res.error('400500');
    } else {
    //   updateArticleAndComment(_id,{avatar,nickname});
      res.success(user)
    }
  })
}

// Receive user information
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
    initUserList,
    deleteUserHandler,
    getUserInfoHandler,
    getUserRate
};
