import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "src/firebase/firebaseConfig";

export const useProductoStore = defineStore("producto", {
  state: () => ({
    productos: [], // un arreglo

    editarProducto: {
      nombre: "",
      fecha: "",
      descripcion: "",
      precio: "",
      categoria: "",
      tipoAgua: "",
    },

    aguaOptions: ["Dulce", "Salada", "N/A"],
    categoriaOptions: [
      "Aparejo",
      "Combo",
      "Caña",
      "Vara",
      "Herramienta",
      "De Vestir",
    ],

    editDialog: false,
  }),

  getters: {
    getProductos(state) {
      return state.productos;
    },
  },

  actions: {
    //cualquier cosa para modificar informacion
    async addProducto(nombre, descripcion, precio, categoria, tipoAgua) {
      try {
        const productoData = {
          nombre,
          fecha: new Date().toISOString(), // Use ISO string for consistent date storage
          descripcion,
          precio,
          categoria,
          tipoAgua,
        };

        // Add to Firestore
        const productoRef = await addDoc(
          collection(db, "productos"),
          productoData
        );

        // Add to local state (including Firestore-generated ID)
        this.productos.push({
          id: productoRef.id, // Firestore ID
          ...productoData,
        });

        console.log(
          "Producto agregado a Firestore y al estado local:",
          productoData
        );
      } catch (error) {
        console.error("Error al agregar el producto:", error);
      }
    },

    async deleteProducto(id) {
      try {
        const productoRef = doc(db, "productos", id); // Referencia al documento en Firestore
        await deleteDoc(productoRef); // Borra el documento
        console.log("Producto eliminado correctamente");

        // Elimina también el producto del estado local
        this.productos = this.productos.filter(
          (producto) => producto.id !== id
        );
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    },

    setEditarProducto(producto, idx) {
      this.editarProducto = { ...producto };
      // this.editarProducto.id = idx;
      this.editDialog = true;
    },

    async saveProducto() {
      try {
        if (this.editarProducto.id) {
          // Si existe un ID, actualizamos el producto existente
          const productoRef = doc(db, "productos", this.editarProducto.id);
          const { id, ...productoData } = this.editarProducto; // Excluir el ID antes de guardar
          await updateDoc(productoRef, productoData); // Actualiza en Firestore

          console.log("Producto actualizado correctamente");
        } else {
          // Si no existe un ID, creamos un nuevo producto
          const productoRef = collection(db, "productos");
          await addDoc(productoRef, this.editarProducto);

          console.log("Producto guardado correctamente");
        }

        // Limpia el formulario
        this.editarProducto = {
          nombre: "",
          fecha: "",
          descripcion: "",
          precio: "",
          categoria: "",
          tipoAgua: "",
        };

        // Recarga los productos desde Firestore
        await this.loadProductos();
      } catch (error) {
        console.error("Error al guardar el producto:", error);
      }
    },

    async loadProductos() {
      try {
        const productosSnapshot = await getDocs(collection(db, "productos"));
        this.productos = productosSnapshot.docs.map((doc) => ({
          id: doc.id, // Incluye el ID único del documento
          ...doc.data(), // Incluye el resto de los datos del documento
        }));
        console.log("Productos cargados:", this.productos);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    },
  },
});
