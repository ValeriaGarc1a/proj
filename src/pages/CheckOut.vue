<template>
  <q-page class="q-pa-md">
    <CrearFactura />
    <q-section>
      <DetallesFactura />
      <ListaFacturas />
    </q-section>
  </q-page>
</template>

<script setup>
import CrearFactura from "src/components/CrearFactura.vue";
import ListaFacturas from "src/components/ListaFacturas.vue";
</script>
