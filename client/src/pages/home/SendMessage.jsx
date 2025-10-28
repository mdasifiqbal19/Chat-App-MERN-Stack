import React, { useState } from 'react'
import { TextField , Stack, Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/message.thunk';

const SendMessage = () => {

    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.userReducer)
    const [message, setMessage] = useState('')

    const handleSendMessage = () => {
        
        if (!message.trim()) return; // prevent sending empty message
        dispatch(
          sendMessageThunk({
            recieverId:selectedUser?._id, 
            message,
          })
      )
      setMessage("");
    }

    const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='flex gap-2'>
       
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
          variant="outlined"
          placeholder="Type a message..." 
          size="small"
        />
        <Stack direction="row" spacing={2}>
          <Button onClick={handleSendMessage}
          variant="contained" 
          endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Stack>
        
    </div>
  )
}

export default SendMessage
