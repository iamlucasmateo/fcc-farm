from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.database import (
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    delete_todo
) 
from backend.model import Todo

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def read_root():
    return { "Ping": "Pong" }


@app.get("/api/todo/")
async def get_all():
    result = await fetch_all_todos()
    return result


@app.get("/api/todo/{title}", response_model=Todo)
async def get_one(title: str):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"No todo with title {title}")


@app.post("/api/todo/", response_model=Todo)
async def create(todo: Todo):
    response = await create_todo(**todo.dict())
    if response:
        return response
    raise HTTPException(400, "Bad Request")  


@app.put("/api/todo/")
async def update(todo: Todo):
    response = await update_todo(todo.title, todo.description)
    if response:
        return response
    raise HTTPException(404, f"No item with title {todo.title}")

@app.delete("/api/todo/{title}")
async def delete(title: str):
    response = await delete_todo(title)
    if response:
        return
    raise HTTPException(404, f"Not found")