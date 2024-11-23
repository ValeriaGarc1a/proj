<template>
  <div class="login-page fullscreen">
    <q-page>
      <div class="row">
        <!-- <div class="col text-h4 text-center q-ma-md">¡Bienvenido!</div> -->
      </div>
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
                >
                  <template v-slot:prepend><q-icon name="person" /></template>
                </q-input>

                <q-input
                  class="q-mb-md"
                  filled
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  label="Contraseña"
                  ><template v-slot:prepend
                    ><q-icon name="phishing"
                  /></template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
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
              />
              <!-- <q-btn
                class="full-width"
                flat
                color="grey"
                label="Olvidé la
              contraseña"
                size="md"
                to="/newPass"
              /> -->
            </div>
          </q-form>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const password = ref("");
    const isPwd = ref(true);

    const togglePasswordVisibility = () => {
      isPwd.value = !isPwd.value;
    };

    return {
      password,
      isPwd,
      togglePasswordVisibility,
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
  background: linear-gradient(135deg, #b7ec97 0%, #f9a879 100%);
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
