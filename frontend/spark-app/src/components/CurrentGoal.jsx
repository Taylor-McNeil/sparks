import React, { useState, useRef, useEffect } from "react";
import useGoalStore from "../store/useGoalStore";
import toast from 'react-hot-toast';
import {ClipLoader} from 'react-spinners';
import { Button, Checkbox, Flex, Group, Paper } from "@mantine/core";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCheck} from '@fortawesome/free-solid-svg-icons'



export default function CurrentGoal({goal}){
    const [isEditing,setIsEditing] = useState(false);
    const [inputValue,setInputValue] = useState("");
    const { updateGoal, deleteGoal, toggleCompletion, loading } = useGoalStore();
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
      deleteGoal(goal.id).then(() => {
        toast.success("Goal deleted")
      })
        .catch((err) => {console.error("Error deleting goal:", err);
        toast.error(' Could not delete goal.')});
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
          toast.success("Goal edited")
        }) . catch((err) => {
          console.error("Error updating goal:",err)
          toast.error("Error editing goal")
        })
    }
    

    return(
<Paper
 id={goal.id}
 withBorder
 radius="md"
 shadow="xs"
 bg="white"
 px="md"
 py="6"
 >
  {isEditing ? (
    <div>
      <Group justify="space-between" align="center">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={updateInputValue}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        <Button
          variant="outline"
          size="xs"
          color="lime"
          radius="sm"
          style={{ padding: "4px 8px" }} 
          onMouseDown={handleSubmission}>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Group>
    </div>
  ) : (
    <Flex align="center" gap="xs" style={{ width: "100%", minWidth:"0" }}>
      <Checkbox
        checked={goal.is_completed}
        onChange={(event) => toggleCompletion(goal.id, event.currentTarget.checked)}
      />

      <span style={{ flexGrow: 1, overflowWrap:'break-word' }}>
        <span className={goal.is_completed ? "completed-text" : ""}>
          {goal.goal_context}
        </span>
      </span>

      <Flex gap="xs" justify="flex-end" wrap="nowrap" align="center" >
        <Button
          variant="light"
          size="xs"
          color="lime.9"
          radius="sm"
          style={{ padding: "4px 8px" }}
          onClick={toggleEdit}
          disabled={loading.edit === goal.id}
        >
          {loading.edit === goal.id ? (
            <ClipLoader size={4} color="#fff" />
          ) : (
            <FontAwesomeIcon icon={faEdit} />
          )}
        </Button>

        <Button
          variant="light"
          size="xs"
          color="lime.9"
          radius="sm"
          style={{ padding: "4px 8px" }}
          onClick={triggerDelete}
          disabled={loading.delete === goal.id}
        >
          {loading.delete === goal.id ? (
            <ClipLoader size={4} color="#fff" />
          ) : (
            <FontAwesomeIcon icon={faTrash} />
          )}
        </Button>
      </Flex>
    </Flex>
  )}
</Paper>
        )
    }
    