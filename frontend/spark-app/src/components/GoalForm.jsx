import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {formatDate} from "../services/utils.js";
import useGoalStore from "../store/useGoalStore.js";
import toast from 'react-hot-toast';
import {ClipLoader} from 'react-spinners';
import { Button } from "@mantine/core";

export default function GoalForm({closeModal}) {

    const [inputValue, setInputValue] = useState("");
    const [showNotes, setNotes] = useState(false);
    const {addGoal,loading} = useGoalStore();


    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
      
        const newGoal = {
          id: uuidv4(),
          goal_context: formData.get("goal-context"),
          is_completed: false,
          category: formData.get("category"),
          memo: formData.get("notes") || "",
          date_attempted: formatDate()
        }
      
        addGoal(newGoal)
          .then(() => {
            e.target.reset()
            toast.success('Goal added!');
            setInputValue("")
            setNotes(false)
            closeModal();
          })
          .catch((err) => {
            console.error("Error adding goal:", err);
            toast.error('Could not add goal.');
        });
      }

    function handleInputChange(e){
        setInputValue(e.target.value);
    }

    function toggleNotes(e){
        e.preventDefault();
        setNotes(!showNotes);
    }

    return(
    <div className="goal-form">
        <form onSubmit={handleSubmit}>
            {loading.add && (
                <div className="spinner-wrap">
                    <ClipLoader size={20} color="var(--toast-bg)" />
                </div>
            )}

            <input type="text" value={inputValue} onChange={handleInputChange} name="goal-context" />
            <label>What Category is this goal?
            <select name="category">
                <option value ="Fitness">Fitness</option>
                <option value ="Finance">Finance</option>
                <option value ="Learning">Learning</option>
            </select>
            </label>

            <button onClick={toggleNotes}>Add Notes</button>
            
            {showNotes && (
                <label>
                
                    <textarea name="notes" placeholder="Add notes here..."/>
                    </label>
                    )}

            <button type="submit">Add Goal</button>
            
        </form>
    </div>)
}