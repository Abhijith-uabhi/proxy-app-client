import api from "./fetchInterceptor"

const authService = {}

const basePath = "/api/v1/auth"

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




export default authService