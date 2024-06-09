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
    required: false,
    default: 'Nil',
  },
  postheld: { type: String, required: false, default: 'Nil' },
  doi: { type: String, required: false },
  authorship: {
    type: String,
    enum: ['First', 'Second', 'Correspondant', 'Others'],
    required: false,
    default: 'First',
  },
  uploadUrl: { type: String },
  author: { type: String, required: false, default: "N/A" },
  volume: { type: Number, required: false, default: 0 },
  issue: { type: Number, required: false, default: 0 },
  year: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: false,
    default: 2024
  },
  pageNo: { type: String, required: false, default: 0 },
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
    required: false,
    default: 2024
  },
  endYear: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: false
  },
  recieved: {
    type: String,
    enum: [
      'Yes',
      'No'
    ],
    default: 'No'
  },
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
  workPub: {
    type: String,
    enum: [
      'Yes',
      'No'
    ],
    default: 'No'
  },
  uploadUrl: { type: String, required: false },
  utCert: { type: String, required: false },
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
  title: { type: String, required: false, default: 'Nil' },
  chapters: { type: Number, required: false, default: 0 },
  year: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: false,
    default: 2024
  },
  certificate: { type: String, required: false },
  bookDetails: { type: String, required: false, default: 'Nil' },
  uploadUrl: { type: String, required: false },
  default: {}
})

//Define guidance schema
const guidanceSchema = new mongoose.Schema({
  category: { type: String, enum: ['UG', 'PG', 'PHD', 'Nil'], default: 'Nil' },
  studentDetails: { type: String, required: false, default: 'Nil' },
  studentCourse: { type: String, required: false, default: 'Nil' },
  startDate: { type: Date, required: false, default: Date.now },
  endDate: { type: Date, required: false, default: Date.now },
  name: { type: String, required: false, default: 'Nil' },
  title: { type: String, required: false, default: 'Nil' },
  year: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: false,
    default: 2024
  },
  grantName: { type: String, required: false, default: "Nil" },
  fundedStatus: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  agencyName: { type: String, required: false },
  studentUpload: { type: String, required: false },
  amount: { type: Number, default: 0 },
  publishStatus: { type: String, enum: ['Yes', 'No'], required: false, default: 'Yes' },
  synopsisUrl: { type: String, required: false },
  thesisUrl: { type: String, required: false },
  reportUrl: { type: String, required: false },
})

const conferencesSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Nil', 'Zonal', 'State', 'National', 'International'],
    default: 'Nil',
  },
  confName: {
    type: String,
    required: false,
    default: 'Nil'
  },
  year: {
    type: Number,
    min: [1800, 'Enter a valid year'],
    max: [2150, 'Enter a valid year'],
    required: false,
    default: 2024
  },
  details: {
    type: String,
    required: false,
    default: 'Nil'
  },
  attachment: {
    type: String,
    required: false,
    default: 'Nil'
  },
  typeC: {
    type: String,
    enum: [
      'Poster', 'Oral', 'Attending'
    ],
    required: false,
    default: 'Poster'
  },
  awards: {
    type: String,
    enum: [
      'Yes', 'No'
    ],
    required: false,
    default: 'Yes'
  },
  description: {
    type: String,
    required: false,
    default: 'Nil'
  },
  certificateUpload: { type: String }
})

// Define the Research schema
const ResearchSchema = new mongoose.Schema({
  score: { type: ScoreSchema, default: {} },
  publications: { type: [PublicationsSchema], default: [] },
  grants: { type: [grantsSchema], default: [] },
  books: { type: [booksSchema], default: [] },
  guidance: { type: [guidanceSchema], default: [] },
  conferences: { type: [conferencesSchema], default: [] },
  patents: [new mongoose.Schema({
    patentCountry: { type: String },
    patentNumber: { type: String },
    patentType: { type: String },
    title: { type: String },
    date: { type: Date },
    patentcert: { type: String },
    detailsOfInventors: [new mongoose.Schema({
      number: { type: Number },
      name: { type: String },
      institute: { type: String }
    })],
  })],
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
  cc: { type: Number, default: 0 },
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
  examDutyFile: { type: String }
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
  conferenceFile: { type: String, default: 'Nil' },
  attendieDetails: { type: String },
  conferenceName: { type: String }
})

