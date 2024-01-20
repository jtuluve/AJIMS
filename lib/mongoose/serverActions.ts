"use server"
import * as mongomethods from '@/lib/mongoose/functions';
import { revalidatePath } from 'next/cache';





/* GET METHODS */


//Post method with one function
export async function handleUpsertAny(formData: FormData) {
    let obj = Object.fromEntries(formData.entries());
    let { type, ...newobj } = obj;
    
    let functions = {
        researchPublications: mongomethods.upsertResearchPublications,
        researchGrants: mongomethods.upsertResearchGrants,
        researchBooks: mongomethods.upsertResearchBooks,
        researchGuidance: mongomethods.upsertResearchGuidance,
        researchConferences: mongomethods.upsertResearchConference,

        academicsTeaching: mongomethods.updateAcademicsTeaching,

        professionalClinicalDuty: mongomethods.updateProfessionalClinicalDuty,
        professionalPostHeld: mongomethods.updateProfessionalPostHeld,
        professionalExamDuties: mongomethods.upsertProfessionalExamDuties,
        professionalCommittee: mongomethods.upsertProfessionalCommittee,
        professionalConference: mongomethods.upsertProfessionalConference,
        professionalGuestLectures: mongomethods.upsertProfessionalGuestLecture,

    }

    try {
        let res = await functions[type as string]?.(newobj);
        if (!res) throw new Error("Function not found or upsert failed");
        // revalidatePath("/")
        return { submitted: true, error: false }
    } catch (e) {
        console.error(e);
        // revalidatePath("/")
        return { submitted: false, error: true }
    }
}


export async function handleDeleteAny(type:string, _id: string) {
    if (!_id||!type) {
        return { error: "Invalid request", submitted: false };
    }
    let functions = {
        researchPublications: mongomethods.deleteResearchPublication,
        researchGrants: mongomethods.deleteResearchGrant,
        researchBooks: mongomethods.deleteResearchBook,
        researchGuidance: mongomethods.deleteResearchGuidance,
        researchConferences: mongomethods.deleteResearchConference,

        professionalExamDuties: mongomethods.deleteProfessionalExamDuty,
        professionalCommittee: mongomethods.deleteProfessionalCommittee,
        professionalGuestLectures: mongomethods.deleteProfessionalGuestLecture,
    }
    try {
        let res = await functions[type]?.(_id);
        if (!res) throw "Failed to delete";
        return { submitted: true, error: false, res }
    }catch(e){
        console.error(e);
        return { error: e, submitted: false }
    }
}