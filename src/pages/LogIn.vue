<template>
  <div class="login-page fullscreen bg-dark">
    <q-page>
      <div class="row justify-center q-gutter-md">
        <q-card class="login-card">
          <q-img src="/icons/dm_logo.png" />
          <div class="text-h4 q-pa-md">Inicie sesión</div>
          <q-form ref="myForm">
            <div class="col">
              <q-card-section>
                <q-input
                  class="q-mb-md"
                  filled
                  v-model="nomUsuario"
                  type="text"
                  label="Nombre de Usuario"
                  autocomplete="off"
                >
                  <template v-slot:prepend><q-icon name="person" /></template>
                </q-input>

                <q-input
                  class="q-mb-md"
                  filled
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  label="Contraseña"
                  autocomplete="off"
                >
                  <template v-slot:prepend>
                    <q-icon name="phishing" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </template>
                </q-input>
              </q-card-section>
            </div>
            <div class="col q-pa-md">
              <q-btn
                class="full-width q-mb-sm"
                unelevated
                color="secondary"
                label="Iniciar Sesión"
                size="md"
                @click="loginUser"
              />
            </div>
          </q-form>
        </q-card>
      </div>
      <!-- <div class="q-mb-md">
        <q-btn
          flat
          label="¿No tienes cuenta? Regístrate"
          @click="goToRegister"
        />
      </div> -->
    </q-page>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar"; // Importar Quasar para notificaciones
import { useAuthStore } from "src/stores/authStore"; // Importar la store
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar(); // Inicializar Quasar
    const authStore = useAuthStore(); // Inicializar la store
    const nomUsuario = ref("");
    const password = ref("");
    const isPwd = ref(true);
    const router = useRouter();

    const goToRegister = () => {
      router.push("register"); // Redirige a la página de registro
    };

    const togglePasswordVisibility = () => {
      isPwd.value = !isPwd.value;
    };

    const loginUser = async () => {
      try {
        await authStore.login(nomUsuario.value, password.value);
        // Mostrar mensaje de éxito
        $q.notify({
          type: "positive",
          message: "Inicio de sesión exitoso!",
          position: "top",
        });

        router.push("/");
      } catch (error) {
        // Mostrar mensaje de error
        $q.notify({
          type: "negative",
          message: `Error: ${error.message || "No se pudo iniciar sesión"}`,
          position: "top",
        });
      }
    };

    return {
      nomUsuario,
      password,
      isPwd,
      togglePasswordVisibility,
      loginUser,
      goToRegister,
    };
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
