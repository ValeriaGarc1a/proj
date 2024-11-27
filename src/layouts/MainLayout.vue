<template>
  <q-layout view="hHh LpR lFf">
    <q-header class="bg-dark q-pa-sm" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-avatar style="width: 120px; height: 64px">
          <img src="/icons/dm_logo.png" />
        </q-avatar>
        <q-toolbar-title> Punto de Venta DonMike </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/checkout" label="CheckOut" />
        <q-route-tab to="/registro_de_productos" label="Productos" />
        <q-route-tab to="/registro_facturas" label="Facturas" />
        <q-route-tab to="/register" label="Registrar" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" overlay elevated>
      <q-list>
        <q-item-label header> Páginas </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
const leftDrawerOpen = ref(false);

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Agregar producto",
    caption: "Agregue productos al registro.",
    icon: "bookmark_add",
    link: "/",
  },
  {
    title: "CheckOut",
    caption: "Registrar venta.",
    icon: "receipt_long",
    link: "#/checkout",
  },
  {
    title: "Facturas",
    caption: "Registros de ventas.",
    icon: "dashboard",
    link: "#/registro_facturas",
  },
  {
    title: "Productos",
    caption: "Productos almacenados.",
    icon: "inventory_2",
    link: "#/registro_de_productos",
  },
];

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
