'use server'
import mongoose from 'mongoose'
import User from './model'
import { getServerSession } from 'next-auth'
import { UserDocument } from './interface'
var isConnected = false
var isInitialized = false
/* BASIC FUNCTIONS */
//create user if not already exists
export async function createUserIfNotExists({ email, uid }: { email?, uid }) {
  try {
    await connectToDB();
    if(!uid) throw new Error("uid required to create account");
    email = email || await getEmail();
    const user =
      (await User.findOne({ email, uid })) || (await User.findOne({ uid }))
    if (!user) {
      User.create({ uid, email })
        .then(() => console.log('User created'))
        .catch((err) => {
          throw err
        })
      return true
    }
    user.email = email;
    user.uid = uid;

    return true
  } catch {
    console.error('Error occured while creating user')
    return false
  }
}

//get email
export async function getEmail() {
  await connectToDB()
  return (await getServerSession())?.user?.email
}

//get uid from email
export async function getUidFromEmail(email) {
  try {
    await connectToDB()
    const user = await User.findOne({ email })
    return user?.uid
  } catch {
    return null
  }
}

//get uid 
export async function getUid() {
  try {
    await connectToDB()
    const user = await User.findOne({ email: await getEmail() })
    return user?.uid
  } catch {
    return null
  }
}

export async function getUserObject(uid?) {
  try {
    await initializeDb();
    uid = uid || await getUid();
    if (!uid) return null;
    let user = await User.findOne({ uid })
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.error('Error occured while getting user:', err)
    return null;
  }
}

async function verifyUid(uid) {
  await initializeDb()
  return uid == (await getUid()) || (await getUser({uid}))?.isAdmin
}

async function getUser(uid?):Promise<UserDocument|null> {
  try {
    await initializeDb();
    uid = uid || await getUid();
    if (!uid) return null;
    let user = await User.findOne({ uid }) as UserDocument;
    return user;
  } catch(err) {
    console.error('Error occured while getting user:',err)
    return null;
  }
}

//default data just in case
async function defaultUser() {
  try {
    const user = await getUser()
    if (!user) return false
    user.appraisal = user.appraisal || {}
    user.appraisal.research = user.appraisal.research || {}
    user.appraisal.research.grants = user.appraisal.research.grants || []
    user.appraisal.research.books = user.appraisal.research.books || []
    user.appraisal.research.guidance = user.appraisal.research.guidance || []
    user.appraisal.research.conferences =
      user.appraisal.research.conferences || []
    user.appraisal.research.patents = user.appraisal.research.patents || []
    user.appraisal.academics = user.appraisal.academics || {}
    user.appraisal.academics.score = user.appraisal.academics.score || {}
    user.appraisal.academics.teaching = Array.isArray(user.appraisal.academics.teaching) ? user.appraisal.academics.teaching : []
    user.appraisal.academics.fileUrl = user.appraisal.academics.fileUrl || ''
    user.appraisal.professional = user.appraisal.professional || {}
    user.appraisal.professional.score = user.appraisal.professional.score || {}
    user.appraisal.professional.clinicalDuty =
      user.appraisal.professional.clinicalDuty || {}
    user.appraisal.professional.postHeld =
      user.appraisal.professional.postHeld || {}
    user.appraisal.professional.examDuties =
      user.appraisal.professional.examDuties || []
    user.appraisal.professional.coordinatorDuty =
      user.appraisal.professional.coordinatorDuty || {}
    user.appraisal.professional.committee =
      user.appraisal.professional.committee || []
    user.appraisal.professional.conferences =
      user.appraisal.professional.conferences || []
    user.appraisal.professional.guestLectures =
      user.appraisal.professional.guestLectures || []
    user.appraisal.professional.fileUrl = user.appraisal.professional.fileUrl || ''
    user.appraisal.professional.achievements = user.appraisal.professional.achievements || []
    user.appraisal.overallScore = user.appraisal.overallScore || {}
    user.profile = user.profile || {}
    user.profile.educationalQualification = Array.isArray(user.profile.educationalQualification) ? user.profile.educationalQualification : [];
    user.profile.experience = Array.isArray(user.profile.experience) ? user.profile.experience : [];
    user.save()
    return true
  } catch(err) {
    console.error('Error occured while initializing user',err)
    return false
  }
}

//initialize db
async function initializeDb() {
  try {
    if (isInitialized) return true
    isInitialized = true
    await connectToDB()
    await createUserIfNotExists({ uid: await getUid()||'' })
    await defaultUser()
    isInitialized = true
    return true
  } catch (err) {
    isInitialized = false
    console.error(err?.msg || err?.message || err)
    return false
  }
}

