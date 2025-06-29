<script setup>
import { ref, onMounted} from 'vue'
import axios from 'axios'
import { db, auth } from '../firebase'
import { ref as dbRef, set, onValue } from 'firebase/database'

const retrieveUser = ref('')

defineProps({
  msg: String,
})

const usersData = ref([])

onMounted(async() =>{

  // using fetch()
  const res = await fetch("https://vicostore-fa07b-default-rtdb.firebaseio.com/users.json");
  const data = await res.json()
  usersData.value = data

  // using axios.get()

  // first, install axios, using this command:
  // npm install axios

  // import on header like this:
  // import axios from 'axios'


  // try{
  //   const res = await axios.get('https://vicostore-fa07b-default-rtdb.firebaseio.com/users.json')
  //   usersData.value = res.data
  // }catch(error){
  //   console.error('API ERROR:',error)
  // }


})

const count = ref(0)




</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" class = "bg-blue-500 rounded-lg px-4 py-2 text-white" @click="count++">count is {{ count }}</button>
    <p>
      Welcome
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <ul>
      <li v-for = "user in usersData" :key = "user.user_id">{{ user.username }}</li>
    </ul>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
