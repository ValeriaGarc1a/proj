<template>
  <q-dialog v-model="productoStore.editDialog" persistent>
    <q-card>
      <q-card-section class="row">
        <div text-H6>Editar {{ productoStore.editarProducto.nombre }}</div>
      </q-card-section>

      <q-card-section class="col">
        <q-input
          filled
          class="q-pa-xs"
          v-model="productoStore.editarProducto.nombre"
          type="text"
          label="Nombre"
        >
          <template v-slot:prepend><q-icon name="bookmark" /></template>
        </q-input>

        <q-input
          v-model="productoStore.editarProducto.descripcion"
          filled
          clearable
          class="q-pa-xs"
          type="textarea"
          label="Descripción"
          hint="*Opcional"
          :shadow-text="textareaShadowText"
          @keydown="processTextareaFill"
          @focus="processTextareaFill"
        >
          <template v-slot:prepend><q-icon name="edit_note" /></template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-input
          filled=""
          class="q-pa-xs"
          v-model="productoStore.editarProducto.precio"
          type="number"
          label="Precio"
        >
          <template v-slot:prepend><q-icon name="attach_money" /></template>
        </q-input>
        <q-select
          class="q-pa-xs"
          icon="tag"
          label="Categoría"
          transition-show="scale"
          transition-hide="scale"
          filled
          v-model="productoStore.editarProducto.categoria"
          :options="productoStore.categoriaOptions"
        />
        <q-select
          class="q-pa-xs"
          label="Tipo de Agua"
          transition-show="scale"
          transition-hide="scale"
          filled
          v-model="productoStore.editarProducto.tipoAgua"
          :options="productoStore.aguaOptions"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn
          flat
          label="Editar"
          color="primary"
          @click="productoStore.saveProducto(productoStore.editarProducto.id)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useProductoStore } from "src/stores/ProductoStore";

const productoStore = useProductoStore();
</script>
