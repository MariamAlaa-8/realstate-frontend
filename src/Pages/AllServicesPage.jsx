import React, { useState } from "react";
import proofVideo from "../assets/proofVideo.mp4";
import searchVideo from "../assets/searchVideo.mp4";
import registerVideo from "../assets/registerVideo.mp4";

export default function AllServicesPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  const services = [
    {
      title: "إثبات ملكية",
      description: "هذا الفيديو يوضح كيفية إثبات ملكيتك للعقار بطريقة رقمية آمنة وسريعة.",
      videoSrc: proofVideo,
      color: "bg-blue-200",
    },
    {
      title: "بحث عن عقار",
      description: "تعرف على كيفية البحث عن العقارات المتاحة بطريقة سهلة وسريعة.",
      videoSrc: searchVideo,
      color: "bg-green-200",
    },
    {
      title: "سجل حسابك",
      description: "شرح طريقة تسجيل حسابك ومتابعة خدمات النظام العقاري.",
      videoSrc: registerVideo,
      color: "bg-yellow-200",
    },
    {
      title: "بيع وشراء",
      description: "معلومات عن كيفية بيع وشراء العقارات بشكل آمن وموثق.",
      videoSrc: null,
      color: "bg-pink-200",
    },
    {
      title: "المواريث",
      description: "شرح طريقة إدارة المواريث وتوزيع العقارات بين الورثة.",
      videoSrc: null,
      color: "bg-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8" dir="rtl">
      <h1 className="text-4xl font-bold text-center mb-12">جميع الخدمات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className={`${service.color} rounded-xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition text-right`}
            onClick={() => service.videoSrc && setActiveVideo(service.videoSrc)}
          >
            <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
            <p className="text-gray-800">{service.description}</p>
          </div>
        ))}
      </div>

     
      {activeVideo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-gray-300"
          >
            ×
          </button>

          <video
            src={activeVideo}
            controls
            autoPlay
            className="w-[90%] max-w-4xl rounded-xl shadow-xl"
          />
        </div>
      )}
    </div>
  );
}