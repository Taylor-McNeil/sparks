import {create} from 'zustand';
import {deleteGoal, getGoals} from '../services/api';

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

    addGoal:(newGoal) => 
        set((state) => ({ 
            goals: [...state.goals, newGoal]})),

    updateGoal: (updatedGoal) =>
        set((state) => ({
            goals: state.goals.map((goal) =>
            goal.id === updatedGoal.id ? updatedGoal : goal
            ),
        })), 
        
    deleteGoal:(goalList) =>
        set({
            goals: goalList
        }),    

})); 


export default useGoalStore;