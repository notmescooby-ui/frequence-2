import { createClient } from '@/utils/supabase/server.ts'

// Mock cookies helper for non-Next.js environments
const cookies = async () => {
  return {
    getAll: () => [],
    set: (name: string, value: string, options?: any) => {},
    get: (name: string) => undefined,
  };
};

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo: any) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  )
}