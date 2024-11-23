<template>
  <div
    class="fullscreen bg-dark text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <q-img src="/icons/dm_logo.png" :ratio="16 / 9" />
      <div style="font-size: 20vh">404</div>

      <div class="text-h4" style="opacity: 0.4">
        ¡Ha navegado al sitio equivocado!
      </div>

      <q-btn
        class="q-mt-xl"
        icon="sailing"
        color="black"
        to="/login"
        label="Regresar"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "ErrorNotFound",
});
</script>
