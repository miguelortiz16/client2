<template>
<div>
  <div class="cart-dinner"  :class="{open2:showCart}" @click="closeCart"/>
  <div class="cartNow" :class="{open:showCart}">
    <div>
<CartHeader :closeCart="closeCart"/>
<CartBody :products="products" :realodCartFn="realodCartFn"/>

<CartFooter :products="products" :closeCart="closeCart"  v-if="products"/>

    </div>

    
  </div>
  </div>
</template>

<script>
import {computed,watchEffect,ref} from "vue";
import {useStore} from "vuex"
import CartHeader from "../Cart/CartHeader";
import CartBody from "../Cart/CartBody";
import CartFooter from "../Cart/CartFooter"
import {getProductsCartApi} from "../../api/cart";


export default {
name:"Cart",
components:{
  CartBody,
  CartHeader,
  CartFooter

},
setup() {
  const store=useStore();
  
  const showCart=computed(()=>store.state.showCart);
  let products=ref(null);
  let realodCart=ref(false);
  const getProductsCart= async ()=>{
const response=   await getProductsCartApi();

products.value = response;

    }

    watchEffect(()=>{
      showCart.value;
      realodCart.value
      getProductsCart();
    })
  
  const closeCart=()=>{
    store.commit("setShowCart",false);
  };

const realodCartFn=()=>{
  realodCart.value=!realodCart.value

}
  return{
    showCart,
    closeCart,
    products,
    realodCartFn
    };

}
}
</script>

<style>
.cart-dinner{
  opacity:0;
  transition:opacity 0.5 ease;

 
}
.open2{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;



  }
.cartNow{
  position: fixed;
  right:0;
  top:0;
  width:400px;
  height:100vh;
  background-color:white;
  box-shadow: 0px 0px 26px 5px rgba(0,0,0,0.75);
  display: flex;
  flex-direction:column;
  justify-content:space-between;
    transition: transform 0.9s ease;
  transform: translateX(150%);


}
.open{
    transform:translateX(0);
}
</style>