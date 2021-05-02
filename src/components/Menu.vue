<template>
  <div class="ui secundary menu2">
      <div class="ui container">
          <div class="left menu2">
           <router-link class="item" to="/">
          <img
            class="ui small image"
            src="../assets/logo.png"
            alt="Ecommerce"
          />
    
     
         
  <div v-for="item in arrayCategory" :key="item"  class=" item2">
  
    <router-link :to="item.slug">  {{ item.title }}</router-link>
  </div>

        </router-link>

      
  
            
       
 <div class="sesion">
              <router-link  to="/login" v-if="!token">
                  Iniciar Sesión
              </router-link>
              <template v-if="token">
                  <router-link class="item" to="/order">
                      Pedidos
                  </router-link>
                  <span class="ui item cart primary" @click="openCart">
                      <i class="shopping cart icon "></i>
                  </span>
 <span class="ui item logout primary" @click="logout">
                      <i class="sign-out icon"></i>
                  </span>
                 
              

              </template>

 
          </div> 
          </div>

        

      </div>
           

            <div v-for="category in categories" :key="category.id">
<router-link class="item" :to="category.slug">
               {{category.title}}
            </router-link>
            </div>

  </div>
</template>

<script>
import {ref,onMounted} from "vue";
import {useStore} from "vuex"
import {getTokenApi,deleteTokenApi} from "../api/token";
import {getCategoriesApi} from "../api/category"

export default {
name:"menu",
setup(){
    let categories=ref(null);
   let arrayCategory=[];
    const token=getTokenApi();
    const store=useStore();
    onMounted(async()=>{
   const response=await getCategoriesApi();

  
  await response.forEach(element =>  arrayCategory.push(element))
return arrayCategory;
    })
    const logout=()=>{
      deleteTokenApi();
      location.replace("/")
    }

    const openCart=()=>{
        store.commit("setShowCart",true)

    }
    return{
          arrayCategory,
        token,
        logout,
        openCart,
      
        categories,
         items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
}
}
</script>

<style >
.menu2{
    background-color: #16202b;
    width:100%;
    height:30%;
}
.item{
   
    font-size:20px;

}
router-link:hover{
    color:#1fA1F1
}
.img{
    width:50px;
     height:50px;
}

.sesion{
    float: right;
    
    justify-content: flex-end;
      

   
}
.item2{
    color:black;
   
    float: left;
    margin-bottom: 10px;
    margin-right: 10px;
}
</style>