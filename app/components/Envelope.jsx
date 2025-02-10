'use client'
import React, { useState } from 'react'
import Card from './Card';

const Envelope = () => {

    const [opencard, setOpenCard] = useState(false);
  return (
    <div className='relative w-40 h-28 bg-red-500 rounded-md shadow-lg cursor-pointer hover:scale-105 transition-all'>
        <div className='absolute top-0 left-0 w-40 h-20 bg-red-700 rounded-t-md transform -translate-y-6 rotate-45 origin-bottom-left'>
        </div>
        <p className="absolute top-8 left-10 text-white text-xl font-semibold">💌</p>
        
    </div>
)
}

export default Envelope