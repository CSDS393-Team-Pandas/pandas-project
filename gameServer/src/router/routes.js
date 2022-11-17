const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const uploadController = require('../controller/upload.controller');
const gameController = require('../controller/game.controller');
const commentController = require('../controller/comment.controller')
const rateController = require('../controller/rate.controller')

/**
 * @description 用户路由
 * */
router.route('/register').post(userController.registerHandler);
router.route('/login').post(userController.loginHandler);
router.route('/user')
  .get(userController.getUserInfoHandler)
  .put(userController.userEditHandler);
/**
 * @description 图片上传
 * */
router.route('/upload').post(uploadController.singleUploadMiddle(), uploadController.uploadHandler)
router.route('/preview/:key').get(uploadController.imagePreviewHandler)

/**
 * @description 用户打分
 * */ 
router.route('/rateInit').post(rateController.initRateList)
router.route('/rate')
.get(userController.getUserRate)
.post(rateController.createRateHandler)
.put(rateController.createRateHandler)
.delete(rateController.deleteOneRate)

/**
 * @description 评论发布
 * */
router.route('/commentInit').post(commentController.initCommentList);
router.route('/comment')
.get(commentController.getUserCommentList)
  .post(commentController.createCommentHandler)
  .put(commentController.updateCommentHandler);

/**
 *  @description 游戏
 * */ 
router.route('/game').get(gameController.initGameList)
router.route('/getGameInfo').post(gameController.getGameInfo)
router.route('/authGame').get(gameController.initLoginGameList)


/**
 * @description 用户行为
 * */
// router.route('/behavior')
// .get(behaviorController.getBehaviorInfo)
// .post(behaviorController.updateBehaviorHandler)

module.exports = router;
