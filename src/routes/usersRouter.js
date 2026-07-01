const { Router } = require('express');
const { checkAuth } = require('../middleware/checkAuth');
const { renderUsers, renderUser, toggleFollow } = require('../controllers/usersController');

const usersRouter = Router();
usersRouter.use(checkAuth);

usersRouter.get('/', renderUsers);

usersRouter.get('/:userId', renderUser);

usersRouter.get('/:userId/toggleFollow', toggleFollow);

module.exports = usersRouter;