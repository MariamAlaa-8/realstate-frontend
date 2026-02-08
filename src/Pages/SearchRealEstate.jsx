import React, { useState } from 'react'

export default function SearchRealEstate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState(null)

  const handleSearch = () => {
   
    const mockData = {
      ownerName: "أحمد محمد",
      propertyAddress: "٢٣ شارع النصر، القاهرة",
      propertyPrice: "١,٢٠٠,٠٠٠ جنيه",
      cardNumber: searchTerm
    }
    setResults(mockData)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          الاستعلام عن الكارت أو عقار
        </h1>
        <p className="text-gray-400 mb-10">
          أدخل رقم الكارت أو رقم العقار لمعرفة المالك والمعاملات
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <input   className="flex-1 border rounded-lg py-4 px-4 bg-gray-100 outline-none" placeholder="أدخل رقم الكارت هنا..."  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
          <button   className="bg-blue-900 text-white px-10 py-3 rounded-lg cursor-pointer hover:bg-blue-800"  onClick={handleSearch} >
            بحث
          </button>
        </div>

     
        {results && (
           <div className="mt-10">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-center">
                نتائج البحث عن العقار
              </h2>
              <p className="text-center text-blue-100 mt-2">
                رقم الكارت: {results.cardNumber}
              </p>
            </div>
            
            <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                
              
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center ml-4 flex-shrink-0">
                        <span className="text-blue-600 text-lg">👤</span>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500 font-medium">المالك</h3>
                        <p className="text-xl font-bold text-gray-800 mt-1">{results.ownerName}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center ml-4 flex-shrink-0">
                        <span className="text-green-600 text-lg">🏠</span>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500 font-medium">العنوان</h3>
                        <p className="text-lg text-gray-800 mt-1">{results.propertyAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center ml-4 flex-shrink-0">
                        <span className="text-purple-600 text-lg">💰</span>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500 font-medium">القيمة</h3>
                        <p className="text-2xl font-bold text-gray-800 mt-1">{results.propertyPrice}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center ml-4 flex-shrink-0">
                        <span className="text-yellow-600 text-lg">🆔</span>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500 font-medium">رقم الكارت</h3>
                        <p className="text-lg font-semibold text-gray-800 mt-1">{results.cardNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
             
              <div className="bg-gray-50 p-4 text-center">
                <p className="text-gray-500 text-sm">
                  آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
                </p>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}
