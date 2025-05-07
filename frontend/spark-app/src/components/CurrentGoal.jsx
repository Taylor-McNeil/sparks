import React, { useState, useRef, useEffect } from "react";
import useGoalStore from "../store/useGoalStore";


export default function CurrentGoal({goal}){
    const [isEditing,setIsEditing] = useState(false);
    const [inputValue,setInputValue] = useState("");
    const { updateGoal, deleteGoal, toggleCompletion } = useGoalStore();
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

    

    function triggerDelete() {
      deleteGoal(goal.id)
        .catch((err) => console.error("Error deleting goal:", err));
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
      const trimmed = inputValue.trim()
        if (trimmed === goal.goal_context || trimmed ==="") {
          setIsEditing(false)
          return;
        }
      
        updateGoal(goal.id, { goal_context: trimmed })
        .then(() => {
          setIsEditing(false);
        }) . catch((err) => console.error("Error updating goal:",err))
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
            <p>
              <input type="checkbox"
                     checked = {goal.is_completed}
                     onChange={() => toggleCompletion(goal.id)}
              />
              <span className={goal.is_completed ? "completed-text" : ""}>
                              {goal.goal_context}
              </span>
              
              </p>

            

            <button onClick={toggleEdit}>Edit</button>
            <button onClick={triggerDelete}>Delete</button>
            </div>
            }

          
           
        </div>
    )
}