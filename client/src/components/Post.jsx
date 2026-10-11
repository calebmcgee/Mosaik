import './Post.css'

function Post({ post }){
    return (
            <div className="post">
                <div>
                    <img className="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeovjod_04Sdg1IteBevxVDjznQFdFP8YlU8znE2wjDQ&s=10" alt="PFP"></img>
                </div>
                <div>
                    <div className="post-header">
                        <p>{post.name}</p>
                        <p>-</p>
                        <p>{post.date}</p>
                    </div>
                    <div className="post-content">
                        <p>{post.content}</p>
                    </div>
                    <div className="post-footer">
                        <p>{post.likes}</p>
                        <p>{post.comments}</p>
                    </div>
                </div>
            </div>
    )
}

export default Post;