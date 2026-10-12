//import { useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import './Home.css'
import Feed from '../components/Feed'
//import Post from '../components/Post'

function Home() {
    const posts = [
        {id:1, name: 'Jordan', date: 1, content: 'Hello', likes:5, comments: 2},
        {id:2, name: 'Mike', date: 1, content: 'Wassup', likes:10, comments: 4},
        {id:3, name: 'Kay', date: 1, content: 'Yo twin', likes:15, comments: 6},


    ];

    return (
        <div className='page-container'>
            <AppLayout>
                <Feed posts={posts}/>
            </AppLayout>
        </div>
    )
}

export default Home
