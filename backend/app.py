from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import random, json
from pathlib import Path

app = FastAPI(title="Proverb API")

# Allow React frontend to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).with_name("proverbs.json")

# Models
class Proverb(BaseModel):
    id: int
    text: str
    author: Optional[str] = None

class ProverbCreate(BaseModel):
    text: str
    author: Optional[str] = None

# Load & Save Helpers
def load_data() -> List[Proverb]:
    if not DATA_FILE.exists():
        return []
    return [Proverb(**item) for item in json.loads(DATA_FILE.read_text())]

def save_data(items: List[Proverb]):
    DATA_FILE.write_text(json.dumps([i.dict() for i in items], indent=2))

# Routes
@app.get("/api/proverbs", response_model=List[Proverb])
def get_proverbs():
    return load_data()

@app.get("/api/proverbs/random", response_model=Proverb)
def get_random():
    items = load_data()
    if not items:
        raise HTTPException(status_code=404, detail="No proverbs found")
    return random.choice(items)

@app.post("/api/proverbs", response_model=Proverb, status_code=201)
def add_proverb(new: ProverbCreate):
    items = load_data()
    next_id = max([p.id for p in items], default=0) + 1
    proverb = Proverb(id=next_id, text=new.text, author=new.author)
    items.append(proverb)
    save_data(items)
    return proverb

@app.delete("/api/proverbs/{pid}", status_code=204)
def delete_proverb(pid: int):
    items = load_data()
    new_items = [p for p in items if p.id != pid]
    if len(items) == len(new_items):
        raise HTTPException(status_code=404, detail="Proverb not found")
    save_data(new_items)
    return None
