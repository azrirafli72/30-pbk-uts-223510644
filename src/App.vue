<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title>Project UAS M. Rafli Azriansyah</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above>
      <q-list>
        <q-item clickable @click="navigateTo('/todos')">
          <q-item-section>Todos</q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/posts')">
          <q-item-section>Posts</q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/albums')">
          <q-item-section>Albums</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(false)
const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.q-toolbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.q-drawer {
  width: 200px;
}
</style>
