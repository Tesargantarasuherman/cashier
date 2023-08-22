import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders } from '../../features/productSlice';
import { IoBagCheck, IoCaretBack, IoCaretForward, IoRepeat } from 'react-icons/io5';
import ReactPaginate from 'react-paginate';

export default function OrderHistory() {
    const orders = useSelector(selectOrders)
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(5);
    const indexOflastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOflastPost - postPerPage;
    const currentPosts = orders.slice(indexOfFirstPost, indexOflastPost);

    const paginate = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const setItemCount=(items)=>{
        var result = items.reduce((sum, item) => sum + item.qty ,0);
        return result
    }
    return (
        <>
            <div className="flex-initial w-full bg-slate-50 p-10 overflow-y-scroll">
                <div className="flex justify-between pb-6 ">
                    <p className='text-xl text-slate-600 uppercase'>Riwayat Pemesanan</p>
                </div>
                <div className="flex py-4 gap-3 w-full">
                    <input type="date" className='p-2 w-1/3' placeholder='Start Date' />
                    <input type="date" className="p-2 w-1/3" />
                    <button className='py-2 px-4 bg-pink-700 text-white w-1/3 rounded-md'>Sort</button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nama Pembeli
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Jumlah Produk Yang Dipesan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Pesanan
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Harga
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Waktu Pembelian
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        {
                            currentPosts.map(order => (
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order.name}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order.item.length}
                                        </th>
                                        <td className="px-6 py-4">
                                            {setItemCount(order.item)}
                                            {/* { order.item.reduce((sum,item)=>
                                               sum + item.qty
                                            )} */}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.total}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>
                <ReactPaginate
                    onPageChange={paginate}
                    pageCount={Math.ceil(orders.length / postPerPage)}
                    previousLabel={<IoCaretBack />}
                    nextLabel={<IoCaretForward />}
                    containerClassName={'flex gap-2 justify-end py-4 items-center'}
                    pageLinkClassName={'py-2 px-4 text-pink-700'}
                    previousLinkClassName={'text-pink-700'}
                    nextLinkClassName={'text-pink-700'}
                    activeLinkClassName={'bg-pink-700 text-pink-100 rounded-md'}
                />
            </div>
            {/* <div className="flex-auto">
            dasd
        </div> */}
        </>
    )
}
