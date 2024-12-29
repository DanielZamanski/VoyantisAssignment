from enum import Enum
from fastapi import FastAPI,HTTPException,Query,Depends
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from contextlib import asynccontextmanager

msg_queues = {}

@asynccontextmanager
async def lifespan(app:FastAPI):
    #  create_db_and_tables(engine)
     yield

app = FastAPI(lifespan=lifespan)
allowed_origins=['http://localhost:5173']
app.add_middleware(CORSMiddleware,
                   allow_origins=allowed_origins,
                    allow_credentials=True,  
                    allow_methods=["*"],  
                    allow_headers=["*"], )    


if(__name__) == '__main__':
        uvicorn.run(
        "app:app",
        host    = "0.0.0.0",
        port    = 3000, 
        workers = 1,
        reload=True
    )