import React, { useState, useEffect } from 'react'
import API from "../api";

export default function WillSetup() {

  const [approvedContracts, setApprovedContracts] = useState([]);
  const [loadingContracts, setLoadingContracts] = useState(true);

  useEffect(() => {
    fetchApprovedContracts();
  }, []);

  const fetchApprovedContracts = async () => {
    try {
      const res = await API.get("/contracts/my-contracts");

      const approved = (res.data.contracts || []).filter(
        (c) => c.status === "approved" || c.status === "completed"
      );

      setApprovedContracts(approved);
    } catch (err) {
      console.log("Error fetching contracts", err);
    } finally {
      setLoadingContracts(false);
    }
  };


  const [heirsList, setHeirsList] = useState([
    {
      id: 1,
      name: "",
      phone: "",
      percent: 0,
      relation: "اختر صلة القرابة",
      nationalId: "",
      fullName: ""
    },
  ]);

  const addHeir = () => {
    const newId = heirsList.length + 1;
    setHeirsList([
      ...heirsList,
      {
        id: newId,
        name: "",
        phone: "",
        percent: 0,
        relation: "اختر صلة القرابة",
        nationalId: "",
        fullName: ""
      },
    ]);
  };

  const removeHeir = (id) => {
    if (heirsList.length > 1) {
      setHeirsList(heirsList.filter(heir => heir.id !== id));
    }
  };

  const updateHeir = (id, field, value) => {
    setHeirsList(
      heirsList.map(heir =>
        heir.id === id ? { ...heir, [field]: value } : heir
      )
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8" dir="rtl">

        <div className="w-full max-w-5xl mx-auto px-4">

        
          <div className="bg-blue-900 text-white p-4 rounded-t-lg text-center">
            <h2 className="text-xl font-semibold">إعداد الميراث</h2>
            <p className="text-lg mt-1 mb-6">
              قم بتحديد كيفية توزيع الميراث على الورثة
            </p>
          </div>

          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 mt-4">
              معلومات العقار
            </h2>

            {loadingContracts ? (
              <p>جاري تحميل العقارات...</p>
            ) : approvedContracts.length === 0 ? (
              <p className="text-gray-500">لا يوجد عقارات مقبولة</p>
            ) : (
              approvedContracts.map((contract) => (
                <div key={contract._id} className="space-y-2 mb-4 border-b pb-3">

                  <div className="flex">
                    <span className="text-gray-600 w-40">النوع:</span>
                    <span className="text-gray-800 font-medium">
                      {contract.propertyType} - {contract.area} متر مربع
                    </span>
                  </div>

                  <div className="flex">
                    <span className="text-gray-600 w-40">الموقع:</span>
                    <span className="text-gray-800 font-medium">
                      {contract.governorate}، {contract.address}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="text-gray-600 w-40">نسبة ملكيتك:</span>
                    <span className="text-green-600 font-bold">
                      %{contract.ownershipPercentage}
                    </span>
                  </div>

                </div>
              ))
            )}
          </div>

        
          <div className="my-6">
            <div className="bg-[#dff4f7] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl">⚠️</span>
                <h2 className="text-xl font-bold text-gray-800">
                  ملاحظة هامة:
                </h2>
              </div>

              <ul className="list-disc pr-4 space-y-2 text-gray-700">
                <li>قم بإدخال بيانات الورثة يدويًا مع تحديد النسبة لكل وريث.</li>
                <li>يجب أن يكون مجموع النسب = 100% بالضبط.</li>
                <li>يمكنك توزيع النسب بأي طريقة تريدها.</li>
                <li>لن يتم حفظ الوصية إلا إذا كان المجموع = 100%.</li>
              </ul>
            </div>
          </div>

         
          <div className="p-4">

            {heirsList.map((heir, index) => (
              <div key={heir.id} className="mb-6">

                {heirsList.length > 1 && (
                  <div className="flex justify-between mb-3">
                    <h3 className="text-lg font-semibold">
                      وريث #{index + 1}
                    </h3>

                    <button
                      onClick={() => removeHeir(heir.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      حذف
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  <input
                    type="text"
                    placeholder="الرقم القومي"
                    className="border rounded-md px-3 py-2"
                    value={heir.nationalId}
                    onChange={(e) =>
                      updateHeir(heir.id, 'nationalId', e.target.value)
                    }
                  />

                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    className="border rounded-md px-3 py-2"
                    value={heir.phone}
                    onChange={(e) =>
                      updateHeir(heir.id, 'phone', e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    className="border rounded-md px-3 py-2"
                    value={heir.fullName}
                    onChange={(e) =>
                      updateHeir(heir.id, 'fullName', e.target.value)
                    }
                  />

                  <input
                    type="number"
                    placeholder="النسبة %"
                    className="border rounded-md px-3 py-2"
                    value={heir.percent}
                    onChange={(e) =>
                      updateHeir(heir.id, 'percent', e.target.value)
                    }
                  />

                  <select
                    className="border rounded-md px-3 py-2"
                    value={heir.relation}
                    onChange={(e) =>
                      updateHeir(heir.id, 'relation', e.target.value)
                    }
                  >
                    <option>اختر صلة القرابة</option>
                    <option>ابن</option>
                    <option>ابنة</option>
                    <option>زوج</option>
                    <option>زوجة</option>
                    <option>أخ</option>
                  </select>

                </div>
              </div>
            ))}

            <button
              onClick={addHeir}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              + إضافة وريث جديد
            </button>
          </div>

       
          <div className="p-4 border-t">
            <h3 className="font-semibold mb-3 text-right">
              قائمة الورثة
            </h3>

            {heirsList.map((heir) => (
              <div key={heir.id} className="flex justify-between border rounded-md p-3 mb-2">

                <div className="text-right">
                  <p className="font-semibold">
                    {heir.fullName || "بدون اسم"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {heir.relation} — {heir.phone || "بدون رقم"}
                  </p>
                </div>

                <span className="text-sm font-semibold text-blue-700">
                  %{heir.percent}
                </span>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
