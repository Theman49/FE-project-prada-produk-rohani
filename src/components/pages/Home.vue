<script>
import MainLayout from "../../layouts/MainLayout.vue"
import Loading from "../utilities/Loading.vue"
import Card from "../Card.vue"

import axios from 'axios'

const urlApi = 'https://dummyjson.com/products?limit=10&skip=10&select=title,price,images'

export default {
  data() {
    return {
      dummyData: null
    }
  },
  components: {
    MainLayout,
    Card,
    Loading
  },
  methods: {
  },
  async mounted() {
    let result = await axios.get(urlApi)
    console.log(result.data.products)
    this.dummyData = result.data.products
  }
}
</script>

<template>
  <MainLayout v-if="dummyData !== null">
      <div class="container">
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 sm:gap-4"                                             >
          <Card 
          v-for="data in dummyData"
          :id="data.id"
          :title="data.title" 
          :price="data.price"
          :image="data.images[0]" />
        </div>
      </div>
  </MainLayout>
  <div v-else>
      <Loading />
  </div>
</template>