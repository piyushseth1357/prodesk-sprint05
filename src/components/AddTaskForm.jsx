import { useState } from 'react'

function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')

  const handleSubmit = () => {
    if (text.trim() === '') return
    onAdd(text, priority)
    setText('')
    setPriority('Medium')
  }

  return (
    <div className="add-task-form">
      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  )
}

export default AddTaskForm