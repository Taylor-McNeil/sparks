import react, {useEffect, useMemo} from "react";
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
const currentWeekGoals = useMemo(() =>
  goals.filter(
    goal => goal.date_attempted && isDateInThisWeek(goal.date_attempted)
  ), [goals]
);

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
            <WeeklyGoals goals={currentWeekGoals}/>
            <Misc/>
            <GoalReview goals={pastGoals}/>
            <select value={theme} onChange={handleChange}>
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="spacey">🪐 Spacey</option>
            </select>

        </div>
    )
}

