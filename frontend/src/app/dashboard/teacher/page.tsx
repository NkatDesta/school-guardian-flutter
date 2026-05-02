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
  Clock,
  Leaf,
  ChevronRight,
  CheckCircle
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
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Homework',
      subtitle: 'Assignments & grading',
      value: homework?.length ?? 12,
      icon: BookOpen,
      color: 'text-brand-primary',
      bgColor: 'bg-brand-bg'
    },
    {
      title: 'Events',
      subtitle: 'School calendar',
      value: 3,
      icon: Calendar,
      color: 'text-brand-secondary',
      bgColor: 'bg-brand-bg'
    },
    {
      title: 'Active Alerts',
      subtitle: 'Recent updates',
      value: 4,
      icon: Bell,
      color: 'text-brand-accent',
      bgColor: 'bg-brand-bg'
    },
    {
      title: 'Performance',
      subtitle: 'Class average',
      value: '88%',
      icon: Activity,
      color: 'text-brand-success',
      bgColor: 'bg-brand-bg'
    }
  ]

  return (
    <div className="min-h-screen bg-brand-bg relative overflow-hidden font-sans">
      <div className="relative mx-auto max-w-7xl p-6 lg:p-8 space-y-10">
        {/* Welcome Banner - Simplified */}
        <header className="bg-brand-white rounded-3xl p-8 shadow-xl shadow-brand-primary/5 border border-brand-100 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-brand-heading tracking-tight">
              Greetings, {user.fullName.split(' ')[0]}!
            </h1>
            <p className="text-brand-text mt-2 text-lg font-medium">
              You have {classes?.length || 2} active classrooms to manage today.
            </p>
            <div className="inline-block mt-4 px-4 py-1.5 bg-brand-primary text-white rounded-full text-xs font-black uppercase tracking-widest">
              {user.role === 'homeroom_teacher' ? 'Homeroom Teacher' : 'Subject Teacher'}
            </div>
          </div>
          <div className="flex gap-3 relative z-10">
            <Link 
              href="/dashboard/homework"
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <PlusCircle size={20} />
              CREATE ASSIGNMENT
            </Link>
          </div>
          <Leaf className="absolute -bottom-8 -right-8 text-brand-accent/10 rotate-12" size={160} />
        </header>

        {/* Stats Grid - Standard Corners */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-brand-white p-6 rounded-3xl shadow-sm border border-brand-100 hover:shadow-md transition-all group">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-brand-text font-bold text-xs uppercase tracking-widest">{stat.title}</p>
                  <h3 className="text-3xl font-black text-brand-heading mt-1">{stat.value}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1 uppercase">{stat.subtitle}</p>
                </div>
              </div>
            )
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-brand-white rounded-3xl shadow-xl shadow-brand-primary/5 border border-brand-100 p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-brand-heading flex items-center gap-3">
                <Clock className="text-brand-primary" />
                Instructional Stream
              </h3>
            </div>

            <div className="flex-1 space-y-6">
              {[
                { title: 'Homework assignment "Photosynthesis" created', time: '2 hours ago', icon: FileText, color: 'text-brand-primary' },
                { title: 'Parent-teacher meeting for KG-A scheduled', time: '1 day ago', icon: Users, color: 'text-brand-secondary' },
                { title: 'Attendance record for Grade 1 finalized', time: '3 hours ago', icon: CheckCircle, color: 'text-brand-success' }
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-brand-bg rounded-2xl border border-brand-100 group hover:bg-white transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-white rounded-xl shadow-sm ${activity.color}`}>
                      <activity.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-heading text-sm">{activity.title}</h4>
                      <p className="text-xs text-brand-text font-semibold uppercase">{activity.time}</p>
                    </div>
                  </div>
                  <button className="p-2 text-brand-text hover:text-brand-primary transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-4 border-2 border-brand-secondary text-brand-secondary font-black text-xs uppercase rounded-2xl hover:bg-brand-secondary hover:text-white transition-all">
              VIEW FULL TEACHING LOG
            </button>
          </div>

          {/* Classroom Overview */}
          <div className="bg-brand-white rounded-3xl shadow-xl shadow-brand-primary/5 border border-brand-100 p-8 flex flex-col">
            <h3 className="text-2xl font-black text-brand-heading mb-8 flex items-center gap-3">
              <Users className="text-brand-primary" />
              Classrooms
            </h3>
            <div className="space-y-4 flex-1">
              {classes?.slice(0, 4).map((cls: any, i: number) => (
                <div key={i} className="p-5 bg-brand-bg rounded-2xl border border-brand-100 group hover:border-brand-primary/20 transition-all cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-brand-heading">{cls.classLevel}</h4>
                      <p className="text-xs text-brand-text font-semibold uppercase">Academic Year {cls.academicYear}</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-brand-primary font-black text-xs">
                      {cls.totalStudents || 12}
                    </div>
                  </div>
                </div>
              )) || (
                <p className="text-brand-text text-center font-medium italic mt-10">No active classes found.</p>
              )}
            </div>
            <button className="mt-8 w-full py-4 bg-brand-primary text-white font-black text-xs uppercase rounded-2xl shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
               MANAGE ALL STUDENTS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}