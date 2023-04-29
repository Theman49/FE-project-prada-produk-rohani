<script>
import Navbar from '../Navbar.vue';
import MainLayout from '../../layouts/MainLayout.vue';
import Loading from '../utilities/Loading.vue';
import Back from '../utilities/Back.vue'
import axios from 'axios';

export default{
    data(){
        return {
            baseUrl: import.meta.env.VITE_APP_STAGE == 'production' ? import.meta.env.VITE_APP_BASE_URL_PROD : import.meta.env.VITE_APP_BASE_URL,
            product: undefined,
            primaryImage: null,
            counter: 1
        }
    },
    components: {
        MainLayout,
        Navbar,
        Loading,
        Back
    },
    methods: {
        clickedImage(src) {
            // console.log(src)
            this.primaryImage = src
        },
        increment(){
            this.counter += 1
        },
        decrement(){
            if(this.counter > 1){
                this.counter -= 1
            }
        },
        addCart(){
            const item = {
                'count': this.counter,
                'itemId': this.product.id,
                'itemTitle': this.product.title
            }
            console.log(item)
            document.location.href = this.baseUrl + 'cart'
        }
    },
    async mounted(){
        const res = await axios.get(`https://dummyjson.com/products/${this.$route.params.id}`)
        console.log(res.data)
        this.product = res.data
        this.primaryImage = this.product.images[0]
    }
}
</script>

<template>
    <div v-if="product">
        <MainLayout>
            <Back v-if="$matches.sm.min"/>
            <div :style="{
                'display': 'flex',
                'justify-content': 'space-between',
                'gap': '64px'
            }" class="flex-col sm:flex-row container">
                <!-- left -->
                <div :style="{
                    'width': '100%',
                    'display': 'flex',
                    'flex-direction': 'column',
                    'gap': '20px',
                }" class="overflow-hidden">
                    <div>
                        <img id="primary" :src="primaryImage" :style="{
                            'width': '100%',
                        }" :alt="product.title"
                        class="h-[250px] sm:h-[500px]"
                        />
                    </div>

                    <div :style="{
                        'width': '500px',
                        'overflow-x': 'auto'
                    }">
                        <div :style="{
                            'display': 'flex',
                            'gap': '10px',
                        }">
                            <img v-for="image in product.images" :src="image" :class="(image == primaryImage) ? 'imageActive' : 'image'" 
                                @click="clickedImage(image)"
                            :alt="product.title"/>
                        </div>

                    </div>
                </div>

                <!-- right -->
                <div :style="{
                    'display': 'flex',
                    'flex-direction': 'column',
                    'gap': '20px',
                    'width': '100%'
                }">
                    <div>
                        <p :style="{
                            'font-weight': 'bold'
                        }">{{ product.title }}</p>
                        <p>{{ product.category }}</p>
                    </div>
                    <div>
                        <p>{{ product.description }}</p>
                    </div>
                    <div :style="{
                        'border-top': '1px dashed #999',
                        'border-bottom': '1px dashed #999',
                        'padding': '1.5em 0'
                    }">
                        <h1>Rp. {{ product.price }},-</h1>
                    </div>
                    <div :style="{
                        'display': 'flex',
                        'gap': '10px'
                    }" class="">
                        <div :style="{
                            'display': 'flex',
                        }">
                            <div>
                                <button :style="{
                                    'height': '100%',
                                    'padding': '10px 20px',
                                    'cursor': 'pointer'
                                }" @click="decrement()">-</button>
                            </div>
                            <div :style="{
                                'width': '100px',
                            }">
                                <input id="counter" readonly v-model="counter" type="text" :style="{
                                    'width': '100%',
                                    'height': '100%',
                                    'text-align': 'center',
                                    'padding': '10px'
                                }"/>
                            </div>
                            <div>
                                <button :style="{
                                    'height': '100%',
                                    'padding': '10px 20px',
                                    'cursor': 'pointer'
                                }" @click="increment()">+</button>
                            </div>
                        </div>
                        <div class="w-full sm:w-max">
                            <button :style="{
                                'width': '100%',
                                'display': 'flex',
                                'align-items': 'center',
                                'gap': '5px',
                                'height': '100%',
                                'padding': '10px 20px',
                                'cursor': 'pointer',
                                'background-color': 'rgb(7, 76, 122)',
                                'color': 'white',
                                'border': 'none',
                                'justify-content': 'center'
                            }" @click="addCart()"><v-icon name="co-cart" scale="1.5" fill="white"/><span v-if="$matches.sm.min">Tambah ke Keranjang</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </div>
    <div v-else>
        <Loading />
    </div>
</template>

<style>
    .imageActive {
        width: 100px;
        height: 100px;
    }
    .image {
        width: 100px;
        height: 100px;
        filter: opacity(.3)
    }
    @media screen and (max-width: 578px){
        .image {
            width: 80px;
            height: 80px;
        }
        .imageActive {
            width: 80px;
            height: 80px;
        }
    }
    .image:hover {
        cursor: pointer;
    }
</style>