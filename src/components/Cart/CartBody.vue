<template>
  <div class="cart-body" v-if="products">
      <div class="product" v-for="product in products" :key="product.id">
          <img class="ui image fluid" :src="API_URL+product.image.url" :alt="product.name">
             <div class="info">
                 <p>{{product.name}}</p>
                 <div class="price">
                     <p>${{product.price}}</p>
                  <div class="quantity">
                      <button class="ui button primary"   @click="incremeaseProductCart(product.id)">
                          +
                      </button >
                      <p>{{product.quantity}}</p>
                       <button class="ui button primary" @click="decreaseProductCart(product.id)">
                          -
                      </button>
                  </div>
                 </div>
             </div>
      </div>

  </div>
</template>

<script>
import {API_URL} from "../../Utils/constants";
import {addProductCartApi,deleteProductCartApi} from "../../api/cart"

export default {
name:"CartBody",
props: {
    products:Array,
    realodCartFn:Function
},
setup(props) {
   
    const incremeaseProductCart=(id)=>{
        
         addProductCartApi(id);
      props.realodCartFn();
    }
    const decreaseProductCart=(id)=>{

        deleteProductCartApi(id);
        props.realodCartFn();
    }
    return {
        API_URL,
        incremeaseProductCart,
        decreaseProductCart
       
    }
}
}
</script>

<style scoped>
.cart-body{
  padding:20px 10px;
  overflow-y:scroll;
  height: calc(100hv-50px-90px);
 

}
::-webkit-scrollbar{
display: none;
}

.product{
    display: flex;

}
.ui.image.fluid{
    width: 100px !important;


}
.info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  

}

.price{
    display: flex;
    justify-content: space-between;

}
.price p{
    margin: 0;
}
.quantity{
    display: flex;
    align-items: center;

}
.quantity p{
    margin: 0 10px;
}

.quantity button{
    margin: 4px 10px;
}
.info p{
  margin-left: 5px  !important;
}
</style>