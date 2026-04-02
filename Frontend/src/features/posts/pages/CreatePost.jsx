import React, { useRef, useState } from 'react'
import '../style/createpost.scss'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'
function CreatePost() {
  const [caption, setCaption] = useState('')
  const postImageInputFieldRef = useRef(null)
  const {loading,handleCreatePost} = usePost()
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0]

    await handleCreatePost(file,caption)

    navigate("/")
  }

  if(loading){
    return <main><h1>Creating....</h1></main>
  }

  return (
    <main className='create-post-page'>
      <div className="form-container">
          <h1>Create Post</h1>
          <form onSubmit={handleSubmit}>
            <label className='create-post-image' htmlFor="postImage">Select Post Image</label>
            <input hidden ref={postImageInputFieldRef} type="file" name="postImage" id="postImage" />
            <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="text" name="caption" id="caption" placeholder='Write a caption.' />
            <button className='button button-primary'>Create Post</button>
          </form>
      </div>
    </main>
  )
}

export default CreatePost
