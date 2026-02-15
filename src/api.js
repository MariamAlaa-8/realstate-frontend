import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

// Interceptor لإضافة التوكن تلقائياً
API.interceptors.request.use((config) => {
  console.log(`📤 Request: ${config.method?.toUpperCase()} ${config.url}`);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor للتعامل مع الأخطاء العامة
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // إعادة تحميل الصفحة للعودة إلى صفحة تسجيل الدخول
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default API;