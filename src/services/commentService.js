import api from "./fetchInterceptor"

const basePath = "/api/v1/comment"


const commentService = {}


commentService.addComment = (data) => {
    return (
        api({
            url: `${basePath}/add`,
            method: "post",
            data
        })
    )
}   

commentService.getcomments = (task_id,parent_id) => {
    let path=`${basePath}/list/${task_id}`
    if(parent_id){
        path=`${basePath}/list/${task_id}?parent_id=${parent_id}`
    }
    return (
        api({
            url: path,
            method: "get",

        })
    )
}

export default commentService