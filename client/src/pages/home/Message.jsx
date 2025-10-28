import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails, isActive, onActivate }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if(messageRef.current){
      messageRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, []);

  const msgDate = new Date(
    messageDetails?.timestamp || messageDetails?.createdAt || messageDetails?.time || Date.now()
  );

  const month3 = msgDate.toLocaleString(undefined, { month: 'short' });
  const day2 = String(msgDate.getDate()).padStart(2, '0');
  const year4 = msgDate.getFullYear();
  const weekday3 = msgDate.toLocaleString(undefined, { weekday: 'short' });
  const timeAmPm = msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <>
      <div
        ref={messageRef}
        className={`chat min-h-[4rem] ${
          userProfile?._id === messageDetails?.senderId
            ? "chat-end"
            : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={userProfile?._id === messageDetails?.senderId ? userProfile?.avatar : selectedUser?.avatar}
              alt="avatar"
            />
          </div>
        </div>

        {/* <div className="chat-header">
          <time className="text-xs opacity-50">{timeAmPm}</time>
        </div> */}

        <div
          className="chat-bubble cursor-pointer relative"
          onClick={(e) => {
            e.stopPropagation();
            if (isActive) {
              // If already active, clicking again will hide
              onActivate(null);
            } else {
              onActivate();
            }
          }}
        >
          {messageDetails?.message}
          {isActive && (
            <div className="text-[10px] text-gray-500 absolute left-0 -bottom-5 whitespace-nowrap">
              {`${day2} ${month3}, ${year4} • ${weekday3} • ${timeAmPm}`}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
