import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));  //Promise 나중에 결과 줄게 resolve 끝낫다 = ms뒤에 결과줄게
export const useTodoStore = create((set) => ({
  todos: [],
  loading: false,
  error: null,
  // 시작 불러오기
  fetchTodos: async () => { //async 비동기 기다리는애 
    set({ loading: true, error: null }); //set = zustand 상태 변경 함수 

    try { //try catch  = 실행하다가 문제 있음 에러쪽으로
      const res = await fetch(`${API_URL}/todos`); // await 는 async랑 짝궁 같이써야함 밑에다가
      await delay(1500);
      if (!res.ok) throw new Error("목록 조회 실패");

      const data = await res.json();
      set({ todos: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //추가
  addTodo: async (newTodo) => {
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: "POST", // 생성 // patch 일부 수정 // put 전체 수정 // delete 삭제
        headers: {
          "Content-Type": "application/json", // JSON이라고 알려줌
        },
        body: JSON.stringify(newTodo), // 데이터 보내기
      });

      if (!res.ok) throw new Error("추가 실패");

      const createdTodo = await res.json();

      set((state) => ({
        todos: [...state.todos, createdTodo],
      }));
    } catch (error) {
      console.error("추가 에러:", error);
    }
  },
  // 수정
  editTodo: async (id, updatedTodo) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!res.ok) throw new Error("수정 실패");

      const editedTodo = await res.json();

      set((state) => ({
        todos: state.todos.map((item) =>
          item.id === id ? editedTodo : item
        ),
      }));
    } catch (error) {
      console.error("수정 에러:", error);
    }
  },
  //삭제
  deleteTodo: async (id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("삭제 실패");

      set((state) => ({
        todos: state.todos.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  },

  

}));