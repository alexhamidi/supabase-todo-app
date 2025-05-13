import { Todo } from '@/types'
import { Trash2, CheckCircle, Circle } from 'lucide-react'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id, !todo.completed)}
          className="text-gray-500 hover:text-green-500 transition-colors"
        >
          {todo.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>
        <div>
          <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-500'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {todo.due_date && (
          <span className="text-sm text-gray-500">
            {new Date(todo.due_date).toLocaleDateString()}
          </span>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
