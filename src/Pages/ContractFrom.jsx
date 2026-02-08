import { Link } from "react-router-dom";
import React, { useState } from 'react'

export default function ContractForm() {
  const [propertyType, setPropertyType] = useState("")
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-6 md:p-10">

      
        <h2 className="text-center text-2xl font-bold mb-8">
          عقد بيع
        </h2>

     
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">

       
          <div>
            <label className="block text-lg mb-1">الاسم</label>
            <input type="text" className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800"/>
          </div>

        
          <div>
            <label className="block text-lg mb-1">الرقم القومي</label>
            <input type="text"className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

         
          <div>
            <label className="block text-lg mb-1">رقم الهاتف</label>
            <input type="text" className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800"/>
          </div>

        
          <div>
            <label className="block text-lg mb-1">رقم العقار</label>
            <input type="text" className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

        
          <div>
            <label className="block text-lg mb-1">نسبة الملكية (%)</label>
            <input type="number" className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
          </div>

         
          
         
          <div>
            <label className="block text-lg mb-1">العنوان</label>
            <input type="text" className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800"/>
          </div>

      
          
          <div>
            <label className="block text-lg mb-1">المحافظة</label>
            <select className="w-full border rounded-lg py-3 px-3 outline-none bg-white">
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
            <label className="block text-lg mb-1">نوع العقار</label>
            <select value={propertyType}  onChange={(e) => setPropertyType(e.target.value)} className="w-full border rounded-lg py-3 px-3 outline-none  bg-white " >
              <option value="">اختر نوع العقار</option>

              <optgroup label="سكني">
                <option value="شقة">شقة</option>
                <option value="فيلا">فيلا</option>
                <option value="دوبلكس">دوبلكس</option>
                <option value="ستوديو">ستوديو</option>
                <option value="شاليه">شاليه</option>
                <option value="تاون هاوس">تاون هاوس</option>
                <option value="بنتهاوس">بنتهاوس</option>
              </optgroup>

              <optgroup label="تجاري / إداري">
                <option value="محل">محل</option>
                <option value="مكتب إداري">مكتب إداري</option>
                <option value="عيادة">عيادة</option>
                <option value="مقر شركة">مقر شركة</option>
                <option value="معرض">معرض</option>
              </optgroup>

              <optgroup label="أراضي">
                <option value="أرض زراعية">أرض زراعية</option>
                <option value="أرض مباني">أرض مباني</option>
                <option value="أرض صناعية">أرض صناعية</option>
                <option value="أرض تجارية">أرض تجارية</option>
              </optgroup>

              <optgroup label="صناعي">
                <option value="مصنع">مصنع</option>
                <option value="مخزن">مخزن</option>
                <option value="ورشة">ورشة</option>
              </optgroup>
            </select>
          </div>

          {["شقة","دوبلكس","ستوديو","بنتهاوس","مكتب إداري","عيادة"].includes(propertyType) && (
            <div>
              <label className="block text-lg mb-1">رقم الطابق</label>
              <input className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800" />
            </div>
          )}

          <div>
            <label className="block text-lg mb-1"> السعر(جنيه)</label>
            <input type="number" className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800"/>
          </div>

     
          <div>
            <label className="block text-lg mb-1"> المساحة(م²)</label>
            <input type="number" className="w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800"/>
          </div>

        </form>

       
        <div className="mt-8 flex justify-start">
         
           <Link to="/sendContract" className="bg-blue-900 text-white px-8 py-2 rounded-md hover:bg-blue-800 transition">
            التالي
          </Link>
          
        </div>

      </div>
    </div>
  );
}
