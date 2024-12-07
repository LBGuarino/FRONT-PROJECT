import * as React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomSearchBar() {
  return (
    <TextField
      variant="standard" 
      placeholder="SEARCH"
      fullWidth={false} 
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ fontSize: 20 }} />
            </InputAdornment>
          ),
          style: {
            fontSize: '16px', 
            letterSpacing: '1px', 
            fontWeight: '200',
          },
        },
      }}
      sx={{
        width: '200px', 
        '& .MuiInput-underline:before': {
          borderBottom: '1px solid black',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottom: '2px solid black', 
        },
        '& .MuiInput-underline:after': {
          borderBottom: '2px solid grey', 
        },
      }}
    />
  );
}

