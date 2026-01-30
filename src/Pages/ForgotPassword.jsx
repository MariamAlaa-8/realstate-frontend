import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const handleSendCode = () => {
        const newErrors = {}

        if (phone.trim() === '') {
            newErrors.phone = 'يرجى إدخال رقم الهاتف'
        } else if (!/^01[0-9]{9}$/.test(phone)) {
            newErrors.phone = 'رقم الهاتف غير صحيح'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        setStep(2)

    }

    const handleVerifyCode = () => {
        const newErrors = {}

        if (code.trim() === '') {
            newErrors.code = 'يرجى إدخال رمز التحقق'
        } else if (code.length !== 6) {
            newErrors.code = 'الرمز يجب أن يكون 6 أرقام'
        } else if (!/^\d{6}$/.test(code)) {
            newErrors.code = 'الرمز يجب أن يحتوي على أرقام فقط'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        setStep(3)
    }

    const handleResendCode = () => {
        // إعادة إرسال الكود
    }

    const handleResetPassword = () => {
        const newErrors = {}

        if (password.trim() === '') {
            newErrors.password = 'يرجى إدخال كلمة المرور'
        } else if (password.length < 6) {
            newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
        }

        if (confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'يرجى تأكيد كلمة المرور'
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'كلمة المرور غير متطابقة'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        // هنا كود إعادة تعيين كلمة المرور
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
            <div className="w-full max-w-md px-6">


                <div className="flex justify-center mb-10">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            1
                        </div>
                        <div className={`h-1 w-16 ${step > 1 ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            2
                        </div>
                        <div className={`h-1 w-16 ${step > 2 ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            3
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-10">
                    {step === 1 && 'نسيت كلمة المرور'}
                    {step === 2 && 'التحقق من الرمز'}
                    {step === 3 && 'إعادة تعيين كلمة المرور'}
                </h1>


                {step === 1 && (
                    <>
                        <p className="text-center text-gray-600 mb-8 text-sm">
                            أدخل رقم الهاتف المسجل لدينا وسنرسل لك رمز التحقق
                        </p>

                        <label className="block text-sm text-gray-600 mb-1">
                            رقم الهاتف
                        </label>
                        <div className="relative mb-2">
                            <input type="text" value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                    if (errors.phone) setErrors({ ...errors, phone: '' })
                                }}
                                className={`w-full border rounded-lg py-3 pr-10 pl-3 outline-none focus:border-blue-800 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="أدخل رقم الهاتف المسجل"/>
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                📞
                            </span>
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-sm mb-4">{errors.phone}</p>
                        )}

                        <button onClick={handleSendCode} className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition mb-6" >
                            التالي
                        </button>
                    </>
                )}

              
                {step === 2 && (
                    <>
                        <p className="text-center text-gray-600 mb-8 text-sm">
                            أدخل الرمز المكون من 6 أرقام المرسل إلى هاتفك
                        </p>

                        <label className="block text-sm text-gray-600 mb-1">
                            رمز التحقق
                        </label>
                        <div className="relative mb-2">
                            <input type="text" value={code} onChange={(e) => {
                                setCode(e.target.value)
                                if (errors.code) setErrors({ ...errors, code: '' })
                            }}
                                className={`w-full border rounded-lg py-3 pr-10 pl-3 outline-none focus:border-blue-800 ${errors.code ? 'border-red-500' : 'border-gray-300'}`} placeholder="أدخل الرمز المكون من 6 أرقام" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                🔢
                            </span>
                        </div>
                        {errors.code && (
                            <p className="text-red-500 text-sm mb-2">{errors.code}</p>
                        )}

                        <div className="text-left mb-8">
                            <button onClick={handleResendCode} className="text-sm text-blue-600 underline">
                                إعادة إرسال الرمز
                            </button>
                            <span className="text-sm text-gray-400 mr-2">(00:45)</span>
                        </div>

                        <div className="flex gap-3 mb-6">
                            <button onClick={() => {
                                setStep(1)
                                setErrors({})
                            }}
                                className="w-1/2 border border-blue-900 text-blue-900 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
                                رجوع
                            </button>
                            <button onClick={handleVerifyCode} className="w-1/2 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition">
                                التالي
                            </button>
                        </div>
                    </>
                )}


                {step === 3 && (
                    <>
                        <p className="text-center text-gray-600 mb-8 text-sm">
                            أدخل كلمة المرور الجديدة وتأكيدها
                        </p>

                        <label className="block text-sm text-gray-600 mb-1">
                            كلمة المرور الجديدة
                        </label>
                        <div className="relative mb-2">
                            <input type="password" value={password} onChange={(e) => {
                                setPassword(e.target.value)
                                if (errors.password) setErrors({ ...errors, password: '' })
                            }}
                                className={`w-full border rounded-lg py-3 pr-10 pl-10 outline-none focus:border-blue-800 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="أدخل كلمة المرور الجديدة"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                🔑
                            </span>
                           
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mb-4">{errors.password}</p>
                        )}

                        <label className="block text-sm text-gray-600 mb-1">
                            تأكيد كلمة المرور الجديدة
                        </label>
                        <div className="relative mb-2">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' })
                                }}
                                className={`w-full border rounded-lg py-3 pr-10 pl-10 outline-none focus:border-blue-800 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="أعد إدخال كلمة المرور" />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                🔑
                            </span>
                           
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mb-6">{errors.confirmPassword}</p>
                        )}

                        <div className="flex gap-3 mb-6">
                            <button onClick={() => {
                                setStep(2)
                                setErrors({})
                            }} className="w-1/2 border border-blue-900 text-blue-900 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
                                رجوع
                            </button>
                            <button onClick={handleResetPassword} className="w-1/2 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition">
                                حفظ
                            </button>
                        </div>
                    </>
                )}


                <div className="text-center">
                    <button onClick={() => navigate('/login')} className="text-sm text-gray-500 underline hover:text-gray-700 transition">
                        العودة لتسجيل الدخول
                    </button>
                </div>

                <p className="text-center text-sm mt-8 text-gray-600">
                    ليس لديك حساب؟{" "}
                    <button onClick={() => navigate('/register')} className="text-blue-600 underline">
                        إنشاء حساب جديد
                    </button>
                </p>

            </div>
        </div>
    )

}
