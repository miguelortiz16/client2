<template>
  <div>
    <BasicLayout>
    <h1>Carrito</h1>
    <table class="ui celled table" v-if="products">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{product.name}}</td>
                 <td>{{product.quantity}}</td>
                   <td>${{product.price}}</td>
                   <td style="text-align:center">
                       <i @click="deleteAllProductCart(product.id)" class="close icon"></i>
                   </td>

            </tr>
            <tr>
                <td></td>
                <td>total:</td>
                <td colspan="2">${{getTotal()}}</td>
            </tr>
        </tbody>

    </table>
    <button class="ui button primary fluid" v-if="products" @click="createOrder">
        Generar pedido
    </button>
    <h3 v-if="!products">No tienes productos en el carrito</h3>

    </BasicLayout>  
  </div>
</template>

<script>

import BasicLayout from "../layouts/BasicLayout"
import { watchEffect ,ref} from 'vue';
import jwtDecode from "jwt-decode";
import {getProductsCartApi,deleteAllProductCartApi,deleteCartApi} from "../api/cart";
import {createOrderApi} from "../api/order";
import {getTokenApi} from "../api/token";
import {useRouter} from "vue-router"
export default {
    naem:"cart",
    components:{
        BasicLayout
    },

    setup(props) {
        
        let products=ref(null);
        let realodCart=ref(false);
        const router=useRouter();
        watchEffect( async()=>{
            realodCart.value;
            const response=await getProductsCartApi();

          products.value=response;

        })
const getTotal=()=>{
    let totalTemp=0;
    products.value.forEach((product) => {
        totalTemp+=product.price*product.quantity;

        
    });
    return totalTemp.toFixed(2);

}
  const deleteAllProductCart=(idproduct)=>{
      deleteAllProductCartApi(idproduct);
      realodCart.value=!realodCart.value;
  }
  const createOrder= async()=>{
      const token=getTokenApi();
      const {id}=jwtDecode(token);
      console.log(id);

      const data={
          user:id,
          totalPayment:getTotal(),
          data:products.value
      }
     try {
         const response =await createOrderApi(data);
       deleteCartApi();
       router.push("/orders")

     } catch (error) {
         console.log(error)
     }

  }
        return {
         products,
         getTotal,
         deleteAllProductCart,
         createOrder
        }
    }

}
</script>

<style>

</style>