import { Button, Modal, TextInput, Textarea, Group, Select, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { use, useState } from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../services/utils';
import toast from 'react-hot-toast';
import useGoalStore from '../store/useGoalStore';


export default function NewGoalModal({opened, close}){
    const categoryColors = {
        Fitness: '#82c91e',    // lime
        Finance: '#f03e3e',    // teal
        Home: '#ffd43b',       // beige
        Learning: '#22b8cf',   // sky blue
      };
    const [goal, setGoal] = useState('');
    const [category, setCategory] = useState('');
    const [notes,setNotes] = useState('');
    const stripColor = categoryColors[category] || '#82c91e'
    const {addGoal} = useGoalStore();

    function handleSubmit(){
        if (goal.trim()===""){
            toast.error("Please enter a goal");
            return
        }

        if (!category){
            toast.error("Please select a category");
            return
        }
        const newGoal = {
            id: uuidv4(),
            goal_context: goal,
            category: category,
            memo: notes || "",
            is_completed: false,
            date_attempted: formatDate()
          }

        addGoal(newGoal).then(() =>{
            toast.success("Goal added!");
            
            /* resetting the form */
            setGoal('');
            setCategory('');
            setNotes('');
            close();

        }).catch((error) =>{
            console.error("Error adding goal:", error);
            toast.error("Goal could not be added. See console.");
        });
    }

    return(
        <>
        
        <Modal 
            opened = {opened} 
            onClose = {close} 
            centered
            title = "Add a New Goal"
            radius={15}
            overlayProps={{
                backgroundOpacity:0.65,
                blur: 1
            }}
            styles={{
                title:{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    textAlign:'center',
                    flex: 1,
                    marginTop:'8px',
                    color:'white'
                },
                header:{
                    background: stripColor,
                    transition: "background-color 0.2s ease",
                }
            }}
        >

            <Stack>
                <TextInput
                    variant="filled"
                    withAsterisk
                    placeholder="What is your new goal?"
                    label = "Goal"
                    size="lg"
                    mt="sm"
                    value={goal}
                    onChange={(event) => setGoal(event.currentTarget.value)} 
                />
                <Select 
                    label = "Category"
                    placeholder="What category does the goal fall under?"
                    data = {[
                                {label:'💪🏾 Fitness', value: 'Fitness'},
                                {label:'💸 Finance', value:'Finance'},
                                {label:'🏠 Home', value:'Home'},
                                {label:'🧠 Learning', value:'Learning'}             
                    ]}
                    rightSection= {<FontAwesomeIcon icon={faChevronDown} />}
                    onChange={setCategory}
                />
                <Textarea
                    label = "Additional Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.currentTarget.value)}
                    placeholder="Type any additional notes or details about this goal here."
                />
                
                <Group justify="space-between" mt='sm' mb='sm'>
                    <Button 
                        variant="outline"
                        size="sm"
                        color={stripColor}
                        style={{ padding: "4px 8px" }}
                        onClick={close}
                    >
                        Close
                    </Button>
                    <Button 
                        variant="filled"
                        size="sm"
                        color={stripColor}
                        style={{ padding: "4px 8px" }}
                        onClick={handleSubmit}
                    >
                        Save Goal
                    </Button>
                </Group>
            </Stack>
        </Modal>
        </>
    );
}