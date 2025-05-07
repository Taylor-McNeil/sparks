import react, {useEffect, useState} from "react";
import GoalReview from "./GoalReview";
import WeeklyGoals from "./WeeklyGoals";
import GoalForm from "./GoalForm.jsx";
import {isDateInThisWeek} from "../services/utils.js";
import Misc from "./Misc.jsx";
import useGoalStore from "../store/useGoalStore.js";
import useUIStore from '../store/useUIStore';
import toast, {Toaster} from 'react-hot-toast';




export default function Dashboard() {

// 🧠 1. State
   const {goals, fetchGoals} = useGoalStore();
   const { theme, setTheme } = useUIStore();
   const notify = () => toast('Theme Changed <3.');
 
// 📡 2. Fetch data

     useEffect(() => {
        fetchGoals();
      }, [fetchGoals]);

// 🧮 3. Filter into buckets
  const currentWeekGoals = goals.filter(
    goal => goal.date_attempted && isDateInThisWeek(goal.date_attempted)
  )

  const pastGoals = goals.filter(
    goal => goal.date_attempted && !isDateInThisWeek(goal.date_attempted)
  )

function handleChange(e){
  setTheme(e.target.value);
  notify();
}


// 🖼️ 5. Render components
    return(
        <div className="dashboard">

<Toaster 
      position="top-right"
      toastOptions={{
        duration:3000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--text)',
        },
      }}
    />



          <div className="dashboard-header">
          <select value={theme} onChange={handleChange}>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="spacey">🪐 Spacey</option>
        </select>
              </div>
        
            <GoalForm className="GoalForm" />
            <WeeklyGoals goals={currentWeekGoals}/>
            <Misc/>
            <GoalReview goals={pastGoals}/>

        </div>
    )
}

 /*   useEffect(() =>{
        async function fetchGoals(){
            try{
                const data = await getGoals();
                setGoals(data);
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        }
        fetchGoals();
     },[]) */



  /*
  function onAddGoal(createdGoal){
   
    setGoals(prevGoals =>[...prevGoals, createdGoal]);
    console.log(goals)
 } 

 function onUpdateGoal(updatedGoal){
    setGoals(prevGoals => prevGoals.map(goal =>
        goal.id === updatedGoal.id ? updatedGoal : goal
    ))
 }

 function onDeleteGoal(goalList){
    setGoals(goalList)
 }
    */