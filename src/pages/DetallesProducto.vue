<template>
  <q-page class="col-10 flex-center">
    <q-card class="q-ma-xl">
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-h4">
            {{ id + ": " + nombre + "   $" + precio }}
          </div>
          <div class="text-subtitle2">{{ fecha }}</div>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <h5>{{ descripcion }}</h5>
        <div class="text-h6">
          {{ "Agua:" + tipoAgua + " / Categoría:" + categoria }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn icon="reply_all" label="Regresar" :to="'/'" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useProductoStore } from "src/stores/ProductoStore";
const route = useRoute();
const productoStore = useProductoStore();

const id = route.params.id;

const nombre = ref(productoStore.getProductos[id].nombre);
const fecha = ref(productoStore.getProductos[id].fecha);
const descripcion = ref(productoStore.getProductos[id].descripcion);
const precio = ref(productoStore.getProductos[id].precio);
const categoria = ref(productoStore.getProductos[id].categoria);
const tipoAgua = ref(productoStore.getProductos[id].tipoAgua);
</script>
