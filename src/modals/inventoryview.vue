<template>
    <div v-if = "showInventoryModal" class = "fixed inset-0 bg-black flex bg-opacity-50 z-50 items-center justify-center">
        <div class = "bg-white p-4 rounded-lg shadow-lg">
            <h2 class = "font-black">{{ productName }}</h2>
            <h2 class = "font-thin">Stocks: {{ currentStocks }}</h2>
            <h2 class = "font-thin mb-2">Supply Requests: {{ supplyRequests }}</h2>


            <ag-grid-vue

                class = "w-full"
                :rowData = "rowData"
                :columnDefs = "columnDefs"
                :defaultColDef = "defaultColDef"
                :domLayout = "'autoHeight'"
                :pagination = "true"
                :paginationPageSize = "5"

            ></ag-grid-vue>

            <button class = "px-4 py-2 mt-2 rounded-lg bg-gray-500 hover:bg-gray-700 transition-all duration-200 ease-in-out text-white" @click = "close">Close</button>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'

ModuleRegistry.registerModules([ AllCommunityModule ])

const emit = defineEmits(['close'])
const columnDefs = ref([
    { field: "inventory_id", headerName: "ID" },
    { field: "stock_request", headerName: "Stock Request" },
    { field: "product_id", headerName: "Product ID" },
    { field: "status", headerName: "Status" }
])

const rowData =  ref([])

const defaultColDef = {
    resizable: true,
    flex: 1
}

const inventoryViewProps = defineProps({
    productId: String,
    productName: String,
    productPrice: Number,
    currentStocks: Number,
    supplyRequests: Number,
    showInventoryModal: Boolean,
    supplyRequestArray: {
        type: Object,
        required: true
    },
    supplierArray: {
        type: Object,
        required: true
    }
})


function loadSupplyRequests(){

    if(localStorage.getItem('supply_requests')){

        const supplyRequests = JSON.parse(localStorage.getItem('supply_requests') || '[]')
        const filteredRequestByProductId = supplyRequests.filter(supply => supply.product_request === inventoryViewProps.productId)
        
        //  filteredRequestByProductId.forEach(item => {
                    
        //     rowData.value.push({
        //         inventory_id: "1",
        //         stock_request: item.stock_request,
        //         product_id: item.product_request
        //     })

        // })

      

        supplyRequests.forEach(item => {

            if(item.product_request === inventoryViewProps.productId){

                rowData.value.push({
                    inventory_id: "1",
                    stock_request: item.stock_request,
                    product_id: item.product_request
                })

            }           

        })
       

    }else{

    
            const supplyRequests = inventoryViewProps.supplyRequestArray
            const filteredRequestByProductId = supplyRequests
        

            filteredRequestByProductId.forEach(item => {

                rowData.value.push({
                    inventory_id: "1",
                    stock_request: item.stock_request,
                    product_id: item.product_request
                })

            })
        
       
    }

} // loadSupplyRequests

onMounted(() => {
    loadSupplyRequests();
})

function close(){
    emit('close')
} // close

</script>