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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFacturaStore } from "src/stores/FacturaStore";

const route = useRoute();
const facturaStore = useFacturaStore();

const idVenta = route.params.idVenta;
const factura = ref(null); // Usamos ref para almacenar la factura

onMounted(async () => {
  // Cargar las facturas si no se han cargado
  if (facturaStore.facturas.length === 0) {
    await facturaStore.loadFacturas(); // Carga las facturas desde Firebase
  }

  // Esperar hasta que las facturas estén cargadas
  factura.value = facturaStore.obtenerFacturaPorIdVenta(idVenta);

  if (factura.value) {
    console.log(factura.value); // Verifica si la factura fue encontrada
  } else {
    console.log("Factura no encontrada.");
  }

  // Asignar datos de la factura a las variables reactivas
  nombreCliente.value = factura.value?.nombreCliente || "N/A";
  fecha.value = factura.value?.fecha || "N/A";
  metodoPago.value = factura.value?.metodoPago || "N/A";
  lugarVenta.value = factura.value?.lugarVenta || "N/A";
  total.value = factura.value?.total || 0;
  items.value = factura.value?.items || [];
});

// Variables reactivas
const nombreCliente = ref("N/A");
const fecha = ref("N/A");
const metodoPago = ref("N/A");
const lugarVenta = ref("N/A");
const total = ref(0);
const items = ref([]);

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
