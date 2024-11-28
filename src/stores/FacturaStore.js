import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "src/firebase/firebaseConfig";

export const useFacturaStore = defineStore("factura", {
  state: () => ({
    facturas: [],
  }),

  getters: {
    getFacturas(state) {
      return state.facturas;
    },

    obtenerFacturaPorIdVenta(state) {
      return (id) => {
        console.log("Buscando factura con idVenta:", id);
        console.log("Facturas disponibles:", state.facturas); // Muestra las facturas cargadas
        return state.facturas.find((factura) => factura.id === id) || null;
      };
    },
  },

  actions: {
    // Cargar todas las facturas desde Firestore
    async loadFacturas() {
      if (this.facturas.length === 0) {
        try {
          const facturasSnapshot = await getDocs(collection(db, "facturas"));
          this.facturas = facturasSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Facturas cargadas:", this.facturas);
        } catch (error) {
          console.error("Error al cargar facturas:", error);
        }
      }
    },

    // Agregar una nueva factura a Firestore
    async agregarFactura(nuevaFactura) {
      try {
        const facturasRef = collection(db, "facturas");
        const facturaCreada = await addDoc(facturasRef, nuevaFactura);

        // Agregar la factura localmente con el ID generado por Firestore
        this.facturas.push({
          id: facturaCreada.id,
          ...nuevaFactura,
        });
        console.log("Factura agregada correctamente:", facturaCreada.id);
      } catch (error) {
        console.error("Error al agregar factura:", error);
      }
    },

    // Actualizar una factura existente en Firestore
    async actualizarFactura(id, datosActualizados) {
      try {
        const facturaRef = doc(db, "facturas", id);
        await updateDoc(facturaRef, datosActualizados);

        // Actualiza también el estado local
        const index = this.facturas.findIndex((factura) => factura.id === id);
        if (index !== -1) {
          this.facturas[index] = {
            ...this.facturas[index],
            ...datosActualizados,
          };
        }
        console.log("Factura actualizada correctamente");
      } catch (error) {
        console.error("Error al actualizar factura:", error);
      }
    },

    // Eliminar una factura de Firestore
    async eliminarFactura(id) {
      try {
        const facturaRef = doc(db, "facturas", id);
        await deleteDoc(facturaRef);

        // Elimina también la factura del estado local
        this.facturas = this.facturas.filter((factura) => factura.id !== id);
        console.log("Factura eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar factura:", error);
      }
    },
  },
});
