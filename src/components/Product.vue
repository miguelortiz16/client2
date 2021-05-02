<template>
  <div class="ui card product">
    <div class="image">
      <img :src="API_URL + product.image.url" :alt="product.name" height="120" width="100"/>
    </div>
    <div class="content">
      <div class="header">{{ product.name }}</div>
      <div class="description">${{ product.price }} </div>
    </div>
    <div class="ui button primary" @click="addProductCart(product.id)">
      Comprar
    </div>
  </div>
</template>

<script>
import { API_URL } from "../Utils/constants";
import {addProductCartApi} from "../api/cart"
export default {
    name:"Product",
    props:{
        product:Object
    },
    setup() {
       

const addProductCart=(idProduct)=>{
addProductCartApi(idProduct);
}
       return {
           API_URL,
           addProductCart
       }
    }

}
</script>

<style scoped>
.product:hover{
 min-height: 36px;

}
button{ 
   
   
}
</style>