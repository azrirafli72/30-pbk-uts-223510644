<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Todos from './components/Todos.vue'
import Posts from './components/Posts.vue'

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
    <header>
      <nav>
        <ul>
          <li><button @click="showTodos">Todos</button></li>
          <li><button @click="showPosts">Post</button></li>
        </ul>
      </nav>
    </header>

    <main class="app">
      <!-- Jika bagian aktif yang ditekan adalah Todos -->
      <section v-if="activeSection === 'todos'">
        <!-- Konten Todos -->
        <Todos />
      </section>

      <!-- Jika bagian aktif yang ditekan adalah Post -->
      <section v-else-if="activeSection === 'posts'">
        <Posts />
      </section>
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #fdfeff;
}

header {
  background-color: rgb(87, 132, 230);
  padding: 20px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 20px;
  cursor: pointer;
  color: rgb(228, 220, 220);
}

nav ul li button {
  color: #fdfeff;
  margin-top: 15px;
  font-size: larger;
}
</style>