import User from './User'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMessageThunk } from '../../store/slice/message/message.thunk';
import SendMessage from './SendMessage';

const MessageContainer = () => {
  const [activeMessageId, setActiveMessageId] = useState(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const {messages} = useSelector((state) => state.messageReducer);

  // Global click handler to hide message metadata
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Check if click is outside any message bubble
      if (!e.target.closest('.chat-bubble')) {
        setActiveMessageId(null);
      }
    };

    // Add global click listener
    document.addEventListener('click', handleGlobalClick);
    
    // Cleanup on unmount
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  useEffect(() => {
    if (selectedUser?._id){
      dispatch(getMessageThunk({recieverId: selectedUser?._id}))
    }
  }, [selectedUser])

  return (
    <>

    <div className="h-screen w-full flex flex-col">
      {selectedUser?._id ? (
        <>
          <div className="p-3 border-b border-b-gray-300">
            <User userDetails={selectedUser} />
          </div>
          <div className="flex-1 overflow-y-scroll">
            {messages?.length > 0 ? (
              messages.map((messageDetails) => (
                <Message 
                  key={messageDetails?._id} 
                  messageDetails={messageDetails}
                  isActive={activeMessageId === messageDetails?._id}
                  onActivate={() => setActiveMessageId(messageDetails?._id)}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center flex-col gap-5">
                <h2>No messages yet</h2>
                <p className="text-xl">Start the conversation below</p>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-b-gray-300 flex-shrink-0">
            <SendMessage />
          </div>
        </>
      ) : (
        <div className="flex-1 w-full flex items-center justify-center flex-col gap-5">
          <h2>Welcome to Chit Chat</h2>
          <p className="text-xl">Please select a user to start chat</p>
        </div>
      )}
    </div>
    
    </>

    // <>
    // {!selectedUser?._id ? (
    //   <div className='w-full flex items-center justify-center flex-col gap-5'>
    //     <h2>Welcome to Chit Chat </h2>
    //     <p className='text-xl'>Please select a user to start chat</p>
    //   </div>
    // ) : (
    //   <div className='h-screen w-full flex flex-col'>
    //   <div className='p-3 border-b border-b-gray-300'>
    //     <User userDetails={selectedUser}/>
    //   </div>

    //   <div className=' overflow-y-scroll'>
    //     {messages?.map((messageDetails) => {
    //       return <Message key={messageDetails?._id} messageDetails= {messageDetails}/>
    //     })}
    //     </div>
        
    //     {/* footer - input only shown when a user is selected */}
    //     <div className='p-3 border-t border-b-gray-300'>
    //       <SendMessage/>
    //     </div>
        
      
    // </div>
    // )}
    
    // </>
  )
}

export default MessageContainer
