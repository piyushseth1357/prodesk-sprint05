import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import Column from './components/Column'
import AddTaskForm from './components/AddTaskForm'
import './App.css'

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks))
  }, [tasks])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      status: 'todo',
      priority,
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const activeTask = tasks.find(t => t.id === activeId)
    if (!activeTask) return

    const overTask = tasks.find(t => t.id === overId)

    let targetStatus
    if (overTask) {
      targetStatus = overTask.status
    } else if (COLUMNS.some(c => c.id === overId)) {
      targetStatus = overId
    } else {
      return
    }

    setTasks(prev => {
      const updated = prev.map(task =>
        task.id === activeId ? { ...task, status: targetStatus } : task
      )

      const activeIndex = updated.findIndex(t => t.id === activeId)
      const overIndex = overTask ? updated.findIndex(t => t.id === overId) : -1

      if (overIndex !== -1 && activeIndex !== overIndex) {
        const reordered = [...updated]
        const [moved] = reordered.splice(activeIndex, 1)
        reordered.splice(overIndex, 0, moved)
        return reordered
      }

      return updated
    })
  }

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <AddTaskForm onAdd={addTask} />

      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="board">
          {COLUMNS.map(col => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={filteredTasks.filter(t => t.status === col.id)}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

export default App