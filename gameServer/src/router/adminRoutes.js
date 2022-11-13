const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const gameController = require('../controller/game.controller');
const userController = require('../controller/user.controller')
const commentController = require('../controller/comment.controller')
const {checkAdmin} = require('../middleware')

router.use(checkAdmin)
/**
 * @description 管理员
 * */
router.route('/register').post(adminController.registerHandler);
router.route('/login').post(adminController.loginHandler);
router.route('/admin')
  .get(adminController.getUserInfoHandler)
  .put(adminController.userEditHandler);

/**
 * @description 游戏
 * */
router.route('/gameInit').post(gameController.initAdminGameList)
router.route('/game')
  .post(gameController.createGameHandler)
  .put(gameController.updateGameHandler)
  .delete(gameController.deleteOneGame)
router.route('/comment').post(commentController.initCommentList)

/**
 * @description 用户
 * */
router.route('/user').get(userController.initUserList)

module.exports = router;
