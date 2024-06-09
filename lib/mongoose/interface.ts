import { Document } from "mongoose";

// Define score schema interface
interface Score {
  _id?: string;
  score?: number;
  category?: "A++" | "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C";
}

// Define Publications schema interface
interface Publication {
  _id?: string;
  title?: string;
  journalName?: string;
  quartile?: "Q1" | "Q2" | "Q3" | "Q4" | "No Quartile";
  index?: "Medline" | "Pubmed" | "CSCI" | "SCI" | "DC" | "Expanded Embase" | "Scopus" | "DoAJ" | "Nil";
  category?: "National" | "International" | "Institutional" | "Nil";
  postheld?: string;
  doi?: string;
  authorship?: "First" | "Second" | "Correspondant" | "Others";
  uploadUrl?: string;
  author?: string;
  volume?: number;
  issue?: number;
  year?: number;
  pageNo?: string;
}

// Define grants schema interface
 export interface Grant {
  _id?: string;
  title?: string;
  agency?: string;
  startYear?: number;
  endYear?: number;
  utCert?: string;
  workPub?: "Yes" | "No";
  recieved?: "Yes" | "No";
  amountCategory?: "upto 1 lakh" | "1 - 5 lakhs" | "5 - 10 lakhs" | "10 - 30 lakhs" | "> 30 lakhs" | "Nil";
  uploadUrl?: string;
}

// Define books schema interface
 export interface Book {
  _id?: string;
  authorship?: "Nil" | "Chapter" | "Book";
  category?: "Nil" | "National" | "International";
  title?: string;
  chapters?: number;
  year?: number;
  certificate?: string;
  bookDetails?: number;
  uploadUrl?: string;
}

// Define guidance schema interface
 export interface Guidance {
  _id?: string;
  category?: "UG" | "PG" | "PHD" | "Nil";
  studentDetails?: string;
  studentCourse?: string,
  studentUpload?: string;
  startDate?: Date;
  endDate?: Date;
  name?: string;
  title?: string;
  publishStatus?: "Yes" | "No";
  year?: number;
  amount?: number;
  grantName?: string;
  fundedStatus?: "Yes" | "No";
  agencyName?: string;
  synopsisUrl?: string;
  thesisUrl?: string;
  reportUrl?: string;
}

 export interface Conference {
  _id?: string;
  category?: "Nil" | "Zonal" | "State" | "National" | "International";
  confName?: string;
  year?: number;
  details?: string;
  attachment?: string;
  typeC?: "Poster" | "Oral" | "Attending";
  place?: string;
  awards?: "Yes" | "No";
  description?: string;
  certificateUpload: string;
}

 export interface Patent {
  _id?: string;
  patentCountry?: string;
  patentNumber?: string;
  patentType?: string;
  title?: string;
  date?: Date;
  patentcert?: string,
  detailsOfInventors?: {
    number?: number;
    name?: string;
    institute?: string;
  }[];
}

// Define the Research schema interface
 export interface Research {
  _id?: string;
  score?: Score;
  publications?: Publication[];
  grants?: Grant[];
  books?: Book[];
  guidance?: Guidance[];
  conferences?: Conference[];
  patents?: Patent[];
}

// Define Teaching schema interface
 export interface Teaching {
  _id?: string;
  hours?: number;
  hourUpload?: string;
  clinicalHours?: number;
  clinicalHoursUpload?: string;
  studentsFeedback?: number;
  studentsFeedbackUpload?: string;
  resourceMaterial?: "Yes" | "No";
  resourceMaterialUpload?: string;
  publicAwarenessWriteup?: "Yes" | "No";
  publicAwarenessWriteupUpload?: string;
  cc?: number;
  ccUpload?: string;
}

// Define academics schema interface
 export interface Academic {
  _id?: string;
  score?: Score;
  teaching?: Teaching[];
  fileUrl?: string;
}

// Define ExamDuties schema interface
 export interface ExamDuty {
  _id?: string;
  category1?: "Invigilator/Room Supervisor" | "Deputy Chief Superintendent" | "Chief Superintendent" | "Nil";
  category2?: "Internal" | "External" | "Nil";
  examDutyFile?: string;
}

// Define Committee schema interface
 export interface Committee {
  _id?: string;
  committeeName?: string;
  designation?: "Member" | "Coordinator" | "Head" | "Nil" | "Resource person";
  committeeFile?: string;
}

// Define Conference schema interface
 export interface ConferenceSchema {
  _id?: string;
  designation?: "Member" | "Coordinator" | "Head" | "Nil";
  creditPoints?: "Yes" | "No";
  conferenceFile?: string;
  attendieDetails: string;
  conferenceName?: string;
}

// Define Guest lectures schema interface
 export interface GuestLecture {
  _id?: string;
  title?: string;
  category?: "Internal" | "External" | "Nil";
  guestLecturesFile?: string;
}

