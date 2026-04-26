'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../../../components/ui/Button'
import { Input } from '../../../../components/ui/Input'

export default function CreateHomeworkPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [classId, setClassId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to create homework')
        return
      }

      const response = await fetch('/api/homework', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          subjectId: parseInt(subjectId),
          classId: parseInt(classId),
          dueDate
        })
      })

      const data = await response.json()

      if (data.success) {
        router.push('/dashboard/homework')
      } else {
        // Extract specific validation error if available
        if (data.error?.details && data.error.details.length > 0) {
          const firstError = data.error.details[0];
          setError(`${firstError.field}: ${firstError.message}`);
        } else {
          setError(data.error?.message || data.message || 'Failed to create homework');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Homework Assignment</h1>
          <p className="mt-2 text-gray-600">
            Create new homework assignments for your students. Fill in the details below and submit to add them to the system.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Homework Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter homework title"
                required
              />
            </div>

            <div>
              <Input
                label="Description"
                type="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter homework description and requirements"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Subject ID"
                  type="number"
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  placeholder="Enter subject ID"
                  required
                />
              </div>

              <div>
                <Input
                  label="Class ID"
                  type="number"
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  placeholder="Enter class ID"
                  required
                />
              </div>
            </div>

            <div>
              <Input
                label="Due Date"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Creating...' : 'Create Homework'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
