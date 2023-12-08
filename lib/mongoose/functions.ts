"use server"
import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import User from "./model"
var isConnected = false;
var isInitialized = false;
//basic functions
export async function createUserIfNotExists({ email, uid }: { email?, uid}) {
    await initializeDb()
    email = email || await getEmail()
    try {
        const user = await User.findOne({ email, uid }) || await User.findOne({ uid })
        if (!user) {
            await User.create({ uid, email })
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
        await initializeDb();
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

async function getUser(uid){
    try{
        return await User.findOne({uid})
    }catch{
        console.log("Error occured while getting user");
        return false;
    }
}

async function defaultUser() {
    try {
        const uid = await getUid();
        if (!uid) return false;
        const user = await getUser(uid)
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
        if(isInitialized) throw "Initialized"
        await connectToDB();
        await createUserIfNotExists({uid:(await getUid())});
        await defaultUser();
        isInitialized = true;
        return true;
    } catch(err) {
        console.log(err?.msg||err?.message||err);
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
    } catch {
        console.log("Couldn't connect to db")
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
export async function addResearchClinicalDuty(clinicalDuty, uid?) {
    if (!uid) uid = await getUid();
    if (!verifyUid(uid)) return console.log("Uid doesn't match the server uid.")
    try {
        await initializeDb();
        const user = await getUser(uid);
        if (!user) return console.log("User not found");
        user.appraisal.research.clinicalDuty.push(clinicalDuty);
        user.save();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function addReserchGrants(grants, uid?) {
    try{
        if (!uid) uid = await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        await initializeDb();
        const user = await getUser(uid);
        if (!user) throw "User not found";
        const res = user.appraisal.research.grants.push(grants);
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err)
        return false
    }
}

export async function addResearchBooks(book, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.research.books.push(book);
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}
export async function addResearchGuidance(guidance, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.research.guidance.push(guidance);
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}
export async function addResearchConferences(conference, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.research.conferences.push(conference);
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}

//appraisal>academics functions
export async function addAcademicsTeaching(teaching, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.academics.teaching = teaching;
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}


//appraisal>professional functions
export async function addProfessionalClinicalDuty(clinicalDuty, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.professional.clinicalDuty = clinicalDuty;
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}
export async function addProfessionalPostHeld(postHeld, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.professional.postHeld = postHeld;
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}
export async function addProfessionalExamDuties(examDuties, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.professional.examDuties.push(examDuties)
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}
export async function addProfessionalCommittee(committee, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.professional.committee.push(committee);
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}
export async function addProfessionalGuestLectures(guestLectures, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        user.appraisal.professional.guestLectures = guestLectures;
        user.save();
        return true;
    }catch(err){
        console.log(err?.msg||err?.message||err);
        return false;
    }
}


/* Mongodb update functions */
//appraisal->research->clinicalduty
export async function updateResearchClinicalDuty(duty, _id, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        let index = user.appraisal.research.clinicalDuty.findIndex(item => item._id == _id);
        if(index == -1) throw "Clinical Duty not found";
        user.appraisal.research.clinicalDuty[index].duty = [...(user.appraisal.research.clinicalDuty[index]), ...duty];
        user.save();
        return true;
    }catch(err){

    }
}

//appraisal->research->grants
export async function updateResearchGrants(grants, _id, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        let index = user.appraisal.research.grants.findIndex(item => item._id == _id);
        if(index == -1) throw "Research Grant not found";
        user.appraisal.research.grants[index] = [...(user.appraisal.research.grants[index]), ...grants];
    }catch(err){
        console.log(err?.msg||err.message||err)
    }
}

//appraisal->research->books
export async function updateResearchBooks(book, _id, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";

        const user = await getUser(uid)
        if(!user) throw "User not found";
        let index = user.appraisal.research.books.findIndex(item => item._id == _id);
        if(index == -1) throw "Research Book not found";
        user.appraisal.research.books[index] = [...(user.appraisal.research.books[index]), ...book];
    }catch(err){
        console.log(err?.msg||err?.message||err)
    }
}

//appraisal->research->guidance
export async function updateResearchGuidance(guidance, _id, uid?) {
    try{
        await initializeDb();
        uid = uid || await getUid();
        if (!verifyUid(uid)) throw "uid doesn't match the server uid.";
        const user = await getUser(uid);
        if(!user) throw "User not found";
        let index = user.appraisal.research.guidance.findIndex(item => item._id == _id);
        if(index == -1) throw "Research Guidance not found";
        user.appraisal.research.guidance[index] = [...(user.appraisal.research.guidance[index]), ...guidance];
    }catch(err){
        console.log(err?.msg||err?.message||err);
    }
}