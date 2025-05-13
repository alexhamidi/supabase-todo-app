export type Todo = {
  id: string
  title: string
  completed: boolean
  description?: string
  due_date?: string
  priority: number
  created_at: string
  updated_at: string
  user_id: string
}

export type NewTodo = Omit<Todo, 'id' | 'created_at' | 'updated_at' | 'user_id'>
