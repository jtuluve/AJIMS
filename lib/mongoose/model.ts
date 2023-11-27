import mongoose from "mongoose";
import { connectToDB } from "./functions";
//Define score schema
connectToDB();
const ScoreSchema = new mongoose.Schema({
  score: { type: Number, required: false },
  category: {
    type: String,
    enum: ["A++", "A+", "A", "A-", "B+", "B", "B-", "C+", "C"],
    required: false,
  },
});

// Define the ClinicalDuty schema
const ClinicalDutySchema = new mongoose.Schema({
  title: { type: String, required: false },
  journalName: { type: String, required: false },
  quartile: {
    type: String,
    enum: ["Q1", "Q2", "Q3", "Q4", "No Quartile", "Nil"],
    required: false,
  },
  index: {
    type: String,
    enum: [
      "Medline",
      "Pubmed",
      "CSCI",
      "SCI",
      "DC",
      "Expanded Embase",
      "Scopus",
      "DoAJ",
    ],
    required: false,
  },
  doi: { type: String, required: false },
  authorship: {
    type: String,
    enum: ["First", "Second", "Correspondant", "Others"],
    required: false,
  },
  uploadUrl: { type: String, required: false },
});

// Define the Research schema
const ResearchSchema = new mongoose.Schema({
  score: { type: ScoreSchema, required: false },
  clinicalDuty: { type: [ClinicalDutySchema], required: false },
});
const AppraisalSchema = new mongoose.Schema({
    research:{ type: ResearchSchema, required: false}
})
// Define the User schema
const userSchema = new mongoose.Schema({
  name: {type: String, required: false },
  email:{type: String, required:true, unique:true},
  uid: {type: String, required: true, unique: true },
  designation: { type: String, required: false },
  department: { type: String, required: false },
  category: { type: String, required: false },
  appraisal: { type: AppraisalSchema },
});
// Create the User model
const User = mongoose.models.user||mongoose.model("user", userSchema);

export default User;
