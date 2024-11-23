<template>
  <q-page class="q-pa-md">
    <CrearFactura />
    <q-section>
      <DetallesFactura />
      <FacturasGuardadas />
    </q-section>
  </q-page>
</template>

<script setup>
import CrearFactura from "src/components/CrearFactura.vue";
import FacturasGuardadas from "src/components/FacturasGuardadas.vue";
</script>
