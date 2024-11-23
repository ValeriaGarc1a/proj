const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "detalles/:id",
        component: () => import("pages/DetallesProducto.vue"),
      },
      {
        path: "registro_de_productos",
        component: () => import("src/pages/RegProductos.vue"),
      },

      // Ruta para ver todas las facturas generadas
      { path: "checkout", component: () => import("src/pages/CheckOut.vue") },
      {
        path: "facturas",
        component: () => import("src/components/FacturasGuardadas.vue"),
      },

      // Ruta para ver detalles específicos de una factura
      {
        path: "factura/:idVenta",
        component: () => import("src/pages/DetallesFactura.vue"),
      },
      {
        path: "registro_facturas",
        component: () => import("src/pages/RegFacturas.vue"),
      },
      {
        path: "login",
        component: () => import("src/pages/LogIn.vue"),
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
