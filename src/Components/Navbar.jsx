import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'  
import Image from '../assets/download (9).png'
import API from '../api'

export default function Navbar() {

  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const [isAdmin, setIsAdmin] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const checkAdminStatus = async () => {
    try {
      const response = await API.get('/users/profile')
      setIsAdmin(response.data.user?.role === 'admin')
    } catch (error) {
      console.error('Error checking admin:', error)
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const response = await API.get('/users/notifications?limit=1')
      setUnreadCount(response.data.unreadCount)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (isAuthenticated) {
      checkAdminStatus()
      fetchUnreadCount()
    }
  }, [isAuthenticated])

  return (
    <nav className="bg-blue-900 text-white px-4 md:px-10 py-2" dir="rtl">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">

       
        <Link
          to="/"
          className="flex items-center gap-0 text-xl font-bold no-underline text-white order-2 sm:order-1"
        >
          <img
            src={Image}
            alt="لوجو النظام العقاري الذكي"
            className="w-25 h-24 object-contain"
          />
          <span className="hidden md:inline">النظام العقاري الذكي</span>
        </Link>

       
        <div className="flex items-center gap-3 text-sm order-3">

          {isAuthenticated && (
            <>
              
              <Link
                to="/notifications"
                className="relative p-2 hover:bg-blue-800 rounded-full transition group"
                title="الإشعارات"
              >
                <span className="text-xl">🔔</span>

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Link>

             
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1 bg-purple-700 px-3 py-1 rounded hover:bg-purple-800 transition"
                  title="لوحة التحكم"
                >
                  <span>👑</span>
                  <span className="hidden md:inline">لوحة التحكم</span>
                </Link>
              )}
            </>
          )}

          {isAuthenticated ? (
            <>
             
              {!isAdmin && (
                <Link
                  to="/profile"
                  className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-gray-100 transition flex items-center gap-1"
                >
                  <span>👤</span>
                  <span className="hidden md:inline">الملف الشخصي</span>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-900 transition"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              تسجيل الدخول
            </Link>
          )}

         
        
        </div>
      </div>

     
      {isAuthenticated && (
        <div className="sm:hidden flex justify-center gap-4 mt-2 text-sm border-t border-blue-800 pt-2">
          <Link to="/realEstate" className="hover:text-blue-200 transition">
            عقاراتي
          </Link>
          <Link to="/requestrealestate" className="hover:text-blue-200 transition">
            إضافة
          </Link>
          <Link to="/searchRealEstate" className="hover:text-blue-200 transition">
            بحث
          </Link>
        </div>
      )}
    </nav>
  )
}
