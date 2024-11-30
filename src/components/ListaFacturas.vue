<template>
  <div>
    <q-table
      :rows="facturas"
      :columns="columns"
      row-key="id"
      flat
      bordered
      dense
    >
      <!-- Slot personalizado para la columna 'idVenta' -->
      <template v-slot:body-cell-id="{ row }">
        <div class="flex flex-center items-center">
          <!-- Mostrar el ID de la factura -->
          <!-- Botón de información -->
          <q-btn
            dense
            flat
            icon="info"
            color="grey"
            class="q-ml-sm"
            :to="'factura/' + row.id"
          />
          <!-- <span>{{ row.id }}</span> -->
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFacturaStore } from "src/stores/FacturaStore";

const facturaStore = useFacturaStore();

// Usar el getter para obtener todas las facturas
const facturas = computed(() => facturaStore.getFacturas);

console.log(facturas);

// Configuración de las columnas de la tabla
const columns = [
  { name: "id", label: "Información", align: "center", field: "idVenta" },
  {
    name: "nombreCliente",
    label: "Cliente",
    align: "left",
    field: "nombreCliente",
    sortable: true,
  },
  {
    name: "fecha",
    label: "Fecha",
    align: "left",
    field: "fecha",
    format: (val) => new Date(val).toLocaleDateString(),
  },
  {
    name: "metodoPago",
    label: "Método de Pago",
    align: "left",
    field: "metodoPago",
  },
  {
    name: "lugarVenta",
    label: "Lugar de Venta",
    align: "left",
    field: "lugarVenta",
  },
  { name: "total", label: "Total", align: "center", field: "total" },
];
</script>
