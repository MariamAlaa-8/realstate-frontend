import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api";

export default function WillMethod() {

  const navigate = useNavigate();

  
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
      <div className="bg-gray-100 p-4" dir="rtl">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow">

          <div className="bg-blue-900 text-white text-center p-5 rounded-t-xl">
            <h2 className="text-xl font-bold">إعداد الميراث</h2>
            <p className="mt-1">
              قم بتحديد كيفية توزيع الميراث على الورثة
            </p>
          </div>

          <div className="p-5 border-b bg-gray-50">
            <h3 className="font-semibold mb-3">معلومات العقار</h3>

            {loadingContracts ? (
              <p>جاري تحميل العقارات...</p>
            ) : approvedContracts.length === 0 ? (
              <p className="text-gray-500">
                لا يوجد عقارات مقبولة حالياً
              </p>
            ) : (
              approvedContracts.map((contract) => (
                <div key={contract._id} className="mb-3 border-b pb-2">

                  <p>
                    🏠 النوع: {contract.propertyType} - {contract.area} متر مربع
                  </p>

                  <p>
                    📍 الموقع: {contract.governorate}، {contract.address}
                  </p>

                  <p className="text-green-600 font-bold">
                    📊 نسبة ملكيتك: %{contract.ownershipPercentage}
                  </p>

                </div>
              ))
            )}
          </div>

          {/* اختيار الطريقة */}
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
                  <h3 className="font-semibold">وريث #{index + 1}</h3>

                  <button
                    onClick={() => removeHeir(heir.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <input
                  type="text"
                  placeholder="الرقم القومي"
                  className="border p-2 rounded"
                  value={heir.nationalId}
                  onChange={(e) =>
                    updateHeir(
                      heir.id,
                      "nationalId",
                      e.target.value.replace(/\D/g, "").slice(0, 14)
                    )
                  }
                />

                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="border p-2 rounded"
                  value={heir.phone}
                  onChange={(e) =>
                    updateHeir(
                      heir.id,
                      "phone",
                      e.target.value.replace(/\D/g, "").slice(0, 11)
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="border p-2 rounded"
                  value={heir.fullName}
                  onChange={(e) =>
                    updateHeir(heir.id, "fullName", e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="النسبة %"
                  className="border p-2 rounded"
                  value={heir.percent}
                  onChange={(e) =>
                    updateHeir(heir.id, "percent", e.target.value)
                  }
                />

                <select
                  className="border p-2 rounded"
                  value={heir.relation}
                  onChange={(e) =>
                    updateHeir(heir.id, "relation", e.target.value)
                  }
                >
                  <option value="">صلة القرابة</option>
                  <option value="ابن">ابن</option>
                  <option value="ابنة">ابنة</option>
                  <option value="زوج">زوج</option>
                  <option value="زوجة">زوجة</option>
                  <option value="أخ">أخ</option>
                </select>

                <p className="col-span-full text-center">
                  <Link
                    to="/optionalWill"
                    className="text-blue-600 hover:text-blue-800 font-medium"
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
    </>
  );
}
