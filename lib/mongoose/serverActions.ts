"use server"
import * as mongomethods from '@/lib/mongoose/functions';





/* GET METHODS */
//research clinical duty
export async function handleGetResearchPublications(formData: FormData) {
    // formData.entries()
    mongomethods.addResearchPublications({ title: formData.get("Title"), journalName: formData.get("Jouranal Name"), Quartile: formData.get("Quartile"), index: formData.get("Index"), doi: formData.get("DOI"), authorship: formData.get("Authorship") })
}
//research grants
export async function handleGetResearchGrants(formData: FormData) {
    // TODO:wrong here. Correct it
    mongomethods.addResearchGrants({ title: formData.get("Title"), journalName: formData.get("Jouranal Name"), Quartile: formData.get("Quartile"), index: formData.get("Index"), doi: formData.get("DOI"), authorship: formData.get("Authorship") })
}

//TODO:make an array of functions and use it
export async function handleAppraisalFormSubmit(formData: FormData) {
    let obj = {};
    // console.log(formData.entries());
    for (let pair of formData.entries()) {
        obj[pair[0]] = pair[1];
    }
}


//Post method with one function
export async function handleUpdateAny(formData: FormData) {
    let obj = Object.fromEntries(formData.entries());
    let {type, _id, ...newobj} = obj;
    if(_id) obj._id = _id;

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

    try{
        let res = await functions[type as string]?.(newobj);
        if(!res) throw "Function not found";
        return {ok:true, ...res};
    }catch(e){
        console.error(e);
        return {ok:false}
    }
}

export async function handleAddAny(state,formData: FormData) {
    let obj = Object.fromEntries(formData.entries());
    let {type, _id, ...newobj} = obj;

    let functions = {
        researchPublications: mongomethods.addResearchPublications,
        researchGrants: mongomethods.addResearchGrants,
        researchBooks: mongomethods.addResearchBooks,
        researchGuidance: mongomethods.addResearchGuidance,
        researchConferences: mongomethods.addResearchConferences,

        academicsTeaching: mongomethods.addAcademicsTeaching,

        professionalClinicalDuty: mongomethods.addProfessionalClinicalDuty,
        professionalPostHeld: mongomethods.addProfessionalPostHeld,
        professionalExamDuties: mongomethods.addProfessionalExamDuties,
        professionalCommittee: mongomethods.addProfessionalCommittee,
        professionalGuestLectures: mongomethods.addProfessionalGuestLectures,

    }

    try{
        let res = await functions[type as string]?.(newobj);
        if(res==undefined) throw "Function not found";
        return {submitted:true, error:false, res}
    }
    catch(e){
        console.error(e);
        return {error:e, submitted:false}
    }
}