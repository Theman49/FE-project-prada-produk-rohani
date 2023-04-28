<script>
import NavbarVue from '../components/Navbar.vue';
import FooterVue from '../components/Footer.vue';

export default{
    components: {
        NavbarVue,
        FooterVue
    }
}
</script>

<template>
    <h1 id="banner" class="text-3xl sm:text-6xl">Prada Produk Rohani</h1>
    <NavbarVue />
    <div :style="{
        'margin': '3em auto'
    }">
        <slot></slot>
    </div>
    <FooterVue />
</template>

<style>
    h1#banner {
        font-family: 'Pacifico', cursive;
        /* font-size: 4em; */
        text-align: center;
        padding: 1em 0px;
    }
</style>