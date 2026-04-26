'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  UserCheck, 
  Users, 
  Clock, 
  FileText, 
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface UserData {
  userId: number
  email: string
  role: string
  fullName: string
}

interface Stats {
  pendingRegistrations: number
  approvedRegistrations: number
  rejectedRegistrations: number
  totalGuardians: number
  recentActivity: Array<{
    id: number
    action: string
    user: string
    timestamp: string
    status: 'pending' | 'approved' | 'rejected'
  }>
}

export default function RegistrarDashboard() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    pendingRegistrations: 0,
    approvedRegistrations: 0,
    rejectedRegistrations: 0,
    totalGuardians: 0,
    recentActivity: []
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    const parsed = JSON.parse(userData)
    setUser(parsed)

    // Check if user is registrar
    if (parsed.role !== 'registrar') {
      router.push('/dashboard')
      return
    }

    fetchRegistrarStats(token)
  }, [router])

  const fetchRegistrarStats = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      
      // Fetch registration statistics
      const response = await fetch(`${apiUrl}/api/registrar/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.data)
      } else {
        // Fallback mock data
        setStats({
          pendingRegistrations: 5,
          approvedRegistrations: 150,
          rejectedRegistrations: 3,
          totalGuardians: 153,
          recentActivity: [
            {
              id: 1,
              action: 'Guardian registration approved',
              user: 'Ms. Hana Ali',
              timestamp: '2026-03-29 10:30',
              status: 'approved'
            },
            {
              id: 2,
              action: 'Document verification pending',
              user: 'Mr. Daniel Tesfaye',
              timestamp: '2026-03-29 09:15',
              status: 'pending'
            },
            {
              id: 3,
              action: 'Registration rejected - invalid document',
              user: 'Ms. Sara Bekele',
              timestamp: '2026-03-28 16:45',
              status: 'rejected'
            }
          ]
        })
      }
    } catch (error) {
      console.error('Error fetching registrar stats:', error)
      // Use fallback data on error
      setStats({
        pendingRegistrations: 5,
        approvedRegistrations: 150,
        rejectedRegistrations: 3,
        totalGuardians: 153,
        recentActivity: []
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      icon: Clock,
      label: 'Pending Registrations',
      value: stats.pendingRegistrations,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      href: '/dashboard/registrations'
    },
    {
      icon: CheckCircle,
      label: 'Approved Guardians',
      value: stats.approvedRegistrations,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      href: '/dashboard/registrations'
    },
    {
      icon: XCircle,
      label: 'Rejected Registrations',
      value: stats.rejectedRegistrations,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      href: '/dashboard/registrations'
    },
    {
      icon: Users,
      label: 'Total Guardians',
      value: stats.totalGuardians,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      href: null  // No navigation - display only
    }
  ]

  const quickActions = [
    {
      icon: UserCheck,
      label: 'Review Pending Registrations',
      description: 'Approve or reject guardian applications',
      href: '/dashboard/registrations',
      color: 'bg-yellow-600'
    },
    {
      icon: FileText,
      label: 'Verify Documents',
      description: 'Check uploaded legal documents',
      href: '/dashboard/registrations',
      color: 'bg-blue-600'
    },
    {
      icon: Bell,
      label: 'Send Notification',
      description: 'Notify guardians about registration status',
      href: '/dashboard/notifications',
      color: 'bg-purple-600'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Registrar Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.fullName}. Review and approve guardian registrations.
            </p>
          </div>
          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
            Registrar
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-black" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{stat.label}</h3>
                </div>
              </div>
              <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => router.push(action.href)}
              className={`flex items-start p-4 ${action.color} text-black rounded-lg hover:opacity-90 transition-opacity`}
            >
              <action.icon className="h-5 w-5 mr-3 mt-0.5" />
              <div className="text-left">
                <h3 className="font-semibold">{action.label}</h3>
                <p className="text-sm text-white/80">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Registration Activity</h2>
        {stats.recentActivity.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(activity.status)}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Alert */}
      {stats.pendingRegistrations > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
          <div>
            <h3 className="font-medium text-yellow-800">Pending Registrations</h3>
            <p className="text-sm text-yellow-700">
              You have {stats.pendingRegistrations} guardian registration{stats.pendingRegistrations !== 1 ? 's' : ''} waiting for review.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
