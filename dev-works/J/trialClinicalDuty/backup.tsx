/* "use server"
import Form from "@/components/form";
import { handleResearchClinicalDuty } from "@/lib/mongoose/serverActions";

export default async function page() {
    return (
        <>
            {/* name not added which is a must }
            <Form submitFunc={handleResearchClinicalDuty} inputs={[
                {type:"text",label:"Title", placeholder:"Enter title",required:true},
                {type:"text",label:"Journal Name", placeholder:"Enter Journal Name",required:true},
                {type:"select",label:"Quartile",required:true,options:[{value:"Q1"},{value:"Q2"},{value:"Q3"},{value:"Q4"},{value:"No quartile"},{value:"Nil"}]},
                {type:"select",label:"Index",required:true,options:[{value:"Medline"},{value:"Pubmed"},{value:"CSCI"},{value:"SCI"},{value:"DC"},{value:"Expanded Embase"},{value:"Scopus"},{value:"DoAJ"}]},
                {type:"text",required:true,label:"DOI",placeholder:"Enter DOI"},
                {type:"select",label:"Authorship",required:true,options:[{value:"First"},{value:"Correspondant"},{value:"Second"},{value:"Other"}]},
                {type:"file",required:false,label:"File",placeholder:"Enter File"}
                ]}/>
        </>
    );
}
 */