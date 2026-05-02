import Link from 'next/link'
import { Button } from '../components/ui/Button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Digital Parent-School Communication
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A secure platform for seamless communication between parents and schools
          </p>
          
          {/* Single Login Button */}
          <div className="max-w-md mx-auto mb-12">
            <Link href="/auth/login">
              <Button className="w-full py-4 text-lg">
                Login to Your Account
              </Button>
            </Link>
            
            <div className="mt-4 text-center">
              <span className="text-gray-600">New user?</span>
              <Link href="/auth/register" className="ml-1 font-bold text-brand-primary hover:underline">
                Register here
              </Link>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-xl shadow-brand-900/5 p-10 hover:shadow-2xl transition-all duration-500 border border-gray-50 group">
              <div className="text-brand-primary mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9 5-9 5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                For Parents
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Stay connected with your child's education journey
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="text-green-600 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                For Schools
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Manage communication efficiently and securely
              </p>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center bg-white/50 p-6 rounded-2xl border border-gray-100/50">
              <div className="bg-brand-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure Messaging
              </h3>
              <p className="text-gray-600">
                Direct communication with teachers
              </p>
            </div>
            
            <div className="text-center bg-white/60 backdrop-blur p-6 rounded-xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-time Updates
              </h3>
              <p className="text-gray-600">
                Instant notifications and alerts
              </p>
            </div>
            
            <div className="text-center bg-white/60 backdrop-blur p-6 rounded-xl">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Academic Progress
              </h3>
              <p className="text-gray-600">
                Track homework and report cards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
