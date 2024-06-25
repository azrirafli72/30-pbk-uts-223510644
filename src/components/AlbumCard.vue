<template>
    <div class="album-card" @click="goToAlbumDetails">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ album.title }}</div>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const props = defineProps({
    album: {
      type: Object,
      required: true
    }
  })
  
  const router = useRouter()
  
  const goToAlbumDetails = () => {
    router.push(`/albums/${props.album.id}`)
  }
  </script>
  
  <style scoped>
  .album-card {
    cursor: pointer;
    margin: 10px;
    width: 100%;
  }
  
  .album-card .q-card {
    transition: all 0.3s ease;
  }
  
  .album-card .q-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .text-h6 {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    color: #333;
  }
  </style>
  