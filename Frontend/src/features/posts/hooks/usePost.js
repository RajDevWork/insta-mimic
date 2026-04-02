import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import {getFeed,createPost,LikedPost,disLikePost} from '../services/post.api'

export const usePost = ()=>{
    const postsContext = useContext(PostContext)
    const {loading,setLoading,post,setPost,feed,setFeed} = postsContext

    const handlePostFeed = async()=>{
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async(image,caption)=>{
        setLoading(true)
        const data = await createPost(image,caption)
        setFeed([data.post,...feed])
        setLoading(false)
    }

    const handleLikePost = async(postid)=>{
        // setLoading(true)
        await LikedPost(postid)
        // setLoading(false)
        await handlePostFeed()
    }

    const handleDisLikePost = async(postid)=>{
        // setLoading(true)
        await disLikePost(postid)
        // setLoading(false)
       await handlePostFeed()
    }
    

    useEffect(() => {
        handlePostFeed()
    }, [])
    

    return {loading,post,feed,handlePostFeed,handleCreatePost,handleLikePost,handleDisLikePost}
}