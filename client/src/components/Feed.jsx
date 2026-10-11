import './Feed.css'
import Post from './Post.jsx'
function Feed({ posts }){
    const postList = posts.map(post =><li><Post key={post.id} post={post}/></li>)
    return (
        <ul className='feed'>
            {postList}
            <li className='feed-bottom'>No Remaining Posts</li>
        </ul>
    )
}

export default Feed;