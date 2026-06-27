const db = require('../db/queries');

async function renderUsers(req, res) {
    res.render('users', {
        title: 'Users',
        users: await db.getAllUsers(req.user.id)
    });
}

module.exports = {
    renderUsers
}