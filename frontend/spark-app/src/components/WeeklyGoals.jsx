import {react, useState} from "react";
import CurrentGoal from "./CurrentGoal.jsx";
import GoalForm from "./GoalForm.jsx";


export default function WeeklyGoals({goals }) {
    const [ isModalOpen,setIsModalOpen] = useState(false);

      function openModal(){
        setIsModalOpen(true)
      }
    
      function closeModal(){
        setIsModalOpen(false)
      }

    return(
        <div className="weekly-goals">
         <h1>Weekly Goals</h1>   
         {goals.map(goal => (
            <CurrentGoal goal={goal} key={goal.id}/>
         ))}

         <button className="add-goal-button"
                             onClick={openModal}>
                       + Add new goal...
                     </button>
                     {isModalOpen &&(
                       <div className="modal-overlay">
                         <div className="modal-content">
                             <GoalForm closeModal={closeModal} />
                         </div>
                       </div>
                     )}
         
         </div>
    )
}