<template>
  <q-page class="col-10 flex-center">
    <q-card class="q-ma-xl" flat bordered>
      <!-- Encabezado -->
      <q-card-section>
        <div class="text-h4">{{ idVenta + ": $" + total }}</div>
        <div class="text-subtitle2">{{ fecha }}</div>
      </q-card-section>

      <!-- Detalles de la compra -->

      <!-- Productos -->
      <q-card-section>
        <h5>Productos</h5>
        <q-table
          :rows="items"
          :columns="columns"
          row-key="nombre"
          flat
          bordered
          dense
        />
      </q-card-section>
      <q-card-section>
        <h5>Detalles de la Compra</h5>
        <div class="q-mb-md">
          <p><strong>Cliente:</strong> {{ nombreCliente }}</p>
          <p><strong>Método de Pago:</strong> {{ metodoPago }}</p>
          <p><strong>Lugar de Venta:</strong> {{ lugarVenta }}</p>
        </div>
      </q-card-section>

      <!-- Botón para regresar -->
      <q-card-section>
        <q-btn icon="reply_all" label="Regresar" :to="'/checkout'" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useFacturaStore } from "src/stores/FacturaStore";

const route = useRoute();
const facturaStore = useFacturaStore();

// Obtener el idVenta desde la ruta
const idVenta = Number(route.params.idVenta);

// Obtener datos de la factura
const factura = facturaStore.obtenerFacturaPorIdVenta(idVenta);

// Asignar datos de la factura a las variables reactivas
const nombreCliente = ref(factura?.nombreCliente || "N/A");
const fecha = ref(factura?.fecha || "N/A");
const metodoPago = ref(factura?.metodoPago || "N/A");
const lugarVenta = ref(factura?.lugarVenta || "N/A");
const total = ref(factura?.total || 0);
const items = ref(factura?.items || []);

// Definir las columnas de la tabla
const columns = [
  { name: "nombre", label: "Producto", align: "left", field: "nombre" },
  { name: "precio", label: "Precio", align: "center", field: "precio" },
  { name: "cantidad", label: "Cantidad", align: "center", field: "cantidad" },
  {
    name: "total",
    label: "Total",
    align: "center",
    field: (row) => (row.precio * row.cantidad).toFixed(2),
  },
];
</script>
