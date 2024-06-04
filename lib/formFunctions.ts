'use server';
//get inputs details
export async function getInput(type: string) {
  let inputs = {
    profile: [
      {
        "name": "collegeName",
        "type": "text",
        "label": "Name of the College",
        "placeholder":"Enter the name of the college",
        "required": false,
        "default": ''
      },
      {
        "name": "name",
        "type": "text",
        "label": "Name",
        "placeholder": "(Last name) (First name) (Middle name)",
        "required": false,
        "default": ''
      },
      {
        "name": "age",
        "type": "number",
        "label": "Age",
        "placeholder": "Enter your Age",
        "required": false,
        "default": ''
      },
      {
        "name": "dob",
        "type": "date",
        "label": "Date of Birth",
        "required": false,
        "default": ''
      },
      {
        "name": "profileUrl",
        "type": "file",
        "label": "Profile Photo",
        "required": false,
        "default": ''
      },
      {
        "name": "designation",
        "type": "text",
        "label": "Designation",
        "placeholder": "Enter Designation",
        "required": false,
        "default": ''
      },
      {
        "name": "appointmentOrderStatus",
        "type": "select",
        "label": "Appointment Order: Certified copy of order at this institute attached",
        "options": ["Yes", "No"],
        "default": "Yes",
      },
      {
        "name": "attachment",
        "type": "file",
        "label": "Upload Appointment order",
        "required": false,
        "default": ''
      },
      {
        "name": "department",
        "type": "select",
        "label": "Department",
        "options":["Anaesthesiology","Anatomy","Biochemistry","Community Medicine","Dermatology","Forensic Medicine","General Medicine","General Surgery","Microbiology","OBG","Ophthalmology","Orthopaedics","Paediatrics","Pathology","Pharmacology","Physiology","Psychiatry","Radio Diagnosis","ENT","Plastic & Reconstructive Surgery","Neurology","Cardiology","Cardiothoracic & Vascular Surgery","Medical Education","Research Center","Respiratory Medicine","Urology","Endocrinology"],
        "required": false,
        "default": 'Anatomy'
      },
      {
        "name": "instituteName",
        "type": "text",
        "label": "Institute Name",
        "placeholder": "Enter College/ Institute",
        "default": ""
      },
      {
        "name": "cityName",
        "type": "text",
        "label": "City Name",
        "placeholder": "Enter City/ District",
        "default": ""
      },
      {
        "name": "appointmentType1",
        "type": "select",
        "label": "Regular/ Contractual/ Ad - hoc basis",
        "options": ["Regular", "Contractual", "Ad-hoc basis"],
        "default": "Regular"
      },
      {
        "name": "appointmentType2",
        "type": "select",
        "label": "Full time/ Part time",
        "options": ["Full time", "Part time"],
        "default": "Full time"
      },
      {
        "name": "appointmentType3",
        "type": "select",
        "label": "With Private practice/ Without Private practice",
        "options": ["With Private practice", "Without Private practice"],
        "default": "Without Private practice"
      },
      {
        "name": "ugpgName",
        "type": "text",
        "label": "Date of appearance in last MCI/NMC assessment: UG/PG Type",
        "placeholder":"Enter the UG/ PG/ Any other",
        "default": ""
      },
      {
        "name": "college",
        "type": "text",
        "label": "Date of appearance in last MCI/NMC assessment: Name of College",
        "placeholder": "Enter the Name of College",
        "default": ""
      },
      {
        "name": "sameClgAcpt",
        "type": "select",
        "label": "Date of appearance in last MCI/NMC assessment: Whether appeared and accepted at the same College",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "sameDestAcpt",
        "type": "select",
        "label": "Date of appearance in last MCI/NMC assessment: Whether appeared and accepted at the same Designation",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "retiredStatus",
        "type": "select",
        "label": "Date of appearance in last MCI/NMC assessment: Whether retired from Government Medical College",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "retireDestination",
        "type": "text",
        "label": "Date of appearance in last MCI/NMC assessment: Ifretired from Government Medical College, destination at the time of retirement",
        "placeholder":"Enter the destination at the time of retirement ",
        "default": ""
      },
      {
        "name": "residentialAddress",
        "type": "text",
        "label": "Present Address",
        "placeholder":"Enter Present Address",
        "required": false,
        "default": ''
      },
      {
        "name": "perAddress",
        "type": "text",
        "label": "Permanent Address",
        "placeholder": "Enter Permanent Address",
        "default": ""
      },
      {
        "name": "residenceProofStatus",
        "type": "select",
        "label": "Copy of Proof of Residence submitted and original verified",
        "options": ["Yes", "No"],
        "default": "Yes"
      },
      {
        "name": "residenceProof",
        "type": "file",
        "label": "(only copies of Passport/ Adhar card/ Voter ID/ Passport/ Electricity bill/ Landline Phone bill will be considered)",
        "default": ''
      },
      {
        "name": "officeTel",
        "type": "number",
        "label": "Office telephone with STD code",
        "placeholder": "Enter Office telephone with STD code",
        "default": ''
      },
      {
        "name": "residenceTel",
        "type": "number",
        "label": "Residence telephone with STD code",
        "placeholder": "Enter Residence telephone with STD code",
        "default": ''
      },
      {
        "name": "phoneNo",
        "type": "number",
        "label": "Mobile Phone Number",
        "placeholder":"Enter the Mobile Phone Number",
        "required": false,
        "default": ''
      },
      {
        "name": "emailaddress",
        "type": "text",
        "label": "Email address",
        "placeholder": "Enter the Email address",
        "required": false,
        "default": ''
      },
      {
        "name": "dateOfJoining",
        "type": "date",
        "label": "Date of Joining the present institution",
        "required": false,
        "default": ''
      },
      {
        "name": "joiningLetter",
        "type": "file",
        "label": "Joining Letter Upload",
        "default": ''
      },
      {
        "name": "joiningStatus",
        "type": "select",
        "label": "Joining report verified/ attached",
        "options": ["Yes", "No"],
        "default": "Yes"
      },
      {
        "name": "joiningReport",
        "type": "file",
        "label": "Joining Report Upload",
        "default": ''
      },
      {
        "name": "appearance",
        "type": "table",
        "label": "Have you atteneded the Basic Course Workshop (BCME), Curriculum Implementation Support Programme (CISP-i/ii/iii), Advanced Course in Medical Education (ACME) for training in MET",
        "inputs": [
          {
            "name": "status",
            "type": "select",
            "label": "Attended",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "center",
            "type": "select",
            "label": "at MCI/ NMC Regional MET Centre",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "observership",
            "type": "select",
            "label": "at your college under Regional/ Nodal Centre observership",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "certs",
            "type": "select",
            "label": "Any other MET certificates may be attached",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "upload",
            "type": "file",
            "label": "Uploads",
            "default": ''
          }
        ]
      },
      {
        "name": "educationalQualification",
        "type": "table",
        "label": "Educational Qualifications",
        "inputs": [
          {
            "name": "degree",
            "type": "select",
            "label": "Degree",
            "options": ["MBBS", "MD/MS", "DM/MCh", "PhD"],
            "default": 'MBBS'
          },
          {
            "name": "year",
            "type": "number",
            "properties": { "min": 1800, "max": 2150, "step": 1 },
            "label": "Year",
            "placeholder": "Enter the Year of Publication",
            "required": false,
            "default": ''
          }, 
          {
            "name": "collegeName",
            "type": "text",
            "label": "Name of College & University",
            "placeholder": "Enter the Name of College & University",
            "required": false,
            "default": ''
          },
          {
            "name": "regNumWithDate",
            "type": "text",
            "label": "Register number with date of registration",
            "placeholder": "Enter the Register number with date of registration",
            "required": false,
            "default": ''
          },
          {
            "name": "medicalCouncilName",
            "type": "text",
            "label": "Name of State Medical council",
            "placeholder": "Enter the Name of State Medical council",
            "required": false,
            "default": ''
          }
        ],
        "required": false
      },
      {
        "name": "mdmsSubject",
        "type": "text",
        "label": "MD/MS Subject",
        "placeholder":"Enter the MD/MS Subject ",
        "default": ""
      },
      {
        "name": "dmmchSubject",
        "type": "text",
        "label": "DM/MCh Subject",
        "placeholder": "Enter the DM/MCh Subject ",
        "default": ""
      },
      {
        "name": "phdSubject",
        "type": "text",
        "label": "PhD Subject",
        "placeholder": "Enter the PhD Subject",
        "default": ""
      },
      {
        "name": "certStatus",
        "type": "select",
        "label": "Copies of educational qualifications: Copies of MBBS & PG Degree certificates verified and attached",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "certUpload",
        "type": "file",
        "label": "Certificate Upload",
        "default": ''
      },
      {
        "name": "regStatus",
        "type": "select",
        "label": "Copies of educational qualifications: Copies of MBBS & PG Degree Registration verified and attached",
        "options": ["Yes", "No"],
        "default": "No"
      },

      {
        "name": "regUpload",
        "type": "file",
        "label": "Registration Upload",
        "default": ''
      },
      {
        "name": "experience",
        "type": "table",
        "label": "Details of Teaching experience till date",
        "inputs": [
          {
            "name": "designation",
            "type": "select",
            "label": "Designation",
            "options": ["Junior Resident", "Senior Resident", "Demonstrator", "Tutor", "Asst. Professor", "Assoc. Professor", "Professor"],
            "required": false,
            "default": ''
          },
          {
            "name": "department",
            "type": "text",
            "label": "Department",
            "placeholder":"Enter the Name of department",
            "required": false,
            "default": ''
          },
          {
            "name": "institution",
            "type": "text",
            "label": "Institution",
            "placeholder": "Enter the Name of Institution",
            "required": false,
            "default": ''
          },
          {
            "name": "from",
            "type": "date",
            "label": "From",
            "required": false,
            "default": ''
          },
          {
            "name": "to",
            "type": "date",
            "label": "To",
            "required": false,
            "default": ''
          },
          {
            "name": "total",
            "type": "text",
            "label": "Total(y)(m)",
            "placeholder": "Enter the Total(y)(m)",
            "required": false,
            "default": ''
          }
        ],
        "required": false
      },
      {
        "name": "inspectionDetails",
        "type": "table",
        "label": "Have you been considered in UG/ PG, MCI/ NMC inspection at any other medical college ina teaching or administrative capacity during last 3 years.If yes, please give details",
        "inputs": [
          {
            "name": "designation",
            "type": "text",
            "label": "Designation",
            "placeholder":"Enter designation",
            "default": ""
          },
          {
            "name": "subject",
            "type": "text",
            "label": "Subject",
            "placeholder": "Enter Subject",
            "default": ""
          },
          {
            "name": "college",
            "type": "text",
            "label": "College",
            "placeholder": "Enter College Name",
            "default": ""
          },
          {
            "name": "dates",
            "type": "text",
            "label": "Dates",
            "placeholder": "Enter dates",
            "default": ""
          }
        ]
      },
      {
        "name": "numberOfLectures",
        "type": "table",
        "label": "Number of lectures/ small group teachings/ self-directed learning sessions/ clinics/ etc taken and topics covered in last academic year(attach additional sheet, if required) ",
        "inputs": [
          {
            "name": "date",
            "type": "date",
            "label": "Date",
            "placeholder": "Enter the Date",
            "default": ''
          },
          {
            "name": "type",
            "type": "text",
            "label": "Lecture/ SGT/ SDL/ Clinic/ others",
            "placeholder": "Enter the type",
            "default": ""
          },
          {
            "name": "topic",
            "type": "text",
            "label": "Topic",
            "placeholder": "Enter the Topic",
            "default": ""
          }
        ]
      },
      {
        "name": "details",
        "type": "table",
        "label": "Details of employment before joining the present institution",
        "inputs": [
          {
            "name": "name",
            "type": "text",
            "label": "Name of College/ Institution",
            "placeholder":"Enter the Name of College/ Institution",
            "default": 0
          },
          {
            "name": "designation",
            "type": "text",
            "label": "Designation",
            "placeholder": "Enter the Designation",
            "default": ""
          },
          {
            "name": "date",
            "type": "date",
            "label": "Date on which relieved",
            "default": ''
          },
          {
            "name": "relieveReason",
            "type": "select",
            "label": "Reason for being relieved",
            "options":["Tendered resignation","Retired","Transferred","Terminated"],
            "default": "Transferred"
          },
          {
            "name": "verification",
            "type": "select",
            "label": "Relieving order issued by previous institution verified and attached",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "verificationFile",
            "type": "file",
            "label": "Upload Verification File",
            "default": ''
          }
        ]
      },
      {
        "name": "panNo",
        "type": "text",
        "label": "PAN Number",
        "placeholder":"Enter the PAN Card Number",
        "default": ""
      },
      {
        "name": "aadharNo",
        "type": "number",
        "label": "Aadhar Number",
        "placeholder": "Enter the Aadhar Number",
        "required": false,
        "default": ''
      },
      {
        "name": "orcIdNo",
        "type": "text",
        "label": "ORC ID No",
        "placeholder": "Enter ORC ID No",
        "required": false,
        "default": ''
      },
      {
        "name": "passportNo",
        "type": "text",
        "label": "Passport Number",
        "placeholder": "Enter the Passport Number",
        "required": false,
        "default": ''
      },
      {
        "name": "kmcRegistrationNo",
        "type": "text",
        "label": "KMC Registration Number",
        "placeholder": "Enter the KMC Registration Number",
        "required": false,
        "default": ''
      },
      {
        "name": "emoluments",
        "type": "table",
        "label": "I have drawn total emoluments from this college in the current financial year as under",
        "inputs": [
          {
            "name": "month",
            "type": "select",
            "label": "Month",
            "options": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "default": "Jan"
          },
          {
            "name": "year",
            "type": "number",
            "properties": { "min": 1800, "max": 2150, "step": 1 },
            "label": "Year",
            "default": 2024
          },
          {
            "name": "amount",
            "type": "number",
            "label": "Amount Received",
            "placeholder":"Enter the received amount",
            "default": 0
          },
          {
            "name": "tds",
            "type": "text",
            "label": "TDS",
            "placeholder": "Enter the TDS amount",
            "default": ""
          }
        ]
      },
    ],
    researchPublications: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter title',
        required: false,
        "default": ''
      },
      {
        name: 'author',
        type: 'text',
        label: 'Author',
        placeholder: 'Enter authors',
        required: false,
        "default": ''
      },
      {
        name: 'journalName',
        type: 'text',
        label: 'Journal Name',
        placeholder: 'Enter Journal Name',
        required: false,
        "default": ''
      },
      {
        name: 'volume',
        type: 'number',
        label: 'Volume',
        placeholder: 'Enter volume',
        required: false,
        "default": ''
      },
      {
        name: 'issue',
        type: 'number',
        label: 'Issue',
        placeholder: 'Enter issue',
        required: false,
        min: 1900,
        max: 2000,
        "default": ''
      },
      {
        name: 'pageNo',
        type: 'text',
        label: 'Page No',
        placeholder: 'Enter page no',
        required: false,
        "default": ''
      },
      {
        name: 'year',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        label: 'Year',
        placeholder: 'Enter Year of Publication',
        required: false,
        "default": ''
      },
      {
        name: 'quartile',
        type: 'select',
        label: 'Quartile',
        "default": '',
        required: false,
        options: ['Q1', 'Q2', 'Q3', 'Q4', 'No quartile'],
        tooltip: {
          one: '1. Access Scimago Journal & Country Rank from https://www.scimagojr.com/',
          two: "2. To find a journal's quartile ranking within a category, search for the journal by title or ISSN",
          three: '3. Click on the journal title in the results list',
          four: '4. View the quartile in the Quartile box',
        },
      },
      {
        name: 'index',
        type: 'select',
        label: 'Index',
        required: false,
        options: ['Medline', 'Pubmed', 'CSCI', 'SCI', 'DC', 'Expanded Embase', 'Scopus', 'DoAJ', 'Nil'],
        "default": 'Medline'
      },
      {
        name: 'category',
        type: 'select',
        label: 'Category',
        required: false,
        options: ['National', 'International', 'Institutional', 'Nil'],
        "default": 'Nil'
      },
      {
        name: 'postheld',
        type: 'text',
        label: 'Post held while published',
        required: false,
        placeholder: 'Enter the Post held while published',
        "default": ''
      },
      {
        name: 'doi',
        type: 'text',
        required: false,
        label: 'DOI',
        placeholder: 'Enter DOI',
        "default": ''
      },
      {
        name: 'authorship',
        type: 'select',
        label: 'Authorship',
        required: false,
        options: ['First', 'Correspondant', 'Second', 'Other'],
        "default": 'First'
      },
      {
        name: 'uploadUrl', type: 'file', required: false, label: 'File', "default": '' },
    ],

    researchGrants: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter title',
        required: false,
        "default": ''
      },
      {
        name: 'agency',
        type: 'text',
        label: 'Agency',
        placeholder: 'Enter agency',
        required: false,
        default: 0
      }, 
      {
        name: 'startYear',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        label: 'Start-Year',
        placeholder: 'Enter the Start year',
        required: false,
        "default": ''
      },
      {
        name: 'endYear',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        label: 'End-Year',
        placeholder: 'Enter the End year',
        required: false,
        "default": ''
      },
      {
        name: 'recieved',
        type: 'select',
        label: 'Recieved',
        placeholder: 'Enter recieved',
        required: false,
        options:[
          'Yes',
          'No'
        ],
        default: 'No',
      },
      {
        name: 'amountCategory',
        type: 'select',
        label: 'Amount Category',
        required: false,
        options: [
          'upto 1 lakh',
          '1 - 5 lakhs',
          '5 - 10 lakhs',
          '10 - 30 lakhs',
          '> 30 lakhs',
          'Nil',
        ],
        default: 'Nil',
      },
      {
        name: 'workPub',
        type: 'select',
        label: 'Work Published',
        required:false,
        options: [
          'Yes',
          'No',
        ],
        default:'Yes',
      },
      { name: 'uploadUrl', type: 'file', label: 'Upload Proposal', required: false, default:'' },
      { name: 'utCert', type: 'file', label:'Utilization Certificate',required :false, default:'' },
    ],
    
    researchBooks: [
      {
        name: 'authorship',
        type: 'select',
        placeholder: 'Authorship',
        required: false,
        options: ['Nil', 'Chapter', 'Book'],
        default: 'Nil',
      },
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: false,
        options: ['Nil', 'National', 'International'],
        default: 'Nil',
      },
      {
        name:'title',
        type: 'text',
        placeholder: 'Enter title of the book',
        required: false,
        default: 'Nil',
      },
      {
        name: 'year',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        placeholder: 'Enter the year of publication',
        required: false,
        default: 'Nil',
      },
      {
        name: 'certificate',
        type: 'file',
        required: false,
        "default": ''
      },
      {
        name: 'bookDetails',
        type:'text',
        placeholder: 'Enter the Book details',
        required: false,
        default: 'Nil',
      },
      {
        name: 'uploadUrl',
        type: 'file',
        placeholder:'Upload document',
        required: false,
        "default": ''
      },
    ],

    researchGuidance: [
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: false,
        options: ['UG', 'PG', 'PHD', 'Nil'],
        default: 'Nil',
      },
      {
        name: 'studentDetails',
        type: 'text',
        placeholder: 'Student Name',
        required: false,
        "default": ''
      },
      {
        name:'studentCourse',
        type: 'text',
        placeholder: 'Student Course',
        required: false,
        "default": ''
      },
      {
        name: 'startDate',
        placeholder:'Start Date',
        type: 'Date',
        required: false,
        "default": ''
      },
      {
        name: 'title',
        type: 'text',
        placeholder: 'Title of the study',
        required: false,
        "default": ''
      },
      {
        name: 'fundedStatus',
        type: 'select',
        placeholder: 'Funded?',
        options: [
          'Yes', 'No'
        ],
        default:'No',
        required: false,
      },
      {
        name: 'agencyName',
        type: 'text',
        placeholder: 'Agency Name',
        required: false, 
      },
      {
        name: 'studentUpload',
        type: 'file',
        required: false,
        placeholder: 'Upload',
        "default": ''
      },
      {
        name: 'amount',
        type: 'number',
        required: false,
        "default": ''
      },
      {
        name: 'publishStatus',
        placeholder:'Published?',
        type: 'select',
        options: [
          'Yes','No'
        ],
        default:'Yes',
        required: false,
      },
      {
        name: 'synopsisUrl',
        type: 'file',
        placeholder: 'Synopsis',
        required: false,
        "default": ''
      },
      {
        name: 'thesisUrl',
        type: 'file',
        placeholder: 'Thesis',
        required: false,
        "default": ''
      },
      {
        name: 'reportUrl',
        type: 'file',
        placeholder: 'Report',
        required: false,
        "default": ''
      }
    ],

    researchConferences: [
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: false,
        options: ['Nil', 'National', 'International'],
        default: 'Nil',
      },
      {
        name: 'confName',
        type: 'text',
        placeholder: 'Conference Name',
        required: false,
        "default": ''
      },
      {
        name: 'year',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        placeholder: 'Year - Date',
        required: false,
        "default": ''
      },
      {
        name: 'details',
        type: 'text',
        placeholder: 'Conference Details',
        required: false,
        "default": ''
      },
      {
        name: 'type',
        type: 'select',
        placeholder: 'type',
        options: [ 'Poster', 'Oral', 'Attending'],
        required: false,
        "default": 'Poster  '
      },
      {
        name: 'attachment',
        type: 'file',
        placeholder: 'Attachment upload',
        required: false,
        "default": ''
      },
      {
        name: 'awards',
        type: 'select',
        placeholder: 'Awards Recieved',
        options: ['Yes', 'No'],
        required: false,
        "default": 'Yes'
      },
      {
        name: 'description',
        type: 'text',
        placeholder: 'Awards description',
        default:'Nil',
        required: false
      },
      {
        name:'certificateUpload',
        type:'file',
        placeholder: 'Upload Certificate',
        default: 'Nil',
        required: false,
      }
    ],

    researchPatents: [
      {
        name: 'patentCountry',
        type: 'text',
        label: 'Patent Country',
        placeholder: 'Enter Patent Country',
        required: false,
        "default": ''
      },
      {
        name: 'patentNumber',
        type: 'number',
        label: 'Patent Number',
        placeholder: 'Enter Patent Number',
        required: false,
        "default": ''
      },
      {
        name: 'patentType',
        type: 'text',
        label: 'Patent Type',
        placeholder: 'Enter Patent Type',
        required: false,
        "default": ''
      },
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter Title',
        required: false,
        "default": ''
      },
      {
        name: 'date',
        type: 'date',
        label: 'Date',
        required: false,
        "default": ''
      },
      {
        name: 'detailsOfInventors',
        type: 'table',
        label: 'Details of Inventors',
        required: false,
        inputs: [
          {
            name: 'number',
            type: 'number',
            label: 'Inventor Number',
            placeholder: 'Enter Inventor Number',
            required: false,
            "default": ''
          },
          {
            name: 'name',
            type: 'text',
            label: 'Inventor Name',
            placeholder: 'Enter Inventor Name',
            required: false,
            "default": ''
          },
          {
            name: 'institute',
            type: 'text',
            label: 'Institute',
            placeholder: 'Enter Institute',
            required: false,
            "default": ''
          },
        ],
      },
    ],

    academicsTeaching: [
      {
        name: 'hours',
        type: 'number',
        placeholder: 'Enter the teaching Hours',
        required: false,
        default: 0,
      },
      {
        name:'hoursUpload',
        type:'file',
        placeholder:'Hours acknowledgement',
        required: false,
        "default": ''
      },
      {
        name: 'clinicalHours',
        type: 'number',
        placeholder: 'Enter the Clinical Hours',
        required: false,
        default: 0,
      },
      {
        name: 'clinicalHoursUpload',
        type: 'file',
        placeholder: 'Clinical Hours acknowledgement',
        required: false,
        "default": ''
      },
      {
        name: 'studentsFeedback',
        type: 'number',
        placeholder: 'Enter the Students Feedback',
        required: false,
        default: 0,
      },
      {
        name: 'studentsFeedbackUpload',
        type: 'file',
        placeholder: 'Students Feedback acknowledgement',
        required: false,
        "default": ''
      },
      {
        name: 'resourceMaterial',
        type: 'select',
        placeholder: 'Resource Material',
        options: ['Yes','No'],
        default: 'No'
      },
      {
        name: 'resourceMaterialUpload',
        type: 'file',
        placeholder: 'Resource Material acknowledgement',
        required: false,
        "default": ''
      },
      {
        name: 'publicAwarenessWriteup',
        type: 'select',
        placeholder: 'Public Awareness Writeup',
        options: ['Yes', 'No'],
        default: 'No'
      },
      {
        name: 'publicAwarenessWriteupUpload',
        type: 'file',
        placeholder: 'Public Awareness Writeup acknowledgement',
        required: false,
        "default": ''
      },
      {
        name: 'cc',
        type: 'number',
        placeholder: 'Enter the CC',
        default: 0
      },
      {
        name: 'ccUpload',
        type: 'file',
        placeholder: 'CC acknowledgement',
        required: false
      },
    ],

    professionalClinicalDuty: [
      {
        name: 'patients',
        type: 'number',
        label: 'Patients',
        placeholder:"Enter the number of patients",
        required: false,
        default: 0,
      },
      {
        name: 'minorProcedures',
        type: 'number',
        label: 'Minor Procedures',
        placeholder: "Enter the number of Minor Procedures",
        required: false,
        default: 0,
      },
      {
        name: 'majorProcedures',
        type: 'number',
        label: 'Major Procedures',
        placeholder: "Enter the number of Major Procedures",
        required: false,
        default: 0,
      }, 
      {
        name: 'clinicalDutyFile',
        type: 'file',
        label: 'Clinical duty file',
        required: false,
        "default": ''
      }
    ],
    professionalPostHeld: [
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: false,
        options: [
          'Lecturer',
          'Assistant Professor',
          'Associate Professor',
          'Professor',
          'HOD (Head of Department)',
          'clinical supervisor grade 1',
          'clinical supervisor grade 2',
          'clinical supervisor grade 3',
          'Nil',
        ],
        default: 'Nil',
      },
      {
        name: 'postHeldFile',
        type: 'file',
        label: 'Post held file',
        required: false,
        "default": ''
      }
    ],

    professionalExamDuties: [
      {
        name: 'category1',
        type: 'select',
        placeholder: 'Category 1',
        required: false,
        options: [
          'Invigilator/Room Supervisor',
          'Deputy Chief Superintendent',
          'Chief Superintendent',
          'Nil',
        ],
        default: 'Nil',
      },
      {
        name: 'category2',
        type: 'select',
        placeholder: 'Category 2',
        required: false,
        options: ['Internal', 'External', 'Nil'],
        default: 'Nil',
      },
      {
        name: 'examDutyFile',
        type: 'file',
        required: false,
        label: 'Exam duty file',
        "default": ''
      }
    ],

    professionalCoordinatorDuty: [
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: false,
        options: [
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
      {
        name: 'coordinatorDutyFile',
        type: 'file',
        required: false,
        label: 'Coordinator duty file',
        "default": ''
      }
    ],

    professionalCommittee: [
      {
        name: 'committeeName',
        type: 'text',
        placeholder: 'Enter the Committee Name',
        required: false,
        "default": ''
      },
      {
        name: 'designation',
        type: 'select',
        placeholder: 'Designation',
        required: false,
        options: ['Member', 'Coordinator', 'Head', 'Resource person', 'Nil'],
        default: 'Nil',
      },
      {
        name: 'committeeFile',
        type: 'file',
        required: false,
        label: 'Committee File',
        "default": ''
      }
    ],
    professionalConference: [
      {
        name:'conferenceName',
        type: 'text',
        placeholder: 'Enter the Conference Name',
        required: false,
        "default": ''
      },
      {
        name: 'designation',
        type: 'select',
        placeholder: 'Designation',
        required: false,
        options: ['Member', 'Coordinator', 'Head', 'Nil'],
        default: 'Nil',
      },
      {
        name: 'creditPoints',
        type: 'select',
        placeholder: 'Credit Points',
        required: false,
        options: ['Yes', 'No'],
        default: 'Yes',
      },
      {
        name: 'conferenceFile',
        type: 'file',
        required: false,
        label: 'Attach brochure',
        "default": ''
      },
      {
        name:'attendieDetails',
        type: 'text',
        placeholder: 'Enter the Attendie details',
        required: false,
        "default": ''
      }
    ],
    professionalGuestLectures: [
      {
        name: 'title',
        type: 'text',
        placeholder: 'Enter the Title',
        required: false,
        default: '',
      },
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: false,
        options: ['Internal', 'External', 'Nil'],
        default: 'Internal',
      },
      {
        name: 'guestLecturesFile',
        type: 'file',
        required: false,
        label: 'Details',
        "default": ''
      }
    ],
    professionalAchievements: {
      columns: [
        {
          name: 'serialNo',
          label: 'Serial No',
          placeholder:'Enter the Serial No',
          type: 'text',
          required: false,
          "default": ''
        },
        {
          name: 'year',
          label: 'Year',
          type: 'number',
          placeholder:'Enter the Year',
          required: false,
          min: 1800,
          max: 2150,
          default: 2024,
        },
        {
          name: 'information',
          label: 'Information',
          placeholder:'Enter the Information',
          type: 'text',
          required: false,
          "default": ''
        },
      ],
    }
    
  };

  return inputs[type];
}