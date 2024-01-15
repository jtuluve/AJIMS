"use server"
import mongoose from "mongoose"
import User from "./model"
import { getServerSession } from "next-auth";
var isConnected = false;
var isInitialized = false;
//basic functions
export async function createUserIfNotExists({ email, uid }: { email?, uid }) {
    try {
        initializeDb();
        email = email || await getEmail();
        const user = await User.findOne({ email, uid }) || await User.findOne({ uid });
        if (!user) {
            User.create({ uid, email })
                .then(() => console.log("User created"))
                .catch(err => { throw err })
            return true;
        }
        user.email = email;
        user.save();
        return true;
    } catch {
        console.log("Error occured while creating user")
        return false;
    }
}

export async function getEmail() {
    await initializeDb()
    return ((await getServerSession())?.user?.email)
}


export async function getUidFromEmail(email) {
    try {
        await initializeDb();
        const user = await User.findOne({ email })
        return user.uid;
    } catch {
        return null;
    }

}
export async function getUid() {
    try {
        await initializeDb()
        const user = await User.findOne({ email: await getEmail() })
        return user?.uid;
    } catch {
        return null;
    }
}
async function verifyUid(uid) {
    await initializeDb();
    return uid == await getUid()
}

async function getUser(uid) {
    try {
        return await User.findOne({ uid })
    } catch {
        console.log("Error occured while getting user");
        return new Error("User Not Found");
    }
}

async function defaultUser() {
    try {
        const uid = await getUid();
        if (!uid) return false;
        const user = await getUser(uid);
        if (!uid) return false;
        user.appraisal = user.appraisal || {}
        user.appraisal.research = user.appraisal.research || {}
        user.appraisal.research.clinicalDuty = user.appraisal.research.clinicalDuty || [];
        user.appraisal.research.grants = user.appraisal.research.grants || [];
        user.appraisal.research.books = user.appraisal.research.books || [];
        user.appraisal.research.guidance = user.appraisal.research.guidance || [];
        user.appraisal.research.conferences = user.appraisal.research.conferences || [];
        user.appraisal.academics = user.appraisal.academics || {}
        user.appraisal.academics.score = user.appraisal.academics.score || {}
        user.appraisal.academics.teaching = user.appraisal.academics.teaching || {}
        user.appraisal.professional = user.appraisal.professional || {}
        user.appraisal.professional.score = user.appraisal.professional.score || {}
        user.appraisal.professional.clinicalDuty = user.appraisal.professional.clinicalDuty || {}
        user.appraisal.professional.postHeld = user.appraisal.professional.postHeld || {}
        user.appraisal.professional.examDuties = user.appraisal.professional.examDuties || []
        user.appraisal.professional.committee = user.appraisal.professional.committee || []
        user.appraisal.professional.conferences = user.appraisal.professional.conferences || []
        user.appraisal.professional.guestLectures = user.appraisal.professional.guestLectures || 0
        user.save()
        return true;
    } catch {
        console.log("Error occured while initializing user");
        return false;
    }
}

async function initializeDb() {
    try {
        if (isInitialized) return;
        isInitialized=true;
        await connectToDB();
        await createUserIfNotExists({ uid: (await getUid()) });
        await defaultUser();
        isInitialized = true;
        return true;
    } catch (err) {
        isInitialized = false;
        console.log(err?.msg || err?.message || err);
        return false;
    }
}

/* Mongodb Functions */
export async function connectToDB() {
    if (!process.env.MONGODB_URI) return console.log("MONGODB URL is not set");
    if (isConnected) return console.log("Already connected to DB");
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true;
        console.log("Connected to DB");
        return true;
    } catch(e) {
        console.log("Couldn't connect to db",e)
        return false
    }
}

//profile update method
export async function updateProfile(formdata: FormData) {
    const profile = {
        name: formdata.get("name") as string,
        designation: formdata.get("designation") as string,
        department: formdata.get("department") as string
    };
    try {
        await initializeDb();
        if (!profile.name && !profile.designation && !profile.department) return console.log("No data found!")
        const uid = await getUid();
        await User.findOneAndUpdate({ uid }, profile, { new: true })
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

/*** ADD METHODS ***/
//appraisal>research functions
//research->publications
export async function addResearchPublications(publication, uid?){
    try{
        uid = uid || await getUid();
        if(!verifyUid(uid)) throw "uid doesn't match the server uid"
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found"
        user.appraisal.research.publications.push(publication);
        await user.save();
        return true;
    }catch(e){
        console.log(e.msg||e.message||e);
        return false
    }
}


export async function addResearchGrants(grants, uid?) {
    try {
        uid = uid || getUid()
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        await initializeDb();
        const user = await getUser(uid);
       ;
        user.appraisal.research.grants.push(grants);
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err)
        return false
    }
}

export async function addResearchBooks(book, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.research.books.push(book);
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}
export async function addResearchGuidance(guidance, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.research.guidance.push(guidance);
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}
export async function addResearchConferences(conference, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.research.conferences.push(conference);
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}

//appraisal>academics functions
export async function addAcademicsTeaching(teaching, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.academics.teaching = teaching;
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}


//appraisal>professional functions
export async function addProfessionalClinicalDuty(clinicalDuty, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.professional.clinicalDuty = clinicalDuty;
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}
export async function addProfessionalPostHeld(postHeld, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.professional.postHeld = postHeld;
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}
export async function addProfessionalExamDuties(examDuties, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.professional.examDuties.push(examDuties)
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}
export async function addProfessionalCommittee(committee, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.professional.committee.push(committee);
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}
export async function addProfessionalGuestLectures(guestLectures, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        user.appraisal.professional.guestLectures = guestLectures;
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
        return false;
    }
}


