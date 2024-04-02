import { Box, Text, Input } from '@mantine/core';
import { useState } from 'react';


function MetersToFeetConverter() {
  const [meters, setMeters] = useState('');
  const [feet, setFeet] = useState('');

 const handleInputChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    setMeters(inputValue);
    const feetValue = inputValue * 3.28084;
    setFeet(parseInt(feetValue));
  };

  return (
    <Box className="bg-primaryBlue p-7 rounded">
      <Text mb={10} size='20px' style={{fontWeight: "bolder"}}>Meters to Feet Converter</Text>
      <Text mb={8}>
        Meters:
        <Input type="number" value={meters} onChange={handleInputChange} />
      </Text>
        <Text>Feet: {feet !== '' ? feet : ''}</Text>    
 </Box>
  );
}

export default MetersToFeetConverter;
