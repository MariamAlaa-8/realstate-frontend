import React from 'react'

export default function Requestrealestate() {
  return <>
  <div className="min-h-screen bg-gray-50 py-10" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">

       
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          كارت إثبات ملكية
        </h1>
        <p className="text-center text-gray-400 mt-2 mb-10">
          من فضلك املأ البيانات التالية بدقة
        </p>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">

       
          <div>
            <label className="block text-lg mb-1">الاسم</label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>
          <div>
            <label className="block text-lg mb-1">الرقم القومي</label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

          <div>
            <label className="block text-lg  mb-1">
              رقم عداد (الكهرباء)
            </label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

          
          <div>
            <label className="block text-lg mb-1">رقم الهاتف</label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

          <div>
            <label className="block text-lg  mb-1">
              نسبة الملكية (%)
            </label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

          <div>
            <label className="block text-lg  mb-1">رقم العقار</label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

         
          <div>
            <label className="block text-lg  mb-1">العنوان</label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

       <div>
  <label className="block text-lg mb-1">المحافظة</label>
  <select className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800 text-gray-900">
    <option>اختر المحافظة</option>

    <option>القاهرة</option>
    <option>الجيزة</option>
    <option>الإسكندرية</option>
    <option>الدقهلية</option>
    <option>البحر الأحمر</option>
    <option>البحيرة</option>
    <option>الفيوم</option>
    <option>الغربية</option>
    <option>الإسماعيلية</option>
    <option>المنوفية</option>
    <option>المنيا</option>
    <option>القليوبية</option>
    <option>الوادي الجديد</option>
    <option>السويس</option>
    <option>اسوان</option>
    <option>اسيوط</option>
    <option>بني سويف</option>
    <option>بورسعيد</option>
    <option>دمياط</option>
    <option>الشرقية</option>
    <option>جنوب سيناء</option>
    <option>كفر الشيخ</option>
    <option>مطروح</option>
    <option>الأقصر</option>
    <option>قنا</option>
    <option>شمال سيناء</option>
    <option>سوهاج</option>
  </select>
</div>

          <div>
            <label className="block text-lg  mb-1">نوع العقار</label>
            <select className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800 text-gray-900">
              <option>اختر نوع العقار</option>
              <option>شقة</option>
              <option>فيلا</option>
              <option>محل</option>
            </select>
          </div>

         
          <div>
            <label className="block text-lg  mb-1">رقم الطابق</label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

          <div>
            <label className="block text-lg  mb-1">المساحة (م²)</label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

          <div>
            <label className="block text-lg  mb-1">
              السعر المتوقع (جنيه)
            </label>
            <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

          
          <div>
            <label className="block text-lg mb-1">صورة العقد</label>
            <input type="file" className="w-full border rounded-lg py-2 px-3 text-sm bg-white"/>
          </div>
        </div>

     
        <div className="mt-10">
          <button className="bg-blue-900 text-white px-10 py-3 rounded-lg hover:bg-blue-800 transition cursor-pointer">
            إرسال
          </button>
        </div>

      </div>
    </div>
  </>
}
