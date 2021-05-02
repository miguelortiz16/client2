<template>
<div>


  <div class="basic-layout">
    <Menu/>


      <div class="ui container">
          <slot />
      </div>

        
  </div>
 
<Cart>


</Cart>
</div>
</template>

<script>
import Cart from '../components/Cart/Cart'
import Menu from "../components/Menu";
export default {
    
name:"basicLayout",
components:{
    Menu,
    Cart
}
}
</script>

<style>


</style>