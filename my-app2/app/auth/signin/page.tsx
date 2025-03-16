"use client";
import * as React from 'react';
import { SignInPage } from '@toolpad/core/SignInPage';
import { providerMap } from '../../../auth';
import signIn from './actions';
import { AppProvider } from '@toolpad/core/AppProvider';
import theme from '@/theme';
import { Box, Alert, Typography } from '@mui/material';

const BRANDING = {
  title: 'ServiceSync',
};

function DemoInfo() {
  return (
    <Alert
      severity="info"
      sx={{
      boxShadow: '0 1px 12px #00c4cc',
      marginTop: '1rem',
      marginBottom: '1rem',
      borderRadius: '4px',
      color: '#00c4cc',
      '& .MuiAlert-icon': {
        color: '#00c4cc',
      },
      width: '100%',
      maxWidth: '500px',
     
      alignItems: 'center',
      '& .MuiAlert-message': {
        textAlign: 'center',
        textSizeAdjust: '80%',
        width: '100%',
        padding: '0.2rem',
        mr: '0.5rem',
      },
      }}
    >
      <Typography>Please log in with your credentials</Typography>
    </Alert>
  );
}

export default function SignIn() {
  return (
    <AppProvider branding={BRANDING} theme={theme}>
        <Box
          
          sx={{
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', // Ensure it stays within parent height
            backgroundImage: 'url("https://i.imgur.com/k4JR04N.png")',
          
          }}
        >

          <SignInPage
          
            signIn={signIn}
            providers={providerMap}
            slotProps={{ emailField: { autoFocus: false } }}
            slots={{ subtitle: DemoInfo, title: () => (
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                <span style={{ color: '#CBCECD' }}>Sign in to Service</span>
                <span style={{ color: '#00c4cc' }}>Sync</span>
              </span>
            ) }}
            sx={{
             
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                rowGap: '0.5rem',
                maxWidth: '400px',
                width: '100%',
           
              },
              '& form > .MuiStack-root': {
                rowGap: '1rem',
                alignItems: 'center',
              
              },
              '& .MuiButton-root': {
              
                borderRadius: '6px',
                fontWeight: 'bold',
                textTransform: 'none',
                backgroundColor: '#00c4cc',
                boxShadow: '0 1px 12px #00c4cc',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(0, 197, 204, 0.37)',
                },
              },
              '& .MuiTextField-root': {
                width: '100%',
                '& .MuiOutlinedInput-root': {
               
                  '&:hover fieldset': {
                    borderColor: '#00c4cc',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00c4cc',
                  },
                },
              },
            }}
          />
        </Box>
    </AppProvider>
  );
}