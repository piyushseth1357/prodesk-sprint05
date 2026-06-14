import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './TaskCard'

function Column({ id, title, tasks, onDelete, onEdit }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="task-list" ref={setNodeRef}>
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
          {tasks.length === 0 && (
            <div className="empty-column">Drop tasks here</div>
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export default Column