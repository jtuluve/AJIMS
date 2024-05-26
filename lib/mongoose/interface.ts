// Define score schema interface
interface Score {
  score?: number;
  category?: "A++" | "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C";
}

// Define Publications schema interface
interface Publication {
  title?: string;
  journalName?: string;
  quartile?: "Q1" | "Q2" | "Q3" | "Q4" | "No Quartile";
  index?: "Medline" | "Pubmed" | "CSCI" | "SCI" | "DC" | "Expanded Embase" | "Scopus" | "DoAJ" | "Nil";
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
  title?: string;
  agency?: string;
  recieved?: "Yes" | "No";
  amountCategory?: "upto 1 lakh" | "1 - 5 lakhs" | "5 - 10 lakhs" | "10 - 30 lakhs" | "> 30 lakhs" | "Nil";
  uploadUrl?: string;
}

// Define books schema interface
interface Book {
  authorship?: "Nil" | "Chapter" | "Book";
  category?: "Nil" | "National" | "International";
}

// Define guidance schema interface
interface Guidance {
  category?: "UG" | "PG" | "PHD" | "Nil";
  number?: number;
}

interface Conference {
  category?: "Nil" | "National" | "International";
  number?: number;
}

// Define the Research schema interface
interface Research {
  score?: Score;
  publications?: Publication[];
  grants?: Grant[];
  books?: Book[];
  guidance?: Guidance[];
  conferences?: Conference[];
}

// Define Teaching schema interface
interface Teaching {
  hours?: number;
  clinicalHours?: number;
  studentsFeedback?: number;
  resourceMaterial?: "Yes" | "No";
  publicAwarenessWriteup?: "Yes" | "No";
  cc?: number;
}

// Define academics schema interface
interface Academic {
  score?: Score;
  teaching?: Teaching;
  fileUrl?: string;
}

// Define ExamDuties schema interface
interface ExamDuty {
  category1?: "Invigilator/Room Supervisor" | "Deputy Chief Superintendent" | "Chief Superintendent" | "Nil";
  category2?: "Internal" | "External" | "Nil";
}

// Define Committee schema interface
interface Committee {
  committeeName?: string;
  designation?: "Member" | "Coordinator" | "Head" | "Nil";
}

// Define Conference schema interface
interface ConferenceSchema {
  designation?: "Member" | "Coordinator" | "Head" | "Nil";
  creditPoints?: "Yes" | "No";
}

// Define Guest lectures schema interface
interface GuestLecture {
  number?: number;
  category?: "Internal" | "External" | "Nil";
}

// Define clinicalDuty schema interface
interface ClinicalDuty {
  patients?: number;
  minorProcedures?: number;
  majorProcedures?: number;
}

// Define the professional schema interface
interface Professional {
  score?: Score;
  clinicalDuty?: ClinicalDuty;
  postHeld?: {
    category?: "Lecturer" | "Assistant Professor" | "Associate Professor" | "Professor" | "HOD (Head of Department)" | "clinical supervisor grade 1" | "clinical supervisor grade 2" | "clinical supervisor grade 3" | "Nil";
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
  research?: Research;
  academics?: Academic;
  professional?: Professional;
  overallScore?: Score;
}

// Define profile schema interface
interface Profile {
  name?: string;
  dateOfJoining?: string;
  aadharNo?: number;
  passportNo?: string;
  phoneNo?: number;
  residentialAddress?: string;
  dob?: string;
  designation?: string;
  department?: string;
  category?: string;
  kmcRegistrationNo?: number;
  educationalQualification?: string;
  experience?: string;
  profileUrl?: string;
}

// Define the User schema interface
export interface UserDocument {
  name?: string;
  email: string; // Required
  uid: string; // Required
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
  file?: File
  name?: string
  fileUrl?: string
  filePerc?: number
  message?: string
  error?: Error
}

