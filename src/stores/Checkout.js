import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useCheckoutStore = defineStore('checkout', {
    state: () => ({
        'data': useLocalStorage('checkout', {
            'billing': {},
        })
    }),
    getters: {
        getBilling: (state) => state.data
    },
    actions: {
        addBilling(item) {
            this.data.billing = item
            console.log(this.data)
        }
    }

})

