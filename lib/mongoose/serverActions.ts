'use server'
import * as mongomethods from '@/lib/mongoose/functions'
import { revalidatePath } from 'next/cache'

/* Get data method */
//helper function
export async function getRetrieveFunction(
  type: string
): Promise<() => Promise<any>> {
  let functions = {
    profile: mongomethods.getProfile,

    researchPublications: mongomethods.getResearchPublications,
    researchGrants: mongomethods.getResearchGrants,
    researchBooks: mongomethods.getResearchBooks,
    researchGuidance: mongomethods.getResearchGuidance,
    researchConferences: mongomethods.getResearchConferences,
    researchScore: mongomethods.getResearchScore,
    researchPatents: mongomethods.getResearchPatents,

    academicsTeaching: mongomethods.getAcademicsTeaching,
    academicsScore: mongomethods.getAcademicsScore,
    academicsFileUrl: mongomethods.getAcademicsFileUrl,

    professionalClinicalDuty: mongomethods.getProfessionalClinicalDuty,
    professionalPostHeld: mongomethods.getProfessionalPostHeld,
    professionalExamDuties: mongomethods.getProfessionalExamDuties,
    professionalCoordinatorDuty: mongomethods.getProfessionalCoordinatorDuty,
    professionalFileUrl: mongomethods.getProfessionalFileUrl,
    professionalCommittee: mongomethods.getProfessionalCommittee,
    professionalConference: mongomethods.getProfessionalConferences,
    professionalGuestLectures: mongomethods.getProfessionalGuestLectures,
    professionalAchievements: mongomethods.getProfessionalAchievements,
    professionalScore: mongomethods.getProfessionalScore,

    overallScore: mongomethods.getOverallScore
  }
  let func = functions[type]
  if(func) return functions[type] 
  throw new Error('No retrieve function found for ' + type)
}

//get method
export async function getDataAny(type, _id?) {
  try{
    let retrieveFunction = await getRetrieveFunction(type)
    let data;
    // console.log(type, retrieveFunction)
    if (retrieveFunction) data = await retrieveFunction?.()
    if (Array.isArray(data)) {
      data = data?.filter(d=>!!d)
      data = data?.map((d) => {
        if (d._doc?._id) d._doc._id = d._doc._id.toString()
        // console.log("inside data map:",d._doc?._id);
        revalidatePath('/appraisal')
        return d._doc
      })
      if (_id) data = data.find((e) => e._id == _id)
      // console.log("after map",_id);
      // console.log("before return",data);
      return data
    }
    if (data?._doc?._id) data._doc._id = data._doc._id.toString?.()
    data = data?._doc || data
  
    if (data?._id) data._id = data._id.toString?.()
    // if (_id) data?.find(e => e._id == _id||e._doc?._id==_id)
  
    return data
  }catch(e){
    console.error("error while fetching data:",e);
    return {error:"Failed to fetch data"}
  }
}

//Post method with one function
export async function handleUpsertAny(formData: FormData) {
  let obj = Object.fromEntries(formData.entries())

  let { type, ...newobj } = obj

  let functions = {
    profile: mongomethods.updateProfile,

    researchPublications: mongomethods.upsertResearchPublications,
    researchGrants: mongomethods.upsertResearchGrants,
    researchBooks: mongomethods.upsertResearchBooks,
    researchGuidance: mongomethods.upsertResearchGuidance,
    researchConferences: mongomethods.upsertResearchConference,
    researchPatents: mongomethods.upsertResearchPatents,

    academicsTeaching: mongomethods.upsertAcademicsTeaching,

    professionalClinicalDuty: mongomethods.updateProfessionalClinicalDuty,
    professionalPostHeld: mongomethods.updateProfessionalPostHeld,
    professionalExamDuties: mongomethods.upsertProfessionalExamDuties,
    professionalCoordinatorDuty: mongomethods.updateProfessionalCoordinatorDuty,
    professionalCommittee: mongomethods.upsertProfessionalCommittee,
    professionalConference: mongomethods.upsertProfessionalConference,
    professionalGuestLectures: mongomethods.upsertProfessionalGuestLecture,
    professionalAchievements: mongomethods.upsertProfessionalAchievement,
  }

  try {
    
    let res = await functions[type as string]?.(newobj)
    if (!res) throw new Error('Function not found or upsert failed')
    // revalidatePath("/")
    return { submitted: true, error: false }
  } catch (e) {
    console.error(e)
    // revalidatePath("/")
    return { submitted: false, error: true }
  }
}

//delete function for any data
export async function handleDeleteAny(type: string, _id: string) {
  if (!_id || !type) {
    return { error: 'Invalid request', submitted: false }
  }
  let functions = {
    researchPublications: mongomethods.deleteResearchPublication,
    researchGrants: mongomethods.deleteResearchGrant,
    researchBooks: mongomethods.deleteResearchBook,
    researchGuidance: mongomethods.deleteResearchGuidance,
    researchConference: mongomethods.deleteResearchConference,
    researchPatents: mongomethods.deleteResearchPatent,

    academicsTeaching: mongomethods.deleteAcademicsTeaching,
    professionalExamDuties: mongomethods.deleteProfessionalExamDuty,
    professionalCommittee: mongomethods.deleteProfessionalCommittee,
    professionalGuestLectures: mongomethods.deleteProfessionalGuestLecture,
    professionalConference: mongomethods.deleteProfessionalConference,
    professionalAchievements: mongomethods.deleteProfessionalAchievement,
  }
  try {
    let res = await functions[type]?.(_id)
    if (!res) throw 'Failed to delete'
    return { submitted: true, error: false, res }
  } catch (e) {
    console.error(e)
    return { error: e, submitted: false }
  }
}
