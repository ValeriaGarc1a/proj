<template>
  <q-card class="col-10">
    <div class="text-h4 q-pa-lg text-grey">Detalles de producto:</div>
    <q-form ref="myForm" @reset="clearForm">
      <div class="row q-pa-xs">
        <q-card-section class="col">
          <q-input
            filled
            class="q-pa-xs"
            v-model="nuevoProducto"
            type="text"
            label="Nombre"
          >
            <template v-slot:prepend><q-icon name="bookmark" /></template>
          </q-input>

          <q-input
            v-model="descripcion"
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
        <q-card-section class="col">
          <q-input
            filled=""
            class="q-pa-xs"
            v-model="precio"
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
            v-model="categoria"
            :options="categoriaOptions"
          />
          <q-select
            class="q-pa-xs"
            label="Tipo de Agua"
            transition-show="scale"
            transition-hide="scale"
            filled
            v-model="tipoAgua"
            :options="aguaOptions"
          />
        </q-card-section>
      </div>
      <div class="align-right q-pa-lg q-gutter-sm">
        <q-btn
          color="red-5"
          icon="cancel"
          label="Cancelar"
          @click="clearForm"
          size="md"
        />
        <q-btn
          color="secondary"
          icon="send"
          label="Agregar"
          @click="
            productoStore.addProducto(
              nuevoProducto,
              descripcion,
              precio,
              categoria,
              tipoAgua
            )
          "
          size="md"
        />
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useProductoStore } from "src/stores/ProductoStore";
const productoStore = useProductoStore();
const nuevoProducto = ref("");
const descripcion = ref("");
const tipoAgua = ref("");
const categoria = ref("");
const precio = ref("");

const aguaOptions = ["Dulce", "Salada", "N/A"];
const categoriaOptions = [
  "Aparejo",
  "Combo",
  "Caña",
  "Vara",
  "Herramienta",
  "De Vestir",
];

const clearForm = () => {
  nuevoProducto.value = "";
  descripcion.value = "";
  tipoAgua.value = null;
  categoria.value = null;
  precio.value = null;

  const formRef = document.querySelector("q-form");
  formRef?.resetValidation();
};
</script>
