import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../assets/download (9).png';

export default function Navbar() {
  return (
     <nav className="bg-blue-900 text-white px-4 md:px-10 py-2 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3 text-sm">
         
         
              <Link to="/login" className="bg-white text-blue-900 px-4 py-1 rounded">
                        تسجيل الدخول
                    </Link>
                     <button className="border px-3 py-1 rounded">
            English | عربي
          </button>
                    
           
        </div>
        <Link to="/" className="flex items-center gap-0 text-xl font-bold no-underline white-gray-900 ">
        النظام العقاري الذكي
        <img src={Image} alt="لوجو النظام العقاري الذكي" className="w-20 h-19 object-contain" />
      </Link>

      
      </nav>

  )
}
