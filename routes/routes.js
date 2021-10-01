const { Router } = require('express');
const homeController = require('../controllers/homeController');
const cocofeedController = require('../controllers/cocofeedController');
const mypostsController = require('../controllers/mypostsController');
const mylikesController = require('../controllers/mylikesController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const logoutController = require('../controllers/logoutController');
const authMiddleware = require('../Middleware/authMiddleware');

const route = Router();

route.get('/',homeController);

route.get('/cocofeed',authMiddleware.requireAuth,cocofeedController.cocofeedController);
route.get('/cocofeed/like/:id',authMiddleware.requireAuth,cocofeedController.cocofeedController_like);

route.get('/myposts',authMiddleware.requireAuth,mypostsController.mypostsController_get);
route.post('/myposts',authMiddleware.requireAuth,mypostsController.mypostsController_post);
route.get('/myposts/delete/:id',authMiddleware.requireAuth,mypostsController.mypostsController_delete);

route.get('/mylikes',authMiddleware.requireAuth,mylikesController);

route.get('/login',loginController.loginController_get);
route.post('/login',loginController.loginController_post);

route.get('/register',registerController.registerController_get);
route.post('/register',registerController.registerController_post);

route.get('/logout',logoutController);



module.exports = route ;
