import React, {useEffect,useState } from 'react'
import '../style/feed.scss'
import Post from '../components/Post';
import {usePost} from '../hooks/usePost'
import Nav from '../../shared/components/Nav';

const Feed = () => {

  const {loading,handlePostFeed,feed} = usePost()

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(()=>{
    handlePostFeed()

     const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');


  },[isDarkTheme])


  if(loading || !feed){
    return <main><h1>Loading.....</h1></main>
  }

  



  return (
    <main className='feed-page'>
      <div className="feed">
      <Nav setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme}/>
        

        <div className="posts">
          {feed.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Feed