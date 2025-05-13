import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Todo, NewTodo } from '@/types'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  async function addTodo(newTodo: NewTodo) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('todos')
        .insert([{ ...newTodo, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      setTodos(prev => [data, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed })
        .eq('id', id)

      if (error) throw error
      setTodos(prev => prev.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  async function deleteTodo(id: string) {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}
