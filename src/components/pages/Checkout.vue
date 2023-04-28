<script>
import MainLayout from '../../layouts/MainLayout.vue';
import Loading from '../utilities/Loading.vue';

export default {
    data() {
        return {
            data: [1]
        }
    },
    components: {
        MainLayout,
        Loading
    }
}
</script>

<template>
    <MainLayout v-if="data.length != 0">
        <h1 :style="{
            'margin-bottom': '2em',
            'text-align': 'center',
        }">Checkout</h1>
    </MainLayout>
    <Loading v-else/>
</template>