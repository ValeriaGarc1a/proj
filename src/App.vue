<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useProductoStore } from "./stores/ProductoStore";
import { useFacturaStore } from "src/stores/FacturaStore";

const productoStore = useProductoStore();
const facturaStore = useFacturaStore();

onMounted(() => {
  productoStore.loadProductos();
  facturaStore.loadFacturas();
});

defineOptions({
  name: "App",
});
</script>
