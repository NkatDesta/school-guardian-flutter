'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../../../components/ui/Button'

interface ReportCard {
  id: number
  studentName: string
  grade: string
  term: string
  academicYear: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  submittedBy: string
}

export default function ReportCardsPage() {
  const [reportCards, setReportCards] = useState<ReportCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchReportCards = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const response = await fetch('/api/report-cards', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setReportCards(data.data.reportCards || [])
        } else {
          setError('Failed to fetch report cards')
        }
      } catch (err) {
        setError('Network error. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchReportCards()
  }, [router])

  const handleApprove = async (id: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/report-cards/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setReportCards(reportCards.map(card => 
          card.id === id ? { ...card, status: 'approved' } : card
        ))
      } else {
        setError('Failed to approve report card')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  const handleReject = async (id: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/report-cards/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setReportCards(reportCards.map(card => 
          card.id === id ? { ...card, status: 'rejected' } : card
        ))
      } else {
        setError('Failed to reject report card')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading report cards...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Report Cards</h1>
          <p className="mt-2 text-gray-600">Manage and review student report cards</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">All Report Cards</h2>
              <Link href="/dashboard/report-cards/pending">
                <Button variant="outline">
                  View Pending ({reportCards.filter(card => card.status === 'pending').length})
                </Button>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden">
            {reportCards.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-500">No report cards found</div>
                <p className="mt-2 text-sm text-gray-400">
                  Report cards will appear here once teachers submit them.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Term
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Academic Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportCards.map((card) => (
                      <tr key={card.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {card.studentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {card.grade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {card.term}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {card.academicYear}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            card.status === 'approved' 
                              ? 'bg-green-100 text-green-800'
                              : card.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {card.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {card.submittedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {card.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleApprove(card.id)}
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleReject(card.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                          {card.status === 'approved' && (
                            <span className="text-green-600">Approved</span>
                          )}
                          {card.status === 'rejected' && (
                            <span className="text-red-600">Rejected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
