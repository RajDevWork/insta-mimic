import React, { useState, useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post';

const Feed = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const posts = [
    {
      id: 1,
      username: 'john_doe',
      profileImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      postImg: 'https://images.unsplash.com/photo-1494753124839-84d9bbe79043?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Beautiful sunset moments',
      likes: 234,
      comments: 45,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      username: 'jane_smith',
      profileImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      postImg: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Adventure awaits in the mountains',
      likes: 567,
      comments: 89,
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      username: 'mike_travel',
      profileImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      postImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Ocean vibes and coastal life',
      likes: 892,
      comments: 156,
      timestamp: '6 hours ago'
    },
    {
      id: 4,
      username: 'sarah_art',
      profileImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      postImg: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Art is where the soul meets the world',
      likes: 445,
      comments: 72,
      timestamp: '8 hours ago'
    },
    {
      id: 5,
      username: 'alex_food',
      profileImg: 'https://images.unsplash.com/photo-1517849845537-1d51a20414de?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      postImg: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Food is life, let\'s eat 🍽️',
      likes: 678,
      comments: 123,
      timestamp: '10 hours ago'
    },
    {
      id: 6,
      username: 'lisa_fitness',
      profileImg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      postImg: 'https://images.unsplash.com/photo-1434682881908-b91d292b378e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Stay fit, stay strong! 💪',
      likes: 912,
      comments: 201,
      timestamp: '12 hours ago'
    }
  ];

  return (
    <main className='feed-page'>
      <div className="feed">
        <div className="theme-toggle-container">
          <button 
            className={`theme-toggle ${isDarkTheme ? 'dark' : 'light'}`}
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            title={isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkTheme ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="posts">
          {posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Feed