/* Mongodb update functions */
//appraisal->research->publications
export async function updateResearchPublications(publication, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        let index = user.appraisal.research.publications.findIndex(item => item._id == _id);
        if (index == -1) throw "Publication not found";
        user.appraisal.research.publications[index]={...user.appraisal.research.publications[index], ...publication}
        user.save();
        return true;
    } catch (err) {
        console.log(err?.msg || err.message || err)
    }
}

//appraisal->research->grants
export async function updateResearchGrants(grants, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        let index = user.appraisal.research.grants.findIndex(item => item._id == _id);
        if (index == -1) throw "Research Grant not found";
        user.appraisal.research.grants[index] = {...(user.appraisal.research.grants[index]), ...grants};
    } catch (err) {
        console.log(err?.msg || err.message || err)
    }
}

//appraisal->research->books
export async function updateResearchBooks(book, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
       ;
        let index = user.appraisal.research.books.findIndex(item => item._id == _id);
        if (index == -1) throw "Research Book not found";
        user.appraisal.research.books[index] = [...(user.appraisal.research.books[index]), ...book];
    } catch (err) {
        console.log(err?.msg || err?.message || err)
    }
}

//appraisal->research->guidance
export async function updateResearchGuidance(guidance, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        let index = user.appraisal.research.guidance.findIndex(item => item._id == _id);
        if (index == -1) throw "Research Guidance not found";
        user.appraisal.research.guidance[index] = [...(user.appraisal.research.guidance[index]), ...guidance];
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->research->conferences
export async function updateResearchConferences(conference, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        let index = user.appraisal.research.conferences.findIndex(item => item._id == _id);
        if (index == -1) throw "Research Conference not found";
        user.appraisal.research.conferences[index] = [...(user.appraisal.research.conferences[index]), ...conference];
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->academics->teaching
export async function updateAcademicsTeaching(teaching, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        user.appraisal.academics.teaching = {...(user.appraisal.academics.teaching), ...teaching};
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->clinicalDuty
export async function updateProfessionalClinicalDuty(clinicalDuty, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        user.appraisal.professional.clinicalDuty = {...(user.appraisal.professional.clinicalDuty), ...clinicalDuty};
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->postHeld
export async function updateProfessionalPostHeld(postHeld, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        user.appraisal.professional.postHeld = {...(user.appraisal.professional.postHeld), ...postHeld};
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->examDuties (array)
export async function updateProfessionalExamDuties(examDuties, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        user.appraisal.professional.examDuties = user.appraisal.professional.examDuties||[]
        user.appraisal.professional.examDuties.push(examDuties);
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}


//appraisal->professional->committee (array)
export async function updateProfessionalCommittee(committee, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        user.appraisal.professional.committee = user.appraisal.professional.committee||[]
        user.appraisal.professional.committee.push(committee);
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}


//appraisal->professional->conferences (array)
export async function updateProfessionalConferences(conference, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        user.appraisal.professional.conferences = user.appraisal.professional.conferences||[]
        user.appraisal.professional.conferences.push(conference);
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->guestLectures (array)
export async function updateProfessionalGuestLectures(lecture, _id, uid?) {
    try {
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        user.appraisal.professional.guestLectures = user.appraisal.professional.guestLectures||[]
        user.appraisal.professional.guestLectures.push(lecture);
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}





/* FUNCTIONS TO RETRIEVE DATA */
//appraisal->research->publications
export async function getProfile(uid?:string){
    try{
        await initializeDb();
        uid = uid||await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
       ;
        const {appraisal, ...user2} = user;
        return user2;
    } catch (err) {
        console.log(err?.msg || err?.message || err);
    }
}

export async function getResearchPublications(_id?:string, uid?:string){
    try{
        uid = uid || await getUid();
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.research.publications.find(p=>p._id==_id):user.appraisal.research.publications;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}
//appraisal->research->grants
export async function getResearchGrants(_id?:string, uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.research.grants.find(d=>d._id==_id):user.appraisal.research.grants;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->research->books
export async function getResearchBooks(_id?:string, uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.research.books.find(d=>d._id==_id):user.appraisal.research.books;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->research->guidance
export async function getResearchGuidance(_id?:string, uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.research.guidance.find(d=>d._id==_id):user.appraisal.research.guidance;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->research->conferences
export async function getResearchConferences(_id?:string, uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.research.conferences.find(d=>d._id==_id):user.appraisal.research.conferences;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->academics->teaching (object)
export async function getAcademicsTeaching(uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return user.appraisal.academics.teaching;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->clinicalDuty (object)
export async function getProfessionalClinicalDuty(uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return user.appraisal.professional.clinicalDuty;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->postHeld (object)
export async function getProfessionalPostHeld(uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return user.appraisal.professional.postHeld;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->examDuties
export async function getProfessionalExamDuties(_id?:string, uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.professional.examDuties.find(exam => exam._id === _id):user.appraisal.professional.examDuties;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->committee
export async function getProfessionalCommittee(_id?:string, uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.professional.committee.find(comm => comm._id === _id):user.appraisal.professional.committee;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->conferences
export async function getProfessionalConferences(_id?:string, uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.professional.conferences.find(con => con._id === _id):user.appraisal.professional.conferences;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

//appraisal->professional->guestLectures
export async function getProfessionalGuestLectures(_id?:string, uid?:string){
    uid = uid || await getUid();
    try{
        await initializeDb();
        const user = await getUser(uid);
        if(!user) throw "User not found";
        return _id?user.appraisal.professional.guestLectures.find(gu => gu._id === _id):user.appraisal.professional.guestLectures;
    }catch(err){
        console.log(err?.msg || err?.message || err);
    }
}

