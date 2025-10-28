import React, { useEffect, useState } from 'react'
import { TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import User from './User';
import { Stack, Avatar, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUsersThunk, logoutUserThunk } from '../../store/slice/user/user.thunk';

const UserSidebar = () => {

  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {otherUsers, userProfile} = useSelector(state => state.userReducer);
  const [users, setUsers] = useState([]);

  const handleLogout = async() => {
    await dispatch(logoutUserThunk());
  }

  useEffect(() => {
  if (!searchValue) {
    setUsers(otherUsers || []);
  } else {
    setUsers(
      (otherUsers || []).filter((user) =>
        user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }
}, [searchValue, otherUsers, userProfile]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        await dispatch(getOtherUsersThunk()).unwrap();
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [])

  return (
    <div className='max-w-[20rem] w-full h-screen border-r-2 border-gray-300 flex flex-col'>
        <div className='bg-[#7480FF]  mx-3 px-2 py-1 text-white rounded-md mt-3'>   
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600, margin: 2, textAlign: 'center',width: 'auto'}}> Chit Chat
            </Typography>
        </div>
      
        {error && (
          <Alert severity="error" sx={{ mx: 2, my: 1 }}>
            {error}
          </Alert>
        )}

      <div>
        <TextField
            sx={{padding: 1 , width: '100%'}}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='search...'
            type= 'search'
            InputProps={{
                endAdornment: (
                          <InputAdornment position="end">
                            <Search/>
                          </InputAdornment>
                        ),
            }}
        /> 
        </div>

      <div className='h-full overflow-y-scroll px-3 flex flex-col gap-2'>
          {loading ? (
  <div className="flex justify-center items-center h-full">
    <CircularProgress />
  </div>
) : users?.length === 0 ? (
  <Typography sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
    No users found
  </Typography>
) : (
  users?.map((userDetails) => (
    <User key={userDetails?._id} userDetails={userDetails} />
  ))
)}

      </div>
      {/* <div className='flex items-center justify-between p-3'>
        <Stack direction="row" spacing={16}>
          <div>
            <div className='w-10 rounded-full ring'>  
              <Avatar  src={userProfile.avatar} /> 
              </div><br></br>
              <div>{userProfile?.username}</div>
          </div>
            
            <div className='btn-sm px-z items-right'>
                <Button

                onClick={handleLogout}
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 1, alignItems: 'right'   }}
                >
                Log Out
            </Button>
            </div>
        </Stack>
      </div> */}
      <div className="flex items-center justify-between p-3 border-t border-gray-300">
  {/* Left side: Avatar + Username */}
  <div className="flex items-center space-x-5">
    <Avatar src={userProfile?.avatar} sx={{ width: 40, height: 40 }} />
    <div className="text-lg font-semibold">{userProfile?.fullName}</div>
  </div>

  {/* Right side: Logout Button */}
  <Button
    onClick={handleLogout}
    variant="contained"
    color="primary"
    size="small"
  >
    Log Out
  </Button>
</div>

    </div>
  )
}

export default UserSidebar
