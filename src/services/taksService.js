import api from "./fetchInterceptor"

const taskService = {}

const basePath = "/api/v1/task"

taskService.getall = (type) => {
    return (
        api({
            url: `${basePath}/list/${type}`,
            method: "get",
         
        })
    )

}

taskService.createTask=(data)=>{
    return (
        api({
            url:`${basePath}/create`,
            method:"post",
            data
        })
    )
}


taskService.updateTask=(id,data,type)=>{
    return (
        api({
            url:`${basePath}/update/${id}?type=${type}`,
            method:"put",
            data
        })
    )
}

taskService.deleteTask=(id)=>{
    return (
        api({
            url:`${basePath}/delete/${id}`,
            method:"delete",
        })
    )
}

export default taskService