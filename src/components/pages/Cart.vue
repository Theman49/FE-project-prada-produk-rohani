<script>
import MainLayout from  "../../layouts/MainLayout.vue"
import Loading from "../utilities/Loading.vue"
import axios from 'axios'

const url = 'https://dummyjson.com/products?limit=3&skip=3&select=id,title,price,images'

export default {
    data() {
        return {
            carts: [],
            baseUrl: import.meta.env.VITE_APP_STAGE == 'production' ? import.meta.env.VITE_APP_BASE_URL_PROD : import.meta.env.VITE_APP_BASE_URL,
            sumPrices: 0
        }
    },
    components: {
        MainLayout,
        Loading
    },
    methods: {
        removeFromCart(id){
            const filtered = this.carts.filter((cart) => cart.id != id)
            this.carts = filtered
            this.countSumPrices(filtered)
        },
        increment(id){
            let filtered = this.carts.filter((cart) => cart.id == id)[0]
            filtered.count += 1
            this.countSumPrices(this.carts)
        },
        decrement(id){
            let filtered = this.carts.filter((cart) => cart.id == id)[0]
            if(filtered.count > 1){
                filtered.count -= 1
                this.countSumPrices(this.carts)
            }
        },
        countSumPrices(data){
            const prices = data.map((cart) => cart.price * cart.count)
            this.sumPrices = prices.reduce((total, num) => total + num)
        },
        goToProduct(id){
            document.location.href = this.baseUrl + 'product/' + id
        },
    },
    async mounted() {
        const res = await axios.get(url)
        this.carts = res.data.products.map((cart) => cart = {'count': 2, ...cart})
        this.countSumPrices(this.carts)
    }
}
</script>

<template>
    <MainLayout v-if="carts !== undefined">
        <h1 class="text-center mb-8 text-3xl">Keranjang</h1>

        <div class="px-[1em] sm:container" v-if="carts.length != 0">
            <table :style="{
                'width': '100%',
                'border-collapse': 'collapse'
            }">
                <thead>
                    <tr>
                        <th>Barang</th>
                        <th>Jumlah</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cart in carts">
                        <td :style="{
                            'display': 'flex',
                            'align-items': 'center',
                            'padding': '20px 0'
                        }">
                            <v-icon name="co-trash" fill="red" scale="2" :style="{
                                'cursor': 'pointer'
                            }" @click="removeFromCart(cart.id)"/>
                            <div :style="{
                                'display': 'flex',
                                'gap': '10px',
                                'align-items': 'center'
                            }">
                                <div :style="{
                                    'border-radius': '5px',
                                    'overflow': 'hidden'
                                }" class="w-[50px] h-[75px] sm:w-[100px] sm:h-[125px]">
                                    <img :src="cart.images[0]" :style="{
                                        'width': '100%',
                                        'height': '100%',
                                        'cursor': 'pointer'
                                    }" @click="goToProduct(cart.id)"
                                    />
                                </div>
                                <div>
                                    <p>{{ cart.title }}</p>
                                    <p>Rp. {{ (cart.price).toLocaleString('id-ID') }},-</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :style="{
                                'display': 'flex',
                                'justify-content': 'center'
                            }">
                                <button class="actionButton" @click="decrement(cart.id)">-</button>

                                <input v-model="cart.count" :style="{
                                    'text-align': 'center'
                                }" readonly class="w-[25px] sm:w-[50px]"/>

                                <button class="actionButton" @click="increment(cart.id)">+</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>Rp. {{ (cart.price * cart.count).toLocaleString('id-ID') }},-</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td v-if="$matches.sm.min" colspan="1"></td>
                        <td :style="{
                            'font-weight': 'bold'
                        }" class="text-center">Total Harga</td>
                        <td colspan="2" :style="{
                            'font-weight': 'bold',
                            'font-size': '20px',
                            'padding': '10px 0'
                        }">Rp. {{ sumPrices.toLocaleString('id-ID') }},-</td>
                    </tr>
                </tbody>
            </table>

            <div :style="{
                'margin': '2em 2em 0',
                'display': 'flex',
                'justify-content': 'flex-end'
            }">
                <button id="checkout-button">Checkout</button>
            </div>
        </div>

        <h3 v-else :style="{
            'text-align': 'center',
            'height': '200px'
        }" class="pacifico text-2xl">Belum ada barang di Keranjang :)</h3>
    </MainLayout>
    <Loading v-else/>
</template>

<style>
    .border-bottom {
        border-bottom: 1px solid #999;
    }
    th {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        border: 0px;
        border-bottom: 1px solid #999;
        padding-bottom: 5px;
    }
    td {
        border-bottom: 1px solid #999;
    }
    tbody tr:hover {
        background-color: rgba(0,0,0, .1)
    }
    th,
    tr td:not(:first-child) {
        text-align: center;
    } 
    tr:last-child td {
        border: none;
    }

    #checkout-button {
        background-color: rgb(7, 76, 122);
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }
    table input:focus {
        outline: none;
    }
    .actionButton {
        height: 100%;
        padding: 4px 6px;
        cursor: pointer;
    }
</style>
