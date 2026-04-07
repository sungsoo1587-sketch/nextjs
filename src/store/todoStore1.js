import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  /*
  persist(
    (set) => ({ ... }),
    {
      name: "todo-storage"  //저장소
    }
  )

  [사용자 수정]
          ↓
  zustand state 변경
          ↓
  persist가 localStorage 저장
          ↓
  [새로고침]
          ↓
  persist가 localStorage에서 복구
          ↓
  화면 유지
  */
  
  persist(
    (set) => ({
      todos: [],

      fetchTodos: async () => {
        try {
          const res = await fetch("/db1.json");
          const data = await res.json();

          set((state) => ({
            todos: state.todos.length > 0 ? state.todos : (data.todos || data),
          }));
        } catch (error) {
          console.error("데이터 없음", error);
        }
      },

      addTodo: (newTodo) =>
        set((state) => ({
          todos: [...state.todos, newTodo],
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((item) => item.id !== id),
        })),

      editTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((item) =>
            item.id === id ? { ...item, ...updatedTodo } : item
          ),
        })),

      setTodos: (todos) => set({ todos }),
    }),
    {
      name: "todo-storage",
    }
  )
);

export default useTodoStore;