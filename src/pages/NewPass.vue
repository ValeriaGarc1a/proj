<template>
  <div class="login-page fullscreen">
    <q-page>
      <div class="row">
        <div class="col text-center text-white">
          <h2 class="q-mt-md text-bold">Reponer contraseña</h2>
        </div>
      </div>
      <div class="row q-mb-md justify-center q-gutter-md">
        <q-card class="login-card">
          <q-img src="/icons/dm_logo.png" />
          <div class="text-h5 q-pa-md">
            Ingrese nombre y correo electrónico de usuario.
          </div>
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
                  v-model="emailUsuario"
                  type="text"
                  label="Email"
                >
                  <template v-slot:prepend><q-icon name="mail" /></template>
                </q-input>
              </q-card-section>
            </div>
            <div class="col q-pa-md">
              <q-btn
                class="full-width q-mb-md"
                unelevated
                color="secondary"
                icon="reply_all"
                label="Regresar"
                size="md"
                to="/login"
              />
            </div>
          </q-form>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script></script>

<style scoped>
.login-page {
  min-height: 200hv;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff5f6d 0%, #e0ff71 100%);
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  margin-bottom: 4rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
