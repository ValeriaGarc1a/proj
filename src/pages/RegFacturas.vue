<template>
  <q-page class="q-pa-md">
    <div class="text-h2 q-ma-lg text-center">Historial de Facturas</div>
    <div class="row">
      <div class="col-auto">
        <q-card class="my-card q-pa-md justify-center" flat bordered>
          <div class="text-h6 q-mb-lg">Filtros de Búsqueda</div>

          <!-- Filtro de producto -->
          <q-select
            filled
            clearable
            v-model="filters.producto"
            :options="productoStore.productos.map((p) => p.nombre)"
            label="Producto"
            class="q-mb-md"
            use-input
          >
            <template v-slot:prepend>
              <q-icon name="star" />
            </template>
          </q-select>

          <!-- Selector de rango de fechas -->
          <q-input
            filled
            label="Rango de Fechas"
            v-model="rangoFechaTexto"
            class="q-mb-md"
            readonly
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="filters.fecha"
                range
                mask="YYYY-MM-DD"
                color="primary"
                @update:model-value="actualizarTextoRangoFechas"
              />
            </q-popup-proxy>
          </q-input>

          <!-- Filtro de método de pago -->
          <q-select
            clearable
            filled
            v-model="filters.metodoPago"
            :options="metodoPagoOptions"
            label="Pago"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="payments" />
            </template>
          </q-select>

          <!-- Filtro de lugar de venta -->
          <q-select
            clearable
            filled
            v-model="filters.lugarVenta"
            :options="lugarVentaOptions"
            label="Sitio de Venta"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="store" />
            </template>
          </q-select>

          <!-- Filtro de cliente -->
          <q-input
            clearable
            filled
            v-model="filters.nombreCliente"
            label="Cliente"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="face" />
            </template>
          </q-input>

          <div class="justify-center">
            <q-btn
              label="Limpiar Filtros"
              color="primary"
              icon="clear_all"
              class="q-ma-sm full-width"
              @click="limpiarFiltros"
            />
            <br />
            <q-btn
              class="q-ma-sm full-width"
              icon="reply_all"
              label="Regresar"
              :to="'/'"
            ></q-btn>
          </div>
        </q-card>
      </div>

      <!-- Tarjetas de Facturas -->
      <div class="col">
        <div class="row row reverse reverse-wrap justify-evenly">
          <q-card
            v-for="(factura, index) in sortedFacturas"
            :key="factura.idVenta"
            class="my-card q-ma-md"
            flat
            bordered
          >
            <q-card-section>
              <div class="row justify-between">
                <div class="text-h4">
                  {{ index + " " + ": $" + factura.total }}
                </div>
                <q-btn-group>
                  <q-btn
                    round
                    color="blue"
                    icon="edit"
                    tooltip="Editar"
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
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFacturaStore } from "src/stores/FacturaStore";
import { useProductoStore } from "src/stores/ProductoStore";

// Stores
const productoStore = useProductoStore();
productoStore.loadProductos();
const facturaStore = useFacturaStore();

// Opciones de filtros
const metodoPagoOptions = ["Efectivo", "Transferencia", "Tarjeta"];
const lugarVentaOptions = ["Local", "En Línea"];

// Filtros de búsqueda y estado de orden
const rangoFechaTexto = ref("");
const sortOrder = ref("desc"); // Predeterminado: más reciente primero
const filters = ref({
  producto: "",
  nombreCliente: "",
  fecha: { from: null, to: null },
  metodoPago: "",
  lugarVenta: "",
});

// Filtrado y ordenamiento de facturas
const filteredFacturas = computed(() => {
  return facturaStore.facturas.filter((factura) => {
    const matchProducto =
      filters.value.producto === "" ||
      factura.items.some((item) =>
        item.nombre.toLowerCase().includes(filters.value.producto.toLowerCase())
      );

    const facturaFecha = new Date(factura.fecha);
    const fromDate = filters.value.fecha?.from
      ? new Date(filters.value.fecha.from)
      : null;
    const toDate = filters.value.fecha?.to
      ? new Date(filters.value.fecha.to)
      : null;

    if (fromDate) fromDate.setHours(0, 0, 0, 0);
    if (toDate) toDate.setHours(23, 59, 59, 999);

    let matchFecha = true;
    if (fromDate && toDate) {
      matchFecha = facturaFecha >= fromDate && facturaFecha <= toDate;
    } else if (fromDate) {
      matchFecha = facturaFecha >= fromDate;
    } else if (toDate) {
      matchFecha = facturaFecha <= toDate;
    }

    return (
      matchProducto &&
      (filters.value.nombreCliente === "" ||
        factura.nombreCliente
          .toLowerCase()
          .includes(filters.value.nombreCliente.toLowerCase())) &&
      matchFecha &&
      (filters.value.metodoPago === "" ||
        factura.metodoPago === filters.value.metodoPago) &&
      (filters.value.lugarVenta === "" ||
        factura.lugarVenta === filters.value.lugarVenta)
    );
  });
});

const sortedFacturas = computed(() => {
  return [...filteredFacturas.value].sort((a, b) => {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);

    return sortOrder.value === "asc" ? dateA - dateB : dateB - dateA;
  });
});

const actualizarTextoRangoFechas = () => {
  if (!filters.value.fecha.from && !filters.value.fecha.to) {
    rangoFechaTexto.value = " ";
    return;
  }

  const fromText = filters.value.fecha.from
    ? new Date(filters.value.fecha.from).toLocaleDateString("es-ES")
    : "Inicio";

  const toText = filters.value.fecha.to
    ? new Date(filters.value.fecha.to).toLocaleDateString("es-ES")
    : "Fin";

  rangoFechaTexto.value = `${fromText} - ${toText}`;
};

// Limpiar filtros
const limpiarFiltros = () => {
  filters.value = {
    producto: "",
    nombreCliente: "",
    fecha: { from: null, to: null },
    metodoPago: "",
    lugarVenta: "",
  };

  actualizarTextoRangoFechas();
};

// Columnas de la tabla de productos
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
