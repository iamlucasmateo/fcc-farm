const BACKEND_URL = "http://localhost:2020/api/todo/"

export const getTodos = async () => {
    const todos = await fetch(BACKEND_URL);
    return todos.json()
}

export const deleteTodo = async (itemTitle) => {
    await fetch(`${BACKEND_URL}${itemTitle}`, { method: "DELETE" })
}

export const postTodo = async (title, description) => {
    await fetch(BACKEND_URL, {
        method: "POST",
        body: JSON.stringify({ title, description })
    })
}