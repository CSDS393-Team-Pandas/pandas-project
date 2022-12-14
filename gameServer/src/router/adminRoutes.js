const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const gameController = require('../controller/game.controller');
const userController = require('../controller/user.controller')
const commentController = require('../controller/comment.controller')
const {checkAdmin} = require('../middleware')

router.use(checkAdmin)
/**
 * @description Admin
 * */
router.route('/register').post(adminController.registerHandler);
router.route('/login').post(adminController.loginHandler);
router.route('/admin')
  .get(adminController.getUserInfoHandler)
  .put(adminController.userEditHandler);

/**
 * @description Game
 * */
router.route('/gameInit').post(gameController.initAdminGameList)
router.route('/game')
  .post(gameController.createGameHandler)
  .put(gameController.updateGameHandler)
  .delete(gameController.deleteOneGame)

router.route('/comment')
.post(commentController.initCommentList)
.delete(commentController.deleteOneComment)

/**
 * @description User
 * */
router.route('/user').get(userController.initUserList)
.delete(userController.deleteUserHandler)

module.exports = router;
