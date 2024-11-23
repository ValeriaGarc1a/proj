<template>
  <q-page class="q-pa-md">
    <div class="row justify-center q-gutter-md">
      <crear-producto />
      <div class="col-12 text-center">
        <h2 class="q-pa-xs">Registro de Productos</h2>
      </div>
      <ListaProductos />
    </div>
    <EditarProducto />
  </q-page>
</template>

<script setup>
import ListaProductos from "src/components/ListaProductos.vue";
import EditarProducto from "src/components/EditarProducto.vue";

defineOptions({
  name: "RegProductos",
});
</script>
