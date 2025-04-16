import { socket } from "connection/socket"
import api from "./fetchInterceptor"



const taskService = {}

const basePath = "/api/v1/task"

taskService.getall = (params) => {
    let url = `${basePath}/list/${params.type}`
    if (params.lat && params.lng) {
        url += `?lat=${params.lat}&lng=${params.lng}`
    }
    return (
        api({
            url: url,
            method: "get",

        })
    )

}
taskService.createTask = (data) => {
    return (
        api({
            url: `${basePath}/create?sid=${socket.id}`,
            method: "post",
            data
        })
    )
}

taskService.getSingleTask = (id) => {
    return (
        api({
            url: `${basePath}/get/${id}`,
            method: "get",
        })
    )
}


taskService.updateTask = (id, data, type) => {
    return (
        api({
            url: `${basePath}/update/${id}?type=${type}`,
            method: "put",
            data
        })
    )
}

taskService.deleteTask = (id) => {
    return (
        api({
            url: `${basePath}/delete/${id}`,
            method: "delete",
        })
    )
}

const fetchTasks = async (page, limit) => {
    try {
        const response = await taskService.get(`/tasks?page=${page}&limit=${limit}`);

        if (response && response.data) {
            const { tasks, totalTasksCount } = response.data;
            setTasks(tasks);
            setTotalTasksCount(totalTasksCount);
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        setAlert({
            show: true,
            status: "error",
            description: "Failed to fetch tasks. Please try again.",
        });
    }
};


export default taskService