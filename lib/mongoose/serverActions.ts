"use server"
import * as database from "@/lib/mongoose/functions" ;

/* GET METHODS */
//research clinical duty
export async function handleGetResearchClinicalDuty(formData:FormData){
    // formData.entries()
    database.addResearchClinicalDuty({title:formData.get("Title"),journalName:formData.get("Jouranal Name"),Quartile:formData.get("Quartile"),index:formData.get("Index"),doi:formData.get("DOI"),authorship:formData.get("Authorship")})
}
//research grants
export async function handleGetResearchGrants(formData:FormData){
    // TODO:wrong here. Correct it
    database.addResearchGrants({title:formData.get("Title"),journalName:formData.get("Jouranal Name"),Quartile:formData.get("Quartile"),index:formData.get("Index"),doi:formData.get("DOI"),authorship:formData.get("Authorship")})
}