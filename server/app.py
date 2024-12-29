from enum import Enum
from fastapi import FastAPI,HTTPException,Query,Depends
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated,List,Tuple
from contextlib import asynccontextmanager
import asyncio
msg_queues = {
          'chats_with_mom':['a','b','c','d'],
          'chats_with_dad':['a','b','e'],
          'chats_with_friend':['hello','world']
     }
class Message(BaseModel):
       msg: str

app = FastAPI()
allowed_origins=['http://localhost:5173']
app.add_middleware(CORSMiddleware,
                   allow_origins=allowed_origins,
                    allow_credentials=True,  
                    allow_methods=["*"],  
                    allow_headers=["*"], )    


@app.get('/api/{queue_name}')
async def fetch_message_queue_by_name(queue_name:str,ms:int=10)->dict[str,str|int]:
    try:
        # Validate if the queue exists
        if not msg_queues.__contains__(queue_name):
            raise HTTPException(status_code=404, detail="Queue not found") 
        elapsed_time = 0.0
        interval = 0.1  
        while elapsed_time < ms:
            if msg_queues[queue_name]: 
                message_to_return = msg_queues[queue_name].pop(0)
                return {"status": 200, "message": message_to_return}
            await asyncio.sleep(interval)
            elapsed_time += interval

        return {"status": 204, "message": "No messages available"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred: {e}")

@app.post('/api/{queue_name}')
async def add_message_to_queue(queue_name:str,message:Message)->dict[str,str|int]:
        try:
            msg_queues[queue_name] = msg_queues.get(queue_name,[])+[message.msg]
            print(msg_queues)
            return {"status":200,"message":"message added successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f'error occured -{e}')
    
@app.get('/api/all_queues/fetchall')
async def fetch_all_queues()->List[Tuple[str,int]]:
     print(msg_queues)
     try:
        return [(k,len(v)) for k,v in msg_queues.items()]
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