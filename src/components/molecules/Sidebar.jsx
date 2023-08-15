import React, { useState } from 'react'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { LuHistory, LuLogOut, LuSettings, LuClipboardList} from 'react-icons/lu'
import { TbChartPie} from 'react-icons/tb'
import { Link } from 'react-router-dom'

function Sidebar(){

  const [active, setActive] = useState(null)

  const renderActive = (param) => {
    if (active == param) {
      return 'bg-pink-700 text-white'
    }
  }
  return (
    <div className="flex-initial w-32 bg-white flex flex-col justify-around">
        <div className="logo flex-initial h-32 text-center">
          LOGO
        </div>
        <div className="flex flex-col gap-8 justify-center">
          <Link to="/" className={`flex-initial h-20 mx-6 flex hover:bg-pink-700 hover:text-white justify-center items-center flex-col hover:cursor-pointer  rounded-xl ${renderActive(1)}`} onClick={() => setActive(1)}>
            <HiOutlineBuildingStorefront size={24} />
            <p className='text-inherit text-xs'>Home</p>
          </Link>
          <Link to="/dashboard" className={`flex-initial h-20 mx-6 flex hover:bg-pink-700 hover:text-white justify-center items-center flex-col hover:cursor-pointer  rounded-xl ${renderActive(2)}`} onClick={() => setActive(2)}>
            <TbChartPie size={24} />
            <p className='text-inherit text-xs'>Dashboard</p>
          </Link>
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
  )
}

export default Sidebar
