import axios from 'axios'
const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

export async function getFeed(){
    const response = await api.get("/posts/feed")
    return response.data
}

export async function createPost(image,caption){
    const formdata = new FormData()
    formdata.append('image',image);
    formdata.append('caption',caption)

    const response = await api.post("/posts",formdata)

    return response.data
}

export async function LikedPost(postid){
    const response = await api.post("/posts/like/"+postid)
    return response.data
}

export async function disLikePost(postid) {
    const response = await api.post("/posts/unlike/"+postid)
    return response.data
}