import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { PropsTechTypes } from '@/@types/techListType';
import { pink } from '@mui/material/colors';

interface checkProps {
  id: PropsTechTypes['id'];
  check: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ControlledCheckbox({
  id,
  check,
  handleChange
}: checkProps) {

  return (
    <Checkbox
      id={id}
      checked={check}
      onChange={handleChange}
      slotProps={{
        input: { 'aria-label': 'controlled' },
      }}
      sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}
    />
  );
}
