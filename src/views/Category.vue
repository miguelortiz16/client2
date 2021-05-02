<template>
  <BasicLayout>
      <h1>Estamos en la cateria</h1>
  </BasicLayout>
</template>

<script>
import {onMounted} from 'vue';
import BasicLayout from "../layouts/BasicLayout";
import {getProductsCategory} from "../api/products"
export default {
    name:"Category",
    components:{
        BasicLayout
    },
    watch:{
        $route(to,from){
            console.log(to)
        },
        setup(){

    let products=ref(null);
      onMounted(() => {
      getProduts("cereales");
    });

         const getProduts = async (category) => {
      const response = await getProductsCategory(category);
     products.value = response;
      console.log(products)
    };
        }
    }

}
</script>

<style>

</style>