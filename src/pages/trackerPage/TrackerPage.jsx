import { useState, useEffect } from 'react';
import "@mantine/dates/styles.css";
import {IconCircleChevronsUp} from '@tabler/icons-react'
import {
  Box,
  Button,
  Flex,
  Input,
  Title,
  Text,
  Modal,
  Divider
} from "@mantine/core";
import {useForm} from '@mantine/form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDisclosure } from '@mantine/hooks';  
import RollCard from '../../components/rollCard/RollCard';
import { v4 as uuidv4 } from 'uuid';
import MetersToFeetConverter from '../../components/metersToFeet/MetersToFeet';
import PiecesToFeet from '../../components/piecesToFeet/piecesToFeet';

const TrackerPage = () => {
const [rolls, setRolls] = useState([]);
const [length, setLength] = useState('')
const [jobNumber, setJobNumber] = useState('')
const [storedJob, setStoredJob] = useState('')
const [opened, { open, close }] = useDisclosure(false);


const form = useForm({
    initialValues: {
      jobLength: "",
    },
    validate: {
      jobLength: (value) => value.length <= 0 && "Enter job length",
    },
  });

useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedRolls = JSON.parse(localStorage.getItem('rolls') || '[]');
    const storedLength = localStorage.getItem('jobData') || '';
    const storedJobNumber = localStorage.getItem('jobNumber') || '';
    setStoredJob(storedJobNumber)
    setRolls(storedRolls);
    setLength(storedLength)
  }
}, []);

  function scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

const handleAddRoll = ()=> {
    setRolls((prevRolls) => { 
      const newRoll = {
        id: uuidv4(),
        status: "Unsaved",
        rejected: false,
        rollNumber: rolls.length + 1,
        rollItemNumber: '',
        rollLength: '',
        rejectLength: '',
        complete: false
      };

      const updatedRolls = [...prevRolls, newRoll];
      localStorage.setItem('rolls', JSON.stringify(updatedRolls));
      toast("Roll Created!")
   
      return updatedRolls;
    });
  };


function updateRoll(updatedRollData){
  setRolls((prevRolls) => {
    const updatedRolls = prevRolls.map(roll =>
      roll.id === updatedRollData.id ? { ...roll, ...updatedRollData } : roll
    );
    localStorage.setItem('rolls', JSON.stringify(updatedRolls));
    toast("Roll Saved!")
    return updatedRolls;
  });
}

function rejectRoll(rollData, jobLength){ 
      const totalSum = rolls.reduce((sum, obj) => {
          return sum + Number(obj.rollLength.replace(',', '')) - Number(obj.rejectLength);
      }, 0);  
  setRolls((prevRolls) => {
    const updatedRolls = prevRolls.map(roll => {
      if(roll.id === rollData.id && roll.rejected !== true){
        
        const rejectLength = Number(totalSum) - Number(jobLength)
          return {...roll, rejectLength: rejectLength, rejected: true, status: rollData.status, complete: rollData.complete }
      }
      return roll
    })
    localStorage.setItem('rolls', JSON.stringify(updatedRolls));
    toast("Roll Rejected!")
    return updatedRolls;
  });
}

function addTotalLength() {
  if (rolls.length === 0) {
    toast("No rolls have been added!");
    return;
  }

  let allRollsCompleted = true;

  rolls.forEach((roll) => {
    if (roll.complete !== true) {
      allRollsCompleted = false;
      return;
    }
  });

  if (!allRollsCompleted) {
    toast("Not all rolls have been completed!");
    return;
  }

  const totalSum = rolls.reduce((sum, obj) => {
    return sum + Number(obj.rollLength.replace(',', '')) - Number(obj.rejectLength);
  }, 0);
  const remainingLength = totalSum - Number(form.values.jobLength)

  localStorage.setItem("jobData", JSON.stringify(remainingLength))
  setLength(remainingLength.toString())
}

  return (
    <Box className="page">
      <Modal title={"Comfirm Reset?"} opened={opened} onClose={close} padding={40}>
        <Text>Are you sure you want to reset job? All progress will be lost.
        </Text>
        <Flex justify={"space-between"}>
           <Button bg={"red"} onClick={() => { localStorage.clear()
            window.location.reload()
          }}>Reset Job</Button>
           <Button onClick={close} bg={"blue"}>Cancel</Button>
        </Flex>
      </Modal>
    <Box className='flex flex-row justify-between'>
      <Box>
      <Button mb={10} className="bg-accentError"
        onClick={() => handleAddRoll()}>
        Add New Roll
      </Button>
      <Flex direction="column" gap={8}>
        {rolls ? rolls.map((item) => (
          <RollCard 
          id={item.id}
          key={item.id} 
          onUpdate={updateRoll}
          onReject={rejectRoll}
          rollData={item}
          onDelete={() => {
              const upDatedRolls = rolls.filter(
                (roll) => roll.id !== item.id
                );
                localStorage.setItem("rolls", JSON.stringify(upDatedRolls));
                setRolls(upDatedRolls);
                toast("Roll Deleted!")
              }}
              />
              )) : null}
      </Flex>
              {rolls.length >= 4 && 
              <Box> <Text>Top</Text> <IconCircleChevronsUp className="color-primaryBlue" size={"50px"} cursor={"pointer"} mb={20} bg={"green"} onClick={scrollToTop}>Scroll to Top</IconCircleChevronsUp> </Box>}
      </Box>
      <Box mr={"100px"}>

        <Title>CO-{storedJob}</Title> 

        {storedJob ? null : <Input mb={10} placeholder="Set Job Number" value={jobNumber} onChange={(e) => setJobNumber(e.target.value)}/>}

      {storedJob ? null : <Button mb={20} bg={"red"} onClick={() => {
        localStorage.setItem("jobNumber", jobNumber)
        setStoredJob(jobNumber)
        }}>Set Job CO</Button>}
   
        <Divider color='blue' mb={15}/>




        <Title mb={2} size={16}>Total Footage Ran</Title>
        <form onSubmit={form.onSubmit(() => {
          addTotalLength()
        })}>
        <Input mb={12} type='number' placeholder="Total Job Footage" {...form.getInputProps("jobLength")}/>
        <Flex gap={8}>
        <Button mb={20} bg={"blue"} type='submit'>End Job</Button>
        <Button mb={20} bg={"red"} onClick={open
          }>New Job</Button>
        </Flex>
        </form>
        {length ?    <Box className='rounded p-6' bg={"orange"}>
          <Text>Return Roll Length: {length}</Text>
        </Box> : null }
        <Divider color='blue' mb={15}/>
        <MetersToFeetConverter/>
            <Divider color='blue' mb={15}/>
        <PiecesToFeet/>
      </Box>
      </Box>
    </Box>
  );
};
export default TrackerPage;
