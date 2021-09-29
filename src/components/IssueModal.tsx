import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useContext } from 'react';
import { useModal} from '../contexts/ModalContext'
import "../styles/IssueModal.css"

const IssueModal = (props: {state: React.MouseEventHandler}) => {

    const style = {
        position: 'absolute' as 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '58%',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #37474F',
        boxShadow: 5,
        p: 4,
      };
  
    return (
      <div className="modal">
        <Box sx={style}>
        <button className="exitButton" onClick={props.state}>x</button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Description of issue #
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {useModal()}
          </Typography>
        </Box>
      </div>
    );
  }

  export default IssueModal