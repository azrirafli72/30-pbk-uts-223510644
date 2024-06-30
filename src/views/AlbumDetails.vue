<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import PhotoModal from '../components/PhotoModal.vue';

const showModal = ref(false);
const currentPhotoUrl = ref('');

const showFullImage = (url) => {
  currentPhotoUrl.value = url;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  currentPhotoUrl.value = '';  // Reset URL modal ketika ditutup
};

const route = useRoute();
const albumId = ref(route.params.id);
const photos = ref([]);

const fetchPhotos = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId.value}`);
  photos.value = await response.json();
};

onMounted(fetchPhotos);
</script>

<template>
  <div class="album-details-container">
    <h3 class="title">DAFTAR FOTO ALBUM</h3>
    <div class="photos-list">
      <div v-for="photo in photos" :key="photo.id" class="photo-card">
        <img :src="photo.thumbnailUrl" @click="showFullImage(photo.url)" alt="Thumbnails Foto" class="photo-thumbnail"/>
        <p class="photo-title">{{ photo.title }}</p>
      </div>
    </div>
    <PhotoModal v-if="showModal" :photoUrl="currentPhotoUrl" @close="closeModal" />
  </div>
</template>

<style scoped>
.album-details-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.photos-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.photo-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.photo-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.photo-thumbnail {
  object-fit: cover;
  border-radius: 10px 10px 10px 10px;
}

.photo-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
