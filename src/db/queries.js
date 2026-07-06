const pool = require('./pool');
const gravatar = require(`gravatar`);

/* USERS */
//createUser
async function createUser(name, email, password){
    await pool.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)`, [name, email, password]
    );
}

//getAllUsers
async function getAllUsers(currentUser){
    const { rows } = await pool.query(`
        SELECT
            users.id,
            users.name,
            users.email
        FROM users
        WHERE users.id != $1
        `, [currentUser]
    );

    const users = rows;
    for (const user of users){
        user.avatar = gravatar.url(user.email, {
            d: "identicon"
        });
    }

    return users;
}

//getUser
async function getUser(email){
    const { rows } = await pool.query(`
        SELECT * FROM users 
        WHERE email = $1`, [email]
    );

    const user = rows[0];
    user.avatar = gravatar.url(user.email, {
        d: "identicon"
    });

    return user;
}

//getUserById
async function getUserById(id) {
    const { rows } = await pool.query(`
        SELECT * FROM users 
        WHERE id = $1`, [id]
    );

    const user = rows[0];
    user.avatar = gravatar.url(user.email, {
        d: "identicon"
    });

    return user;
}

async function getUserInfo(id) { 
    const { rows } = await pool.query(`
        SELECT
            users.id,
            users.name,
            users.email,
            
            COUNT(DISTINCT followers.user_id)::int AS follower_count,
            COUNT(DISTINCT following.following_id)::int AS following_count,

            COUNT(DISTINCT posts.id)::int AS post_count
        FROM users
        LEFT JOIN user_following following
            ON users.id = following.user_id
        LEFT JOIN user_following followers
            ON users.id = followers.following_id
        LEFT JOIN posts
            ON users.id = posts.author
        WHERE users.id = $1
        GROUP BY
            users.id,
            users.name`,[id]
    );

    const user = rows[0];
    user.avatar = gravatar.url(user.email, {
        d: "identicon"
    });

    return user;
}

/*editUser

async function editUser(id, email, password) {
    
}*/

/* FOLLOWING */

async function followUser(userId, followingId) {
    await pool.query(`
        INSERT INTO user_following(user_id, following_id) VALUES ($1, $2)`, [userId, followingId]
    );
}

async function unfollowUser(userId, unfollowingId) {
    await pool.query(`
        DELETE FROM user_following
        WHERE user_id = $1
        AND unfollowing_id = $2`, [userId, unfollowingId]
    );
}

async function getFollowing(userId) {
    const { rows } = await pool.query(`
        SELECT * FROM user_following 
        WHERE user_id = $1`, [userId]
    );
    const followingList = [];
    for(const row of rows) {
        followingList.push(row.following_id)
    }
    return followingList;
}  

async function getFollowers(userId) { 
        const { rows } = await pool.query(`
        SELECT * FROM user_following 
        WHERE following_id = $1`, [userId]
    );
    const followersList = [];
    for(const row of rows) {
        followersList.push(row.user_id)
    }
    return followersList;
}

async function toggleFollow(userId, followingId){
    const deleted = await pool.query(`
        DELETE FROM user_following
        WHERE user_id = $1
        AND following_id = $2`, [userId, followingId]
    );

    if(deleted.rowCount === 0){
        await pool.query(`
            INSERT INTO user_following(user_id, following_id) VALUES ($1, $2)`, [userId, followingId]
        );
    }
}

/* POSTS */

async function createPost(authorId, content) {
    await pool.query(`INSERT INTO posts(author, content) VALUES ($1, $2)`, [authorId, content]
    );
}

async function deletePost(postId) {
    const content = "Post Deleted";
    await pool.query(`
        UPDATE posts 
        SET content = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2`, [content, postId]
    );

}

async function getAllPosts(){
    const { rows } = await pool.query(`SELECT * FROM posts`);
    return rows;
}

async function getPost(postId, currentUser) {
    const { rows } = await pool.query(`
        SELECT
            posts.id,
            posts.content,
            posts.created_at,

            users.id AS author_id,
            users.name AS author_name,
            users.email AS author_email,

            COUNT(DISTINCT post_likes.user_id)::int AS like_count,
            COUNT(DISTINCT comments.id)::int AS comment_count,

            (user_like.user_id IS NOT NULL) AS liked
        FROM posts
        JOIN users
            ON users.id = posts.author
        LEFT JOIN post_likes
            ON posts.id = post_likes.post_id
        LEFT JOIN comments
            ON posts.id = comments.post
        LEFT JOIN post_likes user_like
            ON posts.id = user_like.post_id
            AND $2 = user_like.user_id
        WHERE
            posts.id = $1 
        GROUP BY 
            posts.id,
            posts.content,
            posts.created_at,
            users.id,
            users.name,
            users.email,
            user_like.user_id`,[postId, currentUser]
    );

    const post = rows[0];
    post.author_avatar = gravatar.url(post.author_email, {
        d: "identicon"
    });

    return post;
}

async function getUserPosts(userId) {
    const { rows } = await pool.query(`
        SELECT 
            posts.id,
            posts.content,
            posts.created_at,

            users.id AS author_id,
            users.name AS author_name,
            users.email AS author_email,

            COUNT(DISTINCT post_likes.user_id)::int AS like_count,
            COUNT(DISTINCT comments.id)::int AS comment_count,

            (user_like.user_id IS NOT NULL) AS liked
        FROM posts
        JOIN users
            ON users.id = posts.author
        LEFT JOIN post_likes
            ON posts.id = post_likes.post_id
        LEFT JOIN comments
            ON posts.id = comments.post
        LEFT JOIN post_likes user_like
            ON posts.id = user_like.post_id
            AND users.id = user_like.user_id
        WHERE
            users.id = $1
        GROUP BY 
            posts.id,
            posts.content,
            posts.created_at,
            users.id,
            users.name,
            users.email,
            user_like.user_id

        ORDER BY posts.created_at DESC`, [userId]
    );

    const posts = rows;
    for (const post of posts){
        post.author_avatar = gravatar.url(post.author_email, {
            d: "identicon"
        });
    }

    return posts;
}

async function getHomePosts(userId) {
    const { rows } = await pool.query(`
        SELECT 
            posts.id,
            posts.content,
            posts.created_at,

            users.id AS author_id,
            users.name AS author_name,
            users.email AS author_email,

            COUNT(DISTINCT post_likes.user_id)::int AS like_count,
            COUNT(DISTINCT comments.id)::int AS comment_count,

            (user_like.user_id IS NOT NULL) AS liked
        FROM posts
        JOIN users
            ON posts.author = users.id
        LEFT JOIN post_likes
            ON posts.id = post_likes.post_id
        LEFT JOIN comments
            ON posts.id = comments.post
        LEFT JOIN post_likes user_like
            ON posts.id = user_like.post_id
            AND user_like.user_id = $1
        GROUP BY 
            posts.id,
            posts.content,
            posts.created_at,
            users.id,
            users.name,
            users.email,
            user_like.user_id

        ORDER BY posts.created_at DESC`, [userId]
    );

    const posts = rows;
    for (const post of posts){
        post.author_avatar = gravatar.url(post.author_email, {
            d: "identicon"
        });
    }

    return posts;

}
/* LIKES */

async function togglePostLike(userId, postId){
    const deleted = await pool.query(`
        DELETE FROM post_likes
        WHERE user_id = $1
        AND post_id = $2`, [userId, postId]
    );

    if(deleted.rowCount === 0){
        await pool.query(`
            INSERT INTO post_likes(user_id, post_id) VALUES ($1, $2)`, [userId, postId]
        );
    }
}

async function getPostLikes(postId) {
    const { rows } = pool.query(`
        SELECT * FROM post_likes 
        WHERE post_id = $1`, [postId]
    )
    return rows;
}

/* COMMENTS */

async function createComment(userId, postId, content) {
    await pool.query(`INSERT INTO comments(author, post, content) VALUES ($1, $2, $3)`, [userId, postId, content]
    );
}

async function getPostComments(postId, currentUser) {
    const { rows } = await pool.query(`
        SELECT
            comments.id,
            comments.post,
            comments.author,
            comments.content,
            comments.created_at,

            users.id AS author_id,
            users.name AS author_name,
            users.email AS author_email,

            COUNT(DISTINCT comment_likes.user_id)::int AS like_count,

            (user_like.user_id IS NOT NULL) AS liked
        FROM comments
        JOIN users
            ON comments.author = users.id
        LEFT JOIN comment_likes
            ON comments.id = comment_likes.comment_id
        LEFT JOIN comment_likes user_like
            ON comments.id = user_like.comment_id
            AND $2 = user_like.user_id
        WHERE
            comments.post = $1 
        GROUP BY 
            comments.id,
            comments.post,
            comments.author,
            comments.content,
            comments.created_at,
            users.id,
            users.name,
            users.email,
            user_like.user_id`, [postId, currentUser]
    );

    const comments = rows;
    for (const comment of comments){
        comment.author_avatar = gravatar.url(comment.author_email, {
            d: "identicon"
        });
    }

    return comments;

}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    getUserInfo,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    toggleFollow,
    createPost,
    deletePost,
    getAllPosts,
    getUserPosts,
    getHomePosts,
    getPost,
    togglePostLike,
    getPostLikes,
    getPostComments,
    createComment
}