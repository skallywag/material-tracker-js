/* eslint-disable react/prop-types */
import "@mantine/dates/styles.css";
import {
  Modal,
  Flex,
  Text,
  Button,
} from "@mantine/core";

const CompleteRollModal = (props) => {
  return (
    <Modal centered opened={props.opened} onClose={props.close} title={props.title}>
        <Text>Are you sure you want to complete this roll?</Text>
        <Text mb={15}>Ensure roll information is correct</Text>
            <Flex justify={"space-around"}>
            <Button bg={"red"} onClick={props.onUpdate}>Complete</Button>
            <Button bg={"blue"} onClick={props.close}>Cancel</Button>
        </Flex>
    </Modal>
  );
};
export default CompleteRollModal;
