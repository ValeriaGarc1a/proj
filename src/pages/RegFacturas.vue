<template>
  <q-page class="q-pa-md">
    <div class="text-h2 q-ma-lg text-center">Historial de Facturas</div>
    <q-row class="row q-pa-md q-gutter-md">
      <q-card class="col-auto my-card q-pa-md" flat bordered>
        <div class="text-h6 q-mb-lg">Filtros de Búsqueda</div>
        <q-input
          filled
          v-model="filters.fecha"
          label="Fecha"
          type="date"
          class="q-mb-md"
        />
        <q-select
          filled
          v-model="filters.metodoPago"
          :options="metodoPagoOptions"
          label="Método de Pago"
          class="q-mb-md"
        />
        <q-select
          filled
          v-model="filters.lugarVenta"
          :options="lugarVentaOptions"
          label="Lugar de Venta"
          class="q-mb-md"
        />
        <q-input
          filled
          v-model="filters.nombreCliente"
          label="Cliente"
          class="q-mb-md"
        />

        <q-btn icon="reply_all" label="Regresar" :to="''"></q-btn>
      </q-card>

      <!-- Tarjetas de Facturas -->

      <div class="col grid row reverse reverse-wrap justify-evenly">
        <q-card
          v-for="(factura, index) in filteredFacturas"
          :key="factura.idVenta"
          class="my-card q-ma-md"
          flat
          bordered
        >
          <q-card-section>
            <div class="row row wrap justify-between">
              <div class="text-h4">
                {{ index + " " + ": $" + factura.total }}
              </div>
              <q-btn-group>
                <q-btn
                  round
                  color="blue"
                  icon="edit"
                  tooltip="Eliminar"
                  @click="
                    facturaStore.actualizarFactura(
                      factura.id,
                      factura.datosActualizados
                    )
                  "
                  size="md"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Editar</strong>
                  </q-tooltip>
                </q-btn>
                <q-btn
                  round
                  color="red-5"
                  icon="cancel"
                  tooltip="Eliminar"
                  @click="facturaStore.eliminarFactura(factura.id)"
                  size="md"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Eliminar</strong>
                  </q-tooltip>
                </q-btn>
              </q-btn-group>
            </div>
            <div class="text-subtitle2">{{ factura.fecha }}</div>
          </q-card-section>
          <!-- Detalles de la compra -->
          <q-card-section>
            <q-table
              :rows="factura.items"
              :columns="columns"
              row-key="nombre"
              title="Productos:"
              flat
              bordered
              dense
            />
          </q-card-section>
          <q-card-section>
            <h5>Detalles de la Compra</h5>
            <div class="q-mb-xs">
              <p><strong>Cliente:</strong> {{ factura.nombreCliente }}</p>
              <p><strong>Método de Pago:</strong> {{ factura.metodoPago }}</p>
              <p><strong>Lugar de Venta:</strong> {{ factura.lugarVenta }}</p>
            </div>
          </q-card-section>
        </q-card>
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
