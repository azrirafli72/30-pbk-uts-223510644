<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const albums = ref([])
const router = useRouter()

const fetchAlbums = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums')
  albums.value = await response.json()
}

onMounted(fetchAlbums)

const goToAlbum = (albumId) => {
  router.push(`/albums/${albumId}`)
}
</script>

<template>
  <div class="albums-container"> 
    <h3 class="title">ALBUMS</h3>
    <div class="albums-list">
      <div v-for="album in albums" :key="album.id" @click="goToAlbum(album.id)" class="album-card">
        <h4 class="album-title">{{ album.title }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.albums-container {
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

.albums-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.album-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.album-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.album-cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.album-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
