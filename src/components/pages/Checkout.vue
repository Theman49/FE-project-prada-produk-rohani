<script>
import MainLayout from '../../layouts/MainLayout.vue';
import Loading from '../utilities/Loading.vue';
import { useCartStore } from '../../stores/Cart';
import { useCheckoutStore } from '../../stores/Checkout';
import axios from 'axios';

export default {
    data() {
        return {
            data: {
                prov: null,
                kab: null,
                kec: null
            },
            name: '',
            email: '',
            address: '',
            provinsi: '',
            kabupaten: '',
            kecamatan: '',
            zipCode: '',
            phone: '',
            note: '',
            cartStore: useCartStore(),
            checkoutStore: useCheckoutStore(),
            baseUrl: import.meta.env.VITE_APP_STAGE == 'production' ? import.meta.env.VITE_APP_BASE_URL_PROD : import.meta.env.VITE_APP_BASE_URL,
            // isFilled: false
        }
    },
    methods: {
        async updateKab(param) {
            const id = param.split("_")[0]
            const res = await axios.get(`http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`)
            this.data.kab = res.data.kota_kabupaten
        },
        async updateKec(param) {
            const id = param.split("_")[0]
            const res = await axios.get(`http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`)
            this.data.kec = res.data.kecamatan
        },
        order(e) {
            if(!this.name || !this.email || !this.address || !this.provinsi || !this.kabupaten || !this.kecamatan || !this.zipCode || !this.phone) {
                e.preventDefault()
            }
            if(!this.name){
                alert('Tolong isi nama anda')
                return 0
            }
            if(!this.email){
                alert('Tolong isi email anda')
                return 0
            }
            if(!this.address){
                alert('Tolong isi alamat anda')
                return 0
            }
            if(!this.provinsi){
                alert('Tolong pilih provinsi anda')
                return 0
            }
            if(!this.kabupaten){
                alert('Tolong pilih kabupaten anda')
                return 0
            }
            if(!this.kecamatan){
                alert('Tolong pilih kecamatan anda')
                return 0
            }
            if(!this.zipCode){
                alert('Tolong isi kode pos anda')
                return 0
            }
            if(!this.phone){
                alert('Tolong isi no telepon anda')
                return 0
            }
            this.checkoutStore.addBilling({
                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address + ` ${this.kecamatan.split("_")[1]} - ${this.kabupaten.split("_")[1]}, ${this.provinsi.split("_")[1]} - Indonesia ${this.zipCode}`,
                zipCode: this.zipCode,
                note: this.note,
                // kecamatan: this.kecamatan.split("_")[1],
                // kabupaten: this.kabupaten.split("_")[1],
                // provinsi: this.provinsi.split("_")[1],
            })
        }
    },
    components: {
        MainLayout,
        Loading
    },
    async mounted() {
        const res = await axios.get('http://dev.farizdotid.com/api/daerahindonesia/provinsi')
        this.data.prov = res.data.provinsi
    }
}
</script>

<template>
    <MainLayout>
        <h1 class="text-center mb-8 text-3xl">Checkout</h1>

        <div id="checkout" class="px-[1em] sm:container flex flex-col-reverse sm:flex-row gap-8">
            <div class="flex flex-col gap-6 w-full">
                <h1 class="border-bottom pb-2 text-2xl border-gray-300">Informasi Billing</h1>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-1">
                        <label for="name">Nama</label>
                        <input type="text" v-model="name" id="name" placeholder="Nama Anda" required>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="email">Email</label>
                        <input type="email" v-model="email" id="email" placeholder="your@mail.com">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="address">Alamat</label>
                        <input type="text" v-model="address" id="address" placeholder="Alamat rumah anda">
                    </div>
                    <div class="flex flex-col sm:flex-row justify-between gap-4">
                        <div class="flex flex-col gap-1 w-full">
                            <label for="provinsi">Provinsi</label>
                            <select @click="updateKab(provinsi)" v-model="provinsi" id="provinsi">
                                <option v-if="data.prov !== null" v-for="item in JSON.parse(JSON.stringify(data.prov))" :value="item.id + '_' + item.nama">{{ item.nama }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <label for="kabupaten">Kabupaten</label>
                            <select @click="updateKec(kabupaten)" v-model="kabupaten" id="kabupaten">
                                <option v-if="data.kab !== null" v-for="item in JSON.parse(JSON.stringify(data.kab))" :value="item.id + '_' + item.nama">{{ item.nama }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1 w-full">
                        <label for="kecamatan">Kecamatan</label>
                        <select v-model="kecamatan" id="kecamatan">
                            <option v-if="data.kec !== null" v-for="item in JSON.parse(JSON.stringify(data.kec))" :value="item.id + '_' + item.nama">{{ item.nama }}</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="zipCode">Kode Pos</label>
                        <input type="text" v-model="zipCode" id="zipCode" placeholder="Kode Pos">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="phone">Telepon/WA</label>
                        <input type="text" v-model="phone" id="phone" placeholder="No. Telepon Anda">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="note">Catatan Pembelian (optional)</label>
                        <textarea v-model="note"></textarea>
                    </div>
                    <RouterLink :to="baseUrl + 'payment'">
                        <button id="orderButton" class="w-full text-center" @click="order($event)">Pesan</button>
                    </RouterLink>
                </div>
            </div>

            <div class="flex flex-col gap-6 w-full">
                <h1 class="border-bottom pb-2 text-2xl border-gray-300">Ringkasan Pesanan</h1>

                <table class="">
                    <thead>
                        <tr>
                            <th>Barang</th>
                            <th>Jumlah</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="cart in cartStore.data.carts">
                            <td>
                                <p>{{ cart.itemTitle }}</p>
                                <p>Rp. {{ cart.itemPrice.toLocaleString("id-ID") }},-</p>
                            </td>
                            <td>{{ cart.itemCount }}</td>
                            <td>Rp. {{ (cart.itemPrice * cart.itemCount).toLocaleString("id-ID") }},-</td>
                        </tr>
                        <tr class="font-bold">
                            <td></td>
                            <td>Total Harga</td>
                            <td>Rp. {{ cartStore.data.sumPrices.toLocaleString('id-ID') }},-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </MainLayout>
</template>

<style>
    #checkout input,
    #checkout textarea{
        outline: 1px solid #999;
        padding: 5px 10px;
        font-size: 14px;
    }
    #checkout input:focus {
        outline: 1px solid #333;
        box-shadow: 0px 0px 2px 2px #333;
    }
    #checkout th {
        border-bottom: 1px solid rgba(0,0,0,.3)
    }
    #checkout td {
        padding: 5px;
        border-bottom: 1px solid rgba(0,0,0,.1)
    }
    #checkout select {
        padding: 5px 10px;
    }
    #orderButton {
        background-color: rgb(7, 76, 122);
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }
</style>