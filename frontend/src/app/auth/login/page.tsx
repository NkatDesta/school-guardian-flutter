'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  ChevronRight,
  Menu
} from 'lucide-react'
import { Button } from '../../../components/ui/Button'

type Role = 'Parent' | 'Teacher' | 'Registrar' | 'Director'

function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activeRole, setActiveRole] = useState<Role>('Parent')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const roles: Role[] = ['Parent', 'Teacher', 'Registrar', 'Director']

  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam) {
      const formattedRole = roleParam.charAt(0).toUpperCase() + roleParam.slice(1).toLowerCase()
      if (roles.includes(formattedRole as Role)) {
        setActiveRole(formattedRole as Role)
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const roleValue = activeRole.toLowerCase()
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role: roleValue }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        router.push('/dashboard')
      } else {
        setError(data.error?.message || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError('A network error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header Bar */}
      <header className="w-full" style={{ backgroundColor: 'var(--brand-header)' }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Digital Parent School
            </span>
          </div>
          <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center p-4 py-12 md:p-8 overflow-y-auto">
        <div className="w-full max-w-[480px] my-auto animate-fadeIn">
          {/* Main Card */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12">
            
            {/* Role Tabs Switcher */}
            <div className="bg-[#f0f4f8] p-1.5 rounded-full flex mb-10 overflow-x-auto no-scrollbar">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setActiveRole(role)
                    setEmail('')
                    setPassword('')
                    setError('')
                  }}
                  className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeRole === role 
                    ? 'bg-white text-[#00bfa5] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#1a2b3c] mb-2 tracking-tight">
                Sign In
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#00bfa5] transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@school.com"
                    className="w-full bg-[#f0f7ff] border-none rounded-2xl py-4 pl-12 pr-4 text-gray-700 focus:ring-2 focus:ring-[#00bfa5]/20 focus:bg-white transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#00bfa5] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#f0f7ff] border-none rounded-2xl py-4 pl-12 pr-12 text-gray-700 focus:ring-2 focus:ring-[#00bfa5]/20 focus:bg-white transition-all outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-[#00bfa5] peer-checked:border-[#00bfa5] transition-all" />
                    <svg className="absolute w-3.5 h-3.5 text-white left-[3px] top-[3px] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm font-semibold text-[#00bfa5] hover:text-[#009688] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00bfa5] to-[#20b2aa] hover:from-[#009688] hover:to-[#00bfa5] text-white font-bold text-lg shadow-lg shadow-[#00bfa5]/25 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Register Footer */}
              <div className="pt-4 text-center">
                <p className="text-gray-500 font-medium">
                  Don't have an account?{' '}
                  <Link 
                    href="/auth/register" 
                    className="text-[#00bfa5] font-bold hover:underline underline-offset-4"
                  >
                    Register free
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-[#00bfa5] font-bold text-xl leading-none px-4">
          Loading Digital Parent School...
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
