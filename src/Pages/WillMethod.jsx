import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function WillMethod() {

  const navigate = useNavigate();



  const [heirsList, setHeirsList] = useState([
    {
      id: Date.now(),
      nationalId: "",
      phone: "",
      fullName: "",
      percent: "",
      relation: "",
    },
  ]);

 
  const [showHeirsSection, setShowHeirsSection] = useState(false);



  const addHeir = () => {
    setHeirsList([
      ...heirsList,
      {
        id: Date.now(),
        nationalId: "",
        phone: "",
        fullName: "",
        percent: "",
        relation: "",
      },
    ]);
  };

  const removeHeir = (id) => {
    setHeirsList(heirsList.filter((heir) => heir.id !== id));
  };

  const updateHeir = (id, field, value) => {
    setHeirsList(
      heirsList.map((heir) =>
        heir.id === id ? { ...heir, [field]: value } : heir
      )
    );
  };

 
  return (
    <>
     
      <div className=" bg-gray-100 p-4" dir="rtl">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow">

          <div className="bg-blue-900 text-white text-center p-5 rounded-t-xl">
            <h2 className="text-xl font-bold">إعداد الميراث</h2>
            <p className="mt-1">
              قم بتحديد كيفية توزيع الميراث على الورثة
            </p>
          </div>

          <div className="p-5 border-b bg-gray-50">
            <h3 className="font-semibold mb-3">معلومات العقار</h3>
            <p>🏠 النوع: شقة سكنية - 120 متر مربع</p>
            <p>📍 الموقع: القاهرة، مدينة نصر</p>
            <p className="text-green-600 font-bold">
              📊 نسبة ملكيتك: %100
            </p>
          </div>

          <div className="p-6">
            <h3 className="font-semibold mb-4 text-lg">
              اختر طريقة التوزيع
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <div
                onClick={() => setShowHeirsSection(true)}
                className="cursor-pointer border rounded-xl p-6 text-center hover:shadow-lg transition hover:border-blue-600"
              >
                <div className="text-4xl mb-3">📖</div>
                <h4 className="font-bold text-lg">حسب الشريعة</h4>
                <p className="text-gray-500 mt-2 text-sm">
                  حساب تلقائي للذكر مثل حظ الأنثيين
                </p>
              </div>

             
              <div
                onClick={() => navigate("/willSetup")}
                className="cursor-pointer border rounded-xl p-6 text-center hover:shadow-lg transition hover:border-blue-600"
              >
                <div className="text-4xl mb-3">✍️</div>
                <h4 className="font-bold text-lg">توزيع يدوي</h4>
                <p className="text-gray-500 mt-2 text-sm">
                  أنت تحدد النسب بنفسك
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      
      {showHeirsSection && (
  <div className="p-4" dir="rtl">
    <h2 className="text-2xl text-blue-700 font-semibold mb-4">
      إضافة وريث
    </h2>

    {heirsList.map((heir, index) => (
      <div key={heir.id} className="mb-6 p-4 border rounded-lg">

        {heirsList.length > 1 && (
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">
              وريث #{index + 1}
            </h3>

            <button
              onClick={() => removeHeir(heir.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              حذف
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

         
          <div>
            <label className="block mb-1 font-medium text-gray-700">الرقم القومي</label>
            <input
              type="text"
              placeholder="أدخل الرقم القومي"
              className="border p-2 rounded text-right w-full"
              value={heir.nationalId}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0,14);
                updateHeir(heir.id, "nationalId", value);
              }}
            />
          </div>

       
          <div>
            <label className="block mb-1 font-medium text-gray-700">رقم الهاتف</label>
            <input
              type="tel"
              placeholder="أدخل رقم الهاتف"
              className="border p-2 rounded text-right w-full"
              value={heir.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0,11);
                updateHeir(heir.id, "phone", value);
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">الاسم الكامل</label>
            <input
              type="text"
              placeholder="أدخل الاسم الكامل"
              className="border p-2 rounded text-right w-full"
              value={heir.fullName}
              onChange={(e) =>
                updateHeir(heir.id, "fullName", e.target.value)
              }
            />
          </div>

         
          <div>
            <label className="block mb-1 font-medium text-gray-700">النسبة %</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="أدخل النسبة"
              className="border p-2 rounded text-right w-full"
              value={heir.percent}
              onChange={(e) =>
                updateHeir(heir.id, "percent", e.target.value)
              }
            />
          </div>

        
          <div>
            <label className="block mb-1 font-medium text-gray-700">صلة القرابة</label>
            <select
              className="border p-2 rounded text-right w-full"
              value={heir.relation}
              onChange={(e) =>
                updateHeir(heir.id, "relation", e.target.value)
              }
            >
              <option value="">اختر صلة القرابة</option>
              <option value="ابن">ابن</option>
              <option value="ابنة">ابنة</option>
              <option value="زوج">زوج</option>
              <option value="زوجة">زوجة</option>
              <option value="أخ">أخ</option>
            </select>
          </div>

         
          <p dir="rtl" className="text-center mt-4 col-span-full">
            <Link
              to="/optionalWill"
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
            >
              هل تريد إضافة وصية اختيارية؟
            </Link>
          </p>

        </div>
      </div>
    ))}

    <button
      onClick={addHeir}
      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
    >
      + إضافة وريث جديد
    </button>
  </div>
)}

      
      {showHeirsSection && (
      <div className="p-4 border-t" dir="rtl">
        <h3 className="font-semibold mb-3">قائمة الورثة</h3>

        {heirsList.map((heir) => (
          <div
            key={heir.id}
            className="flex justify-between border rounded-md p-3 mb-2"
          >
            <div>
              <p className="font-semibold">
                {heir.fullName || "بدون اسم"}
              </p>
              <p className="text-sm text-gray-500">
                {heir.relation || "-"} — {heir.phone || "بدون رقم"}
              </p>
            </div>

            <span className="font-semibold text-blue-700">
              %{heir.percent || 0}
            </span>
          </div>
        ))}
      </div>
      )}
    </>
  );
}
