import {API_URL,PRODUCTS} from "../Utils/constants";
import { uniqBy ,countBy} from "lodash";
export function addProductCartApi(idProduct){
    
 const products=getCartApi();

 products.push(idProduct);
 localStorage.setItem(PRODUCTS,JSON.stringify(products))
}
export function getCartApi(){
    const products =localStorage.getItem(PRODUCTS)

    if(!products) return [];
    return JSON.parse(products);
}

export async function getProductsCartApi(){
    const idProduct = getCartApi();
    if (idProduct.lenght===0) {

        return null;
        
    }
    try {
        const products =[];
        for await (const idProduct of idProduct){
            const response = await fetch( `${API_URL}/products/${idProduct}`)
           
          const result = await response.json();
            products.push(result);
        }

        const productCount= countBy(products,(product)=>{
            return product.name;
        });
        const combined=uniqBy(products,(product)=>{
            const productTemp=product;
            productTemp.quantity=productCount[product.name];
            return productTemp.name;
        })
        return combined;
    } catch (error) {
        console.log(error);
    }
}

export function deleteProductCartApi(idProduct){
    const products=getCartApi();

    const index=products.indexOf(idProduct)
    if (index>-1) products.splice(index,1);
    localStorage.setItem(PRODUCTS,JSON.stringify(products)); 
        
    
}

export function deleteAllProductCartApi(idProduct){
    const products=getCartApi();

    const index=products.indexOf(idProduct);

   if(index>-1){
    products.splice(index,1);
    localStorage.setItem(PRODUCTS,JSON.stringify(products)); 
    deleteAllProductCartApi(idProduct)

   }
        
    
}
export function deleteCartApi(){
    localStorage.removeItem(PRODUCTS);
}