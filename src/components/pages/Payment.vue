<script>
import MainLayout from '../../layouts/MainLayout.vue';
import { useCheckoutStore } from '../../stores/Checkout';
import { useCartStore } from '../../stores/Cart';

export default{
    data() {
        return {
            checkoutStore: useCheckoutStore(),
            cartStore: useCartStore(),
            selectedBank: {},
            listBanks: [
                {
                    bank_name: 'BCA',
                    bank_number: '029-219-2019',
                    bank_account: 'Mbak Dewi'
                },
                {
                    bank_name: 'Mandiri',
                    bank_number: '146-00-0986-3437',
                    bank_account: 'Mbak Dewi'
                },
            ]
        }
    },
    components: {
        MainLayout
    },
    methods: {
        selectBank(name) {
            this.selectedBank = this.listBanks.filter((item) => item.bank_name == name)[0]
        }
    },
    mounted() {
        this.selectedBank = this.listBanks[0]
    }
}
</script>

<template>
    <MainLayout>
        <div class="px-[1em] sm:container">
            <h1 class="text-center mb-8 text-3xl">Pembayaran</h1>

            <div id="payment" class="flex flex-col sm:flex-row justify-between gap-8">
                <div class="flex flex-col w-full gap-2 p-2">
                    <h1 class="border-bottom pb-2 text-2xl border-gray-300">Informasi Billing</h1>

                    <div class="flex flex-col gap-4">
                        <div class="flex">
                            <p class="w-2/5">Nama</p>
                            <div class="flex gap-3 w-full">
                                <p>:</p>
                                <p>{{ checkoutStore.data.billing.name }}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <p class="w-2/5">Email</p>
                            <div class="flex gap-3 w-full">
                                <p>:</p>
                                <p>{{ checkoutStore.data.billing.email }}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <p class="w-2/5">Alamat</p>
                            <div class="flex gap-3 w-full">
                                <p>:</p>
                                <p>{{ checkoutStore.data.billing.address }}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <p class="w-2/5">Telepon/WA</p>
                            <div class="flex gap-3 w-full">
                                <p>:</p>
                                <p>{{ checkoutStore.data.billing.phone }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border flex flex-col gap-6 p-2 w-full">
                    <div>
                        <h1 class="border-bottom pb-2 text-2xl border-gray-300">Ringkasan Pesanan</h1>

                        <table class="w-full mt-2">
                            <thead>
                                <tr>
                                    <th>Barang</th>
                                    <th>Jumlah</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="cart in cartStore.data.carts">
                                    <td class="w-2/5">
                                        <p>{{ cart.itemTitle }}</p>
                                        <p>Rp. {{ cart.itemPrice.toLocaleString("id-ID") }},-</p>
                                    </td>
                                    <td class="w-1/5">{{ cart.itemCount }}</td>
                                    <td class="w-2/5">Rp. {{ (cart.itemPrice * cart.itemCount).toLocaleString("id-ID") }},-</td>
                                </tr>
                                <tr class="font-bold">
                                    <!-- <td ></td> -->
                                    <td colspan="2" class="text-right">Total Harga</td>
                                    <td>Rp. {{ cartStore.data.sumPrices.toLocaleString('id-ID') }},-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="flex flex-col gap-4">
                        <h1 class="border-bottom pb-2 text-2xl border-gray-300">Informasi Pembayaran</h1>

                        <div class="flex flex-col gap-1">
                            <button v-for="item in listBanks" @click="selectBank(item.bank_name)" :class="item.bank_name == selectedBank.bank_name ? 'active' : 'p-[5px] border rounded'">
                                Transfer Bank - {{ item.bank_name }}
                            </button>

                        </div>

                        <div class="flex flex-col">
                            <p>Bank : {{ selectedBank.bank_name }}</p>
                            <p>No. Rek : {{ selectedBank.bank_number}}</p>
                            <p>Atas nama : {{ selectedBank.bank_account }}</p>
                        </div>

                        <button id="confirmButton" class="w-full">Konfirmasi Pembayaran</button>
                    </div>

                </div>
            </div>
        </div>


    </MainLayout>
</template>

<style>
    td {
        padding: 5px;
    }

    #payment button.active,
    #confirmButton {
        background-color: rgb(7, 76, 122);
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
    }
</style>