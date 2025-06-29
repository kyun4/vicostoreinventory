<script setup>


    import { useRouter} from 'vue-router'
    import { useAuth } from '../composables/useAuth'

    const routeManager = useRouter();
   
    const { logout } = useAuth()

    const emit = defineEmits(['close']);
    
    const handleLogout = () => {    
      
        localStorage.clear()
        logout()
        routeManager.push('/login')

    } // handleLogout


    function onCancel () {
      emit('close')
    } // onCancel

    defineProps({
        showLogoutModal: Boolean
    })



</script>

<template>
    
    <div v-if = "showLogoutModal" class="fixed inset-0 bg-black flex z-50 bg-opacity-50 items-center justify-center">

        <div class = "bg-white rounded-lg shadow-lg p-6 relative">
            <h2 class = "font-superthin text-xs text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">VICO Grocery Store Inventory</h2>
            <h2 class = "font-bold text-sm my-5">Are you sure you want to logout?</h2>
            <button role = "button" @click = "handleLogout" class = "bg-blue-700 text-white rounded-xl px-10 py-2 text-blue-500 mt-2 me-1">Yes</button>
            <button role = "button" @click = "onCancel" class = "border-2 border-blue-200 rounded-xl px-10 py-2 text-blue-500 mt-2">Cancel</button>
        </div>

    </div> <!-- showLogoutModal -->

</template>