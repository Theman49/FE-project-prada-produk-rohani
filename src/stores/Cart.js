import { useLocalStorage } from "@vueuse/core"
import { defineStore } from "pinia"

export const useCartStore = defineStore('cart', {
    state: () => ({
        'data': useLocalStorage('carts', {
            'carts': [],
            'sumPrices': 0,
        }),
        'sumPrices': 0,
    }),
    getters: {
        getCart: (state) => state.data
    },
    actions: {
        addCart(item) {
            this.data.carts.push(item)
            this.countSumPrices()
        },
        removeCart(idItem) {
            this.data.carts = (JSON.parse(JSON.stringify(this.data.carts))).filter((item) => item.itemId != idItem)
            this.countSumPrices()
        },
        increaseItemCount(id) {
            const findIdx = this.data.carts.findIndex((item) => item.itemId == id)
            this.data.carts[findIdx].itemCount++
            this.countSumPrices()
        },
        decreaseItemCount(id) {
            const findIdx = this.data.carts.findIndex((item) => item.itemId == id)
            if(this.data.carts[findIdx].itemCount > 1){
                this.data.carts[findIdx].itemCount--
                this.countSumPrices()
            }
        },
        countSumPrices(){
            if(this.data.carts.length == 0){
                this.data.sumPrices = 0
                return 0
            }
            const prices = this.data.carts.map((cart) => cart.itemPrice * cart.itemCount)
            if(prices.length > 0){
                this.sumPrices = prices.reduce((total, num) => total + num)
                this.data.sumPrices = this.sumPrices
            }        
        },
        checkIsAdded(idItem){
            const filter = (JSON.parse(JSON.stringify(this.data.carts))).filter((item) => item.itemId == idItem)
            if(filter.length > 0) {
                return true
            }
            return false
        }
    }
})
