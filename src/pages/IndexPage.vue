<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 text-center">
        <h2 class="q-pa-xs">Formulario de Productos</h2>
      </div>
    </div>

    <div class="row justify-center q-gutter-md">
      <crear-producto />
      <div class="col-12 text-center">
        <h2 class="q-pa-xs">Productos almacenados</h2>
      </div>
      <ListaProductos />
    </div>
    <EditarProducto />
  </q-page>
</template>

<script setup>
import CrearProducto from "src/components/CrearProducto.vue";
import ListaProductos from "src/components/ListaProductos.vue";
import EditarProducto from "src/components/EditarProducto.vue";

defineOptions({
  name: "IndexPage",
});
</script>
