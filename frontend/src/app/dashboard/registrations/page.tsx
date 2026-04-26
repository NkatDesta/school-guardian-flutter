'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserCheck, Check, X, User, Phone, Mail, FileText, AlertCircle, ExternalLink, Search, Filter, RefreshCw, FileImage, Shield, Clock, UserX, CheckCircle } from 'lucide-react'

interface RegistrationRequest {
  registrationId: number
  fullName: string
  email: string
  phoneNo: string
  nationalId: string
  studentName: string
  studentId?: number | null
  relationshipType: 'parent' | 'legal_guardian'
  certificateDocumentPath: string
  idFrontPath: string
  idBackPath: string
  status: 'pending' | 'approved' | 'rejected' | 'correction_required' | 'locked'
  rejectionReason?: string
  correctionAttempts: number
  reviewedBy?: number | null
  reviewedAt?: string | null
  createdAt: string
}

interface Student {
  student_id: number
  fullName: string
  classLevel?: string
}

interface RegistrationStats {
  totalPending: number
  totalApproved: number
  totalRejected: number
  totalCorrectionRequired: number
  totalLocked: number
  recentRegistrations: number
}

export default function RegistrationsPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<RegistrationRequest[]>([])
  const [stats, setStats] = useState<RegistrationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('pending')
  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [requestCorrection, setRequestCorrection] = useState(false)
  const [studentSearch, setStudentSearch] = useState('')
  const [searchResults, setSearchResults] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Clear error when student is selected
  useEffect(() => {
    if (selectedStudent) {
      setError('')
    }
  }, [selectedStudent])

  // Clear error on component mount and when authenticated
  useEffect(() => {
    setError('')
    fetchRegistrations()
    fetchStats()
  }, [statusFilter])

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/api/registration/registrar/pending?status=${statusFilter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setRequests(data.data.registrations || [])
      } else {
        setError(data.error?.message || 'Failed to fetch registration requests')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/api/registration/registrar/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch stats')
    }
  }

  const handleApprove = async (registrationId: number) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('You must be logged in to approve registrations')
        return
      }
      
      // Find the registration data to get the student info
      const registration = requests.find(r => r.registrationId === registrationId)
      if (!registration) {
        setError('Registration not found')
        return
      }

      // Check if a student has been selected from search
      if (!selectedStudent || !selectedStudent.student_id) {
        setError('Please search and select a student to link with this guardian')
        return
      }
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      console.log('Approving registration:', registrationId, 'Student:', selectedStudent.fullName, 'ID:', selectedStudent.student_id)
      
      const response = await fetch(`${apiUrl}/api/registration/registrar/${registrationId}/approve`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          studentId: selectedStudent.student_id
        })
      })

      const data = await response.json()
      console.log('Approve response:', data)
      
      if (data.success) {
        setSuccess('Registration approved successfully! Guardian account activated.')
        fetchRegistrations()
        fetchStats()
        setShowDetailModal(false)
        setSelectedStudent(null) // Clear selected student
      } else {
        setError(data.error?.message || 'Failed to approve registration')
      }
    } catch (error) {
      console.error('Error approving registration:', error)
      setError('Network error. Please try again.')
    }
  }

  const handleStudentSearch = async (query: string) => {
    setStudentSearch(query)
    setError('') // Clear any previous errors
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const token = localStorage.getItem('token')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const response = await fetch(`${apiUrl}/api/registration/registrar/students/search?query=${query}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setSearchResults(data.data)
      }
    } catch (err) {
      console.error('Search failed')
    } finally {
      setIsSearching(false)
    }
  }

  const handleReject = async (registrationId: number) => {
    if (!rejectionReason) {
      setError('Please provide a rejection reason')
      return
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('You must be logged in to reject registrations')
        return
      }
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      console.log('Rejecting registration:', registrationId, 'Reason:', rejectionReason)
      
      const response = await fetch(`${apiUrl}/api/registration/registrar/${registrationId}/reject`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          reason: rejectionReason,
          requestCorrection 
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error?.message || 'Failed to reject registration')
        return
      }

      const data = await response.json()
      console.log('Reject response:', data)
      
      if (data.success) {
        setSuccess(requestCorrection 
          ? 'Correction requested. Guardian will be notified.' 
          : 'Registration rejected successfully.')
        fetchRegistrations()
        fetchStats()
        setShowDetailModal(false)
        setShowRejectModal(false)
        setRejectionReason('')
        setRequestCorrection(false)
      } else {
        setError(data.error?.message || 'Failed to reject registration')
      }
    } catch (error) {
      console.error('Reject error:', error)
      setError('Failed to reject registration: ' + error.message)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      correction_required: 'bg-orange-100 text-orange-800',
      locked: 'bg-gray-100 text-gray-800'
    }
    const labels = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      correction_required: 'Correction Required',
      locked: 'Locked'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const filteredRequests = requests.filter(req => 
    (req.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (req.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (req.nationalId?.includes(searchQuery) || false)
  )

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <UserCheck className="h-8 w-8 text-blue-400 mr-3" />
            Guardian Registration Review
          </h1>
          <p className="text-gray-300 mt-2">Review and verify guardian registration requests</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">{stats.totalPending}</div>
              <div className="text-sm text-gray-400">Pending</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">{stats.totalApproved}</div>
              <div className="text-sm text-gray-400">Approved</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">{stats.totalRejected}</div>
              <div className="text-sm text-gray-400">Rejected</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400">{stats.totalCorrectionRequired}</div>
              <div className="text-sm text-gray-400">Correction</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-400">{stats.totalLocked}</div>
              <div className="text-sm text-gray-400">Locked</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">{stats.recentRegistrations}</div>
              <div className="text-sm text-gray-400">Last 7 Days</div>
            </div>
          </div>
        )}

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-200">{error}</span>
            <button onClick={() => {
              setError('')
              // Force clear error
              setTimeout(() => setError(''), 100)
            }} className="ml-auto text-red-400 hover:text-red-300 font-bold">CLEAR ERROR</button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-900 bg-opacity-50 border border-green-600 rounded-lg p-4 flex items-center gap-3">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-green-200">{success}</span>
            <button onClick={() => setSuccess('')} className="ml-auto text-green-400 hover:text-green-300">×</button>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or national ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="correction_required">Correction Required</option>
            <option value="locked">Locked</option>
            <option value="all">All Status</option>
          </select>
          <button
            onClick={() => { fetchRegistrations(); fetchStats(); }}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Request List */}
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Registration</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Guardian</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Child Info</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredRequests.map((req) => (
                <tr key={req.registrationId} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">#{req.registrationId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center text-blue-200 font-bold mr-3">
                        {req.fullName?.charAt(0) || '?'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{req.fullName || 'N/A'}</div>
                        <div className="text-xs text-black">{req.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black">{req.studentName || 'N/A'}</div>
                    <div className="text-xs text-blue-400 capitalize">{req.relationshipType?.replace('_', ' ') || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(req.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-black">
                    {new Date(req.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedRequest(req)
                        setStudentSearch('')
                        setSearchResults([])
                        setSelectedStudent(null)
                        setError('') // Clear error when opening modal
                        setShowDetailModal(true)
                      }}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Review Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length === 0 && (
            <div className="py-12 text-center">
              <UserX className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-black font-medium">No registrations found</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedRequest && (
          <div className="fixed inset-0 z-[60] overflow-y-auto flex items-start justify-center pt-10 p-4 bg-black bg-opacity-75">
            <div className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700 flex flex-col relative">
              {/* Modal Header */}
              <div className="px-6 py-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Review Registration Request #{selectedRequest.registrationId}
                </h3>
                <button onClick={() => setShowDetailModal(false)} className="text-black hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Guardian Info */}
                  <div className="space-y-6">
                    <section>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
                        <User className="h-4 w-4" /> Guardian Information
                      </h4>
                      <div className="bg-gray-850 rounded-xl p-4 border border-gray-800 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Full Name:</span>
                          <span className="text-black font-bold text-lg">{selectedRequest.fullName || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Email:</span>
                          <span className="text-black font-bold">{selectedRequest.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Phone:</span>
                          <span className="text-black font-bold">{selectedRequest.phoneNo || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">National ID:</span>
                          <span className="text-black font-bold">{selectedRequest.nationalId || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Relationship:</span>
                          <span className="text-black font-bold capitalize">{selectedRequest.relationshipType?.replace('_', ' ') || 'N/A'}</span>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4" /> Link to Student
                      </h4>
                      <div className="bg-blue-900 bg-opacity-20 rounded-xl p-4 border border-blue-800/30">
                        <p className="text-black mb-2 font-bold italic text-lg">Student/Child entered: "{selectedRequest.studentName || 'N/A'}"</p>
                        
                        {selectedRequest.status === 'pending' ? (
                          <div className="space-y-3">
                            <label className="block text-xs text-blue-300 font-bold uppercase">Search Database to Link</label>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                              <input
                                type="text"
                                placeholder="Start typing child's name..."
                                value={studentSearch}
                                onChange={(e) => handleStudentSearch(e.target.value)}
                                className="w-full bg-blue-950/40 border border-blue-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-blue-700 text-sm focus:ring-1 focus:ring-blue-500"
                              />
                            </div>

                            {/* Search Results */}
                            {searchResults.length > 0 && !selectedStudent && (
                              <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden mt-1 shadow-xl">
                                {searchResults.map(s => (
                                  <button
                                    key={s.student_id}
                                    onClick={() => {
                              setSelectedStudent(s)
                              setError('') // Clear error when student is selected
                            }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-900 hover:text-white transition-colors flex justify-between"
                                  >
                                    <span>{s.fullName}</span>
                                    <span className="text-gray-500 italic">#{s.student_id}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {selectedStudent && (
                              <div className="flex items-center justify-between bg-green-900/30 border border-green-800 p-2 rounded-lg mt-2 animate-in fade-in slide-in-from-top-1">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span className="text-sm text-black">Selected: <strong>{selectedStudent.fullName}</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button onClick={() => {
                              setError('')
                              // Force clear error by setting to empty string twice
                              setTimeout(() => setError(''), 100)
                            }} className="text-xs text-gray-400 hover:text-red-400">Clear Error</button>
                                  <button onClick={() => setSelectedStudent(null)} className="text-xs text-gray-400 hover:text-red-400">Change</button>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-green-400">
                             <Check className="h-4 w-4" />
                             <span className="text-sm">Linked to Student ID #{selectedRequest.studentId || 'N/A'}</span>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
                      <FileImage className="h-4 w-4" /> Verification Documents
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {['certificate', 'idFront', 'idBack'].map((docType) => {
                        // Map frontend field names to API field names
                        const fieldMap = {
                          certificate: 'certificateDocumentPath',
                          idFront: 'idFrontPath', 
                          idBack: 'idBackPath'
                        }
                        const fieldName = fieldMap[docType as keyof typeof fieldMap]
                        const path = selectedRequest[fieldName as keyof RegistrationRequest] as string
                        
                        // Skip if path is not available - return fragment with key to avoid React warning
                        if (!path) return <React.Fragment key={docType}></React.Fragment>
                        
                        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
                        const fullPath = `${apiUrl}/${path.replace(/\\/g, '/')}`
                        const label = docType === 'certificate' ? 'Birth/Registration Certificate' : 
                                     docType === 'idFront' ? 'National ID Front' : 'National ID Back'
                        
                        return (
                          <div key={docType} className="bg-gray-850 rounded-xl p-3 border border-gray-800">
                            <p className="text-xs text-gray-500 mb-2 font-medium">{label}</p>
                            <div className="relative group overflow-hidden rounded-lg bg-gray-900 h-40">
                              <img src={fullPath} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                <button
                                  onClick={() => window.open(fullPath, '_blank')}
                                  className="opacity-0 group-hover:opacity-100 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform scale-95 group-hover:scale-100"
                                >
                                  <ExternalLink className="h-4 w-4 inline mr-2" />
                                  View Full Size
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Action Buttons at bottom of content */}
                {selectedRequest.status === 'pending' || selectedRequest.status === 'correction_required' ? (
                  <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end gap-3">
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="px-6 py-3 border border-red-600 text-red-500 hover:bg-red-950 rounded-lg font-bold transition-colors flex items-center gap-2"
                    >
                      <X className="h-5 w-5" /> Reject / Correct
                    </button>
                    <button
                      onClick={() => handleApprove(selectedRequest.registrationId)}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="h-5 w-5" /> Approve & Activate
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
                    >
                      Close Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reject/Correction Modal */}
        {showRejectModal && selectedRequest && (
          <div className="fixed inset-0 z-[70] flex items-start justify-center pt-20 p-4 bg-black bg-opacity-75">
            <div className="bg-gray-900 rounded-2xl w-full max-w-md p-6 border border-gray-700 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Rejection Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Reason for Rejection *</label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 h-32 focus:ring-2 focus:ring-blue-500"
                    placeholder="Explain why the registration was rejected or what need to be corrected..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
                  <input
                    type="checkbox"
                    id="requestCorrection"
                    checked={requestCorrection}
                    onChange={(e) => setRequestCorrection(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="requestCorrection" className="text-sm text-gray-300">
                    <strong>Allow Correction:</strong> If checked, the guardian will be asked to update their details/documents instead of being fully rejected.
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowRejectModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReject(selectedRequest.registrationId)}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Confirm Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
