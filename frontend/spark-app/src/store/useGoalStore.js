import {create} from 'zustand';
import {
    getGoals,
    addGoal as apiAddGoal,
    editGoal as apiEditGoal,
    deleteGoal as apiDeleteGoal,
    getGoalById as apiGetGoalById,
} from '../services/api';
import CurrentGoal from '../components/CurrentGoal';
   
const USER_ID = "1"; // Hardcoded for now —

const useGoalStore = create((set) =>  ({
    goals: [],
    fetchGoals: async () =>{
        try{
            const data = await getGoals();
            set({goals:data});
        } catch(error){
            console.error("Error in Zustad fetchGoals", error);
        }
    },

    addGoal:async (newGoal) => {
        try{
            const createdGoal = await apiAddGoal(USER_ID,newGoal);
            set((state) => ({
                goals:[...state.goals,createdGoal]
            }));
            return CurrentGoal;
        }catch(error){
            console.error("Error in Zustand addGoal")
            throw error;
        }
    },
           

    updateGoal: async (goalId, newContext) => {
        try {
          const updatedGoal = await apiEditGoal(USER_ID, goalId, newContext);
          set((state) => ({
            goals: state.goals.map((goal) =>
              goal.id === goalId ? updatedGoal : goal
            ),
          }));
        } catch (error) {
          console.error("Error in Zustand updateGoal", error);
          throw error;
        }
      },
        
      deleteGoal: async (goalId) => {
        try {
            const {goals} = get();
          await apiDeleteGoal(USER_ID, goalId); 
          set((state) => ({
            goals: state.goals.filter((goal) => goal.id !== goalId),
          }));
        } catch (error) {
          console.error("Error in Zustand deleteGoal", error);
          throw error; 
        }
      },

      toggleCompletion: async (goalId) => {
        try {
          const goal = await apiGetGoalById(USER_ID,goalId)
      
          const updatedGoal = await apiEditGoal(USER_ID, goalId, {
            is_completed: !goal.is_completed,
          });
      
          set((state) => ({
            goals: state.goals.map((g) =>
              g.id === goalId ? updatedGoal : g
            ),
          }));
        } catch (error) {
          console.error("Error toggling completion", error);
        }
      },
      }
      

)); 


export default useGoalStore;