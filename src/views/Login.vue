<script setup>

import {ref, computed} from 'vue'
import { useAuth } from '../composables/useAuth'
import { useDatabase } from '../composables/useDatabase'
import {useRouter} from 'vue-router'

defineProps({
    msg: String
})

const pageTitle = ref('Admin Login')

const routeManager = useRouter()
const username = ref('')
const email = ref('')
const email_status = ref('')
const password = ref('')
const password_status = ref('')
const errorMessage = ref('')
const input_error_count = ref(0)
const {user, login, register, logout} = useAuth()
const { usersData } = useDatabase()
const userDetails = ref([])

function validateEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(value)
} // validateEmail

const loadUsersData = async () => {
 
  if(usersData.value){
    
    userDetails.value = usersData.value.find(user => user.email === email.value)
    username.value = userDetails.value?.username || ''

  }

} // loadUsersData


const getFriendlyMessage = (code) => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email format.'
    case 'auth/user-disabled':
      return 'This user account has been disabled.'
    case 'auth/user-not-found':
      return 'No user found with this email.'
    case 'auth/wrong-password':
      return 'Incorrect password.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    default:
      return 'Login failed. Please try again.'
  }
} // getFriendlyMessage for translating error code to understandable error message

const goToDashboard = () => {

  routeManager.push('/dashboard')
} // goToDashboard

const handleLogin = async () => {
  
  try{
    
    input_error_count.value = 0
    errorMessage.value = ''
    
    if(validateEmail(email.value) === false){

      input_error_count.value ++
      email_status.value = 'Email Format Invalid'

    }else{
      email_status.value = ''
    }

    if(input_error_count.value < 1){

      await login(email.value, password.value)  
      goToDashboard()

    }
    
   
   
  }catch(error){
    console.error("Login Error: ", error)
    const errorMessageValue = getFriendlyMessage(error.code)
    errorMessage.value = errorMessageValue
  }

} // handleLogin

const handleLogout = () => {

  logout()
  email.value = ''
  password.value = ''

} // handleLogout

</script>

<template>

  <header class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 class="text-xl font-bold">VICO Grocery Store | Inventory</h1>
      <div class="flex items-center space-x-2 block lg:block max-md:hidden">
        <!-- User menu, notifications, etc. -->

         
          <router-link class="border-2 border-blue-400 text-blue-500 hover:bg-blue-950 hover:text-white hover:border-blue-700 transition-all duration-200 ease-in-out text-sm rounded-full px-5 py-2" to = "/">Back to Home</router-link>


          <p v-if = "user">Loggedin as {{ username }}</p>

        
        </div>
    </div>
  </header>

  <div class="grid grid-cols-3 mt-20">
    <div class="col-start-2 col-end-3">
      <div class="shadow-lg rounded h-75 py-4 place-items-center">
        <p class = "font-thin text-xl mt-4 leading-3">Admin</p>
        <p class = "font-thin text-4xl mt-4 leading-3">Login</p>
              
        <p class = "font-thin text-gray-900 text-sm mt-10">{{ errorMessage }}</p>
    
        <form @submit.prevent = "handleLogin" class = "mt-10 flex flex-col items-center items-center">

            <input type = "text" v-model = "email" class="placeholder-gray-400 placeholder-thin rounded-xl w-96 py-4 px-2 transition-all duration-200 ease-in-out border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-blue-500" placeholder = "Username" required/>
            <small class = "text-left px-3 mt-1 w-96" v-if = "email_status">{{ email_status }}</small>
            <input type = "password" v-model = "password" class="placeholder-gray-400 mt-2 placeholder-thin rounded-xl w-96 py-4 px-2 transition-all duration-200 ease-in-out border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-blue-500" placeholder = "Password" required/>
            <small>{{ password_status }}</small>
            <button type = "submit" class = "text-lg py-3 rounded-xl mt-2 font-thin w-96 transition-all duration-150 ease-in-out bg-blue-500 hover:bg-blue-700 text-white">Login</button>
            
            <p class = "text-gray-500 mt-2" role = "button" @click = "handleForgotPassword">Forgot Password</p>
            
            <button type = "button" @click = "handleLogout" class = "border-2 border-gray-300 invisible mt-2 text-gray-500 rounded-lg px-4 py-2">Logout</button>
          </form>
        
        <div class="mt-10 invisible place-items-center">

            <p class = "font-extrathin text-xs leading-3 uppercase">Powered by</p>
            <p class="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-950">Kanor AI</p>
         
        </div>
            
    

      </div>
    </div>
  </div> <!-- Login Form -->

  <div class="grid grid-cols-4 gap-10 mt-10 px-10 h-48 invisible">
    <div class="shadow-lg rounded">
      <strong>Feature 1</strong>
    </div>
    <div class="shadow-lg rounded">Feature 2</div>
    <div class="shadow-lg rounded">Feature 3</div>
    <div class="shadow-lg rounded">Feature 4</div>
  </div>


</template>