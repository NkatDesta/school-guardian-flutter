'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import HomeworkList from '../../../components/homework/HomeworkList'

export default function HomeworkPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // For homeroom teachers, get their assigned class
      if (parsedUser.role === 'homeroom_teacher') {
        // Get class assignments for homeroom teacher
        fetch(`http://localhost:3000/api/teacher/classes`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.success && data.data?.classes?.length > 0) {
            // Use the first assigned class
            parsedUser.classId = data.data.classes[0].classId
            setUser(parsedUser)
          }
        })
        .catch(error => console.error('Error fetching classes:', error))
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    router.push('/auth/login')
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Please login to view homework</div>
      </div>
    )
  }

  // Only teachers, homeroom teachers, and guardians can access homework
  const allowedRoles = ['teacher', 'homeroom_teacher', 'guardian']
  if (!allowedRoles.includes(user?.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">
          Access denied: You don't have permission to view homework assignments.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Homework Management</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.fullName || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            Manage homework assignments, track student progress, and communicate with guardians.
          </p>
        </div>

        <HomeworkList 
          role={user?.role === 'teacher' ? 'teacher' : user?.role === 'homeroom_teacher' ? 'homeroom_teacher' : 'guardian'}
          userId={user?.userId}
          classId={user?.classId}
        />
      </div>
    </div>
  )
}