//Guest lectures schema
const guestLecturesSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  category: {
    type: String,
    enum: ['Internal', 'External', 'Nil'],
    default: 'Internal',
  },
  guestLecturesFile: { type: String, default: 'Nil' }
})
const clinicalDuty = new mongoose.Schema({
  patients: { type: Number, default: 0 },
  minorProcedures: { type: Number, default: 0 },
  majorProcedures: { type: Number, default: 0 },
  clinicalDutyFile : { type: String }
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
      postHeldFile: {type: String}
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
      coordinatorDutyFile: {type: String}
    }), default: {}
  },
  committee: { type: [CommitteeSchema], default: [] },
  conferences: { type: [ConferenceSchema], default: [] },
  guestLectures: { type: [guestLecturesSchema], default: 0 },
  fileUrl: { type: String }, 
  achievements: [new mongoose.Schema({
    serialNo: { type: String },
    year: {
      type: Number,
      min: [1800, 'Enter a valid year'],
      max: [2150, 'Enter a valid year'],
      required: true,
      default: 2024
    },
    information: { type: String }
  })],
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
  collegeN: { type: String },
  dateOfJoining: { type: Date, default: Date.now },
  aadharNo: { type: Number, },
  passportNo: { type: String, },
  phoneNo: { type: Number },
  residentialAddress: { type: String },
  dob: { type: Date },
  age: { type: Number },
  designation: { type: String },
  attachment: { type:String },
  department: {
    type: String,
    enum: [
      "Anaesthesiology",
      "Anatomy",
      "Biochemistry",
      "Community Medicine",
      "Dermatology",
      "Forensic Medicine",
      "General Medicine",
      "General Surgery",
      "Microbiology",
      "OBG",
      "Ophthalmology",
      "Orthopaedics",
      "Paediatrics",
      "Pathology",
      "Pharmacology",
      "Physiology",
      "Psychiatry",
      "Radio Diagnosis",
      "ENT",
      "Plastic & Reconstructive Surgery",
      "Neurology",
      "Cardiology",
      "Cardiothoracic & Vascular Surgery",
      "Medical Education",
      "Research Center",
      "Respiratory Medicine",
      "Urology",
      "Endocrinology"
    ]
  },
  category: { type: String },
  kmcRegistrationNo: { type: String },
  educationalQualification: [new mongoose.Schema({
    degree: { type: String, enum: ["MBBS", "MD/MS", "DM/MCh", "PhD"] },
    year: {
      type: Number,
      min: [1800, 'Enter a valid year'],
      max: [2150, 'Enter a valid year'],
      required: true,
      default: 2024
    },
    collegeName: { type: String },
    regNumWithDate: { type: String },
    medicalCouncilName: { type: String }
  })],
  experience: [new mongoose.Schema({
    designationE: { type: String, enum: ["Junior Resident", "Senior Resident", "Demonstrator", "Tutor", "Asst. Professor", "Assoc. Professor", "Professor"], default:'Professor' },
    departmentE: { type: String },
    institution: { type: String },
    from: { type: Date },
    to: { type: Date },
    total: { type: String }
  })],
  orcIdNo: { type: String },
  profileUrl: { type: String, default:'user.png' },
  appointmentOrderStatus: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  instituteName: { type: String, default: '' },
  cityName: { type: String, default: '' },
  appointmentType1: { type: String, enum: ['Regular', 'Contractual', 'Ad-hoc basis'], default: 'Regular' },
  appointmentType2: { type: String, enum: ['Full time', 'Part time'], default: 'Full time' },
  appointmentType3: { type: String, enum: ['With Private practice', 'Without Private practice'], default: 'Without Private practice' },
  ugpgName: { type: String, default: '' },
  college: { type: String, default: '' },
  sameClgAcpt: { type: String, enum: ['Yes', 'No'], default: 'No' },
  sameDestAcpt: { type: String, enum: ['Yes', 'No'], default: 'No' },
  retiredStatus: { type: String, enum: ['Yes', 'No'], default: 'No' },
  retireDestination: { type: String, default: '' },
  perAddress: { type: String, default: '' },
  residenceProofStatus: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  residenceProof: { type: String },
  officeTel: { type: Number },
  residenceTel: { type: Number },
  emailaddress: { type:String },
  joiningStatus: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
  joiningReport: { type: String },
  joiningLetter: { type: String },
  appearance: [new mongoose.Schema({
    status: { type: String, enum: ["Yes", "No"], default: 'No' },
    center: { type: String, enum: ["Yes", "No"], default: 'No' },
    observership: { type: String, enum: ["Yes", "No"], default: 'No' },
    certs: { type: String, enum: ["Yes", "No"], default: 'No' },
    upload: { type: String },
  })],
  mdmsSubject: { type: String, default: '' },
  dmmchSubject: { type: String, default: '' },
  phdSubject: { type: String, default: '' },
  certStatus: { type: String, enum: ["Yes", "No"], default: 'No' },
  regStatus: { type: String, enum: ["Yes", "No"], default: 'No' },
  certUpload: { type: String },
  regUpload: { type: String },
  inspectionDetails: [new mongoose.Schema({
    designationI: { type: String, default: '' },
    subject: { type: String, default: '' },
    collegeI: { type: String, default: '' },
    dates: { type: String, default: '' },
  })],
  numberOfLectures: [new mongoose.Schema({
    dateL: { type: Date },
    typeL: { type: String, default: '' },
    topic: { type: String, default: '' }
  })
  ],
  details: [new mongoose.Schema({
    detailsName: { type: String, default: 0 },
    designation: { type: String, default:'' },
    dateD: { type: Date },
    relieveReason: { type: String, enum: ["Tendered resignation", "Retired", "Transferred", "Terminated"], default: 'Transferred' },
    verification: { type: String, emun:[ 'Yes', 'No' ],default: 'No' },
    verificationFile: { type: String }
  })
  ],
  panNo: { type: String, default: '' },
  emoluments: [new mongoose.Schema({
    month: { type: String, enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], default: 'Jan' },
    year: {
      type: Number,
      min: [1800, 'Enter a valid year'],
      max: [2150, 'Enter a valid year'],
      required: true,
      default: 2024
    },
    amount: { type: Number, default: 0 },
    tds: { type: Number, default: '' }
  })
  ],
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