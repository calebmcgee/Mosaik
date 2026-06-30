const db = require('../db/queries');

async function renderUsers(req, res) {
    res.render('users', {
        title: 'Users',
        users: await db.getAllUsers(req.user.id)
    });
}

async function renderUser(req, res){
    res.render('user', { 
        title: 'user',
        user: await db.getUserById(req.params.userId),
        userPosts: await db.getUserPosts(req.params.userId)
    });
} 

module.exports = {
    renderUsers,
    renderUser
}