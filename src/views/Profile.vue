<template>

<div class="grid grid-cols-12">

    <div class="col-start-4 col-span-6 h-screen" role = "button" @click = "handleBackHistory">
      <div class="shadow-lg rounded-lg w-100 p-4">

        <div class="flex flex-row justify-between">

           <div class="flex flex-row  items-center">

                <svg class = "h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <p class = "font-thin text-lg ms-1">Profile Page</p>

           </div>

           <div class="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">VICO Grocery Store</div>

        </div>

        <div class="grid grid-cols-12">
            <div class="col-span-4 col-start-6">
                <div class="bg-white shadow-lg border-2 border-gray-500 rounded-full mt-10 p-2 h-32 w-32 flex items-center justify-center">
                    <svg class="h-20 w-20 size-1 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9A3.75 3.75 0 1 1 8.25 9a3.75 3.75 0 0 1 7.5 0zM4.5 19.5a7.5 7.5 0 0 1 15 0v.75a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75v-.75z" />
                    </svg>
                </div>

                <div class="flex flex-col justify-center">
                    <p class = "font-black text-4xl mt-3">{{ profileFullname }}</p>
                    <p class = "font-thin text-xl">{{ email }}</p>
                </div>
               
            </div>  
        </div>
        

      </div>
    </div>

</div>

</template>

<script setup>

    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useDatabase } from '../composables/useDatabase'
    import { useAuth } from '../composables/useAuth'

    const router = useRouter()
    const { usersData } = useDatabase()
    const { user } = useAuth()

    const email = ref('')
    const firebase_uid = ref('')
    const profileFullname = ref('')

    const loadUserDetails = () =>{
        
       
        firebase_uid.value = user.value?.uid
        email.value = user.value?.email || localStorage.getItem('userEmail') || 'walang email si gago'

        if(!localStorage.getItem('usersData')){
           
            const userDataList = usersData.value
            profileFullname.value = userDataList.filter(users => users.user_id === firebase_uid.value)[0].username

        }else{           
            const userDataList = JSON.parse(localStorage.getItem('usersData'))
            const email = localStorage.getItem('userEmail')
            profileFullname.value = userDataList.filter(users => users.email === email)[0].username
        }

       

    }   // loadUserDetails

    const handleBackHistory = () => {

        router.back()
       
    } // handleBackHistory

    onMounted(() => {
         loadUserDetails()
    })

</script>