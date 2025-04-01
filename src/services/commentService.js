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

commentService.getcomments = (task_id, parent_id) => {
    let path = `${basePath}/list/${task_id}`
    if (parent_id) {
        path = `${basePath}/list/${task_id}?parent_id=${parent_id}`
    }
    return (
        api({
            url: path,
            method: "get",

        })
    )
}
commentService.editComment = (comment_id, data) => {

    return (
        api({
            url: `${basePath}/update/${comment_id}`,
            method: "put",
            data: data

        })
    )
}

commentService.deleteComment = (comment_id) => {
    return (
        api({
            url: `${basePath}/delete/${comment_id}`,
            method: "delete"
        })
    )
}


export default commentService