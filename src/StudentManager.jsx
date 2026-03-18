import { useState } from 'react'

const initialStudents = [
  { id: 1, name: 'Anish', course: 'Computer Science' },
  { id: 2, name: 'karthik', course: 'AI-Edge Computing' },
  { id: 3, name: 'Ram Charan', course: 'DAA' },
  { id: 4, name: 'Aravind', course: 'Cloud' },
]

function StudentManager() {
  const [students, setStudents] = useState(initialStudents)
  const [newStudent, setNewStudent] = useState({ id: '', name: '', course: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewStudent((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleAdd = () => {
    const { id, name, course } = newStudent

    if (!id.trim() || !name.trim() || !course.trim()) {
      setError('All fields (ID, Name, Course) are required.')
      return
    }

    if (students.some((s) => String(s.id) === id.trim())) {
      setError('A student with this ID already exists.')
      return
    }

    setStudents((prev) => [
      ...prev,
      { id: Number(id), name: name.trim(), course: course.trim() },
    ])
    setNewStudent({ id: '', name: '', course: '' })
    setError('')
  }

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-icon">🎓</div>
        <h1>Student Manager</h1>
        <p className="header-subtitle">Online Academic Portal — React useState Demo</p>
      </header>

      {/* Add Student Form */}
      <section className="card form-card">
        <h2 className="section-title">Add New Student</h2>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="id">Student ID</label>
            <input
              id="id"
              type="number"
              name="id"
              placeholder="e.g. 101"
              value={newStudent.id}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={newStudent.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="course">Course</label>
            <input
              id="course"
              type="text"
              name="course"
              placeholder="e.g. Computer Science"
              value={newStudent.course}
              onChange={handleChange}
            />
          </div>
        </div>
        {error && <p className="error-msg">⚠️ {error}</p>}
        <button className="btn btn-add" onClick={handleAdd}>
          <span>＋</span> Add Student
        </button>
      </section>

      {/* Student List */}
      <section className="card table-card">
        <h2 className="section-title">
          Student List
          <span className="badge">{students.length}</span>
        </h2>

        {students.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p className="empty-msg"><strong>No students available</strong></p>
            <p className="empty-sub">Add a student above to get started.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="table-row">
                    <td className="row-num">{index + 1}</td>
                    <td><span className="id-badge">{student.id}</span></td>
                    <td className="name-cell">{student.name}</td>
                    <td><span className="course-tag">{student.course}</span></td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(student.id)}
                        aria-label={`Delete ${student.name}`}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default StudentManager
