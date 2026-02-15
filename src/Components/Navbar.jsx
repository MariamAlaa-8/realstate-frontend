import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'  
import Image from '../assets/download (9).png'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-blue-900 text-white px-4 md:px-10 py-2 flex flex-col sm:flex-row justify-between items-center gap-3">
      <div className="flex items-center gap-3 text-sm">
        {isAuthenticated ? (
          <>
            <Link 
              to="/profile" 
              className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              الملف الشخصي
            </Link>
            <button 
              onClick={handleLogout}
              className="border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-900 transition"
            >
              تسجيل الخروج
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              تسجيل الدخول
            </Link>
          </>
        )}
        
        <button className="border px-3 py-1 rounded hover:bg-white hover:text-blue-900 transition">
          English | عربي
        </button>
      </div>
      
      <Link to="/" className="flex items-center gap-0 text-xl font-bold no-underline text-white">
        النظام العقاري الذكي
        <img src={Image} alt="لوجو النظام العقاري الذكي" className="w-20 h-19 object-contain" />
      </Link>
    </nav>
  )
}
