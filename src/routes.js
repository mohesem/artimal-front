/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Search from "views/Search.jsx";
import Errors from "views/Errors.jsx";
import Logs from "views/Logs.jsx";
import User from "views/User.jsx";
import Stock from "views/Stock.jsx";
import Incomes from "views/Incomes.jsx";
import Expenses from "views/Expenses.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "داشبورد",
    icon: "nc-icon nc-paper",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/addRecord",
    name: "رکورد جدید",
    icon: "nc-icon nc-simple-add",
    component: Search,
    layout: "/admin",
  },
  {
    path: "/logs",
    name: "لاگ ها",
    icon: "nc-icon nc-paper",
    component: Logs,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "کاربران",
    icon: "nc-icon nc-single-02",
    component: User,
    layout: "/admin",
  },
  {
    path: "/errors",
    name: "ارورها",
    icon: "nc-icon nc-alert-circle-i",
    component: Errors,
    layout: "/admin",
  },
  {
    path: "/stock",
    name: "موجودی",
    icon: "nc-icon nc-bell-55",
    component: Stock,
    layout: "/admin",
  },

  {
    path: "/expenses",
    name: "هزینه ها",
    icon: "nc-icon nc-basket",
    component: Expenses,
    layout: "/admin",
  },
  {
    path: "/incomes",
    name: "درآمدها",
    icon: "nc-icon nc-shop",
    component: Incomes,
    layout: "/admin",
  },
];
export default routes;
