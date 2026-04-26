'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '../../../../components/ui/Button'

interface Homework {
  homeworkId: number
  title: string
  description: string
  subject: string
  className: string
  dueDate: string
  createdAt: string
  teacherName: string
}

export default function HomeworkDetailPage() {
  const [homework, setHomework] = useState<Homework | null>(null)
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submittingFeedback, setSubmittingFeedback] = useState(false)
  
  const params = useParams()
  const router = useRouter()
  const homeworkId = params.id as string

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('Please login to view homework')
          return
        }

        // Mark homework as viewed
        await fetch(`/api/homework/${homeworkId}/view`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        // Get homework details
        const response = await fetch(`/api/homework/${homeworkId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setHomework(data.data.homework)
        } else {
          setError('Failed to fetch homework details')
        }
      } catch (err) {
        setError('Network error. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchHomework()
  }, [homeworkId])

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittingFeedback(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to submit feedback')
        return
      }

      const response = await fetch(`/api/homework/${homeworkId}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ feedback })
      })

      const data = await response.json()

      if (data.success) {
        setFeedback('')
        alert('Feedback submitted successfully!')
      } else {
        setError(data.message || 'Failed to submit feedback')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setSubmittingFeedback(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading homework...</div>
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

  if (!homework) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Homework not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{homework.title}</h1>
            <Button onClick={() => router.push('/dashboard/homework')}>
              Back to Homework
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Assignment Details</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Subject</h3>
                  <p className="text-gray-900">{homework.subject}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Class</h3>
                  <p className="text-gray-900">{homework.className}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Teacher</h3>
                  <p className="text-gray-900">{homework.teacherName}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Due Date</h3>
                  <p className="text-gray-900">
                    {new Date(homework.dueDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-900 whitespace-pre-wrap">{homework.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Parent Feedback</h2>
              
              <form onSubmit={handleFeedback} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback (Optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Share your thoughts about this assignment..."
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={submittingFeedback || !feedback.trim()}
                  className="w-full"
                >
                  {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
