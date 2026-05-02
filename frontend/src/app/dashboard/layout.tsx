'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  Calendar,
  BookOpen,
  Users,
  User,
  Menu,
  X,
  LogOut,
  FileText,
  Settings,
  ClipboardList,
  Car
} from 'lucide-react'

interface UserData {
  userId: number
  email: string
  role: string
  fullName: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadNotifCount, setUnreadNotifCount] = useState(0)
  const [unreadEventCount, setUnreadEventCount] = useState(0)
  const [liveAlert, setLiveAlert] = useState<{title: string, message: string} | null>(null)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    setUser(JSON.parse(userData))
  }, [])

  useEffect(() => {
    if (!user) return

    const checkUnread = async () => {
      try {
        const token = localStorage.getItem('token')
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        const res = await fetch(`${apiUrl}/api/notifications?limit=50`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.success && data.data?.notifications) {
          const notifs = data.data.notifications
          if (notifs.length > 0) {
            const maxId = Math.max(...notifs.map((n: any) => n.notificationId || n.id || 0))
            const prevKnownStr = localStorage.getItem(`knownNotifId_${user.userId}`)
            const prevKnown = prevKnownStr ? parseInt(prevKnownStr) : maxId
            
            if (maxId > prevKnown && prevKnownStr) {
               const latestNotif = notifs.find((n: any) => (n.notificationId || n.id) === maxId)
               setLiveAlert({
                  title: 'New Notification',
                  message: latestNotif?.title || 'You have a new announcement!'
               })
            }
            localStorage.setItem(`knownNotifId_${user.userId}`, maxId.toString())
            
            const isViewingNotifications = pathname === '/dashboard/notifications' || pathname === '/dashboard/notifications/'
            
            if (isViewingNotifications) {
              localStorage.setItem(`lastReadNotifId_${user.userId}`, maxId.toString())
              setUnreadNotifCount(0)
            } else {
              const lastIdStr = localStorage.getItem(`lastReadNotifId_${user.userId}`)
              const lastId = lastIdStr ? parseInt(lastIdStr) : 0
              // Calculate unread items strictly greater than the last viewed ID
              const count = notifs.filter((n: any) => (n.notificationId || n.id || 0) > lastId).length
              setUnreadNotifCount(count)
            }
          }
        }

        // Check Events
        const resEvents = await fetch(`${apiUrl}/api/events?limit=50`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const dataEvents = await resEvents.json()
        const eventsList = dataEvents.data?.events || dataEvents.data || dataEvents
        if (Array.isArray(eventsList) && eventsList.length > 0) {
            const maxId = Math.max(...eventsList.map((e: any) => e.eventId || e.id || 0))
            const prevKnownStr = localStorage.getItem(`knownEventId_${user.userId}`)
            const prevKnown = prevKnownStr ? parseInt(prevKnownStr) : maxId

            if (maxId > prevKnown && prevKnownStr) {
               const latestEvent = eventsList.find((e: any) => (e.eventId || e.id) === maxId)
               setLiveAlert({
                  title: 'New Event Scheduled',
                  message: latestEvent?.title || 'A new event was just added to the calendar!'
               })
            }
            localStorage.setItem(`knownEventId_${user.userId}`, maxId.toString())

            const isViewingEvents = pathname === '/dashboard/events' || pathname === '/dashboard/events/'
            if (isViewingEvents) {
              localStorage.setItem(`lastReadEventId_${user.userId}`, maxId.toString())
              setUnreadEventCount(0)
            } else {
              const lastIdStr = localStorage.getItem(`lastReadEventId_${user.userId}`)
              const lastId = lastIdStr ? parseInt(lastIdStr) : 0
              const count = eventsList.filter((e: any) => (e.eventId || e.id || 0) > lastId).length
              setUnreadEventCount(count)
            }
        }
      } catch (err) {
        console.error('Failed to check unread tab', err)
      }
    }

    checkUnread()
    
    // Re-check periodically and on focus
    const interval = setInterval(checkUnread, 60000)
    window.addEventListener('focus', checkUnread)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', checkUnread)
    }
  }, [user, pathname])

  const handleLogout = () => {
    localStorage.clear()
    router.push('/auth/login')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/director', roles: ['director'] },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/registrar', roles: ['registrar'] },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard/teacher', roles: ['teacher', 'homeroom_teacher'] },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', roles: ['director', 'registrar', 'teacher', 'homeroom_teacher', 'guardian'] },
    { icon: Calendar, label: 'Events', href: '/dashboard/events', roles: ['director', 'teacher', 'homeroom_teacher', 'guardian'] },
    { icon: BookOpen, label: 'Homework', href: '/dashboard/homework', roles: ['teacher', 'homeroom_teacher', 'guardian'] },
    { icon: Users, label: 'Students', href: '/dashboard/students', roles: ['homeroom_teacher'] },
    { icon: Car, label: 'Pickup', href: '/dashboard/pickup', roles: ['guardian', 'teacher', 'homeroom_teacher', 'registrar'] },
    { icon: Settings, label: 'User Management', href: '/dashboard/users', roles: ['director'] },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', roles: ['homeroom_teacher'] },
    { icon: FileText, label: 'Report Cards', href: '/dashboard/report-cards', roles: ['director', 'homeroom_teacher', 'guardian'] },
    { icon: ClipboardList, label: 'Audit Logs', href: '/dashboard/audit-logs', roles: ['director'] },
    { icon: User, label: 'Registrations', href: '/dashboard/registrations', roles: ['registrar'] },
  ]

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-brand-bg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    )
  }

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user.role)
  )

  return (
    <div className="flex h-screen">
      
      {/* Left Section - Fixed Width with Gray Background */}
      <div className="relative flex-shrink-0 w-16">
        {/* Top Bar - Always Visible */}
        <div className="bg-gray-900 border-b border-gray-700 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Collapsible Sidebar - Overlay Position */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 z-50 w-64 h-full bg-gray-800 border-r border-gray-700">
          {/* User Info - Top */}
          <div className="border-b border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.fullName}</p>
                <p className="text-xs text-gray-400 capitalize truncate">{user?.role?.replace('_', ' ')}</p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="px-4 py-4">
            <div className="space-y-1">
              {filteredMenuItems.filter(item => !(item.label === 'Events' && user.role === 'registrar') && !(item.label === 'Students' && user.role === 'registrar') && !(item.label === 'User Management' && user.role === 'registrar')).map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer w-full text-left
                    ${isActive
                        ? 'bg-brand-primary text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.label === 'Notifications' && unreadNotifCount > 0 && (
                      <span className="text-xs font-black px-2 py-0.5 rounded-full shadow-md ml-auto" style={{ backgroundColor: '#dc2626', color: '#ffffff' }}>
                        {unreadNotifCount}
                      </span>
                    )}
                    {item.label === 'Events' && unreadEventCount > 0 && (
                      <span className="text-xs font-black px-2 py-0.5 rounded-full shadow-md ml-auto" style={{ backgroundColor: '#dc2626', color: '#ffffff' }}>
                        {unreadEventCount}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Logout Button - Bottom */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-900 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Gap Between Sections */}
      <div className="w-4 bg-gray-600" />

      {/* Right Section - Blue-Black Background (Fixed Width) */}
      <div className="flex-1 flex flex-col bg-brand-bg">
        {/* Top Bar - Always Visible */}
        <header className="bg-brand-header px-6 py-4 border-b border-brand-800 shadow-sm">
          <div className="flex-1" />
        </header>

        {/* Content */}
        <main className="flex-1 p-6 relative">
          {liveAlert && (
            <div className="absolute top-4 right-4 z-50 bg-white border-l-4 border-brand-primary rounded-lg shadow-xl p-4 flex items-start gap-4 animate-bounce">
              <div className="bg-brand-100 p-2 rounded-full mt-1">
                <Bell className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{liveAlert.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{liveAlert.message}</p>
              </div>
              <button onClick={() => setLiveAlert(null)} className="text-gray-400 hover:text-gray-600 ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
