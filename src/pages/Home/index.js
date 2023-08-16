import React from 'react'
import { LuSearch } from 'react-icons/lu'
import { TbBottleFilled } from 'react-icons/tb'
import { useEffect, useState } from 'react';
import { AiOutlineFire } from 'react-icons/ai'
import { IoFastFoodOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import {actionRemoveItemQuantityBasket, actionSetItembasket, actionUpdateItemQuantityBasket, getAllProduct, selectItem, selectProduct} from '../../features/productSlice'

function Home() {
    let item = useSelector(selectItem)
    const [product, setProduct] = useState(useSelector(selectProduct))
    const [activeCategory,setActiveCategory] = useState(1)
    const dispatch = useDispatch()
    
    let products = [
      {
        id: 1,
        name: "Chicken Roasted With Peanut Sauce",
        price: 50000,
        stock: 10,
        category_id: 2,
        image:'https://img.freepik.com/free-photo/baked-chicken-wings-asian-style-tomatoes-sauce-plate_2829-10657.jpg?w=2000&t=st=1691486190~exp=1691486790~hmac=57b5e5f0d9431f1976ed01270df85ca08a576b24a53972bd1078166b4c72a511'
      },
      {
        id: 2,
        name: "Beef Roasted With Peanut Sauce",
        price: 80000,
        stock: 5,
        category_id: 2,
        image:'https://img.freepik.com/free-photo/grilled-beef-steak-dark-wooden-surface_1150-44344.jpg?w=2000&t=st=1691593787~exp=1691594387~hmac=265aec9fb6d9512bf3bef81c017438c08491b86cf370cb9925d2326c0542dc65'
      },
      {
        id: 3,
        name: "Ice Lemon Tea",
        price: 10000,
        stock: 5,
        category_id: 3,
        image:'https://img.freepik.com/free-photo/refreshing-drink_144627-20873.jpg?w=2000&t=st=1691593114~exp=1691593714~hmac=d1dba35b642eb14dc90444f0dcbcc0268a205365b18bd7a56adca24fd758163f'
      }
    ]
    let list_category = [
      {
        id: 1,
        name: 'All',
      },
      {
        id: 2,
        name: 'Food',
      },
      {
        id: 3,
        name: 'Drink',
      }
    ]

    useEffect(() => {
      dispatch(getAllProduct())
    }, [item])
  
   
  
    const actionSetItem = (data) => {
        dispatch(actionSetItembasket({
            name: data.name,
            id: data.id,
            name: data.name,
            price: data.price,
            image:data.image,
            qty: 1
        }))
    }


    const searchProduct = (data) => {
      if (data != "") {
        let p = product.filter(element => {
          return element.name == data
        });
        if (p.length > 0) {
          setProduct(p)
        }
        else {
          setProduct([])
        }
      }
      else {
        setProduct(products)
      }
    }

    const renderIconCategory = (param) => {
      switch (param) {
        case 1:
          return <IoFastFoodOutline size={24} />
          break;
        case 2:
          return <TbBottleFilled size={24} />
          break;
        default:
          return <AiOutlineFire size={24} />
      }
    }

    const sortByCategory =(param)=>{
    setActiveCategory(param)
      if(param != 1){
        let p = products.filter(element => {
          return element.category_id === param
        });
        if (p.length > 0) {
          setProduct(p)
        }
        else {
          setProduct([])
        }
      }
      else{
        setProduct(products)
      }
    }
    const setActiveButtonCategory =(param)=>{
        list_category.filter(cat=>{
            return cat == param
        })
    }
    
  return (
  <>
      <div className="flex-auto bg-slate-50 p-10">
        <div className="flex justify-between pb-6">
          <p className='text-xl text-slate-600 uppercase'>Category</p>
        </div>
        {/* Category */}
        <div className='flex justify-start gap-6'>
          {/* <div className="flex flex-col justify-center bg-slate-200 w-24 h-32 rounded-xl pb-2 hover:cursor-pointer" onClick={()=>sortByCategory("")} >
            <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
              {
                renderIconCategory()
              }
            </div>
            <p className='text-center'>All</p>
          </div> */}
          {
            list_category.map(l => (
              <div onClick={()=>sortByCategory(l.id)} className={`flex flex-col justify-center ${activeCategory == l.id ?'bg-orange-400':'bg-slate-200'}  w-24 h-32 rounded-xl pb-2 hover:cursor-pointer`}>
                <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
                  {
                    renderIconCategory(l.id)
                  }
                </div>
                <p className='text-center'>{l.name}</p>
              </div>
            ))
          }
        </div>
        {/* end category */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <p className='text-xl text-slate-600 uppercase my-6'>Choose order</p>
            <div className="flex h-10 p-2 justify-start bg-white items-center gap-3 rounded-lg">
              <LuSearch size={24} className='text-slate-500' />
              <input type="text" className='outline-none text-slate-500 flex-initial lg:w-56' placeholder='Search...' onChange={(e) => searchProduct(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-start gap-4">
            {/* card orders */}
            {
              product?.length > 0 ? (
                product?.map(p => (
                  <div onClick={() => actionSetItem(p)} className="hover:cursor-pointer p-2 hover:bg-orange-200 flex flex-initial w-56 h-72 border border-slate-300 rounded-xl justify-between flex-col overflow-hidden">
                    <img className='flex-1 rounded-t-xl' src={p.image} alt="" srcset="" />
                    <div className="description flex-initial h-24 text-center">
                      <p className='text-lg font-thin text-slate-500'>{p.name}</p>
                      <p className='font-bold text-slate-500'>Rp. {p.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>tidak ada data</p>
              )
            }

            {/* end card orders */}
          </div>

        </div>
      </div>
    </>
  )
}

export default Home
