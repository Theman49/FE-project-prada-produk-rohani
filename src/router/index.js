import {createRouter, createWebHistory} from "vue-router"
import Home from "../components/pages/Home.vue"
import Product from "../components/pages/Product.vue"
import Cart from "../components/pages/Cart.vue"
import Checkout from "../components/pages/Checkout.vue"
import NotFound from "../components/utilities/NotFound.vue"

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home | Prada Produk Rohani"
    },
    {
        path: "/home",
        component: Home,
        name: "Home | Prada Produk Rohani"
    },
    {
        path: "/product/:id",
        component: Product,
        name: "Produk | Prada Produk Rohani"
    },
    {
        path: '/cart',
        component: Cart,
        name: "Keranjang | Prada Produk Rohani"
    },
    {
        path: '/checkout',
        component: Checkout,
        name: "Checkout | Prada Produk Rohani"
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound,
        name: "Prada Produk Rohani"
    }
]

const router = new createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.name;
    next()
})

export default router