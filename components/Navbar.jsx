import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-[#FBFDFC] flex justify-between px-2 md:px-12 py-3'>
        <div className='flex justify-center items-center space-x-5'>
            <img src="images/hamburg.png" alt="" />
            <img src="images/logo.png" alt="" />
        </div>

        <div className='flex justify-center items-center space-x-5'>
            <img src="images/search.png" alt="" />
            <img src="images/more.png" alt="" />
            <img src="images/theme.png" alt="" />
        </div>
    </div>
  )
}

export default Navbar