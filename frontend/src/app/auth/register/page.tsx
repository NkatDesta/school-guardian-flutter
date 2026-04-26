'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Phone, Lock, CreditCard, Users, Upload, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Shield } from 'lucide-react'

interface FormData {
  fullName: string
  email: string
  phoneNo: string
  password: string
  confirmPassword: string
  nationalId: string
  studentName: string
  relationshipType: 'parent' | 'legal_guardian' | ''
}

interface Documents {
  certificate: File | null
  idFront: File | null
  idBack: File | null
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tempId, setTempId] = useState('')
  const [otp, setOtp] = useState('')
  const [success, setSuccess] = useState(false)
  const [registrationId, setRegistrationId] = useState<number | null>(null)
  const [studentName, setStudentName] = useState('')

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: '',
    nationalId: '',
    studentName: '',
    relationshipType: ''
  })

  const [documents, setDocuments] = useState<Documents>({
    certificate: null,
    idFront: null,
    idBack: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Documents) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({ ...prev, [field]: e.target.files![0] }))
    }
  }

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/api/registration/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setTempId(data.data.tempId)
        setStudentName(data.data.studentName)
        setStep(2)
      } else {
        setError(data.error?.message || 'Validation failed')
      }
    } catch (err: any) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/api/registration/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempId, otp })
      })

      const data = await response.json()

      if (response.ok) {
        setStep(3)
      } else {
        setError(data.error?.message || 'Invalid OTP')
      }
    } catch (err: any) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      await fetch(`${apiUrl}/api/registration/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempId })
      })
      alert('OTP resent successfully!')
    } catch (err: any) {
      setError('Failed to resend OTP')
    }
  }

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!documents.certificate || !documents.idFront || !documents.idBack) {
      setError('Please upload all required documents')
      setLoading(false)
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('tempId', tempId)
    formDataToSend.append('certificate', documents.certificate)
    formDataToSend.append('idFront', documents.idFront)
    formDataToSend.append('idBack', documents.idBack)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/api/registration/complete`, {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()

      if (response.ok) {
        setRegistrationId(data.data.registrationId)
        setSuccess(true)
        setStep(4)
      } else {
        setError(data.error?.message || 'Failed to complete registration')
      }
    } catch (err: any) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="+251 911 234 567"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Min 8 characters"
              minLength={8}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">National ID / Kebele ID *</label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your National ID number"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Child's Full Name *</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your child's full name"
            required
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Please provide the child's legal name for school records</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to Student *</label>
        <select
          name="relationshipType"
          value={formData.relationshipType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select relationship...</option>
          <option value="parent">Parent</option>
          <option value="legal_guardian">Legal Guardian</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
      >
        {loading ? 'Validating...' : (
          <>
            Continue <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  )

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit} className="space-y-6">
      <div className="text-center">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Verify Your Phone</h3>
        <p className="text-gray-600 mt-2">
          We've sent a 6-digit verification code to<br />
          <strong>{formData.phoneNo}</strong>
        </p>
        {studentName && (
          <div className="mt-4 p-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100 font-medium">
            Registering for student: <span className="text-blue-900 font-bold">{studentName}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP *</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="000000"
          maxLength={6}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResendOTP}
          className="text-blue-600 hover:underline text-sm"
        >
          Didn't receive the code? Resend
        </button>
      </div>

      <button
        type="button"
        onClick={() => setStep(1)}
        className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="h-4 w-4" /> Go Back
      </button>
    </form>
  )

  const renderStep3 = () => (
    <form onSubmit={handleStep3Submit} className="space-y-6">
      <div className="text-center">
        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Upload Documents</h3>
        <p className="text-gray-600 mt-2">
          Please upload the required documents for verification
        </p>
        {studentName && (
          <div className="mt-2 text-sm text-blue-700 font-medium italic">
            Student: {studentName}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
          <label className="block cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {documents.certificate ? documents.certificate.name : 'Birth Certificate or Legal Guardian Certificate'}
                </p>
                <p className="text-sm text-gray-500">PDF, JPG, or PNG (max 5MB)</p>
              </div>
              {documents.certificate && <CheckCircle className="h-5 w-5 text-green-600" />}
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'certificate')}
              className="hidden"
              required
            />
          </label>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
          <label className="block cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {documents.idFront ? documents.idFront.name : 'National ID / Kebele ID - Front Side'}
                </p>
                <p className="text-sm text-gray-500">PDF, JPG, or PNG (max 5MB)</p>
              </div>
              {documents.idFront && <CheckCircle className="h-5 w-5 text-green-600" />}
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'idFront')}
              className="hidden"
              required
            />
          </label>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
          <label className="block cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {documents.idBack ? documents.idBack.name : 'National ID / Kebele ID - Back Side'}
                </p>
                <p className="text-sm text-gray-500">PDF, JPG, or PNG (max 5MB)</p>
              </div>
              {documents.idBack && <CheckCircle className="h-5 w-5 text-green-600" />}
            </div>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'idBack')}
              className="hidden"
              required
            />
          </label>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
        <p className="text-sm text-yellow-800">
          Documents will be reviewed by the school registrar. Ensure all information is clear and legible.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
      >
        {loading ? 'Submitting...' : 'Submit Registration'}
      </button>
    </form>
  )

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900">Registration Submitted!</h3>
        <p className="text-gray-600 mt-2">
          Your registration request has been received and is pending review.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-left">
        <p className="text-sm text-gray-600 mb-2"><strong>Registration ID:</strong> #{registrationId}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Email:</strong> {formData.email}</p>
        <p className="text-sm text-gray-600 mb-2"><strong>Status:</strong> <span className="text-yellow-600 font-medium">Pending Review</span></p>
        <p className="text-sm text-gray-600"><strong>Correction Attempts:</strong> 2</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
        <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. The registrar will review your documents (1-2 business days)</li>
          <li>2. You will receive an email notification once approved</li>
          <li>3. You can then log in to access your child's information</li>
        </ul>
      </div>

      <Link
        href="/auth/login"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition-colors"
      >
        Go to Login
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex justify-center p-4 py-12 md:py-16 overflow-y-auto">
      <div className="w-full max-w-lg my-auto">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step > s ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 4 && <div className={`w-12 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Guardian Registration</h2>
            <p className="text-gray-600 mt-1">
              {step === 1 && 'Create your guardian account'}
              {step === 2 && 'Verify your phone number'}
              {step === 3 && 'Upload required documents'}
              {step === 4 && 'Registration complete'}
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          )}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </div>
    </div>
  )
}
