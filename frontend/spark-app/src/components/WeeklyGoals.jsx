import React from "react";
import CurrentGoal from "./CurrentGoal.jsx";
import NewGoalModal from "./NewGoalModal.jsx";
import { Button, Stack, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function WeeklyGoals({goals}) {
  const [opened, {open,close}] = useDisclosure(false);
   
  return(
    <Paper
      withBorder
      px="sm"
      py="sm"
      radius="sm"
      shadow="xs"
    >
        
    <Stack
      align="strech"
      gap="md"
      pt="sm"
      px="sm"
    >
      
          <h1 style={{
            marginBottom:0,
            textAlign: 'center'
          }}>Weekly Goals</h1> 
            
         {goals.map(goal => (
            <CurrentGoal goal={goal} key={goal.id}/>
         ))}
         <Button
         variant="light"
         color="lime.9"
         onClick={open}
         leftSection=<FontAwesomeIcon icon={faPlus}/>
         >
         Add New Goal
         </Button>
         <NewGoalModal opened={opened} close={close} />
      
        
         
    
      </Stack>
      </Paper>
    )
}