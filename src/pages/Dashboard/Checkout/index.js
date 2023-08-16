import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { actionSetItembasket, actionSetOrders, selectItem, selectPpn, selectSubtotal } from '../../../features/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LuChevronLeft, LuPhone, LuUser } from 'react-icons/lu'

function Checkout() {
    let item = useSelector(selectItem)
    let subtotal = useSelector(selectSubtotal)
    let ppn = useSelector(selectPpn)
    let navigate = useNavigate()

    const [name,setName] = useState('')
    const [handphone,setHandphone] = useState('')
    const dispatch = useDispatch()

    const setOrder =()=>{
        if(name == '' || handphone == ''){
            alert('jangan dikosongkan')
        }
        else{
            dispatch(actionSetOrders({
                name:name,
                handphone:handphone,
                item:item,
                subtotal:subtotal,
                ppn:ppn,
                total:subtotal + ppn
            }))
            dispatch(actionSetItembasket(null))
            navigate('/')
        }
    }
  return (
    <div className="flex-initial w-1/3 h-screen bg-white p-10">
        <Link to='/' className='flex align-middle items-center  w-1/3 rounded-md mt-4 pl-2 justify-start h-10 bg-orange-200 ' ><LuChevronLeft size={24} className='text-slate-500'/> Kembali</Link>
        <div className="mb-6 h-full overflow-scroll w-auto py-8">
          <p className='text-xl text-slate-600 uppercase mb-6'>CHECKOUT</p>
          <div className="flex flex-col gap-4 border border-slate-200 p-4 rounded-md my-4">
                <p className='text-md text-slate-600'>Informasi Pembeli</p>
                <div className="flex h-10 p-2 justify-start bg-white items-center gap-3 rounded-lg">
                    <LuUser size={24} className='text-slate-500' />
                    <input type="text" className='border-b-2 border-b-slate-200 outline-none text-slate-500 flex-initial w-full' placeholder='nama' onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="flex h-10 p-2 justify-start bg-white items-center gap-3 rounded-lg">
                    <LuPhone size={24} className='text-slate-500' />
                    <input type="text" className='border-b-2 border-b-slate-200 outline-none text-slate-500 flex-initial w-full' placeholder='no handphone' onChange={(e)=>setHandphone(e.target.value)} required/>
                </div>
          </div>
          {
            item?.map(i => {
              if (i.qty >= 1) {
                return (
                  <div className="flex justify-between items-center mb-6 gap-2">
                    <img className='flex-initial w-20 rounded-xl' src={i.image} alt="" srcset="" />
                    <div className="name w-1/2">
                      <p>{i.name}</p>
                      <p>Rp. {i?.price?.toLocaleString('en-US')}</p>
                    </div>
                    <div className="quantity w-20 flex flex-col items-center justify-center align-center">
                      <p className='text-center w-1/3'>{i.qty}</p>
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
          {
            item.length > 0 ? (
                <button onClick={setOrder} className='flex align-middle items-center rounded-md w-full mt-4 justify-center text-center h-10 bg-orange-200 ' >Checkout</button>
            ):
            (
                null
            )
          }
        </div>
    </div>
  )
}

export default Checkout
