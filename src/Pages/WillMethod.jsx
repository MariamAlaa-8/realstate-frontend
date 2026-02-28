import { useNavigate } from "react-router-dom";

export default function WillMethod() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4" dir="rtl">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow">

        {/* Header */}
        <div className="bg-blue-900 text-white text-center p-5 rounded-t-xl">
          <h2 className="text-xl font-bold">إعداد الميراث</h2>
          <p className="mt-1">
            قم بتحديد كيفية توزيع الميراث على الورثة
          </p>
        </div>

        {/* معلومات العقار */}
        <div className="p-5 border-b bg-gray-50">
          <h3 className="font-semibold mb-3">معلومات العقار</h3>

          <p>🏠 النوع: شقة سكنية - 120 متر مربع</p>
          <p>📍 الموقع: القاهرة، مدينة نصر</p>
          <p className="text-green-600 font-bold">
            📊 نسبة ملكيتك: %100
          </p>
        </div>

        {/* اختيار الطريقة */}
        <div className="p-6">

          <h3 className="font-semibold mb-4 text-lg">
            اختر طريقة التوزيع
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {/* حسب الشريعة */}
            <div
              onClick={() => navigate("/optionalWill")}
              className="cursor-pointer border rounded-xl p-6 text-center hover:shadow-lg transition hover:border-blue-600"
            >
              <div className="text-4xl mb-3">📖</div>
              <h4 className="font-bold text-lg">
                حسب الشريعة
              </h4>
              <p className="text-gray-500 mt-2 text-sm">
                حساب تلقائي للذكر مثل حظ الأنثيين
              </p>
            </div>

            {/* توزيع يدوي */}
            <div
              onClick={() => navigate("/willSetup")}
              className="cursor-pointer border rounded-xl p-6 text-center hover:shadow-lg transition hover:border-blue-600"
            >
              <div className="text-4xl mb-3">✍️</div>
              <h4 className="font-bold text-lg">
                توزيع يدوي
              </h4>
              <p className="text-gray-500 mt-2 text-sm">
                أنت تحدد النسب بنفسك
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}