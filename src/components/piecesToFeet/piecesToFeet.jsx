/* eslint-disable react/prop-types */
import "@mantine/dates/styles.css";
import {
  Box,
  Text,
  Input,
  Button
} from "@mantine/core";
import { useState } from "react";
import {useForm} from '@mantine/form'


const PiecesToFeet = (props) => {
    const [piecesToFt, setPiecesToFt] = useState()

    const form = useForm({
    initialValues: {
      jobQTY: "",
      cutLength: "",
      lanes: ""
    },
    validate: {
      jobQTY: (value) => value.length <= 0 && "Enter job QTY",
      cutLength: (value) => value.length < 3 && "Enter Cut Length",
      lanes: (value) => value.length <= 0 && "Enter Lanes"
    },
  });

  function calculatePiecesToFeet(values){
      const {cutLength, jobQTY, lanes} = values
        const feet = Number(jobQTY) * Number(cutLength) / 1000 / Number(lanes) * 1.1
        setPiecesToFt(feet)
  }

  return (
    <Box className="bg-primaryBlue p-7 rounded">
        <Text size="20px" style={{fontWeight: "bolder"}} mb={15}>Pieces To Meters Calculator</Text>
        <form onSubmit={form.onSubmit(() => {
            calculatePiecesToFeet(form.values)
        })}>
        <Input type="number" mb={10} placeholder="Job QTY" {...form.getInputProps("jobQTY")}/>
        <Input type="number" mb={10} placeholder="Cut Length" {...form.getInputProps("cutLength")}/>
        <Input type="number" mb={10} placeholder="Lanes" {...form.getInputProps("lanes")}/>
        <Button mb={10} type="submit" bg={"red"}>Calculate</Button>
        </form>
        <Text>10% included</Text>
        <Text>Meters: {piecesToFt} </Text>
    </Box>
  );
};
export default PiecesToFeet;
