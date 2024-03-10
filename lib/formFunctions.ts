'use server';
import * as mongomethods from '@/lib/mongoose/functions';
import { revalidatePath } from 'next/cache';

export async function getInput(type: string) {
  let inputs = {
    profile: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'Enter Name',
        required: true,
      },
      {
        name: 'dob',
        type: 'date',
        label: 'Date of Birth',
        required: true,
      },
      {
        name: 'dateOfJoining',
        type: 'date',
        label: 'Date of Joining',
        required: true,
      },
      {
        name: 'designation',
        type: 'text',
        label: 'Designation',
        placeholder: 'Enter Designation',
        required: true,
      },
      {
        name: 'department',
        type: 'text',
        label: 'Department',
        placeholder: 'Enter Department',
        required: true,
      },
      {
        name: 'profilePhoto',
        type: 'file',
        label: 'Profile Photo',
        required: false,
      },
      {
        name: 'aadharNo',
        type: 'number',
        label: 'Aadhar Number',
        required: false,
      },
      {
        name: 'passportNo',
        type: 'text',
        label: 'Passport Number',
        required: false,
      },
      {
        name: 'phoneNo',
        type: 'number',
        label: 'Phone Number',
        required: false,
      },
      {
        name: 'residentialAddress',
        type: 'text',
        label: 'Residential Address',
        required: false,
      },
      {
        name: 'category',
        type: 'text',
        label: 'Category',
        required: false,
      },
      {
        name: 'kmcRegistrationNo',
        type: 'number',
        label: 'KMC Registration Number',
        required: false,
      },
      {
        name: 'educationalQualification',
        type: 'text',
        label: 'Educational Qualification',
        required: false,
      },
      {
        name: 'experience',
        type: 'text',
        label: 'Experience',
        required: false,
      },
    ]
    ,

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
        type: 'number',
        label: 'Page No',
        placeholder: 'Enter page no',
        required: false
      },
      {
        name: 'quartile',
        type: 'select',
        label: 'Quartile',
        required: true,
        options: [
          { value: 'Q1' },
          { value: 'Q2' },
          { value: 'Q3' },
          { value: 'Q4' },
          { value: 'No quartile' },
        ],
        tooltip: {
          one: '1. Acces Scimago Journal & Country Rank from https://www.scimagojr.com/',
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
        options: [
          { value: 'Medline' },
          { value: 'Pubmed' },
          { value: 'CSCI' },
          { value: 'SCI' },
          { value: 'DC' },
          { value: 'Expanded Embase' },
          { value: 'Scopus' },
          { value: 'DoAJ' },
          { value: 'Nil' },
        ],
      },
      {
        name: 'doi',
        type: 'text',
        required: true,
        label: 'DOI',
        placeholder: 'Enter DOI',
      },
      {
        name: 'authorship',
        type: 'select',
        label: 'Authorship',
        required: true,
        options: [
          { value: 'First' },
          { value: 'Correspondant' },
          { value: 'Second' },
          { value: 'Other' },
        ],
      },
      { name: 'file', type: 'file', required: false, label: 'File' },
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
        name: 'applied',
        type: 'number',
        label: 'Applied',
        placeholder: 'Enter applied',
        required: true,
        default: 0,
      },
      {
        name: 'received',
        type: 'number',
        label: 'Received',
        placeholder: 'Enter received',
        required: true,
        default: 0,
      },
      {
        name: 'amountCategory',
        type: 'select',
        label: 'Amount Category',
        required: true,
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
      { name: 'uploadUrl', type: 'file', label: 'Upload URL', required: false },
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
        name: 'number',
        type: 'number',
        placeholder: 'Number',
        required: true,
        default: 0,
      },
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
        name: 'number',
        type: 'number',
        placeholder: 'Number',
        required: true,
        default: 0,
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
        name: 'clinicalHours',
        type: 'number',
        placeholder: 'Clinical Hours',
        required: true,
        default: 0,
      },
      {
        name: 'studentsFeedback',
        type: 'number',
        placeholder: 'Students Feedback',
        required: true,
        default: 0,
      },
      {
        name: 'resourceMaterial',
        type: 'select',
        placeholder: 'Resource Material',
        options: ['Yes','No'],
        default: 'No'
      },
      {
        name: 'cc',
        type: 'number',
        placeholder: 'CC',
        default: 0
      }
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
        options: ['Member', 'Coordinator', 'Head', 'Nil'],
        default: 'Nil',
      },
    ],
    professionalConference: [
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
    ],
    professionalGuestLectures: [
      {
        name: 'number',
        type: 'number',
        placeholder: 'Number',
        required: true,
        default: 0,
      },
      {
        name: 'category',
        type: 'select',
        placeholder: 'Category',
        required: true,
        options: ['Internal', 'External', 'Nil'],
        default: 'Nil',
      },
    ],
  };

  return inputs[type];
}