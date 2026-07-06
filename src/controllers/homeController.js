const db = require('../db/queries');
const { body, matchedData, validationResult } =require('express-validator');

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

const validateComment = [
    body('content').trim()
    .notEmpty().withMessage('Content cannot be empty.')
];

const postComment = [
    validateComment,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('home', {
                title: 'Home',
                user: req.user,
                posts: await db.getHomePosts(req.user.id),
                errors: errors.array()
            });
        }
        const { content } = matchedData(req);
        const postId = req.params.postId;
        await db.createComment(req.user.id, postId, content);
        res.redirect('/home/posts/' + postId);
}]

async function renderPost(req, res) {
    const postId = req.params.postId;

    res.render('post', {
        title: 'post',
        post: await db.getPost(postId, req.user.id),
        comments: await db.getPostComments(postId, req.user.id)
    });
}

module.exports = {
    renderHome,
    toggleLike,
    postComment,
    renderPost
};