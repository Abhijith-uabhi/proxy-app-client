import api from "./fetchInterceptor"

const basePath = "/api/v1/user"


const userService = {}


userService.getUser = () => {
    return (
        api({
            url: `${basePath}/get`,
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

userService.deletUserNotifications=()=>{
    return (
        api({
            url: `${basePath}/notifications/delete`,
            method: "delete",

        })
    )
}

export default userService