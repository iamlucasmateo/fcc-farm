from motor.motor_asyncio import AsyncIOMotorClient # MongoDB driver

from backend.model import Todo

client = AsyncIOMotorClient("mongodb://localhost:27017/")

database = client.fcc_farm

collection = database.todo

async def fetch_one_todo(title: str):
    document = await collection.find_one({"title": title})
    return Todo(**document)


async def fetch_all_todos():
    todos = []
    cursor = await collection.findone()
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_todo(title: str, description: str):
    todo = Todo(title=title, description=description)
    await collection.insert_one(todo.dict())
    return todo

async def update_todo(title: str, description: str):
    await collection.update_one({"title": title}, {"$set": {"description": description}})
    document = await collection.find_one({"title": title})
    return Todo(**document)

async def delete_todo(title: str):
    await collection.delete_one({"title": title})
    return True



