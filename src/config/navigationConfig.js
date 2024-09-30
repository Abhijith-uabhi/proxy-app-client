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
import TaskPage from "views/Dashboard/Task";
import TaskForm from "views/Dashboard/Task/components/CreateTask";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    name: "Manage Task",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/tasks",
        name: "Tasks For You",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },
      {
        path: "/your/tasks",
        name: "Your Tasks",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },
      {
        path: "/create/tasks",
        name: "Create Task",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        component: TaskForm,
        layout: "/admin",
      },
      {
        path: "/tasks/assigned",
        name: "Assigned Task",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        component: TaskPage,
        layout: "/admin",
      },

    ],
  },
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


export default dashRoutes;


