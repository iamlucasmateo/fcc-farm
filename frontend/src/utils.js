export const getTodos = async () => {
    const todos = await fetch("http://localhost:8000/api/todo/");
    return todos.json()
}

export const deleteTodo = async (itemTitle) => {
    await fetch(`http://localhost:8000/api/todo/${itemTitle}`, { method: "DELETE" })
}

export const postTodo = async (title, description) => {
    await fetch("http://localhost:8000/api/todo", {
        method: "POST",
        body: JSON.stringify({ title, description })
    })
}