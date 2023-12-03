"use server"

import { addResearchClinicalDuty } from "@/lib/mongoose/functions";
export async function handleResearchClinicalDuty(formData:FormData){
    // formData.entries()
    addResearchClinicalDuty({title:formData.get("Title"),journalName:formData.get("Jouranal Name"),Quartile:formData.get("Quartile"),index:formData.get("Index"),doi:formData.get("DOI"),authorship:formData.get("Authorship")})
}