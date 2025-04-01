import api from "./fetchInterceptor"

const basePath = "/api/v1/user"


const userService = {}


userService.getUser = (user_id) => {
    let url = `${basePath}/get`
    if (user_id) {
        url = `${basePath}/get?id=${user_id}`
    }
    return (
        api({
            url,
            method: "get",
        })
    )
}

userService.getAllUsers = (data) => {
    return (
        api({
            url: `${basePath}/list/all`,
            method: "post",
            data

        })
    )
}

userService.deletUserNotifications = () => {
    return (
        api({
            url: `${basePath}/notifications/delete`,
            method: "delete",

        })
    )
}


userService.editProfile = (id, values, mode) => {
    let url = `${basePath}/update/${id}`
    if (mode) {
        url = `${basePath}/update/${id}?type=${mode}`
    }
    return (
        api({
            url: url,
            method: "put",
            data: values

        })
    )
}

userService.submitRating = (values) => {
    return (
        api({
            url: `${basePath}/rating`,
            method: "put",
            data: values

        })
    )
}

export default userService