'use server';
//get inputs details
export async function getInput(type: string) {
  let inputs = {
    profile: [
      {
        "name": "name",
        "type": "text",
        "label": "Name",
        "placeholder": "Enter Name",
        "required": true
      },
      {
        "name": "dob",
        "type": "date",
        "label": "Date of Birth",
        "required": true
      },
      {
        "name": "age",
        "type": "number",
        "label": "Age",
        "required": true
      },
      {
        "name": "dateOfJoining",
        "type": "date",
        "label": "Date of Joining",
        "required": true
      },
      {
        "name": "designation",
        "type": "text",
        "label": "Designation",
        "placeholder": "Enter Designation",
        "required": true
      },
      {
        "name": "attachment",
        "type": "file",
        "label": "Attachment",
        "required": true
      },
      {
        "name": "department",
        "type": "text",
        "label": "Department",
        "placeholder": "Enter Department",
        "required": true
      },
      {
        "name": "orcIdNo",
        "type": "text",
        "label": "ORC ID No",
        "placeholder": "Enter ORC ID No",
        "required": true
      },
      {
        "name": "profileUrl",
        "type": "file",
        "label": "Profile Photo",
        "required": false
      },
      {
        "name": "aadharNo",
        "type": "number",
        "label": "Aadhar Number",
        "required": false
      },
      {
        "name": "passportNo",
        "type": "text",
        "label": "Passport Number",
        "required": false
      },
      {
        "name": "phoneNo",
        "type": "number",
        "label": "Phone Number",
        "required": false
      },
      {
        "name": "residentialAddress",
        "type": "text",
        "label": "Residential Address",
        "required": false
      },
      {
        "name": "kmcRegistrationNo",
        "type": "text",
        "label": "KMC Registration Number",
        "required": false
      },
      {
        "name": "educationalQualification",
        "type": "table",
        "label": "Educational Qualification",
        "inputs": [
          {
            "name": "degree",
            "type": "select",
            "label": "Degree",
            "options": ["MBBS", "MD/MS", "DM/MCh", "PhD"]
          },
          {
            "name": "year",
            "type": "number",
            "properties": { "min": 1800, "max": 2150, "step": 1 },
            "label": "Year",
            "placeholder": "Enter Year of Publication",
            "required": true
          },
          {
            "name": "collegeName",
            "type": "text",
            "label": "College Name",
            "required": true
          },
          {
            "name": "regNumWithDate",
            "type": "text",
            "label": "Register number with date",
            "required": true
          },
          {
            "name": "medicalCouncilName",
            "type": "text",
            "label": "Medical Council Name",
            "required": true
          }
        ],
        "required": false
      },
      {
        "name": "experience",
        "type": "table",
        "label": "Experience",
        "inputs": [
          {
            "name": "designation",
            "type": "select",
            "label": "Designation",
            "options": ["Junior Resident", "Senior Resident", "Demonstrator", "Tutor", "Asst. Professor", "Assoc. Professor", "Professor"],
            "required": true
          },
          {
            "name": "department",
            "type": "text",
            "label": "Department",
            "required": true
          },
          {
            "name": "institution",
            "type": "text",
            "label": "Institution",
            "required": true
          },
          {
            "name": "from",
            "type": "date",
            "label": "From",
            "required": true
          },
          {
            "name": "to",
            "type": "date",
            "label": "To",
            "required": true
          },
          {
            "name": "total",
            "type": "text",
            "label": "Total",
            "required": true
          }
        ],
        "required": false
      },
      {
        "name": "appointmentOrderStatus",
        "type": "select",
        "label": "Appointment Order Status",
        "options": ["Yes", "No"],
        "default": "Yes"
      },
      {
        "name": "instituteName",
        "type": "text",
        "label": "Institute Name",
        "default": ""
      },
      {
        "name": "cityName",
        "type": "text",
        "label": "City Name",
        "default": ""
      },
      {
        "name": "appointmentType1",
        "type": "select",
        "label": "Appointment Type 1",
        "options": ["Regular", "Contractual", "Ad-hoc basis"],
        "default": "Regular"
      },
      {
        "name": "appointmentType2",
        "type": "select",
        "label": "Appointment Type 2",
        "options": ["Full time", "Part time"],
        "default": "Full time"
      },
      {
        "name": "appointmentType3",
        "type": "select",
        "label": "Appointment Type 3",
        "options": ["With Private practice", "Without Private practice"],
        "default": "Without Private practice"
      },
      {
        "name": "ugpgName",
        "type": "text",
        "label": "UG/PG Name",
        "default": ""
      },
      {
        "name": "college",
        "type": "text",
        "label": "College",
        "default": ""
      },
      {
        "name": "sameClgAcpt",
        "type": "select",
        "label": "Same College Accepted",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "sameDestAcpt",
        "type": "select",
        "label": "Same Designation Accepted",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "retiredStatus",
        "type": "select",
        "label": "Retired Status",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "retireDestination",
        "type": "text",
        "label": "Retirement Designation",
        "default": ""
      },
      {
        "name": "perAddress",
        "type": "text",
        "label": "Permanent Address",
        "default": ""
      },
      {
        "name": "residenceProofStatus",
        "type": "select",
        "label": "Residence Proof Status",
        "options": ["Yes", "No"],
        "default": "Yes"
      },
      {
        "name": "residenceProof",
        "type": "file",
        "label": "Residence Proof"
      },
      {
        "name": "officeTel",
        "type": "number",
        "label": "Office Telephone",
        "default": "+91"
      },
      {
        "name": "residenceTel",
        "type": "number",
        "label": "Residence Telephone",
        "default": "+91"
      },
      {
        "name": "joiningStatus",
        "type": "select",
        "label": "Joining Status",
        "options": ["Yes", "No"],
        "default": "Yes"
      },
      {
        "name": "joiningReport",
        "type": "file",
        "label": "Joining Report"
      },
      {
        "name": "joiningLetter",
        "type": "file",
        "label": "Joining Letter"
      },
      {
        "name": "appearance",
        "type": "table",
        "label": "Appearance",
        "inputs": [
          {
            "name": "status",
            "type": "select",
            "label": "Status",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "center",
            "type": "select",
            "label": "Center",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "observership",
            "type": "select",
            "label": "Observership",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "certs",
            "type": "select",
            "label": "Certificates",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "upload",
            "type": "file",
            "label": "Upload"
          }
        ]
      },
      {
        "name": "mdmsSubject",
        "type": "text",
        "label": "MD/MS Subject",
        "default": ""
      },
      {
        "name": "dmmchSubject",
        "type": "text",
        "label": "DM/MCh Subject",
        "default": ""
      },
      {
        "name": "phdSubject",
        "type": "text",
        "label": "PhD Subject",
        "default": ""
      },
      {
        "name": "certStatus",
        "type": "select",
        "label": "Certificate Status",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "regStatus",
        "type": "select",
        "label": "Registration Status",
        "options": ["Yes", "No"],
        "default": "No"
      },
      {
        "name": "certUpload",
        "type": "file",
        "label": "Certificate Upload"
      },
      {
        "name": "regUpload",
        "type": "file",
        "label": "Registration Upload"
      },
      {
        "name": "inspectionDetails",
        "type": "table",
        "label": "Inspection Details",
        "inputs": [
          {
            "name": "designation",
            "type": "text",
            "label": "Designation",
            "default": ""
          },
          {
            "name": "subject",
            "type": "text",
            "label": "Subject",
            "default": ""
          },
          {
            "name": "college",
            "type": "text",
            "label": "College",
            "default": ""
          },
          {
            "name": "dates",
            "type": "text",
            "label": "Dates",
            "default": ""
          }
        ]
      },
      {
        "name": "numberOfLectures",
        "type": "table",
        "label": "Number of Lectures",
        "inputs": [
          {
            "name": "date",
            "type": "date",
            "label": "Date"
          },
          {
            "name": "type",
            "type": "text",
            "label": "Type",
            "default": ""
          },
          {
            "name": "topic",
            "type": "text",
            "label": "Topic",
            "default": ""
          }
        ]
      },
      {
        "name": "details",
        "type": "table",
        "label": "Details",
        "inputs": [
          {
            "name": "name",
            "type": "number",
            "label": "Name",
            "default": 0
          },
          {
            "name": "designation",
            "type": "text",
            "label": "Designation",
            "default": ""
          },
          {
            "name": "date",
            "type": "date",
            "label": "Date"
          },
          {
            "name": "relieveReason",
            "type": "text",
            "label": "Relieve Reason",
            "default": ""
          },
          {
            "name": "verification",
            "type": "select",
            "label": "Verification",
            "options": ["Yes", "No"],
            "default": "No"
          },
          {
            "name": "verificationFile",
            "type": "file",
            "label": "Verification File"
          }
        ]
      },
      {
        "name": "panNo",
        "type": "text",
        "label": "PAN Number",
        "default": ""
      },
      {
        "name": "emoluments",
        "type": "table",
        "label": "Emoluments",
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
            "label": "Amount",
            "default": 0
          },
          {
            "name": "tds",
            "type": "text",
            "label": "TDS",
            "default": ""
          }
        ]
      }
    ],
    researchPublications: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter title',
        required: true,
      },
      {
        name: 'author',
        type: 'text',
        label: 'Author',
        placeholder: 'Enter authors',
        required: true
      },
      {
        name: 'journalName',
        type: 'text',
        label: 'Journal Name',
        placeholder: 'Enter Journal Name',
        required: true,
      },
      {
        name: 'volume',
        type: 'number',
        label: 'Volume',
        placeholder: 'Enter volume',
        required: false
      },
      {
        name: 'issue',
        type: 'number',
        label: 'Issue',
        placeholder: 'Enter issue',
        required: false,
        min: 1900,
        max: 2000
      },
      {
        name: 'pageNo',
        type: 'text',
        label: 'Page No',
        placeholder: 'Enter page no',
        required: false
      },
      {
        name: 'year',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        label: 'Year',
        placeholder: 'Enter Year of Publication',
        required: false
      },
      {
        name: 'quartile',
        type: 'select',
        label: 'Quartile',
        required: true,
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
        required: true,
        options: ['Medline', 'Pubmed', 'CSCI', 'SCI', 'DC', 'Expanded Embase', 'Scopus', 'DoAJ', 'Nil'],
      },
      {
        name: 'category',
        type: 'select',
        label: 'Category',
        required: true,
        options: ['National', 'International', 'Institutional', 'Nil'],
      },
      {
        name: 'postheld',
        type: 'text',
        label: 'Post held while published',
        required: true,
        placeholder: 'Enter the Post held while published',
      },
      {
        name: 'doi',
        type: 'text',
        required: false,
        label: 'DOI',
        placeholder: 'Enter DOI',
      },
      {
        name: 'authorship',
        type: 'select',
        label: 'Authorship',
        required: true,
        options: ['First', 'Correspondant', 'Second', 'Other'],
      },
      { name: 'uploadUrl', type: 'file', required: true, label: 'File' },
    ],

    researchGrants: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter title',
        required: true,
      },
      {
        name: 'agency',
        type: 'text',
        label: 'Agency',
        placeholder: 'Enter agency',
        required: true,
        default: 0,
      }, 
      {
        name: 'startYear',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        label: 'Start-Year',
        placeholder: 'Enter the Start year',
        required: true,
      },
      {
        name: 'endYear',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        label: 'End-Year',
        placeholder: 'Enter the End year',
        required: true,
      },
      {
        name: 'recieved',
        type: 'select',
        label: 'Recieved',
        placeholder: 'Enter recieved',
        required: true,
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
        required:true,
        options: [
          'Yes',
          'No',
        ],
        default:'Yes',
      },
      { name: 'uploadUrl', type: 'file', label: 'Upload Proposal', required: false },
      { name: 'utCert', type: 'file',label:'Utilization Certificate',required :false},
    ],
    
    researchBooks: [
      {
        name: 'authorship',
        type: 'select',
        placeholder: 'Authorship',
        required: true,
        options: ['Nil', 'Chapter', 'Book'],
        default: 'Nil',
      },
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: true,
        options: ['Nil', 'National', 'International'],
        default: 'Nil',
      },
      {
        name:'title',
        type: 'text',
        placeholder: 'Enter title of the book',
        required: true,
        default: 'Nil',
      },
      {
        name: 'year',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        placeholder: 'Enter the year of publication',
        required: true,
        default: 'Nil',
      },
      {
        name: 'certificate',
        type: 'file',
        required: false,
      },
      {
        name: 'bookDetails',
        type:'text',
        placeholder: 'Enter the Book details',
        required: true,
        default: 'Nil',
      },
      {
        name: 'uploadUrl',
        type: 'file',
        placeholder:'Upload document',
        required: false,
      },
    ],

    researchGuidance: [
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: true,
        options: ['UG', 'PG', 'PHD', 'Nil'],
        default: 'Nil',
      },
      {
        name: 'studentDetails',
        type: 'text',
        placeholder: 'Student Name',
        required: true,
      },
      {
        name:'studentCourse',
        type: 'text',
        placeholder: 'Student Course',
        required: true,
      },
      {
        name: 'startDate',
        placeholder:'Start Date',
        type: 'Date',
        required: true,
      },
      {
        name: 'title',
        type: 'text',
        placeholder: 'Title of the study',
        required: true,
      },
      {
        name: 'fundedStatus',
        type: 'select',
        placeholder: 'Funded?',
        options: [
          'Yes', 'No'
        ],
        default:'No',
        required: true,
      },
      {
        name: 'agencyName',
        type: 'text',
        placeholder: 'Agency Name',
        required: true, 
      },
      {
        name: 'studentUpload',
        type: 'file',
        required: false,
        placeholder:'Upload',
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
      },
      {
        name: 'publishStatus',
        placeholder:'Published?',
        type: 'select',
        options: [
          'Yes','No'
        ],
        default:'Yes',
        required: true,
      },
      {
        name: 'synopsisUrl',
        type: 'file',
        placeholder: 'Synopsis',
        required: true,
      },
      {
        name: 'thesisUrl',
        type: 'file',
        placeholder: 'Thesis',
        required: true,
      },
      {
        name: 'reportUrl',
        type: 'file',
        placeholder: 'Report',
        required: true,
      }
    ],

    researchConferences: [
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: true,
        options: ['Nil', 'National', 'International'],
        default: 'Nil',
      },
      {
        name: 'confName',
        type: 'text',
        placeholder: 'Conference Name',
        required: true,
      },
      {
        name: 'year',
        type: 'number',
        properties:{ min: 1800, max: 2150, step:1 },
        placeholder: 'Year - Date',
        required: true,
      },
      {
        name: 'details',
        type: 'text',
        placeholder: 'Conference Details',
        required: true,
      },
      {
        name: 'type',
        type: 'select',
        placeholder: 'type',
        options: [ 'Poster', 'Oral', 'Attending'],
        required: true,
      },
      {
        name: 'attachment',
        type: 'file',
        placeholder: 'Attachment upload',
        required: false,
      },
      {
        name: 'awards',
        type: 'select',
        placeholder: 'Awards Recieved',
        options: ['Yes', 'No'],
        required: true,
      },
      {
        name: 'description',
        type: 'text',
        placeholder: 'Awards description',
        default:'Nil',
        required: false,
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
        required: true,
      },
      {
        name: 'patentNumber',
        type: 'number',
        label: 'Patent Number',
        placeholder: 'Enter Patent Number',
        required: true,
      },
      {
        name: 'patentType',
        type: 'text',
        label: 'Patent Type',
        placeholder: 'Enter Patent Type',
        required: true,
      },
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter Title',
        required: true,
      },
      {
        name: 'date',
        type: 'date',
        label: 'Date',
        required: true,
      },
      {
        name: 'detailsOfInventors',
        type: 'table',
        label: 'Details of Inventors',
        required: true,
        inputs: [
          {
            name: 'number',
            type: 'number',
            label: 'Inventor Number',
            placeholder: 'Enter Inventor Number',
            required: true,
          },
          {
            name: 'name',
            type: 'text',
            label: 'Inventor Name',
            placeholder: 'Enter Inventor Name',
            required: true,
          },
          {
            name: 'institute',
            type: 'text',
            label: 'Institute',
            placeholder: 'Enter Institute',
            required: true,
          },
        ],
      },
    ],

    academicsTeaching: [
      {
        name: 'hours',
        type: 'number',
        placeholder: 'Hours',
        required: true,
        default: 0,
      },
      {
        name:'hoursUpload',
        type:'file',
        placeholder:'Hours acknowledgement',
        required: true
      },
      {
        name: 'clinicalHours',
        type: 'number',
        placeholder: 'Clinical Hours',
        required: true,
        default: 0,
      },
      {
        name: 'clinicalHoursUpload',
        type: 'file',
        placeholder: 'Clinical Hours acknowledgement',
        required: true
      },
      {
        name: 'studentsFeedback',
        type: 'number',
        placeholder: 'Students Feedback',
        required: true,
        default: 0,
      },
      {
        name: 'studentsFeedbackUpload',
        type: 'file',
        placeholder: 'Students Feedback acknowledgement',
        required: true
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
        required: true
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
        required: true
      },
      {
        name: 'cc',
        type: 'number',
        placeholder: 'CC',
        default: 0
      },
      {
        name: 'ccUpload',
        type: 'file',
        placeholder: 'CC acknowledgement',
        required: true
      },
    ],

    professionalClinicalDuty: [
      {
        name: 'patients',
        type: 'number',
        label: 'Patients',
        required: false,
        default: 0,
      },
      {
        name: 'minorProcedures',
        type: 'number',
        label: 'Minor Procedures',
        required: false,
        default: 0,
      },
      {
        name: 'majorProcedures',
        type: 'number',
        label: 'Major Procedures',
        required: false,
        default: 0,
      }, 
      {
        name: 'clinicalDutyFile',
        type: 'file',
        label: 'Clinical duty file',
        required: false,
      }
    ],
    professionalPostHeld: [
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: true,
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
      }
    ],

    professionalExamDuties: [
      {
        name: 'category1',
        type: 'select',
        placeholder: 'Category 1',
        required: true,
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
        required: true,
        options: ['Internal', 'External', 'Nil'],
        default: 'Nil',
      },
      {
        name: 'examDutyFile',
        type: 'file',
        required: false,
        label: 'Exam duty file'
      }
    ],

    professionalCoordinatorDuty: [
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: true,
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
        label: 'Coordinator duty file'
      }
    ],

    professionalCommittee: [
      {
        name: 'committeeName',
        type: 'text',
        placeholder: 'Committee Name',
        required: true,
      },
      {
        name: 'designation',
        type: 'select',
        placeholder: 'Designation',
        required: true,
        options: ['Member', 'Coordinator', 'Head', 'Resource person', 'Nil'],
        default: 'Nil',
      },
      {
        name: 'committeeFile',
        type: 'file',
        required: false,
        label: 'Committee File'
      }
    ],
    professionalConference: [
      {
        name:'conferenceName',
        type: 'text',
        placeholder: 'Conference Name',
        required: true,
      },
      {
        name: 'designation',
        type: 'select',
        placeholder: 'Designation',
        required: true,
        options: ['Member', 'Coordinator', 'Head', 'Nil'],
        default: 'Nil',
      },
      {
        name: 'creditPoints',
        type: 'select',
        placeholder: 'Credit Points',
        required: true,
        options: ['Yes', 'No'],
        default: 'Yes',
      },
      {
        name: 'conferenceFile',
        type: 'file',
        required: false,
        label: 'Attach brochure'
      },
      {
        name:'attendieDetails',
        type: 'text',
        placeholder: 'Attendie details',
        required: true,
      }
    ],
    professionalGuestLectures: [
      {
        name: 'title',
        type: 'text',
        placeholder: 'Title',
        required: true,
        default: '',
      },
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: true,
        options: ['Internal', 'External', 'Nil'],
        default: 'Internal',
      },
      {
        name: 'guestLecturesFile',
        type: 'file',
        required: false,
        label: 'Details'
      }
    ],
    professionalAchievements: {
      columns: [
        {
          name: 'serialNo',
          label: 'Serial No',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          label: 'Year',
          type: 'number',
          required: true,
          min: 1800,
          max: 2150,
          default: 2024,
        },
        {
          name: 'information',
          label: 'Information',
          type: 'text',
          required: true,
        },
      ],
    }
    
  };

  return inputs[type];
}