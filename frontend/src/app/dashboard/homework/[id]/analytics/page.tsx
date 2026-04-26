'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '../../../../../components/ui/Button'

interface HomeworkAnalytics {
  totalViews: number
  feedbackCount: number
  viewDetails: Array<{
    guardianName: string
    viewedAt: string
  }>
  feedbackDetails: Array<{
    guardianName: string
    feedback: string
    feedbackDate: string
  }>
}

export default function HomeworkAnalyticsPage() {
  const [analytics, setAnalytics] = useState<HomeworkAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const params = useParams()
  const router = useRouter()
  const homeworkId = params.id as string

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('Please login to view analytics')
          return
        }

        const response = await fetch(`/api/homework/${homeworkId}/analytics`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setAnalytics(data.data.analytics)
        } else {
          setError('Failed to fetch analytics')
        }
      } catch (err) {
        setError('Network error. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [homeworkId])

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to export data')
        return
      }

      const response = await fetch(`/api/homework/export?homeworkId=${homeworkId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        // Create download link
        const blob = new Blob([JSON.stringify(data.data.homework, null, 2)], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `homework-${homeworkId}-analytics.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else {
        setError('Failed to export data')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading analytics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Analytics not available</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Homework Analytics</h1>
            <div className="flex space-x-4">
              <Button onClick={handleExport}>
                Export Data
              </Button>
              <Button onClick={() => router.push('/dashboard/homework')}>
                Back to Homework
              </Button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            Track student engagement and feedback for this homework assignment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{analytics.totalViews}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{analytics.feedbackCount}</div>
                <div className="text-sm text-gray-600">Feedback Count</div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">View Details</h2>
            
            {analytics.viewDetails.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">No views recorded yet</div>
                <p className="text-sm text-gray-400 mt-2">
                  Views will appear here when guardians access this homework.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guardian Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Viewed At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {analytics.viewDetails.map((view, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {view.guardianName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(view.viewedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Feedback Details</h2>
          
          {analytics.feedbackDetails.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">No feedback submitted yet</div>
              <p className="text-sm text-gray-400 mt-2">
                Feedback will appear here when guardians provide comments.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {analytics.feedbackDetails.map((feedback, index) => (
                <div key={index} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{feedback.guardianName}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(feedback.feedbackDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-900 bg-gray-50 p-3 rounded">{feedback.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
