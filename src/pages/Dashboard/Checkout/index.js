import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { actionSetItembasket, actionSetOrders, selectItem, selectPpn, selectSubtotal } from '../../../features/productSlice'
import { useDispatch, useSelector } from 'react-redux'

function Checkout() {
    let item = useSelector(selectItem)
    let subtotal = useSelector(selectSubtotal)
    let ppn = useSelector(selectPpn)
    let navigate = useNavigate()
    const [name,setName] = useState('')
    const [handphone,setHandphone] = useState('')
    const dispatch = useDispatch()

    const setOrder =()=>{
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
  return (
    <div className="flex-initial w-1/3 h-screen bg-white p-10">
        <Link to='/' className='flex align-middle items-center  w-1/3 rounded-md mt-4 justify-center text-center h-10 bg-orange-200 ' >Kembali</Link>
        <div className="mb-6 h-full overflow-scroll w-auto py-8">
          <p className='text-xl text-slate-600 uppercase mb-6'>CHECKOUT</p>
          <div className="input flex flex-col gap-4">
                <p className='text-md text-slate-600'>Informasi Pembeli</p>
                <input type="text" className='bg-white p-2' placeholder='nama' onChange={(e)=>setName(e.target.value)}/>
                <input type="text" className='bg-white p-2' placeholder='no handphone' onChange={(e)=>setHandphone(e.target.value)}/>
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
