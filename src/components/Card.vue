<script>
import truncate from 'truncate'
const maxChar = 15

export default {
    data(){
        return {
            genTitle: null,
            baseUrl: import.meta.env.VITE_APP_STAGE == 'production' ? import.meta.env.VITE_APP_BASE_URL_PROD :
            import.meta.env.VITE_APP_BASE_URL
        }
    },
    props: {
        id: {
            type: Number
        },
        title: {
            type: String,
            default: "title"
        },
        price: {
            type: Number,
            default: 0 
        },
        image: {
            type: String,
            default: "not found"
        },
    },
    methods: {
        seeProduct(getId){
            console.log(getId)
        }
    },
    mounted() {
        this.genTitle = truncate(this.title, maxChar)
    }
}
</script>

<template>
    <router-link :to="baseUrl +'product/' + id">
        <div class="card" @click="seeProduct(id)">
            <div :style="{
                'width': '100%',
                'height': '150px',
                'text-align': 'center',
                'color': '#999'
            }">
                <img :src="image" :alt="title" :style="{
                    'width': '100%',
                    'height': '100%',
                }"/>
            </div>

            <div>
                <div>
                    <p>{{ genTitle }}</p>
                </div>
                <div>
                    <p>Rp. {{ price }},-</p>
                </div>
            </div>
        </div>
    </router-link>

</template>

<style>
    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 30px;
        width: 160px;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0px 0px 4px 2px rgba(0,0,0,.3);
        cursor: pointer;
    }

</style>