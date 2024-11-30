<template>
  <q-card class="col-12">
    <q-card-section>
      <div class="text-h6">Productos Registrados</div>
    </q-card-section>

    <div class="q-pa-md">
      <q-table
        :rows="filteredProductos"
        :columns="columns"
        row-key="i"
        flat
        bordered
        dense
        clickable
      >
        <!-- Campo de búsqueda en el encabezado de la tabla -->
        <template v-slot:top-right>
          <q-input
            filled
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar productos"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <!-- Columna de acciones (botones de info, editar, eliminar) -->

        <template v-slot:body-cell-acciones="{ row: producto, rowIndex: i }">
          <div class="q-pa-xs">
            <q-btn-group spread unelevated>
              <q-btn
                padding="xs"
                outline
                square
                color="grey"
                icon="info"
                :to="'/detalles/' + i"
                size="md"
              />

              <q-btn
                padding="xs"
                outline
                square
                color="blue"
                icon="edit"
                @click="productoStore.setEditarProducto(producto, i)"
                size="md"
              />

              <q-btn
                padding="xs"
                outline
                square
                color="red"
                icon="delete"
                @click="productoStore.deleteProducto(producto.id)"
                size="md"
              />
            </q-btn-group>
          </div>
        </template>
      </q-table>
    </div>
  </q-card>
</template>

<script setup>
import { useProductoStore } from "src/stores/ProductoStore";
import { ref, computed } from "vue";

const productoStore = useProductoStore();

// Definición de las columnas de la tabla

const columns = [
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "precio",
    label: "Precio",
    field: "precio",
    align: "center",
    sortable: true,
  },
  {
    name: "categoria",
    label: "Categoria",
    align: "center",
    field: "categoria",
  },
  {
    name: "tipoAgua",
    label: "Tipo de Agua",
    align: "center",
    field: "tipoAgua",
  },
  { name: "acciones", label: "Acciones", align: "center", field: "acciones" },
];

// Filtro para la búsqueda de productos
const filter = ref("");
const filteredProductos = computed(() => {
  if (!filter.value) return productoStore.productos;
  return productoStore.productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(filter.value.toLowerCase())
  );
});
</script>
