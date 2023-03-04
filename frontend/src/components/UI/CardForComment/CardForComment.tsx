import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  id: number;
  author: string;
  message: string;
}

const CardForComment: React.FC<Props> = ({author,message,id}) => {

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px"}}>
      <Box>
        <Typography variant="body1" color="text.secondary">
          {author + " wrote: "}
        </Typography>
        <Typography variant="body2">
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardForComment;