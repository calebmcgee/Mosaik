const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

async function renderProfile(req, res){
    res.render('profile', { 
        title: 'profile',
        user : await db.getUserInfo(req.user.id),
        userPosts: await db.getUserPosts(req.user.id)
    });
}   

const createPostValidator= [
    body('content').trim()
    .notEmpty().withMessage('Content cannot be empty.')
];

const createPost = [
    createPostValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('profile', {
                title: 'profile',
                erros: errors.array()
            });
        }
        const { content } = matchedData(req);
        await db.createPost(req.user.id, content);
        res.redirect("/profile");
}];

module.exports = {
    renderProfile,
    createPost
}