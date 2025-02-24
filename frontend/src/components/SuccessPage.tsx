import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// SuccessPage component to display the list of jobs
export const SuccessPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Not selected");
  const navigate = useNavigate();

  const API_BASE_URL = 'https://8462f73dd85b.ngrok.app'; // Base URL of the backend

  // Sample locations for the location dialog
  const locations = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse"];

  // Fetch jobs from the backend API on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs`);
        if (!response.ok) {
          throw new Error("Error while retrieving job listings");
        }
        const data = await response.json();
        // Add full image URL for each job
        const jobsWithFullImageUrl = data.map(job => ({
          ...job,
          image: `${API_BASE_URL}${job.image}`
        }));
        setJobs(jobsWithFullImageUrl);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchJobs();
  }, []);

  // Functions to handle location dialog
  const openLocationDialog = () => setLocationDialogOpen(true);
  const closeLocationDialog = () => setLocationDialogOpen(false);
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    closeLocationDialog();
  };

  return (
    <div>
      {/* Header */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          py: 2,
          bgcolor: "white",
          zIndex: 10,
          fontFamily: "Roboto, sans-serif",
          letterSpacing: "0.1em",
        }}
      >
        Work Anywhere
      </Typography>

      {/* Main content */}
      <Box
        sx={{
          position: "fixed",
          top: "64px",
          bottom: "80px",
          left: 0,
          right: 0,
          bgcolor: "white",
          p: 2,
          zIndex: 10,
          overflowY: "auto",
        }}
      >
        {/* Search field */}
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          variant="standard"
          fullWidth
          sx={{ mt: 2 }}
        />
        {/* Location selector */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography variant="subtitle1">
            Location: {selectedLocation}
          </Typography>
          <IconButton onClick={openLocationDialog} size="small">
            <LocationOn />
          </IconButton>
        </Box>

        {/* Job listings */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          For you
        </Typography>
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2, mt: 2, pb: 2 }}>
          {jobs.map((job) => (
            <Box key={job._id} sx={{ width: "300px", flexShrink: 0 }}>
              <Card sx={{ boxShadow: "none", border: "1px solid #eee" }}>
                <CardMedia
                  component="img"
                  image={job.image}
                  alt={job.title}
                  sx={{ height: 140, width: "100%", objectFit: "cover" }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 1 }}>
                  <Button
                    variant="primary"
                    size="md"
                    style={{
                      backgroundColor: "#222",
                      borderColor: "#444",
                      color: "#fff",
                    }}
                    onClick={() => navigate(`/job/${job._id}`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Button to create a new job */}
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate("/create-job")}
          style={{
            backgroundColor: "#222",
            borderColor: "#444",
            color: "#fff",
            marginTop: "20px",
          }}
        >
          Create New Job
        </Button>
      </Box>

      {/* Location dialog */}
      <Dialog open={locationDialogOpen} onClose={closeLocationDialog}>
        <DialogTitle>Select a Location</DialogTitle>
        <DialogContent>
          <List>
            {locations.map((location, index) => (
              <ListItem key={index} disablePadding divider>
                <ListItemButton onClick={() => handleLocationSelect(location)}>
                  <ListItemText primary={location} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="primary" size="md" onClick={closeLocationDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};