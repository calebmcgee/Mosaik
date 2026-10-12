import './UserProfile.css'
import AppLayout from '../layouts/AppLayout';
import Feed from '../components/Feed';

function UserProfile() {
    const posts = [
        {id:1, name: 'Jordan', date: 1, content: 'Hello', likes:5, comments: 2},
        {id:2, name: 'Jordan', date: 1, content: 'Wassup', likes:10, comments: 4},
        {id:3, name: 'Jordan', date: 1, content: 'Yo twin', likes:15, comments: 6},

    ];

    const author = {
        name: 'Jordan',
        username: 'J5',
        following: 700,
        followers: 1500,
        avatar: ''
    }

    return (
        <AppLayout>
            <div className="user-profile">
                <div>
                    <img className="user-profile-avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeovjod_04Sdg1IteBevxVDjznQFdFP8YlU8znE2wjDQ&s=10" alt="PFP"></img>
                </div>
                <div>
                    <p>{author.name}</p>
                    <p>{author.username}</p>
                    <div className="user-profile-footer">
                        <p>{author.following} Following</p>
                        <p>{author.followers} Followers</p>
                    </div>
                </div>
            </div>
            <div className='user-profile-navbar'>
                Posts
            </div>
            <Feed posts={posts}/>
        </AppLayout>
    )
}

export default UserProfile;