/* Mongodb Functions */
//connect to db
export async function connectToDB() {
  if (!process.env.MONGODB_URI) return console.log('MONGODB URL is not set')
  if (isConnected) return true;
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    console.log('Connected to DB')
    return true
  } catch (e) {
    console.error("Couldn't connect to db", e)
    return false
  }
}

//returns if the user is admin
export async function isAdmin(uid?:string){
  return ((await getUser(uid))?.isAdmin)
}

//get all users
export async function getUsers(){
  try {
    await initializeDb();
    const user = await getUser(await getUid())
    if(!user.isAdmin) return;
    const users = await User.find()
    // console.log(posts);

    return JSON.stringify(users)
  } catch (error) {
    console.error("Error in connecting to the database:", error);
    return null;
  }
};

//profile update method
export async function updateProfile(profile, uid?) {
  //   console.log(profile)

  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw new Error('Invalid UID');
    profile.experience = JSON.parse(profile.experience);
    profile.appearance = JSON.parse(profile.appearance);
    profile.inspectionDetails = JSON.parse(profile.inspectionDetails);
    profile.numberOfLectures = JSON.parse(profile.numberOfLectures);
    profile.details = JSON.parse(profile.details);
    profile.emoluments = JSON.parse(profile.emoluments);
    profile.educationalQualification = JSON.parse(profile.educationalQualification);
    await User.findOneAndUpdate({ uid }, { name:profile?.name, profileUrl:profile.profileUrl, profile}); //updating both universal and inner profile property
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/* Mongodb upsert (update/insert) functions */
//update/insert appraisal->research->publications
export async function upsertResearchPublications(publication, uid?) {
  try {
    // console.log(publication)
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found.'
    const { _id, ...publicationWithoutId } = publication
    if (_id) {
      const index = user.appraisal.research.publications.findIndex(
        (p) => p?._id.toString?.() == _id
      )
      if (index == -1) throw 'Publication for given uid not found.'
      user.appraisal.research.publications[index] = {
        ...user.appraisal.research.publications[index],
        ...publicationWithoutId,
      }
    } else {
      user.appraisal.research.publications.push(publicationWithoutId)
    }
    await user.save()
    return true
  } catch (e) {
    console.error(e.msg || e.message || e)
    return false
  }
}

//update/insert appraisal->research->grants
export async function upsertResearchGrants(grants, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."

    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...grantsWithoutId } = grants
    if (_id) {
      let index = user.appraisal.research.grants.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Grant not found'
      user.appraisal.research.grants[index] = {
        ...user.appraisal.research.grants[index],
        ...grantsWithoutId,
      }
    } else {
      user.appraisal.research.grants.push(grantsWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err.message || err)
    return false
  }
}

