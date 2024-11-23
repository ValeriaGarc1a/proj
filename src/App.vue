<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useProductoStore } from "./stores/ProductoStore";
import { useFacturaStore } from "src/stores/FacturaStore";
import { useAuthStore } from "src/stores/authStore"; // Importamos el store de autenticación

const productoStore = useProductoStore();
const facturaStore = useFacturaStore();
const authStore = useAuthStore(); // Instanciamos el authStore

// Cargar productos y facturas
onMounted(() => {
  productoStore.loadProductos();
  facturaStore.loadFacturas();

  // Inicializar el store de autenticación
  authStore.init(); // Inicializa el estado de autenticación
});

defineOptions({
  name: "App",
});
</script>
