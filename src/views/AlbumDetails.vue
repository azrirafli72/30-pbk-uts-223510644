<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import PhotoModal from '../components/PhotoModal.vue'

const showModal = ref(false)
const currentPhotoUrl = ref('')

const showFullImage = (url) => {
  currentPhotoUrl.value = url
  showModal.value = true
}

const route = useRoute()
const albumId = ref(route.params.id)
const photos = ref([])

const fetchPhotos = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId.value}`)
  photos.value = await response.json()
}

onMounted(fetchPhotos)
</script>

<template>
  <div>
    <h3>DAFTAR FOTO ALBUM</h3>
    <div class="photos-list">
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <img :src="photo.thumbnailUrl" @click="showFullImage(photo.url)" />
        <p>{{ photo.title }}</p>
      </div>
    </div>
    <PhotoModal v-if="showModal" :photoUrl="currentPhotoUrl" @close="showModal = false" />
  </div>
</template>

<style scoped>
.photo-card {
  margin: 10px;
  text-align: center;
}

.photo-card img {
  cursor: pointer;
}
</style>
