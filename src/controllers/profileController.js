const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

async function renderProfile(req, res){
    res.render('profile', { 
        title: 'profile',
        user : await db.getUserInfo(req.user.id),
        userPosts: await db.getUserPosts(req.user.id)
    });
}   

const validatePost = [
    body('content').trim()
    .notEmpty().withMessage('Content cannot be empty.')
];

const createPost = [
    validatePost,
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
        await db.createPost(req.user.id, content);
        res.redirect("/home");
}];

module.exports = {
    renderProfile,
    createPost
}