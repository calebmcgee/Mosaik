const { Router } = require('express');
const { checkAuth } = require('../middleware/checkAuth');
const { renderUsers, renderUser } = require('../controllers/usersController');

const usersRouter = Router();
usersRouter.use(checkAuth);

usersRouter.get('/', renderUsers);

usersRouter.get('/:userId', renderUser);

module.exports = usersRouter;