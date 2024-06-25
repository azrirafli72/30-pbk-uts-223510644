<template>
    <q-dialog v-model="visible">
      <q-card>
        <q-card-section>
          <img :src="photoUrl" alt="Full Image" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" @click="close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    photoUrl: String
  })
  
  const emit = defineEmits(['close'])
  
  const visible = ref(true)
  
  const close = () => {
    visible.value = false
    emit('close')
  }
  </script>
  
  <style scoped>
  img {
    max-width: 100%;
  }
  </style>
  