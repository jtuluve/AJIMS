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
  pageNo?: number;
}

// Define grants schema interface
interface Grant {
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
interface Book {
  _id?: string;
  authorship?: "Nil" | "Chapter" | "Book";
  category?: "Nil" | "National" | "International";
  title?: string;
  year?: number;
  certificate?: string;
  bookdDetails?: string;
  uploadUrl?: string;
}

// Define guidance schema interface
interface Guidance {
  _id?: string;
  category?: "UG" | "PG" | "PHD" | "Nil";
  studentDetails?: string;
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

interface Conference {
  _id?: string;
  category?: "Nil" | "Zonal" | "State" | "National" | "International";
  confName?: string;
  year?: number;
  details?: string;
  attachment?: string;
  type?: "Poster" | "Oral" | "Attending";
  place?: string;
  awards?: "Yes" | "No";
  description?: string;
}

// Define the Research schema interface
interface Research {
  _id?: string;
  score?: Score;
  publications?: Publication[];
  grants?: Grant[];
  books?: Book[];
  guidance?: Guidance[];
  conferences?: Conference[];
}

// Define Teaching schema interface
interface Teaching {
  _id?: string;
  hours?: number;
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
interface Academic {
  _id?: string;
  score?: Score;
  teaching?: Teaching[];
  fileUrl?: string;
}

// Define ExamDuties schema interface
interface ExamDuty {
  _id?: string;
  category1?: "Invigilator/Room Supervisor" | "Deputy Chief Superintendent" | "Chief Superintendent" | "Nil";
  category2?: "Internal" | "External" | "Nil";
  examDutyFile?: string;
}

// Define Committee schema interface
interface Committee {
  _id?: string;
  committeeName?: string;
  designation?: "Member" | "Coordinator" | "Head" | "Nil" | "Resource person";
  committeeFile?: string;
}

// Define Conference schema interface
interface ConferenceSchema {
  _id?: string;
  designation?: "Member" | "Coordinator" | "Head" | "Nil";
  creditPoints?: "Yes" | "No";
  conferenceFile?: string;
}

// Define Guest lectures schema interface
interface GuestLecture {
  _id?: string;
  number?: number;
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
  committee?: Committee[];
  conferences?: ConferenceSchema[];
  guestLectures?: GuestLecture[];
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

// Define profile schema interface
interface Profile {
  _id?: string;
  name?: string;
  dateOfJoining?: string;
  aadharNo?: number;
  passportNo?: string;
  phoneNo?: number;
  residentialAddress?: string;
  dob?: string;
  age?: number; 
  designation?: string;
  attachment?: string;
  department?: string;
  category?: string;
  kmcRegistrationNo?: number;
  educationalQualification?: string;
  experience?: string;
  profileUrl?: string;
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
  designation?: string;
  department?: string;
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

