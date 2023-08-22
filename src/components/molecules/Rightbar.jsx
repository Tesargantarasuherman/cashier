import React, { useEffect } from 'react';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionRemoveItemQuantityBasket, actionSetPpn, actionSetSubtotal, actionUpdateItemQuantityBasket, selectItem, selectPpn, selectSubtotal } from '../../features/productSlice';

function Rightbar() {
  let item = useSelector(selectItem)
  let subtotal = useSelector(selectSubtotal)
  let ppn = useSelector(selectPpn)
  const dispatch = useDispatch()

  useEffect(() => {

    let total = 0;
    item.map(i => {
      total += i.qty * i.price
    })

    dispatch(actionSetSubtotal({ subtotal: total }))
    dispatch(actionSetPpn({ ppn: total }))

  }, [item])


  const actionSetItemQuantity = (data) => {
    dispatch(actionUpdateItemQuantityBasket({
      id: data.id,
    }))
  }

  const actionRemoveItemQuantity = (data) => {
    dispatch(actionRemoveItemQuantityBasket({
      id: data.id,
    }))
  }

  return (
    <>
      <div className="flex-initial w-1/3 h-screen bg-white p-10">
        <div className="mb-6 h-full overflow-scroll">
          <p className='text-xl text-slate-600 uppercase mb-6'>Order Menu</p>
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
                      <button onClick={() => actionSetItemQuantity(i)} className='w-1/3 flex justify-center'><SlArrowUp /></button>
                      <p className='text-center w-1/3'>{i.qty}</p>
                      <button onClick={() => actionRemoveItemQuantity(i)} className='w-1/3 flex justify-center'><SlArrowDown /></button>
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
          {
            item.length > 0 ? (
              <>
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
                {/* <div className='flex justify-between items-center'>
                  <div class="bg-cover bg-center w-28 h-16" style={{backgroundImage: "url('https://logos-world.net/wp-content/uploads/2023/02/GoPay-Logo-500x281.png')"}}>
                  </div>
                  <div class="bg-cover bg-center w-28 h-16" style={{backgroundImage: "url('https://logos-world.net/wp-content/uploads/2023/02/GoPay-Logo-500x281.png')"}}>
                  </div>
                  <div class="bg-cover bg-center w-28 h-16" style={{backgroundImage: "url('https://logos-world.net/wp-content/uploads/2023/02/GoPay-Logo-500x281.png')"}}>
                  </div>
                </div> */}
                <Link className='flex align-middle items-center rounded-md mt-4 justify-center text-center h-10 bg-orange-200 ' to='/checkout'>Checkout</Link>
              </>
            ) :
              (
                null
              )
          }
        </div>
        

      </div>
    </>
  )
}

export default Rightbar
