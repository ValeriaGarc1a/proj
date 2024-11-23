import { useAuthStore } from "src/stores/authStore"; // Asegúrate de importar correctamente el store de autenticación

const requireAuth = (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.user) {
    next("/login"); // Redirige a la página de inicio de sesión si no está autenticado
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "detalles/:id",
        component: () => import("pages/DetallesProducto.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "registro_de_productos",
        component: () => import("src/pages/RegProductos.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "checkout",
        component: () => import("src/pages/CheckOut.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "facturas",
        component: () => import("src/components/FacturasGuardadas.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "factura/:idVenta",
        component: () => import("src/pages/DetallesFactura.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "registro_facturas",
        component: () => import("src/pages/RegFacturas.vue"),
        beforeEnter: requireAuth,
      },
      {
        path: "login",
        component: () => import("src/pages/LogIn.vue"),
      },
      {
        path: "register",
        component: () => import("src/pages/RegisterPage.vue"),
        
      },
      {
        path: "newPass",
        component: () => import("src/pages/NewPass.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
