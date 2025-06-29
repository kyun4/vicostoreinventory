<template>
    <div v-if = "showInventoryModal" class = "fixed inset-0 bg-black flex bg-opacity-50 z-50 items-center justify-center">
        <div class = "bg-white p-4 rounded-lg shadow-lg">
            <h2 class = "font-black">{{ productName }}</h2>
            <h2 class = "font-thin">Stocks: {{ currentStocks }}</h2>
            <h2 class = "font-thin mb-2">Supply Requests: {{ currentStocks }}</h2>
            <button class = "px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-700 transition-all duration-200 ease-in-out text-white" @click = "close">Close</button>
        </div>
    </div>
</template>

<script setup>


const emit = defineEmits(['close'])

const inventoryViewProps = defineProps({
    productId: String,
    productName: String,
    productPrice: String,
    currentStocks: String,
    showInventoryModal: Boolean,
    supplierArray: {
        type: Object,
        required: true
    }
})

function close(){
    emit('close')
} // close

</script>