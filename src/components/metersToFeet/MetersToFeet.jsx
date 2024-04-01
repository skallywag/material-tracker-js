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
    <Box>
      <h2>Meters to Feet Converter</h2>
      <label>
        Meters:
        <Input type="number" value={meters} onChange={handleInputChange} />
      </label>
        <Text>Feet: {feet !== '' ? feet : ''}</Text>    
 </Box>
  );
}

export default MetersToFeetConverter;
