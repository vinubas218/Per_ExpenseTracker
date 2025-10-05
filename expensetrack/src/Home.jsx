import React from 'react'
import expense1 from './image/expense1.jpg'
import Categories from './Categories'
const Home = () => {
  return (
    <div >
      <div className=''>
        <img src={expense1} alt="" className='w-full h-56' />
      </div>
      <div className='p-10 m-5 bg-lime-200 rounded-xl'>
        <p className='text-5xl '>Personal Expense Tracker</p>
        <Categories />
        <div className='text-center'>
          <p> vinuba218 &copy; 2025. All rights reserved.</p>
      </div>
      </div>
    </div>
  )
}

export default Home
