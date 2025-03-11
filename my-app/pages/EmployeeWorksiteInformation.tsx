"use client";
import * as React from "react";
import { db } from "../lib/firebase";
import { ref, onValue, update } from "firebase/database";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

export default function EmployeeWorksiteInformation() {
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [selectedJob, setSelectedJob] = React.useState<any>(null);
  const [openModifyDialog, setOpenModifyDialog] = React.useState(false);
  const [assignedTo, setAssignedTo] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [status, setStatus] = React.useState("Assigned");
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const jobsRef = ref(db, "jobs");
    onValue(jobsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const jobList = Object.entries(data).map(([id, job]) => ({
          id,
          ...job,
        }));
        setJobs(jobList);
      } else {
        setJobs([]);
      }
    });
  }, []);

  const handleModify = (job: any) => {
    setSelectedJob(job);
    setAssignedTo(job.assignedTo);
    setAddress(job.address);
    setPhoneNumber(job.phoneNumber || "");
    setStatus(job.status);
    setOpenModifyDialog(true);
  };

  const handleUpdateJob = async () => {
    if (!selectedJob) return;

    const jobRef = ref(db, `jobs/${selectedJob.id}`);
    try {
      await update(jobRef, { assignedTo, address, phoneNumber, status });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === selectedJob.id
            ? { ...job, assignedTo, address, phoneNumber, status }
            : job
        )
      );

      setOpenModifyDialog(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const getStatusStyle = (jobStatus: string) => ({
    color:
      jobStatus === "Assigned"
        ? "green"
        : jobStatus === "Cancelled"
        ? "red"
        : jobStatus === "Completed"
        ? "blue"
        : "#FF8C00",
    fontWeight: "bold",
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Job ID", width: 180 },
    { field: "jobType", headerName: "Job Type", width: 180 },
    { field: "assignedTo", headerName: "Assigned To", width: 200 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "phoneNumber", headerName: "Phone Number", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => (
        <span style={getStatusStyle(params.row.status)}>{params.row.status}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleModify(params.row)}>
          MODIFY
        </Button>
      ),
    },
  ];

  const currentJobs = jobs.filter(
    (job) => job.status !== "Cancelled" && job.status !== "Completed"
  );
  const olderJobs = jobs.filter((job) => job.status === "Cancelled" || job.status === "Completed");

  return (
    <Box sx={{ padding: 2, backgroundColor: darkMode ? "#121212" : "#fff", minHeight: "100vh" }}>
      <Box display="flex" justifyContent="flex-end">
        <Typography>Dark Mode</Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </Box>

      <Typography variant="h5" fontWeight="bold" color="green" gutterBottom>
        Current Jobs
      </Typography>

      <Box sx={{ height: 400, width: "100%", marginBottom: 5 }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              color: darkMode ? "white" : "black",
            },
          }}
          rows={currentJobs}
          columns={columns}
          pageSizeOptions={[5]}
        />
      </Box>

      <Typography variant="h5" fontWeight="bold" color="blue" marginTop={5} gutterBottom>
        Older Jobs
      </Typography>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              color: darkMode ? "white" : "black",
            },
          }}
          rows={olderJobs}
          columns={columns}
          pageSizeOptions={[5]}
        />
      </Box>

      <Dialog open={openModifyDialog} onClose={() => setOpenModifyDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Modify Job</DialogTitle>
        <DialogContent
          sx={{
            minHeight: "235px",
            width: "50%",
            padding: "15px",
          }}
        >
          <Typography fontWeight="bold">Assigned To</Typography>
          <TextField fullWidth value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} sx={{ marginBottom: 1 }} />

          <Typography fontWeight="bold">Address</Typography>
          <TextField fullWidth value={address} onChange={(e) => setAddress(e.target.value)} sx={{ marginBottom: 1 }} />

          <Typography fontWeight="bold">Phone Number</Typography>
          <TextField fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} sx={{ marginBottom: 1 }} />

          <Typography style={{ marginTop: 10 }}>Job Status:</Typography>
          <Box display="flex" justifyContent="space-evenly" sx={{ marginTop: 2, gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: status === "Assigned" ? "black" : "green", color: "white", width: "150px", height: "54px", fontSize: "11px" }} onClick={() => setStatus("Assigned")}>
              ASSIGNED
            </Button>
            <Button variant="contained" sx={{ backgroundColor: status === "Work in Progress" ? "black" : "orange", color: "white", width: "204px", height: "54px", fontSize: "11px" }} onClick={() => setStatus("Work in Progress")}>
              WORK IN PROGRESS
            </Button>
            <Button variant="contained" sx={{ backgroundColor: status === "Completed" ? "black" : "blue", color: "white", width: "161px", height: "54px", fontSize: "11px" }} onClick={() => setStatus("Completed")}>
              COMPLETED
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModifyDialog(false)}>CANCEL</Button>
          <Button onClick={handleUpdateJob}>SAVE CHANGES</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
