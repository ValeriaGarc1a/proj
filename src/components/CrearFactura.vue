<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Checkout</div>

    <!-- Selector de Productos con Botón de Agregar -->
    <q-card class="q-pa-md q-mb-md">
      <div class="col items-center">
        <q-select
          filled
          v-model="selectedProducto"
          use-input
          input-debounce="300"
          label="Buscar y seleccionar producto"
          :options="filteredOptions"
          @filter="filterFn"
          behavior="menu"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-select>
        <q-btn
          label="Agregar"
          color="teal"
          class="q-ma-md"
          @click="addSelectedProductToCart()"
          :disabled="!selectedProducto"
        />
      </div>
    </q-card>

    <!-- Tabla de Productos en el Carrito -->
    <q-card class="q-pa-md q-mb-md">
      <q-card-section>
        <div class="text-subtitle1">Productos Seleccionados</div>
      </q-card-section>

      <!-- Productos duplicados: anuncio gris -->
      <div v-for="(item, index) in cartItems" :key="`duplicated-${index}`">
        <q-card
          v-if="item.isDuplicated"
          class="bg-grey-3 q-pa-sm row items-center"
        >
          <q-icon
            name="close"
            size="md"
            color="red"
            @click="removeProduct(index)"
            class="cursor-pointer"
          />
          <span class="q-ml-sm">Producto ya agregado: {{ item.nombre }}</span>
        </q-card>
      </div>

      <!-- Tabla única para los productos no duplicados -->
      <q-table
        :rows="cartItems.filter((item) => !item.isDuplicated)"
        :columns="cartColumns"
        flat
        bordered
        dense
        class="q-mb-sm"
      >
        <!-- Columna personalizada para cantidad -->
        <template v-slot:body-cell-cantidad="{ row }">
          <div class="row justify-center q-pa-xs">
            <q-btn
              dense
              flat
              color="primary"
              icon="remove"
              @click="decrementQuantity(row)"
            />
            <div class="flex flex-center">{{ row.cantidad }}</div>
            <q-btn
              dense
              flat
              color="primary"
              icon="add"
              @click="incrementQuantity(row)"
            />
          </div>
        </template>

        <!-- Columna personalizada para acciones -->
        <template v-slot:body-cell-acciones="{ rowIndex }">
          <div class="row justify-center q-pa-xs">
            <q-btn
              dense
              color="red"
              icon="delete"
              @click="removeProduct(rowIndex)"
            />
          </div>
        </template>
      </q-table>

      <q-card-section>
        <div class="text-h6">Total: ${{ total }}</div>
      </q-card-section>

      <q-form @submit.prevent="confirmarCompra">
        <q-card-section>
          <q-input v-model="nombreCliente" label="Nombre del Cliente" />
          <q-select
            class="q-pa-xs"
            label="Método de Pago"
            transition-show="scale"
            transition-hide="scale"
            v-model="metodoPago"
            :options="pagoOptions"
          />
          <q-select
            class="q-pa-xs"
            label="Lugar de Venta"
            transition-show="scale"
            transition-hide="scale"
            v-model="lugarVenta"
            :options="puntoVenta"
          />
        </q-card-section>

        <q-card-section class="text-right">
          <q-btn label="Confirmar Compra" color="primary" type="submit" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useProductoStore } from "src/stores/ProductoStore";
import { useFacturaStore } from "src/stores/FacturaStore";

const productoStore = useProductoStore();
const facturaStore = useFacturaStore();
const $q = useQuasar();

// Columnas de la tabla del carrito
const cartColumns = [
  { name: "nombre", label: "Nombre", align: "left", field: "nombre" },
  { name: "precio", label: "Precio", align: "center", field: "precio" },
  { name: "cantidad", label: "Cantidad", align: "center", field: "cantidad" },
  {
    name: "total",
    label: "Total",
    align: "center",
    field: (row) => (row.precio * row.cantidad).toFixed(2),
  },
  { name: "acciones", label: "Eliminar", align: "center", field: "acciones" },
];

// Factura y carrito
const nombreCliente = ref("");
const metodoPago = ref("");
const lugarVenta = ref("");
const pagoOptions = ["Efectivo", "Transferencia", "Tarjeta"];
const puntoVenta = ["Local", "En Línea"];
const cartItems = ref([]);
const selectedProducto = ref(null);

// Opciones de productos
const options = computed(() =>
  productoStore.productos.map((producto) => ({
    label: producto.nombre,
    value: producto,
  }))
);

// Filtro del buscador
const filteredOptions = ref([]);

function filterFn(val, update) {
  update(() => {
    filteredOptions.value = productoStore.productos
      .filter((producto) =>
        producto.nombre.toLowerCase().includes(val.toLowerCase())
      )
      .map((producto) => ({
        label: producto.nombre,
        value: producto,
      }));
  });
}

// Agregar producto seleccionado al carrito
function addSelectedProductToCart() {
  if (!selectedProducto.value) return;

  const productoExiste = cartItems.value.some(
    (item) => item.nombre === selectedProducto.value.label
  );

  if (productoExiste) {
    let productoDuplicado = {
      ...selectedProducto.value.value,
      cantidad: 1,
      isDuplicated: true,
    };
    cartItems.value.push(productoDuplicado);
  } else {
    let productoNuevo = {
      ...selectedProducto.value.value,
      cantidad: 1,
      isDuplicated: false,
    };
    cartItems.value.push(productoNuevo);
  }

  selectedProducto.value = null;
}

// Total del carrito
const total = computed(() =>
  cartItems.value
    .filter((item) => !item.isDuplicated)
    .reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    .toFixed(2)
);

// Incrementar cantidad
function incrementQuantity(item) {
  item.cantidad++;
}

// Decrementar cantidad
function decrementQuantity(item) {
  if (item.cantidad > 1) {
    item.cantidad--;
  } else {
    removeProduct(cartItems.value.indexOf(item));
  }
}

// Remover producto
function removeProduct(index) {
  cartItems.value.splice(index, 1);
}

// Confirmar compra
function confirmarCompra() {
  if (cartItems.value.length === 0) {
    $q.notify({
      type: "negative",
      message: "El carrito está vacío, no se puede confirmar la compra.",
    });
    return;
  }

  const nuevaFactura = {
    nombreCliente: nombreCliente.value,
    metodoPago: metodoPago.value,
    lugarVenta: lugarVenta.value,
    items: cartItems.value.map((item) => ({
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad,
      total: (item.precio * item.cantidad).toFixed(2),
    })),
    total: total.value,
    fecha: new Date(),
  };

  facturaStore.agregarFactura(nuevaFactura);

  cartItems.value = [];
  nombreCliente.value = "";
  metodoPago.value = "";
  lugarVenta.value = "";
}
</script>
