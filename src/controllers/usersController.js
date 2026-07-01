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
        user: await db.getUserInfo(req.params.userId),
        userPosts: await db.getUserPosts(req.params.userId)
    });
} 

async function toggleFollow(req, res) {
    const followerId = req.user.id;
    const followingId = req.params.userId;
    await db.toggleFollow(followerId, followingId);
    res.redirect('/users/' + followingId);
}

module.exports = {
    renderUsers,
    renderUser,
    toggleFollow
}