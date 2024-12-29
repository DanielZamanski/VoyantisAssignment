from enum import Enum
from fastapi import FastAPI,HTTPException,Query,Depends
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from contextlib import asynccontextmanager

msg_queues = {}
class Message(BaseModel):
       msg: str
@asynccontextmanager
async def lifespan(app:FastAPI):
     yield

app = FastAPI(lifespan=lifespan)
allowed_origins=['http://localhost:5173']
app.add_middleware(CORSMiddleware,
                   allow_origins=allowed_origins,
                    allow_credentials=True,  
                    allow_methods=["*"],  
                    allow_headers=["*"], )    


@app.get('/api/{queue_name}')
async def fetch_message_queue_by_name(queue_name:str,ms:int=10)->dict[str,str|int]:
        try:
            message_to_return = msg_queues[queue_name][0]
            msg_queues[queue_name] = msg_queues[queue_name][1:]
            return {"status":200,"message":message_to_return}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f'error occured -{e}')

@app.post('/api/{queue_name}')
async def add_message_to_queue(queue_name:str,message:Message)->dict[str,str|int]:
        try:
            msg_queues[queue_name] = msg_queues.get(queue_name,[])+[message.msg]
            print(msg_queues)
            return {"status":200,"message":"message added successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f'error occured -{e}')
    


if(__name__) == '__main__':
        uvicorn.run(
        "app:app",
        host    = "0.0.0.0",
        port    = 3000, 
        workers = 1,
        reload=True
    )