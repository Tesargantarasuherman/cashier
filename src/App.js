import logo from './logo.svg';
import './App.css';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { LuHistory, LuLogOut, LuSettings, LuClipboardList, LuSearch } from 'react-icons/lu'
import { TbChartPie } from 'react-icons/tb'
import { useEffect, useState } from 'react';
import { AiOutlineFire } from 'react-icons/ai'
import { TiFlowParallel } from 'react-icons/ti'
import {SlArrowUp,SlArrowDown} from 'react-icons/sl'
function App() {
  const [active, setActive] = useState(null)
  const [product, setProduct] = useState([])
  const [item, setItem] = useState([])
  const [subtotal,setSubtotal] = useState(0)
  const [ppn,setPpn] = useState(0)
  const [total,setTotal] = useState(0)

  let products = [
    {
      id: 1,
      name: "Chicken Roasted With Peanut Sauce",
      price: 50000,
      stock:10
    },
    {
      id: 2,
      name: "Beef Roasted With Peanut Sauce",
      price: 80000,
      stock:5
    }
  ]

  useEffect(() => {
    let total = 0;
    item.map(i=>{
      total += i.qty * i.price
    })
    setSubtotal(total)
    setPpn(total * 0.05)

  }, [active,item])

  const renderActive = (param) => {
    if (active == param) {
      return 'bg-pink-700 text-white'
    }
  }
  // {
  //   if(i?.id === data.id){
  //     setItem(
  //        i?.id === data.id ? {
  //         name:data.name,
  //         id:data.id,
  //         name:data.name,
  //         price:data.price,
  //         qty: i.qty +1
  //       }:i
  //     )
  //     console.log('this',item);
  //   }
  //   else{
  //     console.log('here',item);
  //     setItem([...item,data_])
  //   }
  // }
  const actionSetItem = (data) => {
    let data_ = {
      name: data.name,
      id: data.id,
      name: data.name,
      price: data.price,
      qty:1
    } 
    if(item.length > 0 ){
      let i = item.filter(element => {
        return element.id == data.id
      });
      if(i.length > 0){
        actionSetItemQuantity(data)
      }
      else{
        setItem([...item,data_])
      }
    }
    else{
      console.log('dijalankan')
      setItem([...item,data_])
    }
  }
  const actionSetItemQuantity = (data) => {
    const newList = item.map((item) => {
      if (item.id === data.id) {
        const updatedItem = {
          ...item,
          qty: item.qty +1,
        };

        return updatedItem;
      }
      return item;
    })
    setItem(newList);
  }
  const actionRemoveItemQuantity = (data) => {
    const newList = item.map((item) => {
      if (item.id === data.id) {
        if(item.qty >= 1 ){
          const updatedItem = {
            ...item,
            qty: item.qty -1,
          };
          return updatedItem;
        }

      }
      return item;
    })
    setItem(newList);
  }
  return (
    <div className="w-full h-screen flex">
      {/* sidebar */}
      <div className="flex-initial w-32 bg-white flex flex-col justify-around">
        <div className="logo flex-initial h-32 text-center">
          LOGO
        </div>
        <div className="flex flex-col gap-8 justify-center">
          <div className={`flex-initial h-20 mx-6 flex hover:bg-pink-700 hover:text-white justify-center items-center flex-col hover:cursor-pointer  rounded-xl ${renderActive(1)}`} onClick={() => setActive(1)}>
            <HiOutlineBuildingStorefront size={24} />
            <p className='text-inherit text-xs'>Home</p>
          </div>
          <div className={`flex-initial h-20 mx-6 flex hover:bg-pink-700 hover:text-white justify-center items-center flex-col hover:cursor-pointer  rounded-xl ${renderActive(2)}`} onClick={() => setActive(2)}>
            <TbChartPie size={24} />
            <p className='text-inherit text-xs'>Dashboard</p>
          </div>
          <div className={`flex-initial h-20 mx-6 flex hover:bg-pink-700 hover:text-white justify-center items-center flex-col hover:cursor-pointer  rounded-xl ${renderActive(3)}`} onClick={() => setActive(3)}>
            <LuHistory size={24} />
            <p className='text-inherit text-xs'>History</p>
          </div>
          <div className={`flex-initial h-20 mx-6 flex hover:bg-pink-700 hover:text-white justify-center items-center flex-col hover:cursor-pointer  rounded-xl ${renderActive(4)}`} onClick={() => setActive(4)}>
            <LuClipboardList size={24} />
            <p className='text-inherit text-xs'>Bills</p>
          </div>
          <div className={`flex-initial h-20 mx-6 flex hover:bg-pink-700 hover:text-white justify-center items-center flex-col hover:cursor-pointer  rounded-xl ${renderActive(5)}`} onClick={() => setActive(5)}>
            <LuSettings size={24} />
            <p className='text-inherit text-xs'>Settings</p>
          </div>
        </div>
        <div className='w-full h-12 bg-red flex justify-center align-midde items-center flex-col hover:cursor-pointer'>
          <LuLogOut size={24} />
          <p className='text-inherit text-xs'>Logout</p>
        </div>
      </div>
      {/* end sidebar */}
      <div className="flex-auto bg-slate-50 p-10">
        <div className="flex justify-between pb-6">
          <p className='text-xl text-slate-600 uppercase'>Category</p>

        </div>
        {/* Category */}
        <div className='flex justify-between gap-6'>
          {/* card */}
          <div className="flex flex-col justify-center bg-orange-300 w-24 h-32 rounded-xl pb-2 hover:cursor-pointer">
            <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
              <TiFlowParallel size={24} />
            </div>
            <p className='text-center'>All</p>
          </div>
          {/* end card */}
          {/* card */}
          <div className="flex flex-col justify-center border border-slate-300 w-24 h-32 rounded-xl pb-2 hover:cursor-pointer">
            <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
              <AiOutlineFire size={24} />
            </div>
            <p className='text-center text-slate-400'>Burger</p>
          </div>
          {/* end card */}
          {/* card */}
          <div className="flex flex-col justify-center border border-slate-300 w-24 h-32 rounded-xl pb-2 hover:cursor-pointer">
            <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
              <AiOutlineFire size={24} />
            </div>
            <p className='text-center text-slate-400'>Pizza</p>
          </div>
          {/* end card */}
          {/* card */}
          <div className="flex flex-col justify-center border border-slate-300 w-24 h-32 rounded-xl pb-2 hover:cursor-pointer">
            <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
              <AiOutlineFire size={24} />
            </div>
            <p className='text-center text-slate-400'>Snack</p>
          </div>
          {/* end card */}
          {/* card */}
          <div className="flex flex-col justify-center border border-slate-300 w-24 h-32 rounded-xl pb-2 hover:cursor-pointer">
            <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
              <AiOutlineFire size={24} />
            </div>
            <p className='text-center text-slate-400'>Soft Drink</p>
          </div>
          {/* end card */}
          {/* card */}
          <div className="flex flex-col justify-center border border-slate-300 w-24 h-32 rounded-xl pb-2 hover:cursor-pointer">
            <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
              <AiOutlineFire size={24} />
            </div>
            <p className='text-center text-slate-400'>Coffee</p>
          </div>
          {/* end card */}
          {/* card */}
          <div className="flex flex-col justify-center border border-slate-300 w-24 h-32 rounded-xl pb-2 hover:cursor-pointer">
            <div className="bg-white flex-1 h-42 flex justify-center items-center m-2 rounded-xl">
              <AiOutlineFire size={24} />
            </div>
            <p className='text-center text-slate-400'>Ice Cream</p>
          </div>
          {/* end card */}
        </div>
        {/* end category */}
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <p className='text-xl text-slate-600 uppercase my-6'>Choose order</p>
            <div className="flex h-10 p-2 justify-start bg-white items-center gap-3 rounded-lg">
              <LuSearch size={24} className='text-slate-500' />
              <input type="text" className='outline-none text-slate-500 flex-initial lg:w-56' placeholder='Search...' />
            </div>
          </div>
          <div className="flex justify-start gap-4">
            {/* card orders */}
            {
              products.map(p => (
                <div onClick={() => actionSetItem(p)} className="hover:cursor-pointer p-2 hover:bg-orange-200 flex flex-initial w-56 h-72 border border-slate-300 rounded-xl justify-center flex-col overflow-hidden">
                  <img className='flex-1 rounded-t-xl' src="https://img.freepik.com/free-photo/baked-chicken-wings-asian-style-tomatoes-sauce-plate_2829-10657.jpg?w=2000&t=st=1691486190~exp=1691486790~hmac=57b5e5f0d9431f1976ed01270df85ca08a576b24a53972bd1078166b4c72a511" alt="" srcset="" />
                  <div className="description flex-initial h-24 text-center">
                    <p className='text-lg font-thin text-slate-500'>{p.name}</p>
                    <p className='font-bold text-slate-500'>Rp. {p.price}</p>
                  </div>
                </div>
              ))
            }

            {/* end card orders */}
          </div>
        </div>
      </div>
      <div className="flex-initial w-1/3 h-screen bg-white p-10">
        <div className="mb-6 h-full overflow-scroll">
          <p className='text-xl text-slate-600 uppercase mb-6'>Order Menu</p>
          {
            item?.map(i => {
              if(i.qty >= 1){
                return (
                  <div className="flex justify-between items-center mb-6 gap-2">
                    <img className='flex-initial w-20 rounded-xl' src="https://img.freepik.com/free-photo/baked-chicken-wings-asian-style-tomatoes-sauce-plate_2829-10657.jpg?w=2000&t=st=1691486190~exp=1691486790~hmac=57b5e5f0d9431f1976ed01270df85ca08a576b24a53972bd1078166b4c72a511" alt="" srcset="" />
                    <div className="name w-1/2">
                      <p>{i.name}</p>
                      <p>Rp. {i?.price?.toLocaleString('en-US')}</p>
                    </div>
                    <div className="quantity w-20 flex flex-col items-center justify-center align-center">
                      <button onClick={()=>actionSetItemQuantity(i)} className='w-1/3 flex justify-center'><SlArrowUp /></button>
                      {/* <div className='w-1/3'> */}
                        <p className='text-center w-1/3'>{i.qty}</p>
                        {/* <input type="text" value={i.qty} className='w-1/3 border bg-red text-center'/> */}
                      {/* </div> */}
                      <button onClick={()=>actionRemoveItemQuantity(i)} className='w-1/3 flex justify-center'><SlArrowDown /></button>
                    </div>
                    <div className="total w-1/4">
                      <p>Rp. {(i.price * i.qty).toLocaleString('en-US')}</p>
                    </div>
                  </div>
                )
              }
              
            })
          }
          <div className="border border-separate"></div>
          <div className="flex justify-between">
            <p>Sub Total</p>
            <p>Rp. {subtotal?.toLocaleString('en-US')}</p>
          </div>
          <div className="flex justify-between">
            <p>PPN(5%)</p>
            <p>Rp. {ppn?.toLocaleString('en-US')}</p>
          </div>
          <div className="flex justify-between">
            <p>Total</p>
            <p>Rp.{(subtotal + ppn).toLocaleString('en-US')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
