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
  category: {
    type: String,
    enum: [
      'National',
      'International',
      'Institutional',
      'Nil'
    ],
    required: true,
    default: 'Nil',
  },
  postheld:{type: String, required: true, default: 'Nil'},
  doi: { type: String, required: false },
  authorship: {
    type: String,
    enum: ['First', 'Second', 'Correspondant', 'Others'],
    required: false,
    default: 'First',
  },
  uploadUrl: { type: String, default: 'Nil'},
  author: { type: String, required: false, default: "N/A" },
  volume: { type: Number, required: false, default: 0 },
  issue: { type: Number, required: false, default: 0 },
  year: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: true,
    default: 2024
  },
  pageNo: { type: Number, required: false, default: 0 },
  default: {}
})

//Define grants schema
const grantsSchema = new mongoose.Schema({
  title: { type: String },
  agency: { type: String, default: 0 },
  startYear: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: true,
    default: 2024
  },
  endYear: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: false
  },
  utCert: { type: String, required: false },
  workPub: { type: String, 
    enum: [
      'Yes',
      'No'
    ],
    default:'No'
   },
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
  uploadUrl: { type: String,required: false },
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
  title: {type: String, required: true, default: 'Nil'},
  year: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: true,
    default: 2024
  },
  certificate: { type: String, required: false },
  bookdDetails: { type: String, required: true, default: 'Nil' },
  uploadUrl: { type: String, required: false },
  default: {}
})

//Define guidance schema
const guidanceSchema = new mongoose.Schema({
  category: { type: String, enum: ['UG', 'PG', 'PHD', 'Nil'], default: 'Nil' },
  studentDetails: { type: String, required: true, default: 'Nil' },
  studentUpload: { type: String, required: true, default: 'Nil'},
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true, default: Date.now },
  name: { type:String, required: true, default: 'Nil'  },
  title: { type:String, required: true, default: 'Nil' },
  publishStatus: { type:String, enum: ['Yes','No'], required: true, default: 'Yes'},
  year: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: true,
    default: 2024
  },
  amount: {type:Number, default: 0},
  grantName: {type:String, required: true, default: "Nil" },
  fundedStatus: {type:String, enum: ['Yes','No'], default:'Yes'},
  agencyName: {type:String, required: false},
  synopsisUrl: {type:String, required: false},
  thesisUrl: { type: String, required: false },
  reportUrl: { type: String, required: false },
})

const conferencesSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Nil','Zonal','State', 'National', 'International'],
    default: 'Nil',
  },
  confName: { 
    type: String, 
    required: true,
    default: 'Nil'
  },
  year: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: true,
    default: 2024
  },
  details: {
    type: String,
    required: true,
    default: 'Nil'
  },
  attachment: {
    type: String,
    required: true,
    default: 'Nil' 
  },
  type: {
    type: String,
    enum: [
      'Poster','Oral','Attending'
    ],
    required: true,
    default: 'Poster'
  },
  place:{
    type: String,
    required: true,
    default: 'Nil'
  },
  awards: {
    type:String,
    enum: [
      'Yes','No'
    ],
    required: true,
    default: 'Yes'
  },
  description: {
    type: String,
    required: true,
    default: 'Nil'
  }
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
  hourUpload: { type: String, default: 'Nil' },
  clinicalHours: { type: Number, default: 0 },
  clinicalHoursUpload: { type: String, default: 'Nil' },
  studentsFeedback: { type: Number, default: 0 },
  studentsFeedbackUpload: { type: String, default: 'Nil' },
  resourceMaterial: { type: String, enum: ["Yes", "No"], default: "No" },
  resourceMaterialUpload: { type: String, default: 'Nil' },
  publicAwarenessWriteup: { type: String, enum: ["Yes", "No"], default: "No" },
  publicAwarenessWriteupUpload: { type: String, default: 'Nil' },
  cc: {type:Number, default: 0},
  ccUpload: { type: String, default: 'Nil' },
})

//Define academics schema
const academicsSchema = new mongoose.Schema({
  score: { type: ScoreSchema, default: {} },
  teaching: { type: [TeachingSchema], default: [] },
  fileUrl: { type: String, default: 'Nil' },
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
  examDutyFile: { type: String, default: 'Nil' }
})

//Committee schema
const CommitteeSchema = new mongoose.Schema({
  committeeName: { type: String },
  designation: {
    type: String,
    enum: ['Member', 'Coordinator', 'Head', 'Resource person', 'Nil'],
    default: 'Nil',
  },
  committeeFile: { type: String, default: 'Nil' }
})

//Conference Schema
const ConferenceSchema = new mongoose.Schema({
  designation: {
    type: String,
    enum: ['Member', 'Coordinator', 'Head', 'Resourse Person', 'Nil'],
    default: 'Nil',
  },
  creditPoints: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  conferenceFile: { type: String, default: 'Nil' }
})

//Guest lectures schema
const guestLecturesSchema = new mongoose.Schema({
  number: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['Internal', 'External', 'Nil'],
    default: 'Nil',
  },
  guestLecturesFile: { type: String, default: 'Nil' }
})
const clinicalDuty = new mongoose.Schema({
  patients: { type: Number, default: 0 },
  minorProcedures: { type: Number, default: 0 },
  majorProcedures: { type: Number, default: 0 },
  clinicalDutyFile : { type: String, default: 'Nil' }
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
          'Professor',
          'HOD (Head of Department)',
          'clinical supervisor grade 1',
          'clinical supervisor grade 2',
          'clinical supervisor grade 3',
          'Nil'
        ],
        default: 'Nil',
      },
      postHeldFile: {type: String, default: 'Nil'}
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
      },
      coordinatorDutyFile: {type: String, default: 'Nil'}
    }), default: {}
  },
  committee: { type: [CommitteeSchema], default: [] },
  conferences: { type: [ConferenceSchema], default: [] },
  guestLectures: { type: [guestLecturesSchema], default: 0 },
  fileUrl: { type: String, default: 'Nil' },
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
  dateOfJoining: { type: Date, default: Date.now },
  aadharNo: { type: Number, },
  passportNo: { type: String, },
  phoneNo: { type: Number },
  residentialAddress: { type: String },
  dob: { type: Date },
  age: { type: Number },
  designation: { type: String },
  attachment: { type:String },
  department: { type: String },
  category: { type: String },
  kmcRegistrationNo: { type: String },
  educationalQualification: { type: String },
  experience: { type: String },
  profileUrl: { type: String }
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
