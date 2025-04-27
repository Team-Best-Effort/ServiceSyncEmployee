"use client";

import * as React from 'react';
import { useState, useEffect, FormEvent } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { auth, db } from './lib/firebase';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Loader from './Loader';
import theme from '@/theme';
import { get, ref, update } from 'firebase/database';
import { signOut, signInWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';


interface UserData {
  name: string;
  image: string;
  email: string;
  originalPassword?: string;
  newPassword?: string;
}

interface Employee {
  employeeID: string;
  email: string;
  name: string;
  passwordChanged: boolean;
  phone: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
  border: '1px solid #404040',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: '4px solid #ffffff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  transition: 'transform 0.3s ease-in-out',
  backgroundColor: '#404040',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 4),
  textTransform: 'none',
  fontWeight: 600,
  backgroundColor: '#ffffff',
  color: '#000000',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
  },
  '&:disabled': {
    backgroundColor: '#666666',
    color: '#999999',
  },
}));

export default function EditProfilePage() {
  const { data: session } = useSession() as { data: Session | null };
  const [userData, setUserData] = useState<UserData>({
    name: '',
    image: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);
  const [employeeID, setEmployeeID] = useState<string | null>(null); 
  const [dataLoading, setDataLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (session?.user) {
      setUserData({
        name: session.user.name || '',
        image: session.user.image || '',
        email: session.user.email || '',
      });
      setLoading(false);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.email){
      const fetchUserData = async () =>{
        const userRef = ref(db, `employees`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const users: {[key: string]: Employee} = snapshot.val(); 
          const currentUser = Object.values(users).find((user: Employee) => user.email === session?.user?.email);

          if (currentUser){
            setEmployeeID(currentUser.employeeID);
            setPasswordChanged(currentUser.passwordChanged || false); 
          }
        }
        setDataLoading(false); 
      };
      fetchUserData();
    }
  }, [session]);

  if (isLoading || dataLoading) { 
    return <Loader size={60} color={theme.palette.primary.main} />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordChanged && !userData.image) return; 
    setLoading(true);
    setError(null);
    setSuccess(false);

    try{
      if (!passwordChanged && userData.originalPassword && userData.newPassword) {
        await signOut(auth);

        if (session?.user?.email){
          await signInWithEmailAndPassword(auth, session.user.email, userData.originalPassword);
        }

        const currentUser = auth.currentUser;
        if (!currentUser || !currentUser.email){
          throw new Error('User not authenticated with Firebase');
        }
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          userData.originalPassword
        );

        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, userData.newPassword);

        setSuccess(true);
        setPasswordChanged(true);

        if (employeeID){
          const userRef = ref(db,`employees/${employeeID}`);
          await update(userRef,{passwordChanged: true});
        }
      }

      if (userData.image){
        const userRef = ref(db,`employees/${employeeID}`);
        await update(userRef,{image: userData.image});
      }
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error){
        setError(err.message);
      } else{
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 6 }}>
      <StyledPaper elevation={3}>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <StyledAvatar
             src={userData.image} 
             alt={userData.name}
             >
              {!userData.image && userData.name.charAt(0).toUpperCase()}
            </StyledAvatar>
          </Box>

          <TextField fullWidth label="Name" name="name" value={userData.name} onChange={handleChange} required variant="outlined" sx={{ margin: '16px' }} inputProps={{ readOnly: true }} />
          <TextField fullWidth label="Profile Image URL" name="image" value={userData.image} onChange={handleChange} variant="outlined" helperText="Enter a valid image URL" sx={{ margin: '16px' }} />
          <TextField fullWidth label="Email" name="email" value={userData.email} onChange={handleChange} required variant="outlined" sx={{ margin: '16px' }} inputProps={{ readOnly: true }} />

          {!passwordChanged && (
            <div>
              <TextField fullWidth type="password" label="Original Password" name="originalPassword" value={userData.originalPassword || ''} onChange={handleChange} variant="outlined" sx={{ margin: '16px' }} />
              <TextField fullWidth type="password" label="New Password" name="newPassword" value={userData.newPassword || ''} onChange={handleChange} variant="outlined" sx={{ margin: '16px' }} />
            </div>
          )}

          {success && (<Alert severity="success" sx={{ mt: 2 }}> Changes saved successfully!</Alert>)}

          {error && (<Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>)}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <StyledButton type="submit" variant="contained" disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}>
              {loading ? 'Saving...' : 'Save Changes'}
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </Box>
  );
}