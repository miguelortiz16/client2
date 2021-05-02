<template>
  <div class="cart-header">
   <p>Carrito</p>
   <i class="close icon" @click="closeCart"></i>
  </div>
</template>

<script>
export default {
name:"CartHeader",
props: {
    closeCart:Function
}
}
</script>

<style>
.cart-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size: 20px;
    border-bottom: 1px solid #000;
    padding:10px 20px;
}
.cart-header p,i{
    margin:0 ;
}
.cart-header i:hover{
    cursor: pointer;

}
</style>