"use server"
import * as mongomethods from "@/lib/mongoose/functions";
import { revalidatePath } from "next/cache";


export async function getInput(type: string) {
    let inputs = {
        researchPublications: [
            { name: "title", type: "text", label: "Title", placeholder: "Enter title", required: true },
            { name: "journalName", type: "text", label: "Journal Name", placeholder: "Enter Journal Name", required: true },
            { name: "quartile", type: "select", label: "Quartile", required: true, options: [{ value: "Q1" }, { value: "Q2" }, { value: "Q3" }, { value: "Q4" }, { value: "No quartile" }, { value: "Nil" }] },
            { name: "index", type: "select", label: "Index", required: true, options: [{ value: "Medline" }, { value: "Pubmed" }, { value: "CSCI" }, { value: "SCI" }, { value: "DC" }, { value: "Expanded Embase" }, { value: "Scopus" }, { value: "DoAJ" }] },
            { name: "doi", type: "text", required: true, label: "DOI", placeholder: "Enter DOI" },
            { name: "authorship", type: "select", label: "Authorship", required: true, options: [{ value: "First" }, { value: "Correspondant" }, { value: "Second" }, { value: "Other" }] },
            { name: "file", type: "file", required: false, label: "File" }
        ],

        researchGrants: [
            { name: "title", type: "text", label: "Title", placeholder: "Enter title", required: true },
            { name: "applied", type: "number", label: "Applied", placeholder: "Enter applied", required: true, default: 0 },
            { name: "received", type: "number", label: "Received", placeholder: "Enter received", required: true, default: 0 },
            { name: "amountCategory", type: "select", label: "Amount Category", required: true, options: ["upto 1 lakh", "1 - 5 lakhs", "5 - 10 lakhs", "10 - 30 lakhs", "> 30 lakhs", "Nil"], default: "Nil" },
            { name: "uploadUrl", type: "file", label: "Upload URL", required: false }
        ],

        researchBooks: [
            { name: "authorship", type: "select", placeholder: "Authorship", required: true, options: ["Nil", "Chapter", "Book"], default: "Nil" },
            { name: "category", type: "select", placeholder: "Category", required: true, options: ["Nil", "National", "International"], default: "Nil" }
        ],

        researchGuidance: [
            { name: "category", type: "select", placeholder: "Category", required: true, options: ["UG", "PG", "PHD", "Nil"], default: "Nil" },
            { name: "number", type: "number", placeholder: "Number", required: true, default: 0 }
        ],

        researchConferences: [
            { name: "category", type: "select", placeholder: "Category", required: true, options: ["Nil", "National", "International"], default: "Nil" },
            { name: "number", type: "number", placeholder: "Number", required: true, default: 0 }
        ],

        academicsTeaching: [
            { name: "hours", type: "number", placeholder: "Hours", required: true, default: 0 },
            { name: "clinicalHours", type: "number", placeholder: "Clinical Hours", required: true, default: 0 },
            { name: "studentsFeedback", type: "number", placeholder: "Students Feedback", required: true, default: 0 }
        ],

        professionalClinicalDuty: [
            { name: "patients", type: "number", placeholder: "Patients", required: true, default: 0 }
        ],
        professionalPostHeld: [
            { name: "category", type: "select", placeholder: "Category", required: true, options: ["Lecturer", "Assistant Professor", "Associate Professor", "Professor", "HOD (Head of Department)", "Nil"], default: "Nil" }
        ],

        professionalExamDuties: [
            { name: "category1", type: "select", placeholder: "Category 1", required: true, options: ["Invigilator/Room Supervisor", "Deputy Chief Superintendent", "Chief Superintendent", "Nil"], default: "Nil" },
            { name: "category2", type: "select", placeholder: "Category 2", required: true, options: ["Internal", "External", "Nil"], default: "Nil" }
        ],
        professionalCommittee: [
            { name: "committeeName", type: "text", placeholder: "Committee Name", required: true },
            { name: "designation", type: "select", placeholder: "Designation", required: true, options: ["Member", "Coordinator", "Head", "Nil"], default: "Nil" }
        ],
        professionalConference: [
            { name: "designation", type: "select", placeholder: "Designation", required: true, options: ["Member", "Coordinator", "Head", "Nil"], default: "Nil" },
            { name: "creditPoints", type: "select", placeholder: "Credit Points", required: true, options: ["Yes", "No"], default: "Yes" }
        ],
        professionalGuestLectures: [
            { name: "number", type: "number", placeholder: "Number", required: true, default: 0 },
            { name: "category", type: "select", placeholder: "Category", required: true, options: ["Internal", "External", "Nil"], default: "Nil" }
        ],
    }

    return inputs[type]
}


export async function getUpdateFunction(type: string) {
    let functions = {
        researchPublications: mongomethods.updateResearchPublications,
        researchGrants: mongomethods.updateResearchGrants,
        researchBooks: mongomethods.updateResearchBooks,
        researchGuidance: mongomethods.updateResearchGuidance,
        researchConferences: mongomethods.updateResearchConferences,

        academicsTeaching: mongomethods.updateAcademicsTeaching,

        professionalClinicalDuty: mongomethods.updateProfessionalClinicalDuty,
        professionalPostHeld: mongomethods.updateProfessionalPostHeld,
        professionalExamDuties: mongomethods.updateProfessionalExamDuties,
        professionalCommittee: mongomethods.updateProfessionalCommittee,
        professionalConference: mongomethods.updateProfessionalConferences,
        professionalGuestLectures: mongomethods.updateProfessionalGuestLectures,

    }
    return functions[type];
}

export async function getRetrieveFunction(type: string): Promise<() => Promise<any>> {

    let functions = {
        researchPublications: mongomethods.getResearchPublications,
        researchGrants: mongomethods.getResearchGrants,
        researchBooks: mongomethods.getResearchBooks,
        researchGuidance: mongomethods.getResearchGuidance,
        researchConferences: mongomethods.getResearchConferences,

        academicsTeaching: mongomethods.getAcademicsTeaching,

        professionalClinicalDuty: mongomethods.getProfessionalClinicalDuty,
        professionalPostHeld: mongomethods.getProfessionalPostHeld,
        professionalExamDuties: mongomethods.getProfessionalExamDuties,
        professionalCommittee: mongomethods.getProfessionalCommittee,
        professionalConference: mongomethods.getProfessionalConferences,
        professionalGuestLectures: mongomethods.getProfessionalGuestLectures,
    }
    return functions[type] || new Error("No retrieve function found for " + type);
}


export async function getDataAny(type, _id?) {
    let retrieveFunction = await getRetrieveFunction(type);
    let data = await retrieveFunction?.();
    if (Array.isArray(data)) {
        data = data?.map(d => {
            if (d._doc?._id)
                d._doc._id = d._doc._id.toString();
            // console.log("inside data map:",d._doc?._id);
            revalidatePath("/appraisal")
            return d._doc;
        })
        if (_id) data=data.find(e => e._id == _id)
        // console.log("after map",_id);
        // console.log("before return",data);
        return data;
    }
    if (data?._doc?._id)
        data._doc._id = data._doc._id.toString?.();
    data = data?._doc || data;

    if(data?._id) data._id = data._id.toString?.();
    // if (_id) data?.find(e => e._id == _id||e._doc?._id==_id)
    
    // console.log("before return",data);
    revalidatePath("/appraisal")
    return data;
}

/* export async function deleteDataAny(type, _id) {
    let deleteFunction = await getDeleteFunction(type);
    let data = await deleteFunction?.(_id);
    return data;
} */