<script setup>

    import {ref, onMounted } from 'vue'
    import {useRouter} from 'vue-router'
    import { useAuth } from '../composables/useAuth'
    import { useDatabase } from '../composables/useDatabase'
    import { AgGridVue } from 'ag-grid-vue3'
    import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
    import  LogoutModals from '../modals/logout.vue';
    import InventoryModal from '../modals/inventoryview.vue';

    ModuleRegistry.registerModules([ AllCommunityModule ]);

    const routeManager = useRouter()
    const username = ref('')
    const filteredUsers = ref([])
    const selectedRow = ref({})
    const { usersData, productsData, suppliersData } = useDatabase()
    const {user, register, login, logout} = useAuth()
    const sidebarOpen = ref(true)
    const showInventoryModal = ref(false)
    const showLogoutModal = ref(false)
  

    const columnDefs = ref([
        { field: 'product_id', headerName: 'ID' },
        { field: 'product_price', headerName: 'Price' },
        { field: 'product', headerName: 'Product Name' },
        { field: 'current_stocks', headerName: 'Current Stocks' }
    ])

    const rowData = ref([
        { product_id: "1", product_price: "1", product: 'Dairy Butter', current_stocks: 32 },
        { product_id: "2", product_price: "2", product: 'Robust', current_stocks: 69 }
    ])

    const defaultColDef = {
        resizable: true,
        flex: 1
    }

    const rowClickEvent  = (event) => {
        selectedRow.value = event.data
        showInventoryModal.value = true
    } // rowClickEvent

    function displayUserDetails(userDataGet, email){

        if(userDataGet){
            
            filteredUsers.value = userDataGet.find(userData => userData.email === email)
            username.value = filteredUsers.value?.username || ''

        }         

    } // displayUserDetails

    const loadProducts = () => {

        if(!localStorage.getItem('productsData')){

            localStorage.setItem('productsData', JSON.stringify(productsData.value))
           
            productsData.value.forEach(item => {
                rowData.value.push({
                    product_id: item.product_id,
                    product_price: item.price !== '' || item.price !== null ? Number(item.  price) : 0,
                    product: item.product_name,
                    current_stocks:  item.current_stock !== '' || item.current_stock !== null ? Number(item.current_stock) : 0
                })
            })
           
        }else{

            const productsDataLocalStorage = JSON.parse(localStorage.getItem('productsData'))

            productsDataLocalStorage.forEach(item => {
                rowData.value.push({
                    product_id: item.product_id,
                    product_price: item.price !== '' || item.price !== null ? Number(item.price) : 0,
                    product: item.product_name,
                    current_stocks:  item.current_stock !== '' || item.current_stock !== null  ? Number(item.current_stock) : 0
                })
            })
        }

    } // loadProducts
  
   

    const loadUsers = () => {

        if(usersData.value){
            
            if(!localStorage.getItem('userEmail')){

                localStorage.setItem("usersData", JSON.stringify(usersData.value))
                localStorage.setItem("userEmail", user.value.email)

                const userDataGet = localStorage.getItem('usersData')
                const userEmail = localStorage.getItem('userEmail')

                displayUserDetails(JSON.parse(userDataGet), userEmail)

            }        
           
        }
     
        //username.value = usersData.value
    } // loadUsers


    const loadSuppliers = () => {

        if(!localStorage.getItem('suppliers')){

            localStorage.setItem('suppliers', JSON.stringify(suppliersData));

        }else{



        }

    } // loadSuppliers

    const toggleSidebar = () => {

        sidebarOpen.value = !sidebarOpen.value

    } // toggleSidebar

    function getUserDetailsFromUsersData(){

        const userDataGet = localStorage.getItem('usersData')
        const userEmail = localStorage.getItem('userEmail')

        if(userDataGet){
            displayUserDetails(JSON.parse(userDataGet), userEmail);
        }
        
    } // getUserDetailsFromUsersData


    onMounted(() => {

        if(user != null){
            loadUsers()
            loadProducts()
            loadSuppliers()          
        }else{
            routeManager.push('/login')
        }

        const isPageReload = performance.getEntriesByType('navigation')[0]?.type === 'reload'

        if(isPageReload){

            getUserDetailsFromUsersData();
         
        }else{
            // pageStatus.value = 'normal page in vue 3'
        }
       
    })

