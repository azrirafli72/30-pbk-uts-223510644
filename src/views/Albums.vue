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
  <div>
    <h3>ALBUMS</h3>
    <div class="albums-list">
      <div v-for="album in albums" :key="album.id" @click="goToAlbum(album.id)" class="album-card">
        <h4>{{ album.title }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.album-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}
</style>
