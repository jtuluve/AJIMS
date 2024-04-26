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
  }
})

// Define the ClinicalDuty schema
const PublicationsSchema = new mongoose.Schema({
  title: { type: String },
  journalName: { type: String },
  quartile: {
    type: String,
    enum: ['Q1', 'Q2', 'Q3', 'Q4', 'No Quartile'],
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
      'Nil'
    ],
    required: false,
    default: 'Medline',
  },
  CategoryP: {
    type: String,
    enum: [
      'National',
      'International',
      'Institutional‌',
      'Nil'
    ],
    required: true,
    default: 'Nil',
  },
  doi: { type: String, required: false },
  authorship: {
    type: String,
    enum: ['First', 'Second', 'Correspondant', 'Others'],
    required: false,
    default: 'First',
  },
  uploadUrl: { type: String, default: ''},
  author: { type: String, required: false, default: "N/A" },
  volume: { type: Number, required: false, default: 0 },
  issue: { type: Number, required: false, default: 0 },
  year: { type: Number, required: false, default: 0 },
  pageNo: { type: Number, required: false, default: 0 },
  default: {}
})

//Define grants schema
const grantsSchema = new mongoose.Schema({
  title: { type: String },
  agency: { type: String, default: 0 },
  recieved: { type: String,
    enum:[
      'Yes',
      'No'
    ]
    , default: 'No' },
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
  default: {}
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
  default: {}
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
  resourceMaterial: { type: String, enum: ["Yes", "No"], default: "No" },
  publicAwarenessWriteup: { type: String, enum: ["Yes", "No"], default: "No" },
  cc: {type:Number, default: 0}
})

//Define academics schema
const academicsSchema = new mongoose.Schema({
  score: { type: ScoreSchema, default: {} },
  teaching: { type: TeachingSchema, default: {} },
  fileUrl: { type: String, default: '' },
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
const clinicalDuty = new mongoose.Schema({
  patients: { type: Number, default: 0 },
  minorProcedures: { type: Number, default: 0 },
  majorProcedures: { type: Number, default: 0 },
});
//Define the professional schema
const professionalSchema = new mongoose.Schema({
  score: { type: ScoreSchema, default: {} },
  clinicalDuty: { type: clinicalDuty, default: {} },
  postHeld: {
    type: new mongoose.Schema({
      category: {
        type: String,
        enum: [
          'Lecturer',
          'Assistant Professor',
          'Associate Professor',
          'professor',
          'HOD (Head of Department)',
          'clinical supervisor grade 1',
          'clinical supervisor grade 2',
          'clinical supervisor grade 3',
          'Nil',
        ],
        default: 'Nil',
      }
    }),
    default: {},
  },
  examDuties: { type: [ExamDutiesSchema], default: [] },
  coordinatorDuty: {
    type: new mongoose.Schema({
      category: {
        type: String,
        enum: [
          '1st year',
          '2nd year',
          '3rd year',
          'internship',
          'clinical conference',
          'camp',
          'Nil',
        ],
        default: 'Nil',
      }
    }), default: {}
  },
  committee: { type: [CommitteeSchema], default: [] },
  conferences: { type: [ConferenceSchema], default: [] },
  guestLectures: { type: [guestLecturesSchema], default: 0 },
  fileUrl: { type: String, default: '' },
})

//Define appraisal schema
const AppraisalSchema = new mongoose.Schema({
  research: { type: ResearchSchema, default: {} },
  academics: { type: academicsSchema, default: {} },
  professional: { type: professionalSchema, default: {} },
  overallScore: { type: ScoreSchema, default: {} },
})

const profileSchema = new mongoose.Schema({
  name: { type: String },
  dateOfJoining: { type: String, default: new Date().toISOString().slice(0, 10) },
  aadharNo: { type: Number, },
  passportNo: { type: String, },
  phoneNo: { type: Number },
  residentialAddress: { type: String },
  dob: { type: String },
  designation: { type: String },
  department: { type: String },
  category: { type: String },
  kmcRegistrationNo: { type: Number },
  educationalQualification: { type: String },
  experience: { type: String }
})

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  uid: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  profileUrl: { type: String },
  category: { type: String },
  profile: { type: profileSchema, default: {} },
  appraisal: { type: AppraisalSchema, default: {} },
})

// Create the User model
const User = mongoose.models?.user || mongoose.model('user', userSchema)

export default User