</script>

<template>
    

    <LogoutModals :showLogoutModal = "showLogoutModal" @close = "showLogoutModal = false"></LogoutModals>
    <InventoryModal :productId = "selectedRow.product_id" :productName = "selectedRow.product" :productPrice = "selectedRow.product_price" :currentStocks = "selectedRow.current_stocks" :showInventoryModal = "showInventoryModal" :supplierArray = "suppliersData" @close = "showInventoryModal = false"></InventoryModal>

    <div class="grid grid-cols-12">
        

        <div :class="['', sidebarOpen ? 'col-span-2' : 'col-span-1']">
            <aside class = "w-full h-screen bg-blue-500 shadow-lg flex flex-col">

                <div :class="['text-white font-thin', sidebarOpen ? 'text-4xl  text-center py-5' : 'text-2xl  text-left ms-2 p-5']" role = "button">
                    
                    Admin

                </div>

                <div class = "p-4 text4xl font-bold text-white">Menu</div>
                <ul class = "w-full p-4">
                   
                    <li>

                        <router-link to = '/dashboard' class = "text-white text-2xl">

                        <p v-if = "sidebarOpen">

                            <div class="flex flex-row gap-2 items-center">

                                <svg class = "h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                                <div>Dashboard</div>

                            </div>
                           
                        
                        </p>

                        <span v-else = "sidebarOpen">

                            <svg class = "h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                           
                        </span>

                        </router-link>

                    </li>
                    
                    <li>
                    
                         <router-link to = '/products' class = "text-white text-2xl">
                            <p v-if = "sidebarOpen">

                                <div class="flex flex-row gap-2 items-center">

                                    <svg class = "h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>


                                    <div>Products</div>

                                </div>
                            
                            
                            </p>

                            <span v-else = "sidebarOpen">

                                <svg class = "h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>

                            
                            </span>

                        </router-link>    
                     
                    </li>

                       <li class = "text-white text-2xl font-bold">

                        <router-link to = '/inventory' class = "text-white text-2xl">
                        
                          
                             <p v-if = "sidebarOpen">

                                <div class="flex flex-row gap-2 items-center">

                                    <svg class = "h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                                    </svg>


                                    <div>Inventory</div>

                                </div>
                            
                            
                            </p>

                            <span v-else = "sidebarOpen">

                                <svg class = "h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                                </svg>
                            
                            </span>


                        </router-link>

                    </li>

                    

                      

                    
                   
                </ul>

                <p class = "text-white p-2 mt-auto" role = "button" @click = "toggleSidebar">

                    <svg v-if = "sidebarOpen" class = "h-14 w-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <svg v-else = "sidebarOpen" class = "h-14 w-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </p>

            </aside> 
        </div> <!-- sidebar -->

       <div :class="['', sidebarOpen ? 'col-span-10' : 'col-span-11']">

            <header class="bg-white shadow-lg">
                <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 class="text-xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-950">VICO Grocery Store Dashboard</h1>
                    <div class="flex items-center space-x-2 block lg:block max-md:hidden">
                        <!-- User menu, notifications, etc. -->

                    
                        <button class="border-2 border-blue-400 text-blue-500 hover:bg-blue-950 hover:text-white hover:border-blue-700 transition-all duration-200 ease-in-out text-sm rounded-full px-5 py-2" @click = "showLogoutModal = true">Logout</button>
                        <p>Welcome {{ username }}</p>
                            
                    </div>
                </div>
            </header>

                 
            <section>
                <div class="flex flex-row grid grid-cols-12 p-8">
                    <ul>
                        <li class = "font-bold">Inventory</li>
                    </ul>
                </div>

                <div class="grid grid-cols-12 p-8">

                   <div class="col-span-12">

                        <div class="rounded-lg shadow-lg p-4">

                            <ag-grid-vue
                                class = "w-full"
                                :rowData = "rowData"
                                :columnDefs = "columnDefs"
                                :domLayout = "'autoweight'"
                                :pagination = "true"
                                :paginationPageSize = "5"
                                :defaultColDef = "defaultColDef"
                                @rowClicked = "rowClickEvent"
                            />

                        </div>

                   </div>                                      


                </div>
                
            </section>

        </div> <!-- header and main content col-span-8 -->
       
   
    </div>
   


</template>

<script>


</script>