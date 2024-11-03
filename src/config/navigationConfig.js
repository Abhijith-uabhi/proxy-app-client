// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
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
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   rtlName: "لوحة القيادة",
  //   icon: <PersonIcon color="inherit" />,
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },

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


