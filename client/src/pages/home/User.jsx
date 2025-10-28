import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ userDetails }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);

  const isUserOnline = onlineUsers?.includes(userDetails?._id)

  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <div
      onClick={handleUserClick}
      className={`flex gap-5 items-center p-3 hover:bg-gray-400 rounded-lg cursor-pointer ${
        userDetails?._id === selectedUser?._id && "bg-gray-400"}`}
    >
      {isUserOnline ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="User Avatar" src={userDetails?.avatar} />
        </StyledBadge>
      ) : (
        <Avatar alt="User Avatar" src={userDetails?.avatar} />
      )}
      
      <div>
        <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.username}</p>
      </div>
    </div>
  );
};

export default User;
