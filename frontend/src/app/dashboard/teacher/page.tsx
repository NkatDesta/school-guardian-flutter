'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen,
  Users,
  Calendar,
  Bell,
  PlusCircle,
  FileText,
  Eye,
  Activity,
  Clock
} from 'lucide-react'
import {
  useTeacherClasses,
  useTeacherHomework
} from '../../../hooks/useTeacherData'

interface UserData {
  userId: number
  email: string
  role: string
  fullName: string
}

export default function TeacherDashboard() {
  const [user, setUser] = useState<UserData | null>(null)
  const router = useRouter()

  const { data: classes } = useTeacherClasses()
  const { data: homework } = useTeacherHomework()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/login')
    }
  }, [router])

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Homework',
      subtitle: 'Assignments & grading',
      value: homework?.length ?? 12,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Events',
      subtitle: 'School calendar',
      value: 3,
      icon: Calendar,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Notifications',
      subtitle: 'Recent updates',
      value: 4,
      icon: Bell,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    }
  ]

  const quickActions = [
    {
      label: 'Create Homework',
      icon: PlusCircle,
      href: '/dashboard/homework',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      label: 'View Events',
      icon: Calendar,
      href: '/dashboard/events',
      color: 'bg-amber-600 hover:bg-amber-700'
    }
  ]

  const recentActivities = [
    {
      title: 'New homework assignment created',
      time: '2 hours ago',
      icon: FileText,
      iconBg: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Parent-teacher meeting scheduled',
      time: '1 day ago',
      icon: Users,
      iconBg: 'bg-emerald-100 text-emerald-600'
    }
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.fullName}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your classes today
        </p>

        <div className="inline-block mt-4 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 capitalize">
          {user.role === 'homeroom_teacher' ? 'Homeroom Teacher' : 'Subject Teacher'}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition-all duration-200"
            >
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-xs text-gray-400">{stat.subtitle}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </h3>
              </div>

              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Quick Actions
          </h2>

          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  href={action.href}
                  className={`flex items-center justify-center gap-2 ${action.color} text-white py-3 rounded-xl font-medium transition-all active:scale-95`}
                >
                  <Icon className="w-5 h-5" />
                  {action.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Recent Activity
          </h2>

          <div className="space-y-6">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className={`${activity.iconBg} p-2.5 rounded-full`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 border-b border-gray-50 pb-4">
                    <p className="font-semibold text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <button className="w-full mt-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2" />
            View All Activity
          </button>
        </div>

      </div>
    </div>
  )
}