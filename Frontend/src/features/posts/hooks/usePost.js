import { useContext } from "react";
import { PostContext } from "../post.context";
import {getFeed} from '../services/post.api'

export const usePost = ()=>{
    const postsContext = useContext(PostContext)
    const {loading,setLoading,post,setPost,feed,setFeed} = postsContext

    const handlePostFeed = async()=>{
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    return {loading,post,feed,handlePostFeed}
}