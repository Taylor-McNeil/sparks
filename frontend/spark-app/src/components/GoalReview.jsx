import React, {useEffect, useState} from "react";


export default function GoalReview({goals}) {

const [displayedGoals, setDisplayedGoals] = useState([]);
const [sortDirection, setSortDirection] = useState("asc");
    
    useEffect(() => {
        setDisplayedGoals(goals)
    }, [goals])

 function handleFilter(filterType){
    console.log(filterType);
    if(filterType ==="all"){
        setDisplayedGoals(goals);
    }
    else if(filterType ==="completed"){
        setDisplayedGoals(goals.filter(goal =>goal.is_completed === true));
    } else if(filterType ==="incomplete"){
        setDisplayedGoals(goals.filter(goal =>goal.is_completed === false));
 }
}

function handleSort() {
    const newDirection = sortDirection === "asc" ? "desc" : "asc"
    setSortDirection(newDirection)
  
    const sorted = [...displayedGoals].sort((a, b) =>
      newDirection === "asc"
        ? a.date_attempted.localeCompare(b.date_attempted)
        : b.date_attempted.localeCompare(a.date_attempted)
    )
    setDisplayedGoals(sorted)
  }
  
  return (
    <div className="goal-review">
        <h2>Goal Review</h2>
        <span className="goal-review-filter"> 
            <select onChange={(e) => handleFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            </select>
        </span>
        <span className="goal-review-sort">
            <button onClick={handleSort}>
            Sort: {sortDirection === "asc" ? "↑ Oldest First" : "↓ Newest First"}
            </button> 
            
                     
        </span>
        <ul>
            {displayedGoals.map(goal => (
                <li key={goal.id}>{goal.date_attempted}| {goal.goal_context} | {goal.memo}</li>
            ))}
        </ul>
    </div>
  );
}