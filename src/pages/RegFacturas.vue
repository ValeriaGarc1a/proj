<template>
  <q-page class="q-pa-md">
    <!-- Contenedor principal con grid -->
    <q-row class="q-gutter-md">
      <!-- Filtros -->
      <div class="row">
        <q-card class="row q-pa-md" flat bordered>
          <q-card-section>
            <div class="text-h6">Filtros de Búsqueda</div>
            <q-input
              filled
              v-model="filters.nombreCliente"
              label="Buscar por Cliente"
              class="q-mb-md"
            />
            <q-input
              filled
              v-model="filters.fecha"
              label="Buscar por Fecha"
              type="date"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="filters.metodoPago"
              :options="metodoPagoOptions"
              label="Buscar por Método de Pago"
              class="q-mb-md"
            />
            <q-select
              filled
              v-model="filters.lugarVenta"
              :options="lugarVentaOptions"
              label="Buscar por Lugar de Venta"
              class="q-mb-md"
            />
            <q-btn icon="reply_all" label="Regresar" :to="'/checkout'" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Tarjetas de Facturas -->
      <div class="col-10">
        <q-row class="q-gutter-md row reverse reverse-wrap justify-evenly">
          <q-card
            v-for="factura in filteredFacturas"
            :key="factura.idVenta"
            class="col-12 col-sm-6 q-ma-sm"
            flat
            bordered
          >
            <q-card-section>
              <div class="text-h4">
                {{ factura.idVenta + ": $" + factura.total }}
              </div>
              <div class="text-subtitle2">{{ factura.fecha }}</div>
            </q-card-section>

            <!-- Detalles de la compra -->
            <q-card-section>
              <h5>Productos</h5>
              <q-table
                :rows="factura.items"
                :columns="columns"
                row-key="nombre"
                flat
                bordered
                dense
              />
            </q-card-section>

            <q-card-section>
              <h5>Detalles de la Compra</h5>
              <div class="q-mb-sm">
                <p><strong>Cliente:</strong> {{ factura.nombreCliente }}</p>
                <p><strong>Método de Pago:</strong> {{ factura.metodoPago }}</p>
                <p><strong>Lugar de Venta:</strong> {{ factura.lugarVenta }}</p>
              </div>
            </q-card-section>
          </q-card>
        </q-row>
      </div>
    </q-row>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useFacturaStore } from "src/stores/FacturaStore";

// Obtener datos del store
const facturaStore = useFacturaStore();

// Opciones para filtros
const metodoPagoOptions = ["Efectivo", "Transferencia", "Tarjeta"];
const lugarVentaOptions = ["Local", "En Línea"];

// Filtros de búsqueda
const filters = ref({
  nombreCliente: "",
  fecha: "",
  metodoPago: "",
  lugarVenta: "",
});

// Facturas filtradas según filtros
const filteredFacturas = computed(() => {
  return facturaStore.facturas.filter((factura) => {
    return (
      (filters.value.nombreCliente === "" ||
        factura.nombreCliente
          .toLowerCase()
          .includes(filters.value.nombreCliente.toLowerCase())) &&
      (filters.value.fecha === "" || factura.fecha === filters.value.fecha) &&
      (filters.value.metodoPago === "" ||
        factura.metodoPago === filters.value.metodoPago) &&
      (filters.value.lugarVenta === "" ||
        factura.lugarVenta === filters.value.lugarVenta)
    );
  });
});

// Definir columnas de la tabla de productos
const columns = [
  { name: "nombre", label: "Nombre", align: "left", field: "nombre" },
  { name: "cantidad", label: "Cantidad", align: "center", field: "cantidad" },
  { name: "precio", label: "Precio", align: "center", field: "precio" },
  {
    name: "total",
    label: "Total",
    align: "center",
    field: (row) => (row.precio * row.cantidad).toFixed(2),
  },
];
</script>
