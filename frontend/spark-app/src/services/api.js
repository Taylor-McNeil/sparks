import axios from 'axios';

const BASE_URL =`http://localhost:8000`;

export async function getGoals(){
    try{
        const response = await axios.get(`${BASE_URL}/goals`);
        return response.data;
    } catch (error) {
        console.error("Error fetching goals", error);
        throw error;
    }
}

export async function addGoal(userId,newGoal){
    try{
        const  response = await axios.post(`${BASE_URL}/goals/${userId}`, newGoal);
        return response.data;
    }catch (error){
        console.error("Error adding goal", error);
        throw error;
    }
}

export async function editGoal(userId,goalId,context){
    try{
        const response = await axios.patch(`${BASE_URL}/goals/${userId}/${goalId}`,{context:context})
        return response.data
    }catch(error){
        console.error("Error updating goal", error);
        throw error; 
    }
}


export async function deleteGoal(userId,goalId){
    try{
        const response = await axios.delete(`${BASE_URL}/goals/${userId}/${goalId}`)
        return response.data
    }
    catch(error){
        console.error("Error deleting goal", error)
        throw error;
    }
}