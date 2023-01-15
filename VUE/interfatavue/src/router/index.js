import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Meniu from "../views/Meniu.vue";
import Create from "../views/Create.vue";
import EditareLaptop from "../views/EditareLaptop.vue";
import EditareTelefon from "../views/EditareTelefon.vue";
import EditareDesktop from "../views/EditareDesktop.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: {
      header: true,
      content: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/meniu",
    name: "Meniu",
    component: Meniu,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/editlaptop/:id",
    name: "EditareLaptop",
    component: EditareLaptop,
  },
  {
    path: "/edittelefon/:id",
    name: "EditareTelefon",
    component: EditareTelefon,
  },
  {
    path: "/editdesktop/:id",
    name: "EditareDesktop",
    component: EditareDesktop,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
