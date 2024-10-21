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

commentService.getcomments= () => {
    return (
        api({
            url: `${basePath}/list`,
            method: "get",

        })
    )
}

export default commentService