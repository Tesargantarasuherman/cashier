import { createSlice } from '@reduxjs/toolkit'

var product = [
    {
      id: 1,
      name: "Chicken Roasted With Peanut Sauce",
      price: 50000,
      stock: 10,
      category_id: 1,
      image:'https://img.freepik.com/free-photo/baked-chicken-wings-asian-style-tomatoes-sauce-plate_2829-10657.jpg?w=2000&t=st=1691486190~exp=1691486790~hmac=57b5e5f0d9431f1976ed01270df85ca08a576b24a53972bd1078166b4c72a511'
    },
    {
      id: 2,
      name: "Beef Roasted With Peanut Sauce",
      price: 80000,
      stock: 5,
      category_id: 1,
      image:'https://img.freepik.com/free-photo/grilled-beef-steak-dark-wooden-surface_1150-44344.jpg?w=2000&t=st=1691593787~exp=1691594387~hmac=265aec9fb6d9512bf3bef81c017438c08491b86cf370cb9925d2326c0542dc65'
    },
    {
      id: 3,
      name: "Ice Lemon Tea",
      price: 10000,
      stock: 5,
      category_id: 2,
      image:'https://img.freepik.com/free-photo/refreshing-drink_144627-20873.jpg?w=2000&t=st=1691593114~exp=1691593714~hmac=d1dba35b642eb14dc90444f0dcbcc0268a205365b18bd7a56adca24fd758163f'
    }
  ]
export const productSlice = createSlice({
    name: 'product',
    initialState:{
        products:product,
        item:[],
        subtotal:0,
        ppn:0,
        orders:[]
    },
    reducers: {
      getAllProduct: (state) => {
        state.products = product
      },
      actionSetItembasket: (state,action) => {
        if(action.payload != null){
            if (state.item.length > 0) {
                let x = state.item.filter(element => {
                  return element.id == action.payload.id
                });
              if (x.length > 0) {
                  let i = state.item.findIndex(element => element.id == action.payload.id);
                  state.item[i].qty +=1 ;
  
              }
              else {
                  state.item.push(action.payload)
              }
            }
            else {
              state.item.push(action.payload)
          }
        }
        else{
            state.item = []
        }
      },
      actionUpdateItemQuantityBasket:(state,action)=>{
        let i = state.item.findIndex(element => element.id == action.payload.id);
        state.item[i].qty +=1 ;
      },
      actionRemoveItemQuantityBasket:(state,action)=>{
        let i = state.item.findIndex(element => element.id == action.payload.id);
        state.item[i].qty -=1 ;
      },
      actionSetSubtotal:(state,action)=>{
        state.subtotal = action.payload.subtotal
      },
      actionSetPpn:(state,action)=>{
        state.ppn = action.payload.ppn * 0.05
      },
      actionSetOrders:(state,action)=>{
        state.orders.push(action.payload)
      }
    },
  })
  export const {
    getAllProduct,
    actionSetItembasket,
    actionUpdateItemQuantityBasket,
    actionRemoveItemQuantityBasket,
    actionSetSubtotal,
    actionSetPpn,
    actionSetOrders
} = productSlice.actions

export const selectProduct = (state) => state.product.products;
export const selectItem = (state) => state.product.item;
export const selectSubtotal = (state) => state.product.subtotal;
export const selectPpn = (state) => state.product.ppn;

  export default productSlice.reducer