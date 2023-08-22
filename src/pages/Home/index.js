import React, { useEffect, useState } from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import { IoFastFoodOutline } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';
import { TbBottleFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { actionSearchProduct, actionSetItembasket, actionSortByCategory, getAllProduct, selectItem, selectProduct } from '../../features/productSlice';

function Home() {
    let product = useSelector(selectProduct)
    const [activeCategory,setActiveCategory] = useState(1)
    const dispatch = useDispatch()
    
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
      },
      {
        id: 4,
        name: 'Snack',
      },
      
    ]

    useEffect(() => {
      dispatch(getAllProduct())
    }, [])
  
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


    const searchProduct = (param) => {
        dispatch(actionSearchProduct({
            name:param
        }))
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

        dispatch(actionSortByCategory({
            category_id:param
        }))
    }

    
  return (
  <>
      <div className="flex-auto bg-slate-50 p-10">
        <div className="flex justify-between pb-6">
          <p className='text-xl text-slate-600 uppercase'>Category</p>
        </div>
        {/* Category */}
        <div className='flex justify-start gap-6'>
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
              <input type="text" className='outline-none text-slate-500 flex-initial lg:w-56' placeholder='Search...' onKeyUp={(e) => searchProduct(e.target.value)} />
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
