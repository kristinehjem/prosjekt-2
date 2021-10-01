import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { findByLabelText } from '@testing-library/react';
import "../styles/IssueModal.css"
import { useModal, useModalUpdate } from '../contexts/ModalContext';
import "../styles/IssueModal.css";

const IssueModal = () => {

  let modalContent = useModal();
  let setModalContent = useModalUpdate();
  
    const style = {
        position: 'absolute' as 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #37474F',
        width: '50%',
        boxShadow: 2,
        p: 4,
        borderRadius:"20px",
        }

  return (
      <Modal
        open={modalContent.modalState}
        onClose={() => {
          setModalContent(modalContent.description, modalContent.issueNumber, false)}}
      >
        <Box sx={{...style,
        '@media (max-width: 600px': {
          width: '80%',
        }
        }}>
          <button className="exitButton" onClick={() => {setModalContent(modalContent.description, modalContent.issueNumber, false)}}>x</button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {(modalContent.description !== "") ?
          `Description of issue #${modalContent.issueNumber}`
          : `No description of issue #${modalContent.issueNumber}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalContent.description}
          </Typography>
        </Box>
      </Modal>
  );

};

export default IssueModal