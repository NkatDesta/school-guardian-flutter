'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Bell, 
  Calendar, 
  BookOpen, 
  Car, 
  FileText, 
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Home,
  LogOut,
  Menu
} from 'lucide-react'

interface UserType {
  userId: number
  email: string
  role: string
  fullName: string
}

interface Student {
  studentId: number
  fullName: string
  grade: string
  className: string
}

interface Notification {
  id: number
  message: string
  type: string
  createdAt: string
  isRead: boolean
}

interface Homework {
  homeworkId: number
  title: string
  subject: string
  className: string
  dueDate: string
  isActive: boolean
  teacherName: string
}

interface PickupRequest {
  id: number
  studentName: string
  authorizedPerson: string
  relationship: string
  pickupTime: string
  status: string
}

export default function GuardianDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState<Student[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [homework, setHomework] = useState<Homework[]>([])
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([])
  const [stats, setStats] = useState({
    totalNotifications: 0,
    unreadNotifications: 0,
    pendingHomework: 0,
    pendingPickups: 0
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }

    const parsed = JSON.parse(userData)
    setUser(parsed)

    if (parsed.role === 'director') {
      router.push('/dashboard/director')
      return
    } else if (parsed.role === 'registrar') {
      router.push('/dashboard/registrar')
      return
    } else if (parsed.role === 'homeroom_teacher' || parsed.role === 'teacher') {
      router.push('/dashboard/teacher')
      return
    }

    // Load guardian data
    loadGuardianData(parsed.userId)
  }, [router])

  const loadGuardianData = async (guardianId: number) => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }

      // Load students
      const studentsResponse = await fetch('/api/students/my-children', { headers })
      if (studentsResponse.ok) {
        const studentsData = await studentsResponse.json()
        console.log('Students data:', studentsData)
        setStudents(studentsData.data?.students || [])
      } else {
        console.error('Students API error:', studentsResponse.status)
      }

      // Load notifications
      const notificationsResponse = await fetch('/api/notifications', { headers })
      if (notificationsResponse.ok) {
        const notificationsData = await notificationsResponse.json()
        console.log('Notifications data:', notificationsData)
        setNotifications(notificationsData.data?.notifications || [])
      } else {
        console.error('Notifications API error:', notificationsResponse.status)
      }

      // Load homework
      const homeworkResponse = await fetch('/api/homework', { headers })
      if (homeworkResponse.ok) {
        const homeworkData = await homeworkResponse.json()
        console.log('Homework data:', homeworkData)
        setHomework(homeworkData.data?.homework || [])
      } else {
        console.error('Homework API error:', homeworkResponse.status)
      }

      // Load pickup requests
      const pickupResponse = await fetch('/api/pickup', { headers })
      if (pickupResponse.ok) {
        const pickupData = await pickupResponse.json()
        console.log('Pickup data:', pickupData)
        setPickupRequests(pickupData.data?.pickupRequests || [])
      } else {
        console.error('Pickup API error:', pickupResponse.status)
      }

    } catch (error) {
      console.error('Error loading guardian data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (notifications.length > 0 || homework.length > 0 || pickupRequests.length > 0) {
      setStats({
        totalNotifications: notifications.length,
        unreadNotifications: notifications.filter(n => !n.isRead).length,
        pendingHomework: homework.filter(h => h.isActive).length,
        pendingPickups: pickupRequests.filter(p => p.status === 'pending').length
      })
    }
  }, [notifications, homework, pickupRequests])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium tracking-tight">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-brand-50 p-2 rounded-lg mr-3">
                <Home className="h-6 w-6 text-brand-primary" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Guardian Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{user?.fullName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.fullName}!
          </h2>
          <p className="text-gray-600">
            Here's an overview of your children's school activities and updates.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm shadow-brand-900/5 p-6 border border-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-brand-50 p-3 rounded-xl">
                <Bell className="h-6 w-6 text-brand-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Notifications</p>
                <p className="text-2xl font-black text-gray-900">{stats.totalNotifications}</p>
                <p className="text-xs text-brand-600 font-medium">{stats.unreadNotifications} unread</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Homework</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingHomework}</p>
                <p className="text-xs text-gray-500">Active assignments</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Car className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pickup Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingPickups}</p>
                <p className="text-xs text-gray-500">Pending requests</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Your Children</p>
                <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
                <p className="text-xs text-gray-500">Active students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Children Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Your Children</h3>
          </div>
          <div className="p-6">
            {students.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student) => (
                  <div key={student.studentId} className="border rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-brand-primary" />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{student.fullName}</p>
                        <p className="text-sm text-gray-500">{student.grade} - {student.className}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No children assigned to your account yet.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/dashboard/notifications" className="bg-white rounded-2xl shadow-sm shadow-brand-900/5 p-6 hover:shadow-md transition-all border border-gray-50 group">
            <div className="flex items-center mb-4">
              <div className="bg-brand-50 p-2 rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Bell className="h-6 w-6 text-brand-primary group-hover:text-white" />
              </div>
              <h3 className="ml-3 text-lg font-bold text-gray-900">Notifications</h3>
            </div>
            <p className="text-gray-500 text-sm">View school updates and alerts</p>
          </Link>

          <Link href="/dashboard/homework" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-green-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Homework</h3>
            </div>
            <p className="text-gray-600">Track assignments and deadlines</p>
          </Link>

          <Link href="/dashboard/pickup" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 text-purple-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Pickup</h3>
            </div>
            <p className="text-gray-600">Manage pickup requests</p>
          </Link>

          <Link href="/dashboard/report-cards" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-orange-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Report Cards</h3>
            </div>
            <p className="text-gray-600">View academic progress</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
