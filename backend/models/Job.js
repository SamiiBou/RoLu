import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Le chemin de l'image sera stocké ici
  location: { type: String, required: true },
  salary: { type: String },
  duration: { type: String },
  skills: { type: [String] },
  deadline: { type: String },
  applyLink: { type: String },
  company: { type: String },
  responsibilities: { type: [String] },
  qualifications: { type: [String] },
  createdAt: { type: Date, default: Date.now }
});

export const Job = mongoose.model('Job', JobSchema);