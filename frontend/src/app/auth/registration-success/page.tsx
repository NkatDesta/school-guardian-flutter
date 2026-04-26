'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegistrationSuccessPage() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    email: 'user@example.com',
    fullName: 'Registered User',
    userId: '1'
  })

  useEffect(() => {
    // Get user data from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get('email') || 'user@example.com'
    const fullName = urlParams.get('fullName') || 'Registered User'
    const userId = urlParams.get('userId') || '1'
    
    // Update state
    setUserData({ email, fullName, userId })
    
    // Create user object for localStorage
    const userObj = {
      userId: parseInt(userId),
      email,
      fullName,
      role: 'guardian'
    }
    
    // Store in localStorage
    localStorage.setItem('token', 'mock-token-' + Date.now())
    localStorage.setItem('user', JSON.stringify(userObj))
    
    console.log('Stored user data after registration:', userObj)

    // Redirect to dashboard after 10 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 10000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Registration Submitted!
            </h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                What happens next?
              </h3>
              <div className="text-left text-sm text-blue-800 space-y-2">
                <p>✅ Your registration has been submitted successfully</p>
                <p>⏳ The school registrar will review your application</p>
                <p>📧 You'll receive an email when your account is approved</p>
                <p>🔑 Once approved, you can login with your chosen password</p>
              </div>
            </div>
            
            <div className="text-gray-600 mb-6">
              <p className="text-sm">
                This page will automatically redirect to the dashboard in 10 seconds.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                User: {userData.email} | ID: {userData.userId}
              </p>
            </div>
            
            <div className="space-y-3">
              <Link href="/">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                  Return to Home
                </button>
              </Link>
              
              <Link href="/auth/login">
                <button className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200">
                  Go to Login
                </button>
              </Link>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              <p>Need help? Contact the school registrar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
