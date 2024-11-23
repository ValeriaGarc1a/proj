// src/stores/authStore.js
import { defineStore } from "pinia";
import { auth } from "src/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  actions: {
    // Registrar usuario con correo y contraseña
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        console.log("Usuario registrado:", this.user);
      } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
      }
    },

    // Iniciar sesión con correo y contraseña
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        console.log("Usuario iniciado:", this.user);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
      }
    },

    // Cerrar sesión
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
        console.log("Sesión cerrada");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        throw error;
      }
    },

    init() {
      onAuthStateChanged(auth, (user) => {
        this.user = user || null;
      });
    },
  },
});
