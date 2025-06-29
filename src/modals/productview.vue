<template>
    <div v-if = "showOptionValue" class = "fixed inset-0 flex z-50 bg-black bg-opacity-50 items-center justify-center">
               
                <div class = "bg-white relative rounded-lg shadow-lg">

                    <img :src = "productUrl" class = "w-80 h-40 object-cover"/>
                    <h2 class = "py-2 bg-blue-950 text-white px-4 text-sm" v-if = "operationStatus">{{ operationStatus }}</h2>
                    
                    <div class = "p-4">

                        <h2 class = "font-black">{{ productName }}</h2>
                        <p>Price: PHP {{ productPrice }}</p> 
                        <p>Current Stocks: {{ currentStocks }}</p>

                        <div class = "py-4" v-if = "showAddStocks">
                            <form @submit.prevent = "handleAddStockSubmit" class = "flex flex-col">
                                <label for = "supplierID" class = "mt-2">Supplier</label>
                                <select v-model = "supplier_id" id = "supplierID" class = "rounded-lg px-4 py-2 border-2 border-gray-500" required>
                                    <option value = "">[Select Supplier]</option>
                                    <option :value = "supplier_item.supplier_id" v-for = "supplier_item in supplierArray" :key = "supplier_item.supplier_id">{{ supplier_item.supplier_name }}</option>
                                </select>
                                <label for = "added_stocks" class = "mt-2">Request No. of Stocks</label>
                                <input id = "added_stocks" type = "number" class = "rounded-lg px-4 py-2 border-2 border-gray-500" v-model = "added_stocks" placeholder = "Input Stock to Request" required/>
                                <button type = "submit" class = "px-4 py-2 mt-2 bg-blue-500 hover:bg-blue-700 transition-all duration-200 ease-in-out text-white rounded-lg">Submit</button>
                            </form>
                        </div>

                        <div class="py-2">
                            
                            <button :class = "['rounded-full text-white transition-all duration-200 ease-in-out px-4 py-2', !showAddStocks ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-700']" @click = "handleAddStocks">{{ addStocksLabel }}</button>
                            <button class = "rounded-full border-2 border-grey-500 bg-white hover:bg-gray-500 hover:text-white transition-all duration-200 ease-in-out px-4 py-2" @click = "onClose">Close</button>

                        </div>

                       
                    </div>
                   
                </div>

                
            </div>
</template>


<script setup>


    import { ref } from 'vue';
    import { useDatabase } from '../composables/useDatabase';


    const emit = defineEmits(['close']) 
    const supplier_id = ref('')
    const added_stocks = ref(0)
    const addStocksLabel = ref('Add Stocks')
    const showAddStocks = ref(false)
    const operationStatus = ref('')
    const { requestStock } = useDatabase()

    const productVue = defineProps({
        showOptionValue: Boolean,
        productUrl: String,
        productId: String,
        productName: String, 
        productPrice: String,
        currentStocks: String,
        supplierArray: {
            type: Object,
            required: true
        }
    })


    function handleAddStockSubmit(){

        requestStock(productVue.productId,supplier_id.value,added_stocks.value)
        showAddStocks.value = false
        addStocksLabel.value = "Add Stocks"
        operationStatus.value = "Supply Request Submitted"
        supplier_id.value = ''
        added_stocks.value = ''

    } // handleAddStockSubmit


    function handleAddStocks(){

       

        if(showAddStocks.value == true){
            showAddStocks.value = false
            addStocksLabel.value = "Add Stocks"
        }else{
            showAddStocks.value = true
            operationStatus.value = ''
            addStocksLabel.value = "Exit Add Stock Request"
        }
        

    } // handleAddStocks


    function onClose(){
        showAddStocks.value = false
        addStocksLabel.value = "Add Stocks"
        emit('close')
    }

</script>