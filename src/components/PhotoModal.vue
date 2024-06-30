<template>
  <q-dialog v-model="visible" @click.self="close" persistent class="photo-modal">
    <q-card class="modal-card">
      <q-card-section>
        <img :src="photoUrl" alt="Full Image" class="full-image" />
        <!-- Tombol close di samping kanan atas foto -->
        <q-btn flat icon="close" class="close-btn" @click="close" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  photoUrl: String
})

const emit = defineEmits(['close'])

const visible = ref(true)

const close = () => {
  visible.value = false
  emit('close')
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Memastikan modal dibuka kembali saat photoUrl berubah
watch(() => props.photoUrl, () => {
  visible.value = true
})
</script>

<style scoped>
img.full-image {
  max-width: 100%;
  max-height: 90vh; /* Maksimum tinggi gambar */
  object-fit: contain; /* Menjaga proporsi gambar */
}

.photo-modal {
  max-width: 95%; /* Lebar maksimum modal */
}

.modal-card {
  position: relative;
  padding: 0;
  overflow: hidden;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.95); /* semi-transparent background */
}

.close-btn {
  position: absolute;
  top: 10px; /* Penempatan di atas foto */
  right: 10px; /* Penempatan di kanan foto */
  background-color: rgba(0, 0, 0, 0.6); /* semi-transparent black background */
  color: white;
  font-size: 18px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background-color: rgba(255, 0, 0, 0.8); /* semi-transparent red background on hover */
}

.close-btn:focus {
  outline: none;
  box-shadow: none;
}
</style>
