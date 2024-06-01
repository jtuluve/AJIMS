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
    required: false,
    default: 'Nil',
  },
  postheld:{type: String, required: false},
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
  year: { type: Date, required: false },
  pageNo: { type: Number, required: false, default: 0 },
  default: {}
})

//Define grants schema
const grantsSchema = new mongoose.Schema({
  title: { type: String },
  agency: { type: String, default: 0 },
  startyear: { type: Number, required: false, default: 2023 },
  endyear: { type: Number, required: false , default: 2023 },
  utCert: { type: String, required: false },
  workpub: { type: String, 
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
  title: {type: String, required: false},
  year: {type: Number, required: false, default: 2023},
  Certificate: { type: String, required: false },
  bookdetails: { type: String, required: false },
  uploadUrl: { type: String, required: false },
  default: {}
})

//Define guidance schema
const guidanceSchema = new mongoose.Schema({
  category: { type: String, enum: ['UG', 'PG', 'PHD', 'Nil'], default: 'Nil' },
  studentdetails: { type: String, required: false },
  studentupload: { type: String, required: false},
  startdate: { type: Date, required: false },
  enddate: { type: Date, required: false },
  name: { type:String, required: false  },
  title: { type:String, required: false },
  publishstatus: { type:String,enum: ['Yes','No'], required: false},
  year: { type:Number, required: false, default: 2023 },
  Amount: {type:Number, default: 0},
  GrantName: {type:String, required: false },
  Fundedstatus: {type:String, enum: ['Yes','No'],default:'Yes'},
  AgencyName: {type:String, required: false },
  synopsis: {type:String, required: false},
  thesis: { type: String, required: false },
  report: { type: String, required: false },
})

const conferencesSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Nil','Zonal','State', 'National', 'International'],
    default: 'Nil',
  },
  Confname: { 
    type: String, 
    required: false,
  },
  year: {
    type: Date,
    required: false,
  },
  details: {
    type: String,
    required: false,
  },
  attachment: {
    type: String,
    required: false, 
  },
  type: {
    type: String,
    enum: [
      'Poster','Oral','Attending'
    ],
    required: false,
  },
  place:{
    type: String,
    required: false,
  },
  awards: {
    type:String,
    enum: [
      'Yes','No'
    ],
    required: false,
  },
  description: {
    type: String,
    required: false,
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
  hourupload: { type: String, default: '' },
  clinicalHours: { type: Number, default: 0 },
  clinicalHoursupload: { type: String, default: '' },
  studentsFeedback: { type: Number, default: 0 },
  studentsFeedbackupload: { type: String, default: '' },
  resourceMaterial: { type: String, enum: ["Yes", "No"], default: "No" },
  resourceMaterialupload: { type: String, default: '' },
  publicAwarenessWriteup: { type: String, enum: ["Yes", "No"], default: "No" },
  publicAwarenessWriteupupload: { type: String, default: '' },
  cc: {type:Number, default: 0},
  ccupload: { type: String, default: '' },
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
  examDutyFile: { type: String, default: '' }
})

//Committee schema
const CommitteeSchema = new mongoose.Schema({
  committeeName: { type: String },
  designation: {
    type: String,
    enum: ['Member', 'Coordinator', 'Head', 'Nil'],
    default: 'Nil',
  },
  committeeFile: { type: String, default: '' }
})

//Conference Schema
const ConferenceSchema = new mongoose.Schema({
  designation: {
    type: String,
    enum: ['Member', 'Coordinator', 'Head', 'Resourse Person', 'Nil'],
    default: 'Nil',
  },
  creditPoints: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  conferenceFile: { type: String, default: '' }
})

//Guest lectures schema
const guestLecturesSchema = new mongoose.Schema({
  number: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['Internal', 'External', 'Nil'],
    default: 'Nil',
  },
  guestLecturesFile: { type: String, default: '' }
})
const clinicalDuty = new mongoose.Schema({
  patients: { type: Number, default: 0 },
  minorProcedures: { type: Number, default: 0 },
  majorProcedures: { type: Number, default: 0 },
  clinicalDutyFile : { type: String, default: '' }
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
      postHeldFile: {type: String, default: ''}
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
      coordinatorDutyFile: {type: String, default: ''}
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
  Age: { type: Number },
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
  email: { type: String, required: false, unique: true },
  uid: { type: String, required: false, unique: true },
  isAdmin: { type: Boolean, default: false },
  profileUrl: { type: String },
  category: { type: String },
  profile: { type: profileSchema, default: {} },
  appraisal: { type: AppraisalSchema, default: {} },
})

// Create the User model
const User = mongoose.models?.user || mongoose.model('user', userSchema)

export default User
