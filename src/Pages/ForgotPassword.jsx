import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        phoneNumber: '',
        nationalId: '',
        otp: ['', '', '', '', '', ''],
        newPassword: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [userId, setUserId] = useState('')
    const [timer, setTimer] = useState(0)
    const [canResend, setCanResend] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [storedOtp, setStoredOtp] = useState('')
    
    //Timer for delayed OTP chip display
    const [showOtpChip, setShowOtpChip] = useState(false) // Initially hidden
    const [chipDisplayDelay, setChipDisplayDelay] = useState(0) // Delay timer
    
    // Add refs for OTP inputs
    const otpInputsRef = useRef([])

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            setCanResend(true)
        }
    }, [timer])

    // Timer for delayed chip display (step 2 only)
    useEffect(() => {
        if (step === 2 && storedOtp && chipDisplayDelay > 0) {
            const interval = setInterval(() => {
                setChipDisplayDelay(prev => {
                    if (prev <= 1) {
                        // When delay reaches 0, show the chip
                        setShowOtpChip(true)
                        setSuccessMessage('✅ رمز التحقق متاح الآن')
                        setTimeout(() => setSuccessMessage(''), 3000)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [step, storedOtp, chipDisplayDelay])

    // Function to handle OTP chip click
    const handleFillOtp = () => {
        if (!storedOtp || storedOtp.length !== 6) {
            setErrors(prev => ({ ...prev, otp: 'رمز OTP غير متوفر' }))
            return
        }

        // Split OTP into individual digits
        const otpDigits = storedOtp.split('')
        setFormData(prev => ({
            ...prev,
            otp: otpDigits
        }))
        
        // Focus on last input
        if (otpInputsRef.current[5]) {
            otpInputsRef.current[5].focus()
        }
        
        // Show success message
        setSuccessMessage('تم تعبئة الرمز تلقائياً')
        setTimeout(() => setSuccessMessage(''), 2000)
    }

    // Function to hide OTP chip
    const handleHideOtp = () => {
        setShowOtpChip(false)
        setSuccessMessage('تم إخفاء رمز التحقق')
        setTimeout(() => setSuccessMessage(''), 2000)
    }

    // Function to handle individual OTP input changes
    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...formData.otp]
            newOtp[index] = value
            setFormData(prev => ({
                ...prev,
                otp: newOtp
            }))

            // Auto-focus next input
            if (value && index < 5 && otpInputsRef.current[index + 1]) {
                otpInputsRef.current[index + 1].focus()
            }
        }
    }

    // Handle keyboard events for OTP inputs
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
            const prevInput = otpInputsRef.current[index - 1]
            if (prevInput) {
                prevInput.focus()
                const newOtp = [...formData.otp]
                newOtp[index - 1] = ''
                setFormData(prev => ({
                    ...prev,
                    otp: newOtp
                }))
            }
        }
        
        if (e.key === 'ArrowLeft' && index > 0) {
            otpInputsRef.current[index - 1].focus()
        }
        
        if (e.key === 'ArrowRight' && index < 5) {
            otpInputsRef.current[index + 1].focus()
        }
    }

    // Handle paste for OTP
    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').trim()
        
        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('')
            setFormData(prev => ({
                ...prev,
                otp: newOtp
            }))
            
            if (otpInputsRef.current[5]) {
                otpInputsRef.current[5].focus()
            }
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSendCode = async () => {
        const newErrors = {}

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'يرجى إدخال رقم الهاتف'
        } else if (!/^01[0-9]{9}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'رقم الهاتف غير صحيح'
        }

        if (!formData.nationalId.trim()) {
            newErrors.nationalId = 'يرجى إدخال الرقم القومي'
        } else if (!/^\d{14}$/.test(formData.nationalId)) {
            newErrors.nationalId = 'الرقم القومي يجب أن يكون 14 رقماً'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        setErrors({})

        try {
            const response = await API.post('/users/forgot-password', {
                phoneNumber: formData.phoneNumber,
                nationalId: formData.nationalId
            })

            setUserId(response.data.userId)
            setStep(2)
            setTimer(300) // 5 دقائق
            setCanResend(false)
            
            // Store the OTP from backend response if available
            if (response.data.otp) {
                setStoredOtp(response.data.otp.toString())
                console.log('✅ OTP for forgot password:', response.data.otp)
                
                // NEW: Start 15-second delay before showing chip
                setShowOtpChip(false) // Ensure it's hidden initially
                setChipDisplayDelay(15) // Start 15-second countdown
            }
            
            setSuccessMessage('تم إرسال رمز التحقق إلى هاتفك')

            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)

        } catch (error) {
            console.error('Forgot password error:', error)
            const message = error.response?.data?.message || 
                            'حدث خطأ في إرسال رمز التحقق'
            setErrors({ general: message })
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyCode = async () => {
        const newErrors = {}
        
        // Convert array OTP to string
        const otpCode = formData.otp.join('')

        if (!otpCode.trim()) {
            newErrors.otp = 'يرجى إدخال رمز التحقق'
        } else if (otpCode.length !== 6) {
            newErrors.otp = 'الرمز يجب أن يكون 6 أرقام'
        } else if (!/^\d{6}$/.test(otpCode)) {
            newErrors.otp = 'الرمز يجب أن يحتوي على أرقام فقط'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        setErrors({})

        try {
            const response = await API.post('/users/verify-forgot-password-otp', {
                userId,
                otp: otpCode
            })

            setStep(3)
            setSuccessMessage('تم التحقق بنجاح، يمكنك الآن تعيين كلمة مرور جديدة')

            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)

        } catch (error) {
            console.error('Verify OTP error:', error)
            const message = error.response?.data?.message || 
                            'رمز التحقق غير صحيح أو انتهت صلاحيته'
            setErrors({ otp: message })
        } finally {
            setLoading(false)
        }
    }

    const handleResendCode = async () => {
        if (!canResend) return

        setLoading(true)
        setErrors({})

        try {
            const response = await API.post('/users/forgot-password', {
                phoneNumber: formData.phoneNumber,
                nationalId: formData.nationalId
            })

            setTimer(300)
            setCanResend(false)
            
            // Update stored OTP with new one
            if (response.data.otp) {
                setStoredOtp(response.data.otp.toString())
                
                //Reset chip display delay for new OTP
                setShowOtpChip(false)
                setChipDisplayDelay(15)
            }
            
            setSuccessMessage('تم إعادة إرسال رمز التحقق')

            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)

        } catch (error) {
            console.error('Resend OTP error:', error)
            setErrors({ general: 'حدث خطأ أثناء إعادة إرسال الرمز' })
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        const newErrors = {}

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'يرجى إدخال كلمة المرور'
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'يرجى تأكيد كلمة المرور'
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'كلمة المرور غير متطابقة'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        setErrors({})

        try {
            const response = await API.post(`/users/reset-password/${userId}`, {
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            })

            setSuccessMessage('تم إعادة تعيين كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.')

            setTimeout(() => {
                navigate('/login', { 
                    state: { 
                        message: 'تم إعادة تعيين كلمة المرور بنجاح',
                        phoneNumber: formData.phoneNumber
                    } 
                })
            }, 3000)

        } catch (error) {
            console.error('Reset password error:', error)
            const message = error.response?.data?.message || 
                            'حدث خطأ أثناء إعادة تعيين كلمة المرور'
            setErrors({ general: message })
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        setStep(prev => prev - 1)
        setErrors({})
        setSuccessMessage('')
        //Reset chip display when going back
        setShowOtpChip(false)
        setChipDisplayDelay(0)
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

            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            {step === 1 && 'نسيت كلمة المرور'}
            {step === 2 && 'التحقق من الرمز'}
            {step === 3 && 'إعادة تعيين كلمة المرور'}
            </h1>

            {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span>{errors.general}</span>
                </div>
            </div>
            )}

            {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                <span>✅</span>
                <span>{successMessage}</span>
                </div>
            </div>
            )}

            {step === 1 && (
            <>
                <p className="text-center text-gray-600 mb-8 text-sm">
                أدخل رقم الهاتف والرقم القومي المسجلين لدينا وسنرسل لك رمز التحقق
                </p>

                <label className="block text-sm text-gray-600 mb-1">
                الرقم القومي
                </label>
                <div className="relative mb-4">
                <input 
                    type="text" 
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800 ${
                    errors.nationalId ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="أدخل الرقم القومي (14 رقم)"
                    maxLength="14"
                    inputMode="numeric"
                    pattern="\d*"
                    disabled={loading}
                />
                {errors.nationalId && (
                    <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>
                )}
                </div>

                <label className="block text-sm text-gray-600 mb-1">
                رقم الهاتف
                </label>
                <div className="relative mb-6">
                <input 
                    type="tel" 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="مثال: 01012345678"
                    maxLength="11"
                    inputMode="tel"
                    disabled={loading}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📞
                </span>
                {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
                </div>

                <button 
                onClick={handleSendCode}
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition mb-6 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                {loading ? (
                    <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري الإرسال...
                    </>
                ) : 'إرسال رمز التحقق'}
                </button>
            </>
            )}

            {step === 2 && (
            <>
                <p className="text-center text-gray-600 mb-4 text-sm">
                أدخل الرمز المكون من 6 أرقام المرسل إلى هاتفك
                <br />
                <span className="font-semibold">****{formData.phoneNumber?.slice(-4)}</span>
                </p>

                {/* NEW: OTP Chip - Shows after 15 seconds delay */}
                {showOtpChip && storedOtp && (
                    <div className="mb-6">
                        <div className="flex justify-center items-center gap-2">
                            <button
                                onClick={handleFillOtp}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full hover:bg-blue-100 transition-colors active:scale-95"
                                title="انقر لملء الرمز تلقائياً"
                            >
                                <span className="text-sm">استخدم الرمز:</span>
                                <span className="font-mono font-semibold tracking-wider">
                                    {storedOtp}
                                </span>
                                <span className="text-xs opacity-70">(انقر للتعبئة)</span>
                            </button>
                            
                            <button
                                onClick={handleHideOtp}
                                className="text-xs text-gray-500 hover:text-red-500 p-1"
                                title="إخفاء الرمز"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                <label className="block text-sm text-gray-600 mb-1">
                رمز التحقق
                </label>
                
                {/* Replace single input with 6 individual inputs */}
                <div 
                    className="flex justify-center gap-2 mb-4"
                    onPaste={handlePaste}
                >
                    {formData.otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (otpInputsRef.current[index] = el)}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={(e) => e.target.select()}
                            className={`w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-blue-800 outline-none transition-all ${
                                errors.otp ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={loading}
                            inputMode="numeric"
                            pattern="\d*"
                            autoComplete="one-time-code"
                            autoFocus={index === 0}
                        />
                    ))}
                </div>
                
                {errors.otp && (
                    <p className="text-red-500 text-sm mt-1 mb-4 text-center">{errors.otp}</p>
                )}

                <div className="flex justify-between items-center mb-8">
                <div className="text-sm">
                    {canResend ? (
                    <button
                        onClick={handleResendCode}
                        disabled={loading}
                        className="text-blue-600 underline hover:text-blue-800 disabled:opacity-50"
                    >
                        إعادة إرسال الرمز
                    </button>
                    ) : (
                    <span className="text-gray-500">
                        يمكنك إعادة الإرسال بعد: {formatTime(timer)}
                    </span>
                    )}
                </div>
                
                {canResend && timer === 0 && (
                    <button
                    onClick={handleResendCode}
                    disabled={loading}
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                    إعادة الإرسال الآن
                    </button>
                )}
                </div>

                <div className="flex gap-3 mb-6">
                <button 
                    onClick={handleBack}
                    disabled={loading}
                    className="w-1/2 border border-blue-900 text-blue-900 py-3 rounded-lg font-medium hover:bg-blue-50 transition disabled:opacity-50"
                >
                    رجوع
                </button>
                <button 
                    onClick={handleVerifyCode}
                    disabled={loading || formData.otp.join('').length !== 6}
                    className="w-1/2 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        جاري التحقق...
                    </>
                    ) : 'التالي'}
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
                <div className="relative mb-4">
                <input 
                    type="password" 
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800 ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="أدخل كلمة المرور الجديدة (6 أحرف على الأقل)"
                    disabled={loading}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔑
                </span>
                {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
                </div>

                <label className="block text-sm text-gray-600 mb-1">
                تأكيد كلمة المرور الجديدة
                </label>
                <div className="relative mb-6">
                <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full border rounded-lg py-3 px-3 outline-none focus:border-blue-800 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="أعد إدخال كلمة المرور"
                    disabled={loading}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔑
                </span>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
                </div>

                <div className="flex gap-3 mb-6">
                <button 
                    onClick={handleBack}
                    disabled={loading}
                    className="w-1/2 border border-blue-900 text-blue-900 py-3 rounded-lg font-medium hover:bg-blue-50 transition disabled:opacity-50"
                >
                    رجوع
                </button>
                <button 
                    onClick={handleResetPassword}
                    disabled={loading || !formData.newPassword || !formData.confirmPassword}
                    className="w-1/2 bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        جاري الحفظ...
                    </>
                    ) : 'حفظ'}
                </button>
                </div>
            </>
            )}

            <div className="text-center mt-8">
            <button 
                onClick={() => navigate('/login')}
                className="text-sm text-gray-500 underline hover:text-gray-700 transition"
            >
                العودة لتسجيل الدخول
            </button>
            </div>

            {step === 1 && (
            <p className="text-center text-sm mt-6 text-gray-600">
                ليس لديك حساب؟{" "}
                <button 
                onClick={() => navigate('/register')}
                className="text-blue-600 underline hover:text-blue-800"
                >
                إنشاء حساب جديد
                </button>
            </p>
            )}

        </div>
        </div>
    )
}
