const db = require('../db/queries');

async function renderHome(req, res) {
    const posts = await db.getHomePosts(req.user.id);
    res.render('home', {
        title: 'Home',
        user: req.user,
        posts: posts
    });
}

async function toggleLike(req, res) {
    const postId = req.params.postId;
    await db.togglePostLike(req.user.id, postId);
    res.redirect('/home');
}

module.exports = {
    renderHome,
    toggleLike
};