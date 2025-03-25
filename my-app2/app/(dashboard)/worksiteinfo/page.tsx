'use client';

import React, { useEffect, useState } from 'react';
import {Box, Typography, List, ListItemButton,ListItem,  ListItemText,  Dialog,  DialogTitle,  DialogContent,  DialogContentText,  DialogActions,  Button,} from '@mui/material';
import { ref, get, child } from 'firebase/database';
import { db } from '../profile/lib/firebase';
import { useSession } from 'next-auth/react';

interface Task {
  id: string;
  address: string;
  assignedTo: string;
  jobType: string;
  phoneNumber: string;
  status: string;
}

export default function WorksiteInfo() {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWorksite, setSelectedWorksite] = useState<Task | null>(null);

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
      }
    }
    fetchTasks();
  }, [session]);

  const handleWorksiteClick = (task: Task) => {
    setSelectedWorksite(task);
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

      {tasks.length === 0 ? (
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
