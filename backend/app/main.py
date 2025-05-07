from fastapi import FastAPI, Body, HTTPException
import json
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/goals")
def get_goals():
    file_path = Path(__file__).parent / "./data/goals.json"
    with open(file_path) as f:
        goals = json.load(f)
    return goals


@app.get("/goals/{userId}")
def get_goals_by_user(userId:str):
        file_path = Path(__file__).parent / "./data/goals.json"
        with open(file_path) as f:
            goals = json.load(f)
        goal_list = []
        for goal in goals:
            if goal.get("user_id") == userId:
                goal_list.append(goal)
        return goal_list            

@app.post("/goals/{userId}")
def create_goal(userId:str, goal: dict):
     
     file_path = Path(__file__).parent / "./data/goals.json"
     with open(file_path, "r") as f:
        goals_db = json.load(f)
        goals_db.append(goal)
     with open(file_path, "w") as f:
        json.dump(goals_db, f, indent=4)
     return goal    

@app.patch("/goals/{userId}/{goalId}")
def update_goal(userId: str, goalId: str, data: dict = Body(...)):
    updated_goal = None
    file_path = Path(__file__).parent / "./data/goals.json"

    with open(file_path, "r") as f:
        goals_db = json.load(f)

    for goal in goals_db:
        if goal.get("id") == goalId:
            for key, value in data.items():
                if key in goal:
                    goal[key] = value
            updated_goal = goal
            break

    with open(file_path, "w") as f:
        json.dump(goals_db, f, indent=4)

    if updated_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")   
   
    return updated_goal



@app.delete("/goals/{userId}/{goalId}")
def delete_goal(userId:str,goalId:str):
     file_path = Path(__file__).parent / "./data/goals.json"
     with open(file_path, "r") as f:
        goals_db = json.load(f)
        updated_goal_list = [goal for goal in goals_db if goal['id'] != goalId]
     with open(file_path, "w") as f:
        json.dump(updated_goal_list, f, indent=4)   
        
     return updated_goal_list


@app.get("/goals/{userId}/{goalId}")
def get_goal(goalId:str):
    file_path = Path(__file__).parent / "./data/goals.json"

    with open(file_path, "r") as f:
        goals_db = json.load(f)

    for goal in goals_db:
        if goal.get("id") == goalId:
            return goal

    raise HTTPException(status_code=404, detail="Goal not found")

    

