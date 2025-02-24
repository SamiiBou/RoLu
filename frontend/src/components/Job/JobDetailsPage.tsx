import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  Fade,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  LocationOn,
  AttachMoney,
  CalendarToday,
  Business,
  Work,
  ArrowBack,
} from "@mui/icons-material";

// JobDetailsPage component to display detailed information about a job
export const JobDetailsPage = () => {
  const { id } = useParams(); // Extract job ID from URL parameters
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'https://8462f73dd85b.ngrok.app'; // Base URL of the backend

  // Fetch job details from the backend API based on job ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Error while retrieving job details");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // Display loading state
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Handle case where job is not found
  if (!job) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Job not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, width: "100%", boxSizing: "border-box" }}>
      {/* Back to jobs link */}
      <Box sx={{ mb: 3 }}>
        <Link
          to="/success"
          style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          <ArrowBack sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            Back to jobs
          </Typography>
        </Link>
      </Box>

      {/* Job details card */}
      <Fade in={true} timeout={500}>
        <Card sx={{ boxShadow: "none", border: "1px solid #eee", width: "100%" }}>
          {/* Adjusted CardMedia to control image size */}
          <CardMedia
            component="img"
            image={`${API_BASE_URL}${job.image}`} // Full image URL
            alt={job.title}
            sx={{ height: 250, width: "100%", objectFit: "cover" }} // Ensures image fits within card
          />
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>{job.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              at {job.company}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>{job.description}</Typography>

            {/* Responsibilities section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Responsibilities</Typography>
              <List dense>
                {job.responsibilities.map((resp, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText primary={<Typography variant="body2">{resp}</Typography>} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Qualifications section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Qualifications</Typography>
              <List dense>
                {job.qualifications.map((qual, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText primary={<Typography variant="body2">{qual}</Typography>} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Job details section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Job Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}><Box display="flex" alignItems="center"><Work sx={{ mr: 1, color: "text.secondary" }} /><Typography>Type: {job.type}</Typography></Box></Grid>
                <Grid item xs={12}><Box display="flex" alignItems="center"><LocationOn sx={{ mr: 1, color: "text.secondary" }} /><Typography>Location: {job.location}</Typography></Box></Grid>
                <Grid item xs={12}><Box display="flex" alignItems="center"><AttachMoney sx={{ mr: 1, color: "text.secondary" }} /><Typography>Salary: {job.salary}</Typography></Box></Grid>
                <Grid item xs={12}><Box display="flex" alignItems="center"><CalendarToday sx={{ mr: 1, color: "text.secondary" }} /><Typography>Duration: {job.duration}</Typography></Box></Grid>
                <Grid item xs={12}><Box display="flex" alignItems="center"><CalendarToday sx={{ mr: 1, color: "text.secondary" }} /><Typography>Deadline: {job.deadline}</Typography></Box></Grid>
                <Grid item xs={12}><Box display="flex" alignItems="center"><Business sx={{ mr: 1, color: "text.secondary" }} /><Typography>Company: {job.company}</Typography></Box></Grid>
              </Grid>
            </Box>

            {/* Required skills section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Required Skills</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {job.skills.map((skill) => (
                  <Chip key={skill} label={skill} variant="outlined" size="small" />
                ))}
              </Box>
            </Box>

            {/* Apply now button */}
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href={job.applyLink}
                target="_blank"
                sx={{ px: 4 }}
              >
                Apply Now
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};