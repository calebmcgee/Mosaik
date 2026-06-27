const { Router } = require('express');
const { renderHome, toggleLike } = require('../controllers/homeController');
const { checkAuth } = require('../middleware/checkAuth');  

const homeRouter = Router();

homeRouter.use(checkAuth);

homeRouter.get('/', renderHome);


homeRouter.post('/:postId/toggleLike', toggleLike);

module.exports = homeRouter;