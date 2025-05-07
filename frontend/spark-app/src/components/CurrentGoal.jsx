import React, { useState, useRef, useEffect } from "react";
import { editGoal as apiEditGoal, deleteGoal as apiDeleteGoal } from "../services/api";
import useGoalStore from "../store/useGoalStore";


export default function CurrentGoal({goal}){
    const [isEditing,setIsEditing] = useState(false);
    const [inputValue,setInputValue] = useState("");
    const { updateGoal, deleteGoal } = useGoalStore();
    const inputRef = useRef(null);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditing]);


    function toggleEdit(e){
        setInputValue(goal.goal_context)
        setIsEditing(true)
    }

    function triggerDelete(){
        apiDeleteGoal("1",goal.id)
        .then((goalList) => {
          if(goalList){
            deleteGoal(goalList)
          }else{
            console.error("Error on backend, goal_id doesnt exist or db not pulled")
          }
        }) .catch((err) => 
          console.error("Error deleting goal:", err))
     
    }

    function updateInputValue(e){
        setInputValue(e.target.value)
    }

    function handleKeyDown(e){
        if(e.key === "Enter") handleSubmission()
        if (e.key === 'Escape' || e.keyCode === 27) setIsEditing(false)    
        
    }

    function handleBlur(){
      setIsEditing(false)
    }

    function handleSubmission() {
        if (inputValue.trim() === goal.goal_context || inputValue.trim()==="") {
          setIsEditing(false)
          return
        }
      
        apiEditGoal("1", goal.id, inputValue)
          .then((updatedGoal) => {
            if (updatedGoal) {
              updateGoal(updatedGoal)
            } else {
              console.error("Goal not found on backend.")
            }
            setIsEditing(false)
          })
          .catch((err) => console.error("Error updating goal:", err))
      }
      
    

    return(
        <div className="goal" id={goal.id}>
           {isEditing ?
           <div>
           <input
              ref={inputRef}
              value={inputValue} 
              onChange={updateInputValue} 
              onKeyDown={handleKeyDown}
              onBlur={handleBlur} 
            />
            <button onMouseDown={handleSubmission}>Enter</button>
            </div>
            : 
           <div>
            <p>{goal.goal_context}</p>
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={triggerDelete}>Delete</button>
            </div>
            }

          
           
        </div>
    )
}