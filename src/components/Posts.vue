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
  <h3>POSTINGAN</h3>
  <div>
    <label for="userData">Pilih Pengguna:</label>
    <select v-model="selectedUser" id="userData">
      <option v-for="user in users" :value="user.id">{{ user.name }}</option>
    </select>
  </div>
  <div v-if="selectedUser">
    <h4>Postingan Pengguna: {{ selectedUserName }}</h4>
    <ul>
      <li v-for="post in userPosts" :key="post.id">
        <h5>Judul : {{ post.title }}</h5>
        <p>Isi : {{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>