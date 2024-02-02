import mongoose from 'mongoose'
import { connectToDB } from './functions'
//Define score schema
connectToDB()
const ScoreSchema = new mongoose.Schema({
  score: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['A++', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'],
    required: false,
    default: 'C',
  },
})

// Define the ClinicalDuty schema
const PublicationsSchema = new mongoose.Schema({
  title: { type: String },
  journalName: { type: String },
  quartile: {
    type: String,
    enum: ['Q1', 'Q2', 'Q3', 'Q4', 'No Quartile', 'Nil'],
    required: false,
    default: 'No Quartile',
  },
  index: {
    type: String,
    enum: [
      'Medline',
      'Pubmed',
      'CSCI',
      'SCI',
      'DC',
      'Expanded Embase',
      'Scopus',
      'DoAJ',
    ],
    required: false,
    default: 'Medline',
  },
  doi: { type: String },
  authorship: {
    type: String,
    enum: ['First', 'Second', 'Correspondant', 'Others'],
    required: false,
    default: 'First',
  },
  uploadUrl: { type: String },
})

//Define grants schema
const grantsSchema = new mongoose.Schema({
  title: { type: String },
  applied: { type: Number, default: 0 },
  recieved: { type: Number, default: 0 },
  amountCategory: {
    type: String,
    enum: [
      'upto 1 lakh',
      '1 - 5 lakhs',
      '5 - 10 lakhs',
      '10 - 30 lakhs',
      '> 30 lakhs',
      'Nil',
    ],
    default: 'Nil',
  },
  uploadUrl: { type: String },
})

//Define books schema
const booksSchema = new mongoose.Schema({
  authorship: {
    type: String,
    enum: ['Nil', 'Chapter', 'Book'],
    default: 'Nil',
  },
  category: {
    type: String,
    enum: ['Nil', 'National', 'International'],
    default: 'Nil',
  },
})

//Define guidance schema
const guidanceSchema = new mongoose.Schema({
  category: { type: String, enum: ['UG', 'PG', 'PHD', 'Nil'], default: 'Nil' },
  number: { type: Number, default: 0 },
})

const conferencesSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Nil', 'National', 'International'],
    default: 'Nil',
  },
  number: { type: Number, default: 0 },
})

// Define the Research schema
const ResearchSchema = new mongoose.Schema({
  score: { type: ScoreSchema, default: {} },
  publications: { type: [PublicationsSchema], default: [] },
  grants: { type: [grantsSchema], default: [] },
  books: { type: [booksSchema], default: [] },
  guidance: { type: [guidanceSchema], default: [] },
  conferences: { type: [conferencesSchema], default: [] },
})

//Teaching schema
const TeachingSchema = new mongoose.Schema({
  hours: { type: Number, default: 0 },
  clinicalHours: { type: Number, default: 0 },
  studentsFeedback: { type: Number, default: 0 },
})

//Define academics schema
const academicsSchema = new mongoose.Schema({
  score: { type: ScoreSchema, default: {} },
  teaching: { type: TeachingSchema, default: {} },
})

//Define Exam duties schema
const ExamDutiesSchema = new mongoose.Schema({
  category1: {
    type: String,
    enum: [
      'Invigilator/Room Supervisor',
      'Deputy Chief Superintendent',
      'Chief Superintendent',
      'Nil',
    ],
    default: 'Nil',
  },
  category2: {
    type: String,
    enum: ['Internal', 'External', 'Nil'],
    default: 'Nil',
  },
})

//Committee schema
const CommitteeSchema = new mongoose.Schema({
  committeeName: { type: String },
  designation: {
    type: String,
    enum: ['Member', 'Coordinator', 'Head', 'Nil'],
    default: 'Nil',
  },
})

//Conference Schema
const ConferenceSchema = new mongoose.Schema({
  designation: {
    type: String,
    enum: ['Member', 'Coordinator', 'Head', 'Nil'],
    default: 'Nil',
  },
  creditPoints: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
})

//Guest lectures schema
const guestLecturesSchema = new mongoose.Schema({
  number: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['Internal', 'External', 'Nil'],
    default: 'Nil',
  },
})

//Define the professional schema
const professionalSchema = new mongoose.Schema({
  score: { type: ScoreSchema, default: {} },
  clinicalDuty: { patients: { type: Number, default: 0 } },
  postHeld: {
    category: {
      type: String,
      enum: [
        'Lecturer',
        'Assistant Professor',
        'Associate Professor',
        'professor',
        'HOD (Head of Department)',
        'Nil',
      ],
      default: 'Nil',
    },
    default: {},
  },
  examDuties: { type: [ExamDutiesSchema], default: [] },
  committee: { type: [CommitteeSchema], default: [] },
  conferences: { type: [ConferenceSchema], default: [] },
  guestLectures: { type: [guestLecturesSchema], default: 0 },
})

//Define appraisal schema
const AppraisalSchema = new mongoose.Schema({
  research: { type: ResearchSchema, default: {} },
  academics: { type: academicsSchema, default: {} },
  professional: { type: professionalSchema, default: {} },
})

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  designation: { type: String },
  department: { type: String },
  profileUrl: { type: String },
  category: { type: String },
  appraisal: { type: AppraisalSchema, default: {} },
})

// Create the User model
const User = mongoose.models?.user || mongoose.model('user', userSchema)

export default User
