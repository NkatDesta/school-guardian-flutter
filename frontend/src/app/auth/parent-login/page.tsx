'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectToLogin() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/auth/login?role=parent')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse text-[#00bfa5] font-bold">Redirecting...</div>
    </div>
  )
}
