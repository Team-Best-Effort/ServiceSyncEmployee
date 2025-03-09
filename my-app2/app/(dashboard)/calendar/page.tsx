'use client';

import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Button from '@mui/material/Button';
import { EventClickArg } from '@fullcalendar/core';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/material';
import { ref, set, get, child, update, remove } from 'firebase/database';
import { db } from '../../../auth';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'Assigned';
  start: string;
  end?: string | null;
  createdAt: string;
  address: string;
  assignedTo: string;
  jobType: string;
  phoneNumber: string;
}

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openModifyDialog, setOpenModifyDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed' | 'Assigned'>('pending');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'ServiceSync'));
        if (snapshot.exists()) {
          const serviceSyncData = snapshot.val();
          const tasksList: Task[] = Object.entries(serviceSyncData).map(([key, value]) => ({
            id: key,
            ...(value as Omit<Task, 'id'>),
          }));
          setTasks(tasksList);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleOpenAddDialog = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
    setStart('');
    setEnd('');
    setAddress('');
    setAssignedTo('');
    setJobType('');
    setPhoneNumber('');
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setTitle('');
    setDescription('');
    setStatus('pending');
    setStart('');
    setEnd('');
    setAddress('');
    setAssignedTo('');
    setJobType('');
    setPhoneNumber('');
  };

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!start) {
      return;
    }
    try {
      const newTaskRef = ref(db, `ServiceSync/${Date.now().toString()}`);
      const newTaskData = {
        title: title.trim() || 'Untitled',
        description: description.trim() || 'No description',
        status,
        start,
        end: end.trim() === '' ? null : end,
        createdAt: new Date().toISOString(),
        address: address.trim() || '',
        assignedTo: assignedTo.trim() || '',
        jobType: jobType.trim() || '',
        phoneNumber: phoneNumber.trim() || '',
      };
      await set(newTaskRef, newTaskData);
      setTasks([...tasks, { id: newTaskRef.key!, ...newTaskData }]);
      handleCloseAddDialog();
    } catch (e) {
      console.error('Error adding task: ', e);
    }
  };

  const handleOpenModifyDialog = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setStart(task.start);
    setEnd(task.end || '');
    setAddress(task.address || '');
    setAssignedTo(task.assignedTo || '');
    setJobType(task.jobType || '');
    setPhoneNumber(task.phoneNumber || '');
    setOpenModifyDialog(true);
  };

  const handleCloseModifyDialog = () => {
    setOpenModifyDialog(false);
    setTitle('');
    setDescription('');
    setStatus('pending');
    setStart('');
    setEnd('');
    setAddress('');
    setAssignedTo('');
    setJobType('');
    setPhoneNumber('');
  };

  const handleModifyTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTask || !start) return;
    try {
      const taskRef = ref(db, `ServiceSync/${selectedTask.id}`);
      const updatedTaskData = {
        title: title.trim() || 'Untitled',
        description: description.trim() || 'No description',
        status,
        start,
        end: end.trim() === '' ? null : end,
        createdAt: selectedTask.createdAt,
        address: address.trim() || '',
        assignedTo: assignedTo.trim() || '',
        jobType: jobType.trim() || '',
        phoneNumber: phoneNumber.trim() || '',
      };
      await update(taskRef, updatedTaskData);
      const updatedTask: Task = { id: selectedTask.id, ...updatedTaskData };
      setTasks(tasks.map((t) => (t.id === selectedTask.id ? updatedTask : t)));
      handleCloseModifyDialog();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const transitionToDeleteDialog = () => {
    setOpenModifyDialog(false);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      const taskRef = ref(db, `ServiceSync/${selectedTask.id}`);
      await remove(taskRef);
      setTasks(tasks.filter((t) => t.id !== selectedTask.id));
      handleCloseDeleteDialog();
      setSelectedTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEventClick = (arg: EventClickArg) => {
    const task = tasks.find((t) => t.id === arg.event.id);
    if (task) {
      handleOpenModifyDialog(task);
    }
  };

  const renderEventContent = (eventInfo: {
    timeText: string;
    event: { title: string; extendedProps: any };
  }) => {
    return (
      <>
        <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
        <br />
        <small>{eventInfo.event.extendedProps.description}</small>
      </>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <FullCalendar
        height={400}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={tasks.map((task) => ({
          id: task.id,
          title: task.title,
          start: task.start,
          end: task.end || undefined,
          extendedProps: {
            description: task.description,
            status: task.status,
            address: task.address,
            assignedTo: task.assignedTo,
            jobType: task.jobType,
            phoneNumber: task.phoneNumber,
          },
        }))}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />

      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        PaperProps={{
          component: 'form',
          onSubmit: handleAddTask,
        }}
      >
        <DialogTitle>Create a Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new task, please fill in the following information:
          </DialogContentText>
          <TextField
            autoFocus
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="filled"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="filled"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          />
          <TextField
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="filled"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
          <TextField
            id="assignedTo"
            name="assignedTo"
            label="Assigned To"
            fullWidth
            variant="filled"
            value={assignedTo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssignedTo(e.target.value)}
          />
          <TextField
            id="jobType"
            name="jobType"
            label="Job Type"
            fullWidth
            variant="filled"
            value={jobType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobType(e.target.value)}
          />
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            variant="filled"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
          />
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            label="Status"
            onChange={(e: SelectChangeEvent) =>
              setStatus(e.target.value as 'pending' | 'in-progress' | 'completed' | 'Assigned')
            }
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="Assigned">Assigned</MenuItem>
          </Select>
          <TextField
            required
            id="start"
            name="start"
            label="Start Date"
            type="datetime-local"
            fullWidth
            variant="filled"
            value={start ? start.slice(0, 16) : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStart(new Date(e.target.value).toISOString())
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="end"
            name="end"
            label="End Date (optional)"
            type="datetime-local"
            fullWidth
            variant="filled"
            value={end ? end.slice(0, 16) : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnd(new Date(e.target.value).toISOString())
            }
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button type="submit">Add Task</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openModifyDialog}
        onClose={handleCloseModifyDialog}
        PaperProps={{
          component: 'form',
          onSubmit: handleModifyTask,
        }}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To modify the task, please update the following information:
          </DialogContentText>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="filled"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            variant="filled"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          />
          <TextField
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="filled"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
          <TextField
            id="assignedTo"
            name="assignedTo"
            label="Assigned To"
            fullWidth
            variant="filled"
            value={assignedTo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssignedTo(e.target.value)}
          />
          <TextField
            id="jobType"
            name="jobType"
            label="Job Type"
            fullWidth
            variant="filled"
            value={jobType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJobType(e.target.value)}
          />
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            variant="filled"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
          />
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            label="Status"
            onChange={(e: SelectChangeEvent) =>
              setStatus(e.target.value as 'pending' | 'in-progress' | 'completed' | 'Assigned')
            }
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="Assigned">Assigned</MenuItem>
          </Select>
          <TextField
            required
            id="start"
            name="start"
            label="Start Date"
            type="datetime-local"
            fullWidth
            variant="filled"
            value={start ? start.slice(0, 16) : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStart(new Date(e.target.value).toISOString())
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="end"
            name="end"
            label="End Date (optional)"
            type="datetime-local"
            fullWidth
            variant="filled"
            value={end ? end.slice(0, 16) : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnd(new Date(e.target.value).toISOString())
            }
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={transitionToDeleteDialog} color="error">
            Delete
          </Button>
          <Button type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Task Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteTask}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Button variant="contained" onClick={handleOpenAddDialog} style={{ marginTop: '20px' }}>
        Add New Task
      </Button>
    </div>
  );
}
