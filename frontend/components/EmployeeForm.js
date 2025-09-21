import { useEffect, useState } from 'react'

export default function EmployeeForm({
  onAdd,
  onUpdate,
  editingEmployee,
  onCancelEdit,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')   // NEW FIELD
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name || '')
      setEmail(editingEmployee.email || '')
      setAge(editingEmployee.age || '')   // load existing age if any
      setError(null)
    } else {
      setName('')
      setEmail('')
      setAge('')
      setError(null)
    }
  }, [editingEmployee])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const payload = { name, email, age: age ? Number(age) : null } // include age

      if (editingEmployee) {
        const res = await fetch(
          `http://127.0.0.1:8000/employees/${editingEmployee.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        )
        if (!res.ok) throw new Error('Failed to update employee')
        const updated = await res.json()
        onUpdate?.(updated)
      } else {
        const res = await fetch('http://127.0.0.1:8000/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Failed to create employee')
        const created = await res.json()
        onAdd?.(created)
        setName('')
        setEmail('')
        setAge('')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          placeholder="Full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          placeholder="email@example.com"
        />
      </div>

      {/* NEW: Age field */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Age</label>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          min="18"
          max="99"
          className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          placeholder="e.g. 25"
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {editingEmployee
            ? loading
              ? 'Updating...'
              : 'Update Employee'
            : loading
            ? 'Adding...'
            : 'Add Employee'}
        </button>

        {editingEmployee && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="py-2 px-4 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
