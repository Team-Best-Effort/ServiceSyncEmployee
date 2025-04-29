'use client';

import React, { useEffect, useState } from 'react';
import {Box, Typography, List, ListItemButton,ListItem,  ListItemText,  Dialog,  DialogTitle,  DialogContent,  DialogContentText,  DialogActions,  Button,} from '@mui/material';
import { ref, get, child, set } from 'firebase/database';
import { db } from '../profile/lib/firebase';
import { useSession, getSession } from 'next-auth/react';
import Loader from './Loader';

interface Task {
  id: string;
  address: string;
  assignedTo: string;
  jobType: string;
  phoneNumber: string;
  status: string;
  hoursWorked?: number;
}

export default function WorksiteInfo() {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWorksite, setSelectedWorksite] = useState<Task | null>(null);
  const [hours, setHours] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const refreshSessionIfNeeded = async () => {
      if (!session?.user?.name) {
        await getSession();
      }
    };

    refreshSessionIfNeeded();
  }, [session]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'jobs'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const tasksList: Task[] = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...(value as Omit<Task, 'id'>),
          }));

          if (session?.user) {
            const username = session.user.name || '';
            const filteredTasks = tasksList.filter(task => task.assignedTo === username);
            setTasks(filteredTasks);
          } else {
            setTasks([]);
          }
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally{
        setLoading(false);
      }
    }
    fetchTasks();
  }, [session]);

  const handleWorksiteClick = (task: Task) => {
    setSelectedWorksite(task);
    if (task.hoursWorked){
      setHours(task.hoursWorked.toString());
    } else {
      setHours('');
    }    
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedWorksite(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Worksite Info
      </Typography>

      {loading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <Typography>No worksites found.</Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
  <ListItemButton onClick={() => handleWorksiteClick(task)}>
    <ListItemText primary={task.address} secondary={`Assigned to: ${task.assignedTo}`} />
  </ListItemButton>
</ListItem>

          ))}
        </List>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Worksite Details</DialogTitle>
        <DialogContent>
          {selectedWorksite && (
            <>
              <DialogContentText>
                <strong>Address:</strong> {selectedWorksite.address}
                <br />
                <strong>Assigned To:</strong> {selectedWorksite.assignedTo}
                <br />
                <strong>Phone:</strong> {selectedWorksite.phoneNumber}
                <br />
                <strong>Job Type:</strong> {selectedWorksite.jobType}
                <br />
                <strong>Status:</strong> {selectedWorksite.status}
              </DialogContentText>

              <Box sx={{ mt: 2, width: '100%', height: 300 }}>
              <iframe
                title="Worksite Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB4zdZ-VvdPVG_2ajlD0F0M5LCK7Dl0hwk&q=${encodeURIComponent(selectedWorksite.address)}`}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedWorksite.address)}`,
                  '_blank'
                )
              }
            >
              Get Directions
            </Button>

            <Box>
            <Typography>Hours Worked:</Typography>
            <input type="number" value={hours} onChange={(e) => setHours(e.target.value)}
              style={{
                padding: '10px',
                width: '100%',
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '10px',
                fontSize: '15px',
              }}/>

            <Typography>Status:</Typography>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              style={{
                padding: '10px',
                width: '100%',
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '10px',
                fontSize: '15px',
              }}>
                <option>Assigned</option>
                <option>Work In Progress</option>
                <option>Completed</option>
                </select>
            <Button onClick={async () =>{
              if (selectedWorksite){
                try {
                  const dbRefhours = ref(db, `jobs/${selectedWorksite.id}/hoursWorked`);
                  await set(dbRefhours, Number(hours));
                  const dbRefstatus = ref(db, `jobs/${selectedWorksite.id}/status`);
                  await set(dbRefstatus, status);


                  const updatedWorksite = {
                    id: selectedWorksite.id,
                    address: selectedWorksite.address,
                    assignedTo: selectedWorksite.assignedTo,
                    jobType: selectedWorksite.jobType,
                    phoneNumber: selectedWorksite.phoneNumber,
                    status: status,
                    hoursWorked: Number(hours),
                  };
                  setSelectedWorksite(updatedWorksite);
                  setOpenDialog(false);

                } catch (error){
                  alert('Error occured while changing hours');
                }
            }}
          }
            >
            Save
            </Button>
            </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
