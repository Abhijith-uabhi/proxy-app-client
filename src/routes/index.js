// imports
import Dashboard from "views/Dashboard/Dashboard";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import TaskPage from "views/Dashboard/Task";
import TaskForm from "views/Dashboard/Task/components/TaskCreateForm";
import TaskInfo from "views/Dashboard/TaskInfo";
import { useSelector } from "react-redux";

const getRoutes = (user) => [
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        component: Dashboard,
        layout: "/admin",
    },
    ...(user?.role === "agent" || user?.role === "admin" ? [
        {
            path: "/tasks",
            name: "Tasks For You",
            rtlName: "لوحة القيادة",
            component: TaskPage,
            layout: "/admin",
        }, {
            path: "/tasks/assigned",
            name: "Assigned Task",
            rtlName: "لوحة القيادة",
            component: TaskPage,
            layout: "/admin",
        },

    ] : []),
    ...(user?.role === "author" || user?.role === "admin" ? [
        {
            path: "/your/tasks",
            name: "Your Tasks",
            rtlName: "لوحة القيادة",
            component: TaskPage,
            layout: "/admin",
        },
        {
            path: "/edit/tasks",
            name: "Edit Task",
            rtlName: "لوحة القيادة",
            component: TaskForm,
            layout: "/admin",
        },
        {
            path: "/create/tasks",
            name: "Create Task",
            rtlName: "لوحة القيادة",
            component: TaskForm,
            layout: "/admin",
        }
    ] : []),
    {
        path: "/task/info/:id",
        name: "Task Informations",
        rtlName: "لوحة القيادة",
        component: TaskInfo,
        layout: "/admin",
    },


    {
        path: "/rtl-support-page",
        name: "RTL",
        rtlName: "آرتيإل",
        component: RTLPage,
        layout: "/rtl",
    },
    {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
    },
    {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        component: SignIn,
        layout: "/auth",
    },
    {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
    }
];

// Component to export routes
const RoutesConfig = () => {
    const { user } = useSelector((state) => state.auth);
    return getRoutes(user);
};

export default RoutesConfig;
