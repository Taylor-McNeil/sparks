import react from "react";
import CurrentGoal from "./CurrentGoal.jsx";


export default function WeeklyGoals({goals }) {
    return(
        <div className="weekly-goals">
         <h1>Weekly Goals</h1>   
         {goals.map(goal => (
            <CurrentGoal goal={goal} key={goal.id}/>
         ))}
         
         </div>
    )
}