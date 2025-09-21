import { useEffect, useState } from 'react'
import EmployeeForm from '../components/EmployeeForm'

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([])
    const [editingEmployee, setEditingEmployee] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // fetch employees on page load
    useEffect(() => {
        fetchEmployees()
    }, [])

    const fetchEmployees = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('http://127.0.0.1:8000/employees')
            if (!res.ok) throw new Error('Failed to load employees')
            const data = await res.json()
            setEmployees(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this employee?')) return
        try {
            const res = await fetch(`http://127.0.0.1:8000/employees/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) throw new Error('Failed to delete')
            // optimistic update
            setEmployees((prev) => prev.filter((e) => e.id !== id))
            // if deleting the one being edited, cancel edit
            if (editingEmployee?.id === id) setEditingEmployee(null)
        } catch (err) {
            alert(err.message || 'Delete failed')
        }
    }

    const handleAdd = (newEmployee) => {
        // append to list
        setEmployees((prev) => [...prev, newEmployee])
    }

    const handleUpdate = (updatedEmployee) => {
        setEmployees((prev) =>
            prev.map((e) => (e.id === updatedEmployee.id ? updatedEmployee : e))
        )
        setEditingEmployee(null)
    }

    const startEdit = (emp) => {
        setEditingEmployee(emp)
        // scroll to top so form is visible (optional)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const cancelEdit = () => {
        setEditingEmployee(null)
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
                👩‍💻 Employee Management
            </h1>

            {/* Form card */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    {editingEmployee ? 'Edit Employee' : 'Add Employee'}
                </h2>

                <EmployeeForm
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    editingEmployee={editingEmployee}
                    onCancelEdit={cancelEdit}
                />
            </div>

            {/* List */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-blue-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Age</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, idx) => (
                            <tr
                                key={emp.id}
                                className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                            >
                                <td className="px-6 py-3 text-sm">{emp.id}</td>
                                <td className="px-6 py-3 text-sm font-medium text-gray-700">{emp.name}</td>
                                <td className="px-6 py-3 text-sm text-gray-600">{emp.email}</td>
                                <td className="px-6 py-3 text-sm text-gray-600">{emp.age ?? '-'}</td> {/* NEW */}
                                <td className="px-6 py-3 text-sm flex gap-2">
                                    <button
                                        onClick={() => startEdit(emp)}
                                        className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-lg shadow hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(emp.id)}
                                        className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg shadow hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
