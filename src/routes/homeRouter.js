const { Router } = require('express');
const { renderHome, toggleLike, postComment, renderPost } = require('../controllers/homeController');
const { checkAuth } = require('../middleware/checkAuth');  

const homeRouter = Router();
homeRouter.use(checkAuth);

homeRouter.get('/', renderHome);

homeRouter.post('/:postId/toggleLike', toggleLike);

homeRouter.post('/posts/:postId/postComment', postComment);

homeRouter.get('/posts/:postId', renderPost);

module.exports = homeRouter;