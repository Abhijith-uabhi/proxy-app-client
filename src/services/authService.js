import api from "./fetchInterceptor"

const authService = {}

const basePath = "/api/v1/user"

authService.register = (data) => {
    return (
        api({
            url: `${basePath}/register`,
            method: "post",
            data
        })
    )

}

authService.signIn = (data) => {
    return (
        api({
            url: `${basePath}/signin`,
            method: "post",
            data


        })
    )
}


authService.getUser = () => {
    return (
        api({
            url: `${basePath}/get`,
            method: "get",
        


        })
    )
}
export default authService