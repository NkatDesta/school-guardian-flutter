'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Car, Plus, CheckCircle, XCircle, Clock, User, Phone, CreditCard, Calendar, AlertTriangle, Search, Filter, History } from 'lucide-react'

interface PickupRequest {
  requestId: number
  studentId: number
  studentName: string
  guardianId: number
  guardianName: string
  authorizedPersonName: string
  authorizedPersonRelationship: string
  authorizedPersonPhone: string
  authorizedPersonNationalId: string
  status: 'pending' | 'approved' | 'rejected'
  requestDate: string
  pickupDate: string
  createdAt: string
  processedBy?: number
  processedAt?: string
  notes?: string
}

interface Student {
  studentId: number
  fullName: string
  classId: number
  className?: string
}

export default function PickupPage() {
  const [user, setUser] = useState<any>(null)
  const [pickupRequests, setPickupRequests] = useState<PickupRequest[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const router = useRouter()

  const [newRequest, setNewRequest] = useState({
    studentId: '',
    authorizedPersonName: '',
    authorizedPersonRelationship: '',
    authorizedPersonPhone: '',
    authorizedPersonNationalId: '',
    pickupDate: '',
    notes: ''
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/login')
      return
    }
  }, [router])

  useEffect(() => {
    if (user) {
      fetchPickupRequests()
      if (user.role === 'guardian') {
        fetchStudents()
      }
    }
  }, [user])

  const fetchPickupRequests = async () => {
    try {
      const token = localStorage.getItem('token')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/api/pickup-requests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setPickupRequests(data.data?.pickupRequests || data.data || [])
      } else {
        // Fallback mock data
        setPickupRequests([
          {
            requestId: 1,
            studentId: 1,
            studentName: 'Abebe Kebede',
            guardianId: 1,
            guardianName: 'Kebede Abebe',
            authorizedPersonName: 'Tigist Kebede',
            authorizedPersonRelationship: 'Aunt',
            authorizedPersonPhone: '+251911234567',
            authorizedPersonNationalId: '123456789',
            status: 'pending',
            requestDate: '2026-03-30',
            pickupDate: '2026-03-30',
            createdAt: new Date().toISOString()
          },
          {
            requestId: 2,
            studentId: 2,
            studentName: 'Hanna Girma',
            guardianId: 2,
            guardianName: 'Girma Hailu',
            authorizedPersonName: 'Girma Hailu',
            authorizedPersonRelationship: 'Father',
            authorizedPersonPhone: '+251922345678',
            authorizedPersonNationalId: '987654321',
            status: 'approved',
            requestDate: '2026-03-28',
            pickupDate: '2026-03-28',
            createdAt: new Date().toISOString(),
            processedAt: new Date().toISOString()
          }
        ])
      }
    } catch (error) {
      setPickupRequests([])
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/api/students/my-children`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setStudents(data.data || [])
      } else {
        setStudents([
          { studentId: 1, fullName: 'Abebe Kebede', classId: 1, className: 'Grade 1A' },
          { studentId: 2, fullName: 'Hanna Girma', classId: 2, className: 'Grade 2B' }
        ])
      }
    } catch (error) {
      setStudents([])
    }
  }

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      
      const response = await fetch(`${apiUrl}/api/pickup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRequest)
      })

      if (response.ok) {
        setShowCreateModal(false)
        setNewRequest({
          studentId: '',
          authorizedPersonName: '',
          authorizedPersonRelationship: '',
          authorizedPersonPhone: '',
          authorizedPersonNationalId: '',
          pickupDate: '',
          notes: ''
        })
        fetchPickupRequests()
        alert('Pickup request submitted successfully!')
      } else {
        const error = await response.json()
        alert(error.error?.message || 'Failed to create pickup request')
      }
    } catch (error) {
      alert('Network error. Please make sure the backend is running.')
    }
  }

  const handleProcessRequest = async (requestId: number, status: 'approved' | 'rejected', notes?: string) => {
    try {
      const token = localStorage.getItem('token')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      
      const response = await fetch(`${apiUrl}/api/pickup/${requestId}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, notes })
      })

      if (response.ok) {
        fetchPickupRequests()
        alert(`Pickup request ${status} successfully!`)
      } else {
        const error = await response.json()
        alert(error.error?.message || 'Failed to process pickup request')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  const filteredRequests = pickupRequests.filter(request => {
    const matchesSearch = 
      request.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.authorizedPersonName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.authorizedPersonNationalId?.includes(searchQuery)
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const isGuardian = user?.role === 'guardian'
  const isTeacher = user?.role === 'teacher' || user?.role === 'homeroom_teacher'
  const isRegistrar = user?.role === 'registrar'
  const canProcessRequests = isTeacher || isRegistrar

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-black flex items-center">
              <Car className="h-8 w-8 text-blue-400 mr-3" />
              Student Pickup
            </h1>
            <p className="text-gray-900 mt-2">
              {isGuardian ? 'Request authorized pickup for your children' : 'Verify and process student pickups'}
            </p>
          </div>
          
          {isGuardian && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-red px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              New Pickup Request
            </button>
          )}
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-700" />
            <input
              type="text"
              placeholder="Search by student name, authorized person, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-red  placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-red focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Pickup Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pickup Requests</h3>
              <p className="text-gray-500">
                {isGuardian ? 'You have not created any pickup requests yet.' : 'No pickup requests to process.'}
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.requestId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Student Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {request.studentName || `Student #${request.studentId}`}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium">Authorized Person:</span>
                          <span className="ml-2">{request.authorizedPersonName}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium">Relationship:</span>
                          <span className="ml-2">{request.authorizedPersonRelationship}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium">Phone:</span>
                          <span className="ml-2">{request.authorizedPersonPhone}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="font-medium">National ID:</span>
                          <span className="ml-2">{request.authorizedPersonNationalId}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mt-3">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Pickup Date:</span>
                      <span className="ml-2">{new Date(request.pickupDate).toLocaleDateString()}</span>
                    </div>
                    
                    {request.notes && (
                      <p className="text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                        <span className="font-medium">Notes:</span> {request.notes}
                      </p>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2">
                    {canProcessRequests && request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            const notes = prompt('Add verification notes (optional):')
                            handleProcessRequest(request.requestId, 'approved', notes || undefined)
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            const notes = prompt('Add rejection reason (required):')
                            if (notes) handleProcessRequest(request.requestId, 'rejected', notes)
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>
                      </>
                    )}
                    
                    {request.status !== 'pending' && (
                      <div className="text-sm text-gray-500">
                        <History className="inline h-4 w-4 mr-1" />
                        Processed: {request.processedAt ? new Date(request.processedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Request Modal - Only for Guardians */}
      {showCreateModal && isGuardian && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-600" />
                New Pickup Request
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateRequest} className="p-6 space-y-4">
              {/* Student Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Student *</label>
                <select
                  value={newRequest.studentId}
                  onChange={(e) => setNewRequest({...newRequest, studentId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a student...</option>
                  {students.map(student => (
                    <option key={student.studentId} value={student.studentId}>
                      {student.fullName} {student.className ? `(${student.className})` : `(Class ${student.classId})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Authorized Person */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Authorized Person Name *</label>
                <input
                  type="text"
                  value={newRequest.authorizedPersonName}
                  onChange={(e) => setNewRequest({...newRequest, authorizedPersonName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Full name of person authorized to pick up"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                  <select
                    value={newRequest.authorizedPersonRelationship}
                    onChange={(e) => setNewRequest({...newRequest, authorizedPersonRelationship: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="Parent">Parent</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Aunt">Aunt</option>
                    <option value="Uncle">Uncle</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={newRequest.authorizedPersonPhone}
                    onChange={(e) => setNewRequest({...newRequest, authorizedPersonPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+251..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">National ID *</label>
                <input
                  type="text"
                  value={newRequest.authorizedPersonNationalId}
                  onChange={(e) => setNewRequest({...newRequest, authorizedPersonNationalId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="National ID number for verification"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date *</label>
                <input
                  type="date"
                  value={newRequest.pickupDate}
                  onChange={(e) => setNewRequest({...newRequest, pickupDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  value={newRequest.notes}
                  onChange={(e) => setNewRequest({...newRequest, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Any special instructions or notes..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">
                  The authorized person must present their physical ID matching the national ID number provided during pickup. Teacher will verify before releasing the student.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
