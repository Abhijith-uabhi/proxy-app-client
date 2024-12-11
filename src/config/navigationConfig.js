// import
import Dashboard from "views/Dashboard/Dashboard";


import {
  HomeIcon,

} from "components/Icons/Icons";
import { ViewIcon, AddIcon, CheckCircleIcon, AtSignIcon } from '@chakra-ui/icons';

import TaskPage from "views/Dashboard/Task";
import TaskForm from "views/Dashboard/Task/components/CreateTask";



const adminDashBoard = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    name: "Manage Tasks",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/tasks",
        name: "Tasks For You",
        rtlName: "لوحة القيادة",
        icon: <ViewIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },
      {
        path: "/your/tasks",
        name: "Your Tasks",
        rtlName: "لوحة القيادة",
        icon: <AtSignIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },
      {
        path: "/create/tasks",
        name: "Create Task",
        rtlName: "لوحة القيادة",
        icon: <AddIcon color="inherit" />,
        component: TaskForm,
        layout: "/admin",
      },
      {
        path: "/tasks/assigned",
        name: "Assigned Task",
        rtlName: "لوحة القيادة",
        icon: <CheckCircleIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },

    ],
  },


];

const agentDashboard = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    name: "Manage Tasks",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/tasks",
        name: "Tasks For You",
        rtlName: "لوحة القيادة",
        icon: <ViewIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },
      {
        path: "/tasks/assigned",
        name: "Assigned Task",
        rtlName: "لوحة القيادة",
        icon: <CheckCircleIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },


    ],
  },


];

const authorDashBoard = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    name: "Manage Tasks",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [

      {
        path: "/your/tasks",
        name: "Your Tasks",
        rtlName: "لوحة القيادة",
        icon: <AtSignIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },
      {
        path: "/create/tasks",
        name: "Create Task",
        rtlName: "لوحة القيادة",
        icon: <AddIcon color="inherit" />,
        component: TaskForm,
        layout: "/admin",
      },
    ],
  },
];

const navigationConfig = {
  admin: adminDashBoard,
  agent: agentDashboard,
  author: authorDashBoard
}


export default navigationConfig;