// Define clinicalDuty schema interface
interface ClinicalDuty {
  _id?: string;
  patients?: number;
  minorProcedures?: number;
  majorProcedures?: number;
  clinicalDutyFile?: string;
}
interface Achievement {
  _id?: string;
  serialNo?: string;
  year?: number;
  information?: string;
}

// Define the professional schema interface
interface Professional {
  _id?: string;
  score?: Score;
  clinicalDuty?: ClinicalDuty;
  postHeld?: {
    category?: "Lecturer" | "Assistant Professor" | "Associate Professor" | "Professor" | "HOD (Head of Department)" | "clinical supervisor grade 1" | "clinical supervisor grade 2" | "clinical supervisor grade 3" | "Nil";
    postHeldFile?: string;
  };
  examDuties?: ExamDuty[];
  coordinatorDuty?: {
    category?: "1st year" | "2nd year" | "3rd year" | "internship" | "clinical conference" | "camp" | "Nil";
  };
  coordinatorDutyFile?: string;
  committee?: Committee[];
  conferences?: ConferenceSchema[];
  guestLectures?: GuestLecture[];
  achievements?: Achievement[];
  fileUrl?: string;
}

// Define appraisal schema interface
interface Appraisal {
  _id?: string;
  research?: Research;
  academics?: Academic;
  professional?: Professional;
  overallScore?: Score;
}

interface EducationalQualification {
  degree?: "MBBS" | "MD/MS" | "DM/MCh" | "PhD";
  year?: number;
  collegeName?: string;
  regNumWithDate?: string;
  medicalCouncilName?: string;
}

interface Experience {
  designationE?: "Junior Resident" | "Senior Resident" | "Demonstrator" | "Tutor" | "Asst. Professor" | "Assoc. Professor" | "Professor";
  departmentE?: string;
  institution?: string;
  from?: Date;
  to?: Date;
  total?: string;
}

interface Appearance {
  status?: "Yes" | "No";
  center?: "Yes" | "No";
  observership?: "Yes" | "No";
  certs?: "Yes" | "No";
  upload?: string; // file 4
}

interface InspectionDetail {
  designationI?: string;
  subject?: string;
  collegeI?: string;
  dates?: string;
}

interface Lecture {
  dateL?: Date;
  typeL?: string;
  topic?: string;
}

interface Detail {
  detailsName?: string;
  designation?: string;
  dateD?: Date;
  relieveReason?: string;
  verification?: "Yes" | "No";
  verificationFile?: string; // file 7
}

interface Emolument {
  month?: "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
  year?: number;
  amount?: number;
  tds?: number;
}

// Define profile schema interface
interface Profile {
  name?: string;
  dateOfJoining?: Date;
  aadharNo?: number;
  passportNo?: string;
  phoneNo?: number;
  residentialAddress?: string;
  dob?: Date;
  age?: number;
  designation?: string;
  attachment?: string;
  department?: string;
  category?: string;
  kmcRegistrationNo?: string;
  educationalQualification?: EducationalQualification[];
  experience?: Experience[];
  orcIdNo?: string;
  emailaddress? :string;
  profileUrl?: string;
  appointmentOrderStatus?: "Yes" | "No";
  instituteName?: string;
  cityName?: string;
  appointmentType1?: "Regular" | "Contractual" | "Ad-hoc basis";
  appointmentType2?: "Full time" | "Part time";
  appointmentType3?: "With Private practice" | "Without Private practice";
  ugpgName?: string;
  college?: string;
  collegeN?: string;
  sameClgAcpt?: "Yes" | "No";
  sameDestAcpt?: "Yes" | "No";
  retiredStatus?: "Yes" | "No";
  retireDestination?: string;
  perAddress?: string;
  residenceProofStatus?: "Yes" | "No";
  residenceProof?: string; // file 1
  officeTel?: number;
  residenceTel?: number;
  joiningStatus?: "Yes" | "No";
  joiningReport?: string;
  joiningLetter?: string;
  appearance?: Appearance[];
  mdmsSubject?: string;
  dmmchSubject?: string;
  phdSubject?: string;
  certStatus?: "Yes" | "No";
  regStatus?: "Yes" | "No";
  certUpload?: string; // file 5
  regUpload?: string; // file 6
  inspectionDetails?: InspectionDetail[];
  numberOfLectures?: Lecture[];
  details?: Detail[];
  panNo?: string;
  emoluments?: Emolument[];
}


// Define the User schema interface
export interface UserDocument extends Document {
  _id?: string;
  name?: string;
  email?: string;
  uid?: string;
  isAdmin?: boolean;
  profileUrl?: string;
  category?: string;
  emailaddress: string;
  designation?: string;
  profile?: Profile;
  appraisal?: Appraisal;
}

export interface AdminContextType {
	users: UserDocument[];
}

export interface FileState {
  name: string;
  required: boolean;
  url?: string;
}

