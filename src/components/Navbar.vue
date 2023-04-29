<script>
// import publicPath from '../../vue.config.js'


let id = 0
export default {
    data() {
        return {
            navbarList: [
                { id: id++, text: "home"},
                { id: id++, text: "hampers", submenus: [
                    {text: "natal"},
                    {text: "pernikahan katolik"},
                    {text: "luxury"},
                    {text: "patung keluarga kudus"},
                ]},
                { id: id++, text: "hadiah", submenus: [
                    {text: "rohani"},
                    {text: "baptiskomuni pertama"}
                ]},
                { id: id++, text: "tempat lilin"},
                { id: id++, text: "souvenir"},
                { id: id++, text: "patung", submenus: [
                    {text: "patung yesus"},
                    {text: "patung keluarga kudus"},
                    {text: "patung malaikat"},
                    {text: "patung bunda maria"},
                ]},
                { id: id++, text: "salib"},
                { id: id++, text: "lilin"},
                { id: id++, text: "rosario"},
            ],

            // mobile
            showInMobile: false
        }
    },
    methods: {
        async showSubmenu(id){
            const element = await document.querySelector("#submenu-"+id)
            if(element){
                element.style.opacity = "1"
                element.style.visibility = "visible"
            }
        },
        async closeSubmenu(id){
            const element = await document.querySelector("#submenu-"+id)
            if(element){
                element.style.opacity = "0"
                element.style.visibility = "hidden"
            }
        },
        toggleShowInMobile(){
            this.showInMobile = !this.showInMobile
        }
    },
    mounted() {
        console.log(this.$route.fullPath)
    }
}
</script>

<template>
    <ul v-if="$matches.sm.min" class="flex justify-between z-1000 bg-[#999]">
        <li 
            :class="(this.$route.fullPath == '/' + nav.text) ? 'active' : ''" 
            class="relative" 
            v-for="nav in navbarList" :key="nav.id"  
            @mouseenter="showSubmenu(nav.id)" 
            @mouseleave="closeSubmenu(nav.id)"
        >
            <a v-if="nav.text !== 'home'" :href=" '/catalog/' + nav.text"
                >{{ nav.text }}</a>
            <a v-else :href="'/' + nav.text"
            >{{ nav.text }}</a>
            <ul class="submenus" v-if="nav.submenus" :id="'submenu-'+nav.id">
                <li v-for="submenu in nav.submenus">
                    <a :href="'/catalog/' + nav.text + '/' + submenu.text">{{ submenu.text }}</a>
                </li>
            </ul>
        </li>
    </ul>
    <div v-else>
        <div class="flex justify-end bg-[#999] p-2">
            <div class="cursor-pointer" @click="toggleShowInMobile()">
                <v-icon v-if="!showInMobile" name="co-hamburger-menu" scale="1.5" fill="white"/>
                <v-icon v-else name="co-x" scale="1.5" fill="white"/>
            </div>

        </div>
        <ul v-if="showInMobile" class="bg-[#999]">
            <li 
                :class="(this.$route.fullPath == '/' + nav.text) ? 'active' : ''" 
                :style="{ 'position': 'relative'}" 
                v-for="nav in navbarList" :key="nav.id"  
                @mouseenter="showSubmenu(nav.id)" 
                @mouseleave="closeSubmenu(nav.id)"
            >
                <a v-if="nav.text !== 'home'" :href="'/catalog/' + nav.text"
                    >{{ nav.text }}</a>
                <a v-else :href="'/' + nav.text"
                >{{ nav.text }}</a>
                <ul class="submenus" v-if="nav.submenus" :id="'submenu-'+nav.id">
                    <li v-for="submenu in nav.submenus">
                        <a :href="'/catalog/' + nav.text + '/' + submenu.text">{{ submenu.text }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
 
</template>

<style>
    /* ul {
        display: flex;
        justify-content: space-between;
        padding: 0;
        width: 100%;
        background: #999;
        z-index: 1000;
    } */
    ul li {
        flex-grow: 1;
        text-align: center;
        list-style: none;
        display: flex;
        align-items: center;
        color: rgb(56, 45, 45);
        padding: 10px 20px;
        justify-content: center;
    }
    ul li:hover {
        cursor: pointer;
    }

    .submenus {
        background: #999;
        z-index: 1000;
        display: block;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        top: 100%;
        left: 0;
    }
    @media only screen and (max-width: 578px){
        .submenus {
            border: 1px solid white;
            left: 50%;
        }
    }
    .submenus li {
        display: block;
    }

    a {
        text-decoration: none;
        color: #121212;
        padding-bottom: 5px;
    }
    ul li:hover,
    .active {
        background-color: black;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
    }
    ul li:hover > a,
    .active a {
        color: white
    }
    
    .search {
        background-color: blue;
        padding: 10px 20px;
    }

</style>