//update/insert appraisal->research->books
export async function upsertResearchBooks(book, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...bookWithoutId } = book
    if (_id) {
      let index = user.appraisal.research.books.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Book not found'
      user.appraisal.research.books[index] = {
        ...user.appraisal.research.books[index],
        ...bookWithoutId,
      }
    } else {
      user.appraisal.research.books.push(bookWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update/insert appraisal->research->guidance
export async function upsertResearchGuidance(guidance, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...guidanceWithoutId } = guidance
    if (_id) {
      let index = user.appraisal.research.guidance.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Guidance not found'
      user.appraisal.research.guidance[index] = {
        ...user.appraisal.research.guidance[index],
        ...guidanceWithoutId,
      }
    } else {
      user.appraisal.research.guidance.push(guidanceWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update/insert appraisal->research->conferences
export async function upsertResearchConference(conference, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...conferenceWithoutId } = conference
    if (_id) {
      let index = user.appraisal.research.conferences.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Conference not found'
      user.appraisal.research.conferences[index] = {
        ...user.appraisal.research.conferences[index],
        ...conferenceWithoutId,
      }
    } else {
      user.appraisal.research.conferences.push(conferenceWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update/insert appraisal->research->patents
export async function upsertResearchPatents(patent, uid?) {
  try {
    patent.detailsOfInventors = JSON.parse(patent.detailsOfInventors) || [];
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...patentWithoutId } = patent
    if (_id) {
      let index = user.appraisal.research.patents.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Patent not found'
      user.appraisal.research.patents[index] = {
        ...user.appraisal.research.patents[index],
        ...patentWithoutId,
      }
    } else {
      user.appraisal.research.patents.push(patentWithoutId)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update appraisal->academics->teaching
export async function upsertAcademicsTeaching(teaching, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    let { _id, ...teachingWithoutId } = teaching //remove _id from teaching object
    //direct teaching = teachingWithoutId works
    if(_id){
      let index = user.appraisal.academics.teaching.findIndex(
        (item) => item?._id.toString() == _id
      )
      if (index == -1) throw 'Research Conference not found'
      user.appraisal.academics.teaching[index] = {
        ...user.appraisal.academics.teaching[index],
        ...teachingWithoutId
      }
    }else{
    user.appraisal.academics.teaching.push(teachingWithoutId);
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update appraisal->academics->fileUrl
export async function updateAcademicsFileUrl(fileUrl, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    // console.log(fileUrl);

    user.appraisal.academics.fileUrl = fileUrl;
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update appraisal->professional->clinicalDuty
export async function updateProfessionalClinicalDuty(clinicalDuty, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...clinicalDutyWithoutId } = clinicalDuty //remove _id from clinicalDuty object
    // user.appraisal.professional.clinicalDuty = {...user.appraisal.professional.clinicalDuty, ...clinicalDutyWithoutId}
    // clinicalDutyWithoutId['clinicalDutyFile'] =  clinicalDutyWithoutId['uploadUrl']
    // delete clinicalDutyWithoutId['uploadUrl']
    user.appraisal.professional.clinicalDuty = clinicalDutyWithoutId;
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update appraisal->professional->postHeld
export async function updateProfessionalPostHeld(postHeld, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const { _id, ...postHeldWithoutId } = postHeld //remove _id from postHeld object
    // postHeldWithoutId['postHeldFile'] = postHeldWithoutId['uploadUrl']
    // delete postHeldWithoutId['uploadUrl']
    user.appraisal.professional.postHeld = postHeldWithoutId;
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update/insert appraisal->professional->examDuties (array)
export async function upsertProfessionalExamDuties(examDuty, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    if (!examDuty._id) {
    //   examDuty['examDutyFile'] = examDuty['uploadUrl']
    //   delete examDuty['uploadUrl']
      user.appraisal.professional.examDuties.push(examDuty)
    }
    else {
      let index = user.appraisal.professional.examDuties.findIndex(
        (item) => item?._id.toString() == examDuty._id
      )
      if (index == -1) throw 'professional Examduty not found'
      // examDuty['examDutyFile'] = examDuty['uploadUrl']
      // delete examDuty['uploadUrl']
      user.appraisal.professional.examDuties[index] = examDuty
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update appraisal->professional->coordinatorDuty
export async function updateProfessionalCoordinatorDuty(coordinatorDuty, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'

    const { _id, profileUrl, ...coordinatorDutyWithoutId } = coordinatorDuty // remove _id and profileUrl from coordinatorDuty object
    // coordinatorDutyWithoutId['coordinatorDutyFile'] = coordinatorDutyWithoutId['uploadUrl']
    // delete coordinatorDutyWithoutId['uploadUrl']
    user.appraisal.professional.coordinatorDuty = coordinatorDutyWithoutId

    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update/insert appraisal->professional->committee (array)
export async function upsertProfessionalCommittee(committee, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.professional.committee =
      user.appraisal.professional.committee || []
    if (committee._id) {
      const index = user.appraisal.professional.committee.findIndex(
        (x) => x._id.toString() === committee._id
      )
      if (index === -1) throw 'Professional committee not found'
      // committee['committeeFile'] = committee['uploadUrl']
      // delete committee['uploadUrl']
      user.appraisal.professional.committee[index] = committee
    } else {
      // committee['committeeFile'] = committee['uploadUrl']
      // delete committee['uploadUrl']
      user.appraisal.professional.committee.push(committee)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update/insert appraisal->professional->conferences (array)
export async function upsertProfessionalConference(conference, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.professional.conferences =
      user.appraisal.professional.conferences || []
    if (conference._id) {
      const index = user.appraisal.professional.conferences.findIndex(
        (item) => item?._id.toString() == conference._id
      )
      if (index === -1) throw 'Professional Conference not found'
      // conference['conferenceFile'] = conference['uploadUrl']
      // delete conference['uploadUrl']
      user.appraisal.professional.conferences[index] = conference
    } else {
      // conference['conferenceFile'] = conference['uploadUrl']
      // delete conference['uploadUrl']
      user.appraisal.professional.conferences.push(conference)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update/insert appraisal->professional->guestLectures (array)
export async function upsertProfessionalGuestLecture(lecture, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.professional.guestLectures =
      user.appraisal.professional.guestLectures || []
    if (lecture._id) {
      const index = user.appraisal.professional.guestLectures.findIndex(
        (item) => item?._id.toString() == lecture._id
      )
      if (index === -1) throw 'Professional Guest Lecture not found'
      // lecture['guestLecturesFile'] = lecture['uploadUrl']
      // delete lecture['uploadUrl']
      user.appraisal.professional.guestLectures[index] = lecture
    } else {
      // lecture['guestLecturesFile'] = lecture['uploadUrl']
      // delete lecture['uploadUrl']
      user.appraisal.professional.guestLectures.push(lecture)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update/insert appraisal->professional->achievements (array)
export async function upsertProfessionalAchievement(achievement, uid?) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.professional.achievements =
      user.appraisal.professional.achievements || []
    if (achievement._id) {
      const index = user.appraisal.professional.achievements.findIndex(
        (item) => item?._id.toString() == achievement._id
      )
      if (index === -1) throw 'Professional Achievement not found'
      user.appraisal.professional.achievements[index] = achievement
    } else {
      user.appraisal.professional.achievements.push(achievement)
    }
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

//update appraisal->academics->fileUrl
export async function updateProfessionalFileUrl(fileUrl, uid?) {
  try{
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    // console.log(fileUrl);

    user.appraisal.professional.fileUrl = fileUrl;
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
    return false
  }
}

/* FUNCTIONS TO RETRIEVE DATA */
//retrieve profile
export async function getProfile(uid?: string) {
  try {
    await initializeDb()
    uid = uid || (await getUid())
    if (!verifyUid(uid)) throw "uid doesn't match the server uid."
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const {_id, ...restUserProfile} = JSON.parse(JSON.stringify(user.profile))
    const newUser = {
      name: user.name,
      designation: user.designation,
      _id: user._id?.toString(),
      profileUrl: user.profileUrl,
      ...restUserProfile
    }
    return newUser
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->publications
export async function getResearchPublications(_id?: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.publications.find((p) => p._id?.toString?.() == _id)
      : user.appraisal.research.publications.sort((a,b)=>b.year-a.year);
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->grants
export async function getResearchGrants(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.grants.find((d) => d._id?.toString() == _id)
      : user.appraisal.research.grants.sort((a,b)=>b.startYear-a.startYear)
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->books
export async function getResearchBooks(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.books.find((d) => d._id?.toString() == _id)
      : user.appraisal.research.books.sort((a,b)=>b.year-a.year)
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->guidance
export async function getResearchGuidance(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.guidance.find((d) => d._id.toString() == _id)
      : user.appraisal.research.guidance.sort((a,b)=>b.year-a.year)
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->conferences
export async function getResearchConferences(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.research.conferences.find((d) => d._id.toString() == _id)
      : user.appraisal.research.conferences.sort((a,b)=>b.year-a.year)
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->score (object)
export async function getResearchScore(uid?) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.research?.score;
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->patents
export async function getResearchPatents(uid?: string) {
  uid = uid || await getUid();
  try {
    await initializeDb()
    const user = await getUser(uid)
    if(!user) throw 'User not found'
    return user.appraisal.research.patents;
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->academics->teaching
export async function getAcademicsTeaching(uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.academics.teaching
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->academics->score (object)
export async function getAcademicsScore(uid?) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.academics?.score;
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->academics->fileUrl (string)
export async function getAcademicsFileUrl(uid?) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    // console.log(user.appraisal.academics?.fileUrl);

    return user.appraisal.academics?.fileUrl;
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->clinicalDuty (object)
export async function getProfessionalClinicalDuty(uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.professional.clinicalDuty
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->postHeld (object)
export async function getProfessionalPostHeld(uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.professional.postHeld
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->examDuties
export async function getProfessionalExamDuties(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.examDuties.find((exam) => exam?._id.toString?.() === _id)
      : user.appraisal.professional.examDuties
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->coordiantorDuty (object)
export async function getProfessionalCoordinatorDuty(uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    // console.log(user.appraisal.professional.coordinatorDuty);
    return user.appraisal.professional.coordinatorDuty
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->committee
export async function getProfessionalCommittee(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.committee.find((comm) => comm?._id.toString?.() === _id)
      : user.appraisal.professional.committee
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->conferences
export async function getProfessionalConferences(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.conferences.find((con) => con?._id.toString?.() === _id)
      : user.appraisal.professional.conferences
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->guestLectures
export async function getProfessionalGuestLectures(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.guestLectures.find((gu) => gu?._id.toString?.() === _id)
      : user.appraisal.professional.guestLectures
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->achievements
export async function getProfessionalAchievements(_id?: string, uid?: string) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return _id
      ? user.appraisal.professional.achievements.find((ach) => ach?._id.toString?.() === _id)
      : user.appraisal.professional.achievements
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->score (object)
export async function getProfessionalScore(uid?) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.professional?.score;
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->professional->fileUrl (string)
export async function getProfessionalFileUrl(uid?) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    // console.log(user.appraisal.professional?.fileUrl);

    return user.appraisal.professional?.fileUrl;
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

/* FUNCTIONS TO DELETE DATA */
//delete appraisal->research->publications
export async function deleteResearchPublication(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.publications.findIndex(
      (pub) => pub?._id.toString?.() === _id
    )
    if (index === -1) throw 'Publication not found'
    user.appraisal.research.publications.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->research->grants
export async function deleteResearchGrant(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.grants.findIndex(
      (gr) => gr?._id.toString?.() === _id
    )
    if (index === -1) throw 'Grant not found'
    user.appraisal.research.grants.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->research->books
export async function deleteResearchBook(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.books.findIndex(
      (book) => book?._id?.toString?.() === _id
    )
    if (index === -1) throw 'Book not found'
    user.appraisal.research.books.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->research->guidance
export async function deleteResearchGuidance(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.guidance.findIndex(
      (guid) => guid?._id.toString?.() === _id
    )
    if (index === -1) throw 'Guidance not found'
    user.appraisal.research.guidance.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->research->conferences
export async function deleteResearchConference(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.conferences.findIndex(
      (conference) => conference?._id.toString?.() === _id
    )
    if (index === -1) throw 'Conference not found'
    user.appraisal.research.conferences.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->research->patents
export async function deleteResearchPatent(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.research.patents.findIndex(
      (patent) => patent?._id.toString?.() === _id
    )
    if (index === -1) throw 'Patent not found'
    user.appraisal.research.patents.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->academics->fileUrl
export async function deleteAcademicsFileUrl(uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.academics.fileUrl = ""
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

export async function deleteAcademicsTeaching(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.academics.teaching.findIndex(
      (teaching) => teaching?._id.toString?.() === _id
    )
    if (index === -1) throw 'Teaching not found'
    user.appraisal.academics.teaching.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->professional->examDuties (array)
export async function deleteProfessionalExamDuty(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.examDuties.findIndex(
      (examDuty) => examDuty?._id.toString?.() === _id
    )
    if (index === -1) throw 'Exam Duty not found'
    user.appraisal.professional.examDuties.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->professional->committee (array)
export async function deleteProfessionalCommittee(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.committee.findIndex(
      (committee) => committee?._id.toString?.() === _id
    )
    if (index === -1) throw 'Committee not found'
    user.appraisal.professional.committee.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->professional->conferences (array)
export async function deleteProfessionalConference(_id: string, uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.conferences.findIndex(
      (conference) => conference?._id.toString?.() === _id
    )
    if (index === -1) throw 'Conference not found'
    user.appraisal.professional.conferences.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->professional->guestLectures (array)
export async function deleteProfessionalGuestLecture(
  _id: string,
  uid?: string
) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.guestLectures.findIndex(
      (guestLecture) => guestLecture?._id.toString?.() === _id
    )
    if (index === -1) throw 'Guest lecture not found'
    user.appraisal.professional.guestLectures.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->professional->achievements (array)
export async function deleteProfessionalAchievement(
  _id: string,
  uid?: string
) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    const index = user.appraisal.professional.achievements.findIndex(
      (achievement) => achievement?._id.toString?.() === _id
    )
    if (index === -1) throw 'Achievement not found'
    user.appraisal.professional.achievements.splice(index, 1)
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//delete appraisal->academics->fileUrl
export async function deleteProfessionalFileUrl(uid?: string) {
  try {
    uid = uid || (await getUid())
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    user.appraisal.professional.fileUrl = ""
    await user.save()
    return true
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}

//retrieve appraisal->research->score (object)
export async function getOverallScore(uid?) {
  uid = uid || (await getUid())
  try {
    await initializeDb()
    const user = await getUser(uid)
    if (!user) throw 'User not found'
    return user.appraisal.overallScore;
  } catch (err) {
    console.error(err?.msg || err?.message || err)
  }
}