import { db } from '../firebase'
import { ref as dbRef, onValue, set, push } from 'firebase/database'
import { ref, onMounted } from 'vue'

export function useDatabase() {

    const usersData = ref([])
    const productsData = ref([])
    const suppliersData = ref([])

    onMounted(() => {
       const usersRef = dbRef(db, ("users"))
       
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val()
            if(data){
                usersData.value = Object.values(data)  
            }
        })

      const productsRef = dbRef(db, ("products"))

      onValue(productsRef, (snapshot) => {

        const data = snapshot.val()
        if(data){
            productsData.value = Object.values(data)
        }

      })

      const suppliersRef = dbRef(db, ("supplier"))

      onValue(suppliersRef, (snapshot) => {
        const data = snapshot.val()
        if(data){
          suppliersData.value = Object.values(data)
        }
      })

     

    })

    

    const requestStock = async (productId, stockNumberString, supplierId) => {

      const supplierItemRef = await dbRef(db, ("supply_request"))
      const newSupplierRef = push(supplierItemRef)

      await set(newSupplierRef, {
        date_time: new Date().toISOString(),
        supplier_id: supplierId,
        stock_request: stockNumberString,
        email_contacted: '',
        phone_contacted: '',
        product_request: productId,
        status: '0',
        supply_request_id: ''
      })

    } // requestStock

    return { usersData, productsData, suppliersData, requestStock }
}