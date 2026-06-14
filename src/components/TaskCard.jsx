import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function TaskCard({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText)
    }
    setIsEditing(false)
  }

  const priority = task.priority || 'Medium'
  const priorityClass = `priority-${priority.toLowerCase()}`

  return (
    <div ref={setNodeRef} style={style} className={`task-card ${priorityClass}`}>
      <div className="task-content">
        <span className="drag-handle" {...attributes} {...listeners}>⠿</span>
        {isEditing ? (
          <input
            className="edit-input"
            type="text"
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            onBlur={handleSave}
          />
        ) : (
          <p onClick={() => setIsEditing(true)}>{task.text}</p>
        )}
      </div>

      <div className="task-footer">
        <span className={`priority-badge ${priorityClass}`}>
          {priority} Priority
        </span>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>🗑</button>
      </div>
    </div>
  )
}

export default TaskCard