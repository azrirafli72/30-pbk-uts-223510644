<!-- Ini Codingan untuk Posts.vue dan Inilah Child Component -->

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const activeSection = ref('todos') // Defaultnya adalah Todos
const users = ref([])
const selectedUser = ref(null)
const selectedUserName = ref('')
const userPosts = ref([])

const showTodos = () => {
  activeSection.value = 'todos'
}

const showPosts = async () => {
  activeSection.value = 'posts'
  await fetchUsers()
}

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  users.value = data
}

const fetchUserPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
  const data = await response.json()
  userPosts.value = data
}

onMounted(async () => {
  await fetchUsers()
})

watch(selectedUser, () => {
  if (selectedUser.value) {
    fetchUserPosts()
    selectedUserName.value = users.value.find(user => user.id === selectedUser.value)?.name || ''
  } else {
    userPosts.value = []
    selectedUserName.value = ''
  }
})

</script>

<template>
  <div class="container">
    <h2 class="title">Postingan Pengguna</h2>
    <div class="user-select">
      <label for="userData">Pilih Pengguna:</label>
      <select v-model="selectedUser" id="userData">
        <option v-for="user in users" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <div v-if="selectedUser" class="user-posts">
      <h3 class="username">{{ selectedUserName }}</h3>
      <table class="posts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Judul</th>
            <th>Isi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in userPosts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.user-select {
  margin-bottom: 20px;
}

.user-select label {
  display: block;
  margin-bottom: 10px;
}

.user-select select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
}

.user-posts {
  margin-top: 20px;
}

.username {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table th,.posts-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.posts-table th {
  background-color: #f0f0f0;
}
</style>