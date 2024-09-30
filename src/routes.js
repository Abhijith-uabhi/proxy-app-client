// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import TaskPage from "views/Dashboard/Task";
import TaskForm from "views/Dashboard/Task/components/CreateTask";

var routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        component: Dashboard,
        layout: "/admin",
    },


    {
        path: "/tasks",
        name: "Tasks For You",
        rtlName: "لوحة القيادة",
        component: TaskPage,
        layout: "/admin",
    },
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
    },

    {
        path: "/tables",
        name: "Tables",
        rtlName: "لوحة القيادة",
        component: Tables,
        layout: "/admin",
    },
    {
        path: "/billing",
        name: "Billing",
        rtlName: "لوحة القيادة",
        component: Billing,
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
    },

];


export default routes;


