import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

export const CreateJobPage = () => {
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null); // Changement : type File au lieu de String
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [duration, setDuration] = useState('');
  const [skills, setSkills] = useState('');
  const [deadline, setDeadline] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [company, setCompany] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [qualifications, setQualifications] = useState('');

  // Gestion du changement de fichier
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Créer un objet FormData pour envoyer les données et le fichier
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('description', description);
    if (image) {
      formData.append('image', image); // Ajout du fichier image
    }
    formData.append('location', location);
    formData.append('salary', salary);
    formData.append('duration', duration);
    formData.append('skills', skills);
    formData.append('deadline', deadline);
    formData.append('applyLink', applyLink);
    formData.append('company', company);
    formData.append('responsibilities', responsibilities);
    formData.append('qualifications', qualifications);

    try {
      // Envoyer la requête POST au backend
      const response = await axios.post('https://8462f73dd85b.ngrok.app/api/jobs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Job created successfully:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Create a New Job</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        {/* Champ pour uploader une image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: '16px 0' }}
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Apply Link"
          value={applyLink}
          onChange={(e) => setApplyLink(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Responsibilities (comma separated)"
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Job
        </Button>
        <TextField
          label="Qualifications (comma separated)"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          fullWidth
          margin="normal"
        />
        
      </form>
    </Box>
  );
};