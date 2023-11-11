import { Box, Container, Typography, styled } from '@mui/material';
import React from 'react';




const iconStyle = {
  width: '24px',
  height: '24px',
  marginRight: '20px',
};

const LeftItemText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  paddingLeft: '25px',
  fontWeight: 'bold',
  lineHeight: '40px',
  alignItems: 'center',

  [theme.breakpoints.down('lg')]: {
    paddingLeft: '0px',
  },
}));

export default function MainLeft({ selectedItem, setSelectedItem,menuItems }) {
  const handleClick = (index) => {
    setSelectedItem(index); // Update the selected index in the Main component
  };

  return (
    <Box sx={{ paddingTop: '60px' }}>
      {menuItems.map((item, index) => (
        <Box
          key={index}
          onClick={() => handleClick(index)}
          sx={{
            backgroundColor: selectedItem === index ? 'lightblue' : 'transparent',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '8px',
          }}
        >
          <Container>
            <LeftItemText>
              <span style={iconStyle}>{item.icon}</span>
              {item.text}
            </LeftItemText>
          </Container>
        </Box>
      ))}
    </Box>
  );
}
