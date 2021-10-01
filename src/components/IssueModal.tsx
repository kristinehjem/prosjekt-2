import { Button, makeStyles } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState, useContext } from 'react';
import { useModal, useModalUpdate} from '../contexts/ModalContext'
import "../styles/IssueModal.css"

const IssueModal = () => {

  let modalContent = useModal();
  let setModalContent = useModalUpdate();

    const style = {
        position: 'absolute' as 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #37474F',
        boxShadow: 2,
        p: 4,
        borderRadius:"20px"
      };

  return (
      <Modal
        open={modalContent.modalState}
        onClose={() => {
          setModalContent(modalContent.description, modalContent.issueNumber, false)}}
      >
        <Box sx={style}>
          <button className="exitButton" onClick={() => {setModalContent(modalContent.description, modalContent.issueNumber, false)}}>x</button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {(modalContent.description != "") ?
          `Description of issue #${modalContent.issueNumber}`
          : `No description of issue #${modalContent.issueNumber}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalContent.description}
          </Typography>
        </Box>
      </Modal>
  );
}

export default IssueModal