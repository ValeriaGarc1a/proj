<template>
  <div class="register-page fullscreen">
    <q-page>
      <div class="row justify-center q-gutter-md">
        <q-card class="login-card">
          <q-img src="/icons/dm_logo.png" />
          <div class="text-h4 q-pa-md">Registrar Cuenta</div>
          <q-form ref="registerForm" @submit.prevent="registerUser">
            <div class="col">
              <q-card-section>
                <q-input
                  class="q-mb-md"
                  filled
                  v-model="email"
                  type="email"
                  label="Correo Electrónico"
                  autocomplete="off"
                >
                  <template v-slot:prepend><q-icon name="mail" /></template>
                </q-input>

                <q-input
                  class="q-mb-md"
                  filled
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  label="Contraseña"
                  autocomplete="off"
                >
                  <template v-slot:prepend><q-icon name="lock" /></template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </template>
                </q-input>

                <q-input
                  class="q-mb-md"
                  filled
                  v-model="confirmPassword"
                  :type="isPwd ? 'password' : 'text'"
                  label="Confirmar Contraseña"
                >
                  <template v-slot:prepend><q-icon name="lock" /></template>
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
                label="Registrar"
                size="md"
                type="submit"
              />
            </div>
          </q-form>
        </q-card>
      </div>
      <div class="q-mb-md">
        <q-btn
          flat
          label="¿Ya tienes cuenta? Inicia sesión"
          @click="goToLogin"
        />
      </div>
    </q-page>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const isPwd = ref(true);
    const router = useRouter();

    const goToLogin = () => {
      router.push("/login"); // Redirige a la página de login
    };

    const togglePasswordVisibility = () => {
      isPwd.value = !isPwd.value;
    };

    const registerUser = async () => {
      if (password.value !== confirmPassword.value) {
        // Mostrar error de confirmación de contraseña
        alert("Las contraseñas no coinciden");
        return;
      }

      const auth = getAuth();
      try {
        // Intentamos registrar al usuario
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;
        console.log("Usuario registrado:", user);
        alert("Usuario registrado correctamente");
        router.push("login");
        // Redirigir al login o realizar alguna acción adicional
      } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        alert("Error al registrar usuario: " + error.message);
      }
    };

    return {
      email,
      password,
      confirmPassword,
      isPwd,
      togglePasswordVisibility,
      registerUser,
      goToLogin,
    };
  },
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #b7ec97 0%, #f9a879 100%);
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
